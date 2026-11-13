/**
 * Hushlane Labs contact form → Google Sheet + email.
 *
 * Deploy as a Web app: Execute as Me, Who has access: Anyone.
 * Paste the web app URL into NEXT_PUBLIC_SHEETS_WEBHOOK_URL and rebuild.
 *
 * The site posts JSON as text/plain so the browser can send it without a
 * CORS preflight. The response is opaque to the browser. Test with doGet.
 */

const SHEET_ID = "PASTE_SPREADSHEET_ID";
const NOTIFY_EMAIL = "you@hushlanelabs.com";
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
    if (!data.name || !data.email || !data.message) {
      return json({ ok: false, error: "missing fields" });
    }

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
      data.message || "",
      data.page || "",
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: data.email,
      subject: "New Hushlane enquiry — " + (data.agency || data.name),
      body: [
        "New enquiry from the website.",
        "",
        "Time: " + timestamp.toISOString(),
        "Name: " + data.name,
        "Email: " + data.email,
        "Agency: " + (data.agency || ""),
        "Website: " + (data.website || ""),
        "Service: " + (data.service || ""),
        "Budget: " + (data.budget || ""),
        "Page: " + (data.page || ""),
        "",
        data.message,
      ].join("\n"),
    });

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}

function readPayload(e) {
  if (e && e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }
  return (e && e.parameter) || {};
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
