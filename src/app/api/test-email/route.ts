import { NextResponse } from 'next/server';

export async function GET() {
  const hasEmailUser = !!process.env.EMAIL_USER;
  const hasEmailPass = !!process.env.EMAIL_PASS;
  const emailUserPrefix = process.env.EMAIL_USER
    ? process.env.EMAIL_USER.substring(0, 5)
    : null;

  return NextResponse.json({
    hasEmailUser,
    hasEmailPass,
    emailUserPrefix,
  });
}

