import { Resend } from "resend";
import { NextResponse } from "next/server";

const MAX = {
  name: 120,
  org: 200,
  phone: 40,
  role: 120,
  plan: 200,
  timing: 200,
  message: 8000,
  fwLabel: 80,
} as const;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  frameworks: string[];
  plan: string;
  timing: string;
  message: string;
};

function parseBody(data: unknown): ContactPayload | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;

  const firstName = typeof o.firstName === "string" ? o.firstName.trim() : "";
  const lastName = typeof o.lastName === "string" ? o.lastName.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim().toLowerCase() : "";
  const phone = typeof o.phone === "string" ? o.phone.trim() : "";
  const organization =
    typeof o.organization === "string" ? o.organization.trim() : "";
  const role = typeof o.role === "string" ? o.role.trim() : "";
  const plan = typeof o.plan === "string" ? o.plan.trim() : "";
  const timing = typeof o.timing === "string" ? o.timing.trim() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";

  let frameworks: string[] = [];
  if (Array.isArray(o.frameworks)) {
    frameworks = o.frameworks
      .filter((x): x is string => typeof x === "string")
      .map((x) => x.trim())
      .filter(Boolean)
      .slice(0, 24);
  }

  if (
    !firstName ||
    !lastName ||
    !email ||
    !organization ||
    !role ||
    firstName.length > MAX.name ||
    lastName.length > MAX.name ||
    !isValidEmail(email) ||
    phone.length > MAX.phone ||
    organization.length > MAX.org ||
    role.length > MAX.role ||
    plan.length > MAX.plan ||
    timing.length > MAX.timing ||
    message.length > MAX.message ||
    frameworks.some((f) => f.length > MAX.fwLabel)
  ) {
    return null;
  }

  return {
    firstName,
    lastName,
    email,
    phone,
    organization,
    role,
    frameworks,
    plan,
    timing,
    message,
  };
}

function buildEmailHtml(p: ContactPayload): string {
  const rows: [string, string][] = [
    ["Name", `${p.firstName} ${p.lastName}`],
    ["Email", p.email],
    ["Phone", p.phone || "—"],
    ["Organization", p.organization],
    ["Role", p.role],
    ["Frameworks (codes)", p.frameworks.length ? p.frameworks.join(", ") : "—"],
    ["Plan", p.plan || "—"],
    ["Timing", p.timing || "—"],
    ["Message", p.message || "—"],
  ];

  const bodyRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;width:160px;background:#f9fafb">${escapeHtml(k)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
  <h2 style="margin:0 0 16px">New ArabAudit contact request</h2>
  <p style="margin:0 0 16px;color:#374151">Submitted via the landing page contact form.</p>
  <table style="border-collapse:collapse;width:100%;max-width:640px">${bodyRows}</table>
</body>
</html>`.trim();
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const toRaw = process.env.CONTACT_TO_EMAIL?.trim();

  if (!apiKey || !from) {
    console.error("contact api: missing RESEND_API_KEY or CONTACT_FROM_EMAIL");
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  const to = (toRaw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (to.length === 0) {
    console.error("contact api: CONTACT_TO_EMAIL empty");
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const payload = parseBody(json);
  if (!payload) {
    return NextResponse.json(
      { error: "Invalid or incomplete form data." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);
  const subject = `Contact: ${payload.organization} — ${payload.firstName} ${payload.lastName}`;

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: subject.slice(0, 998),
    html: buildEmailHtml(payload),
    text: [
      "New ArabAudit contact request",
      "",
      `Name: ${payload.firstName} ${payload.lastName}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "—"}`,
      `Organization: ${payload.organization}`,
      `Role: ${payload.role}`,
      `Frameworks: ${payload.frameworks.join(", ") || "—"}`,
      `Plan: ${payload.plan || "—"}`,
      `Timing: ${payload.timing || "—"}`,
      `Message: ${payload.message || "—"}`,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      {
        error: "Failed to send message. Please try again or email us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}
