import { NextResponse } from 'next/server';

export async function GET() {
  // Example: return a list of referrals (demo data)
  return NextResponse.json([
    { id: 1, name: 'Referral 1' },
    { id: 2, name: 'Referral 2' }
  ]);
}

export async function POST(request: Request) {
  // Example: create a new referral (demo, not persistent)
  const data = await request.json();
  return NextResponse.json({ message: 'Referral created', referral: data });
}
