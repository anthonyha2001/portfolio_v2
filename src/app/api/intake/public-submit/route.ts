import { NextResponse } from 'next/server';
import { sendIntakeEmail } from '../../../../../lib/email';

export async function POST(request: Request) {
  console.log('API route hit');
  try {
    const formData = await request.json();
    console.log('Request body parsed:', JSON.stringify(formData, null, 2));

    const { contactName, contactEmail, businessName } = formData ?? {};

    if (!contactName || !contactEmail || !businessName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    console.log('EMAIL_USER is set:', !!process.env.EMAIL_USER);
    console.log('EMAIL_PASS is set:', !!process.env.EMAIL_PASS);
    console.log('About to call sendIntakeEmail');
    try {
      await sendIntakeEmail({
        ...formData,
        contactName,
        contactEmail,
        contactPhone: formData.contactPhone,
        userEmail: contactEmail,
        userName: contactName,
      });
      console.log('sendIntakeEmail completed successfully');
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


