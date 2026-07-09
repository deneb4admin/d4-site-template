import { NextResponse } from "next/server";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}

function storeLocally(msg: ContactMessage) {
  const dir = path.join(process.cwd(), "data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const fp = path.join(dir, "messages.json");
  const existing: ContactMessage[] = existsSync(fp)
    ? JSON.parse(readFileSync(fp, "utf8"))
    : [];
  existing.push(msg);
  writeFileSync(fp, JSON.stringify(existing, null, 2), "utf8");
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
        storeLocally(msg);
      } catch {
        return NextResponse.json({ error: "Could not deliver message." }, { status: 500 });
      }
    }
  } else {
    try {
      storeLocally(msg);
    } catch (e) {
      console.error("contact local store failed:", e);
      return NextResponse.json({ error: "Could not deliver message." }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
