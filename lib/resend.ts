import type { Lead } from "@/types/content";

export async function sendLeadEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !toEmail) {
    console.log("[resend] RESEND_API_KEY or CONTACT_EMAIL not set — logging lead to console:");
    console.log(JSON.stringify(lead, null, 2));
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const rows = [
    ["שם מלא", lead.fullName],
    ["טלפון", lead.phone],
    ["סוג אירוע", lead.eventType],
    ["חברה", lead.company ?? ""],
    ["אימייל", lead.email ?? ""],
    ["תאריך אירוע", lead.eventDate ?? ""],
    ["כמות משתתפים", lead.participants ?? ""],
    ["מיקום", lead.location ?? ""],
    ["תכנית מבוקשת", lead.packageInterest ?? ""],
    ["הודעה", lead.message ?? ""],
    ["נשלח מ", lead.source ?? "אתר"],
    ["תאריך פנייה", lead.createdAt],
  ];

  const tableRows = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:bold;text-align:right;">${k}</td><td style="padding:6px 12px;">${v}</td></tr>`)
    .join("");

  await resend.emails.send({
    from: "עודד אמר <noreply@odedamar.co.il>",
    to: toEmail,
    subject: `פנייה חדשה מהאתר — ${lead.fullName}`,
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:24px;border-radius:8px;">
        <h2 style="color:#29C7C7;margin-bottom:24px;">פנייה חדשה מהאתר</h2>
        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;">
          <tbody>${tableRows}</tbody>
        </table>
        <p style="margin-top:24px;color:#666;font-size:14px;">פנייה זו נשלחה מהאתר odedamar.co.il</p>
      </div>
    `,
  });
}
