/**
 * doPost writes a timestamped row, emails NOTIFY_EMAIL, and sends the
 * sender an auto-reply.
 *
 * Contact form posts: name, email, agency, website, service, budget, message,
 * page, token, company_fax. Lead popup posts: name, email, agency, source
 * "popup", plus the same honeypot and token fields.
 *
 * Deploy as a Web app: Execute as Me, Who has access: Anyone.
 * Paste the web app URL into NEXT_PUBLIC_SHEETS_WEBHOOK_URL and rebuild.
 *
 * The site posts JSON as text/plain so the browser can send it without a
 * CORS preflight. readPayload also accepts form fields. The response is
 * opaque to the browser. Test with doGet, then deploy a new version.
 */

const SHEET_ID = "1dlDF2dPNzKez1CN4EhaDlE4E1jU4atCqX7sf0Eg3UFE";
const NOTIFY_EMAIL = "mohit@acredge.in";
const FORM_TOKEN = "";

function doGet() {
  return ContentService.createTextOutput("Hushlane form endpoint is running.");
}

function doPost(e) {
  try {
    const data = readPayload(e);
    if (FORM_TOKEN && data.token !== FORM_TOKEN) {
      return json({ ok: false });
    }
    if (data.company_fax) {
      return json({ ok: true });
    }

    const source = String(data.source || "contact").trim() || "contact";
    const isPopup = source === "popup";

    if (!data.name || !data.email) {
      return json({ ok: false, error: "missing fields" });
    }
    if (isPopup && !data.agency) {
      return json({ ok: false, error: "missing fields" });
    }
    if (!isPopup && !data.message) {
      return json({ ok: false, error: "missing fields" });
    }

    const message =
      data.message ||
      (isPopup
        ? "Lead popup request for a free 30-minute call."
        : "");

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Email",
        "Agency",
        "Website",
        "Service",
        "Budget",
        "Message",
        "Source",
        "Page",
      ]);
    }

    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.agency || "",
      data.website || "",
      data.service || "",
      data.budget || "",
      message,
      source,
      data.page || "",
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: data.email,
      subject:
        (isPopup ? "New Hushlane popup lead — " : "New Hushlane enquiry — ") +
        (data.agency || data.name),
      body: [
        isPopup
          ? "New lead from the site popup."
          : "New enquiry from the website.",
        "",
        "Time: " + timestamp.toISOString(),
        "Source: " + source,
        "Name: " + data.name,
        "Email: " + data.email,
        "Agency: " + (data.agency || ""),
        "Website: " + (data.website || ""),
        "Service: " + (data.service || ""),
        "Budget: " + (data.budget || ""),
        "Page: " + (data.page || ""),
        "",
        message,
      ].join("\n"),
    });

    const confirmation = confirmationEmail(data.name, isPopup);
    MailApp.sendEmail({
      to: data.email,
      replyTo: NOTIFY_EMAIL,
      name: "Hushlane Labs",
      subject: isPopup
        ? "We have your request — Hushlane Labs"
        : "We have your brief — Hushlane Labs",
      body: confirmation.text,
      htmlBody: confirmation.html,
    });

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}

function readPayload(e) {
  const param = (e && e.parameter) || {};
  if (param.name || param.email || param.message || param.source) return param;
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      return param;
    }
  }
  return param;
}

function firstName(name) {
  const part = String(name || "")
    .trim()
    .split(/\s+/)[0] || "";
  return part.slice(0, 40);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function confirmationEmail(name, isPopup) {
  const who = escapeHtml(firstName(name) || "there");
  const plainWho = firstName(name) || "there";
  const eyebrow = isPopup ? "Call request received" : "Brief received";
  const nextStep = isPopup
    ? "Pick a 30-minute slot on the booking page when you are ready, or reply to this email with a preferred time."
    : "You get a fit check from a person, not an automated sequence. Reply to this email if you need to add a date, a file, or a correction.";
  const text = [
    "Thanks, " + plainWho + ". We'll reply within 24 hours.",
    "",
    isPopup
      ? "Your free-call request is with Hushlane Labs. A person will read it and reply on the next business day."
      : "Your brief is with Hushlane Labs. A person will read it and reply on the next business day. If the work is a poor fit, that reply will say so plainly.",
    "",
    "You can reply to this email if you need to add something.",
    "",
    "Hushlane Labs",
    "Your brand. Our build.",
    "https://hushlanelabs.com",
  ].join("\n");

  const html = [
    '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f5;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;">',
    '<tr><td align="center" style="padding:32px 16px;">',
    '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:#ffffff;border:1px solid #e7e7e7;border-radius:16px;">',
    '<tr><td style="background:#171717;padding:28px 32px;border-radius:16px 16px 0 0;">',
    '<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;font-size:18px;letter-spacing:-0.02em;color:#ffffff;">Hushlane <span style="color:#a3a3a3;">Labs</span></p>',
    '<p style="margin:8px 0 0;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#a3a3a3;">Your brand. Our build.</p>',
    "</td></tr>",
    '<tr><td style="padding:36px 32px 8px;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;">',
    '<p style="margin:0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#737373;">' +
      eyebrow +
      "</p>",
    '<h1 style="margin:12px 0 0;font-size:28px;line-height:1.25;font-weight:500;letter-spacing:-0.03em;color:#171717;">Thanks, ' +
      who +
      ". We'll reply within 24 hours.</h1>",
    '<p style="margin:16px 0 0;font-size:16px;line-height:1.6;color:#525252;">' +
      (isPopup
        ? "Your free-call request is with us. A person will read it and reply on the next business day."
        : "Your brief is with us. A person will read it and reply on the next business day. If the work is a poor fit, that reply will say so plainly.") +
      "</p>",
    "</td></tr>",
    '<tr><td style="padding:20px 32px 8px;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;border-radius:12px;">',
    '<tr><td style="padding:16px 18px;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;font-size:14px;line-height:1.55;color:#404040;">',
    '<strong style="display:block;margin:0 0 4px;color:#171717;font-weight:600;">What happens next</strong>',
    nextStep,
    "</td></tr></table>",
    "</td></tr>",
    '<tr><td style="padding:24px 32px 36px;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;">',
    '<a href="https://hushlanelabs.com/contact" style="display:inline-block;background:#171717;color:#ffffff;text-decoration:none;font-size:14px;line-height:1;padding:14px 18px;border-radius:999px;">Book a free call</a>',
    "</td></tr>",
    '<tr><td style="padding:18px 32px 22px;border-top:1px solid #e7e7e7;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;font-size:12px;line-height:1.6;color:#737373;border-radius:0 0 16px 16px;">',
    "Hushlane Labs · White-label tech, product, and AI automation for agencies.",
    "</td></tr>",
    "</table></td></tr></table></body></html>",
  ].join("");

  return { text: text, html: html };
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
