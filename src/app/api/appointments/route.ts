import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { fullName, email, phone, service, preferredDate, preferredTime, message } = body;

    // Server-side validation check
    if (!fullName || !email || !phone || !service || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { success: false, error: 'Missing required appointment fields.' },
        { status: 400 }
      );
    }

    const appointmentId = 'AUR-' + Math.floor(100000 + Math.random() * 900000);

    // In production, persist to database or dispatch EmailJS/SendGrid email notification here.
    return NextResponse.json({
      success: true,
      message: "Thank you! We'll contact you soon",
      appointmentId,
      receivedData: {
        fullName,
        email,
        phone,
        service,
        preferredDate,
        preferredTime,
        message,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, error: 'Internal server error processing appointment.' },
      { status: 500 }
    );
  }
}

