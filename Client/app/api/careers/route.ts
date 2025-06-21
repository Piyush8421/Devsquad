import { NextResponse } from 'next/server';

export async function GET() {
  // Example: return a list of careers (demo data)
  return NextResponse.json([
    { id: 1, title: 'Frontend Developer' },
    { id: 2, title: 'Backend Developer' }
  ]);
}

export async function POST(request: Request) {
  // Example: create a new career (demo, not persistent)
  const data = await request.json();
  return NextResponse.json({ message: 'Career created', career: data });
}
