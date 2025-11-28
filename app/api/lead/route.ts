import { NextRequest, NextResponse } from "next/server";
import { getBrand } from '@/lib/brand';
import { sendCustomerConfirmation, sendInternalNotifications } from '@/lib/email/sendgrid';

async function verifyTurnstile(token: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn("TURNSTILE_SECRET_KEY not set, skipping verification");
    return true;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

async function sendToZapier(data: Record<string, string>) {
  if (!process.env.ZAPIER_WEBHOOK_URL) {
    console.warn("ZAPIER_WEBHOOK_URL not set, skipping Zapier");
    return;
  }

  try {
    await fetch(process.env.ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Zapier webhook error:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const body = contentType.includes('application/json')
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());

    const turnstileToken = body['cf-turnstile-response'] || body.turnstileToken as string;

    // Verify Turnstile token
    if (turnstileToken) {
      const isValid = await verifyTurnstile(turnstileToken);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid captcha verification" },
          { status: 400 }
        );
      }
    }

    // Extract form data
    const name = (body.name as string) || "";
    const company = (body.company as string) || "";
    const email = (body.email as string) || "";
    const phone = (body.phone as string) || "";
    const projectType = (body.projectType as string) || "";
    const timeline = (body.timeline as string) || "";
    const details = (body.details as string) || "";
    const property = (body.property as string) || "";
    const estimatedCloseDate = (body.estimatedCloseDate as string) || "";
    const city = (body.city as string) || "";
    const message = (body.message as string) || "";

    // Validate required fields
    if (!name || !email || !phone || !projectType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send to Zapier webhook
    await sendToZapier({
      name,
      company,
      email,
      phone,
      projectType,
      timeline,
      details: details || message || "",
      property: property || "",
      estimatedCloseDate: estimatedCloseDate || "",
      city: city || "",
      submittedAt: new Date().toISOString(),
    });

    // Send emails via SendGrid template
    const brand = getBrand();
    const lead = {
      name: String(name || ''),
      email: String(email || ''),
      phone: phone ? String(phone).replace(/\D/g, '') : undefined,
      phone_plain: phone ? String(phone).replace(/\D/g, '') : undefined,
      projectType: String(projectType || '1031 Exchange Project'),
      property: property ? String(property) : undefined,
      estimatedCloseDate: estimatedCloseDate ? String(estimatedCloseDate) : undefined,
      city: city ? String(city) : undefined,
      company: company ? String(company) : undefined,
      timeline: timeline ? String(timeline) : undefined,
      message: message ? String(message) : (details ? String(details) : undefined),
    };

    const brandWithDate = {
      ...brand,
      submitted_date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    try {
      await Promise.all([
        sendCustomerConfirmation(brandWithDate, lead),
        sendInternalNotifications(brandWithDate, lead),
      ]);
      console.log('SendGrid emails sent successfully to:', email);
    } catch (error) {
      console.error("SendGrid email failed", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
