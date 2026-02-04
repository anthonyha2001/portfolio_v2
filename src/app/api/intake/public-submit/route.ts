import { NextResponse } from 'next/server';
import { sendIntakeEmail } from '../../../../../lib/email';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const { contactName, contactEmail, businessName } = formData ?? {};

    if (!contactName || !contactEmail || !businessName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    try {
      await sendIntakeEmail({
        ...formData,
        contactName,
        contactEmail,
        contactPhone: formData.contactPhone,
        userEmail: contactEmail,
        userName: contactName,
      });
    } catch (emailError) {
      console.error('Public intake email error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Public intake submission error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}


