import { NextResponse } from 'next/server';

const CONTACT_EMAIL = 'anthonyhasrouny8@gmail.com';

interface ContactPayload {
  name: string;
  email: string;
  business?: string;
  service: string;
  timeline: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 },
      );
    }

    const body = (await request.json()) as Partial<ContactPayload>;

    if (
      !body.name ||
      !body.email ||
      !body.service ||
      !body.timeline ||
      !body.message
    ) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 },
      );
    }

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      ${
        body.business
          ? `<p><strong>Business:</strong> ${body.business}</p>`
          : ''
      }
      <p><strong>Service:</strong> ${body.service}</p>
      <p><strong>Timeline:</strong> ${body.timeline}</p>
      <p><strong>Message:</strong></p>
      <p>${body.message.replace(/\n/g, '<br />')}</p>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Anthony Portfolio <no-reply@resend.dev>',
        to: [CONTACT_EMAIL],
        reply_to: body.email,
        subject: 'New contact form message',
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('Resend API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to send email.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Unexpected error while sending message.' },
      { status: 500 },
    );
  }
}


