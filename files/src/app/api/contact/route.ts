import { NextResponse } from "next/server";
import { createClient } from "@libsql/client";
import { existsSync, mkdirSync } from "fs";
import path from "path";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}

// Self-contained libSQL client: this template has no hard dependency on
// d4-cms-core, so it can't assume @/lib/cms/data-store exists. Same
// Turso-in-production / local-file-in-dev behavior, same env vars.
function localDbUrl(): string {
  const dir = path.join(process.cwd(), "data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return `file:${path.join(dir, "cms.db")}`;
}

const client = createClient(
  process.env.TURSO_DATABASE_URL
    ? { url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN }
    : { url: localDbUrl() }
);

let ready: Promise<unknown> | null = null;
function ensureTable() {
  if (!ready) {
    ready = client.execute(
      "CREATE TABLE IF NOT EXISTS collections (name TEXT PRIMARY KEY, data TEXT NOT NULL)"
    );
  }
  return ready;
}

async function storeLocally(msg: ContactMessage) {
  await ensureTable();
  const res = await client.execute({
    sql: "SELECT data FROM collections WHERE name = ?",
    args: ["messages"],
  });
  const existing: ContactMessage[] = res.rows[0] ? JSON.parse(res.rows[0].data as string) : [];
  existing.push(msg);
  await client.execute({
    sql: "INSERT INTO collections (name, data) VALUES (?, ?) ON CONFLICT(name) DO UPDATE SET data = excluded.data",
    args: ["messages", JSON.stringify(existing)],
  });
}

export async function POST(req: Request) {
  let body: Partial<ContactMessage>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim().slice(0, 200);
  const email = (body.email ?? "").toString().trim().slice(0, 200);
  const message = (body.message ?? "").toString().trim().slice(0, 5000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const msg: ContactMessage = { name, email, message, receivedAt: new Date().toISOString() };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (apiKey && to) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Website Contact <onboarding@resend.dev>",
        to,
        replyTo: email,
        subject: `Website inquiry from ${name}`,
        text: `${message}\n\nFrom: ${name} <${email}>`,
      });
    } catch (e) {
      console.error("contact email failed, storing locally:", e);
      try {
        await storeLocally(msg);
      } catch {
        return NextResponse.json({ error: "Could not deliver message." }, { status: 500 });
      }
    }
  } else {
    try {
      await storeLocally(msg);
    } catch (e) {
      console.error("contact local store failed:", e);
      return NextResponse.json({ error: "Could not deliver message." }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
