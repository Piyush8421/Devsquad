import { NextResponse } from 'next/server';

export async function GET() {
  // Example: return a list of users (demo data)
  return NextResponse.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
}

export async function POST(request: Request) {
  // Example: create a new user (demo, not persistent)
  const data = await request.json();
  return NextResponse.json({ message: 'User created', user: data });
}
