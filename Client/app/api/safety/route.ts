import { NextResponse } from 'next/server';

export async function GET() {
  // Example: return a list of safety tips (demo data)
  return NextResponse.json([
    { id: 1, tip: 'Always verify guests.' },
    { id: 2, tip: 'Use secure payments.' }
  ]);
}

export async function POST(request: Request) {
  // Example: create a new safety tip (demo, not persistent)
  const data = await request.json();
  return NextResponse.json({ message: 'Safety tip created', safety: data });
}
