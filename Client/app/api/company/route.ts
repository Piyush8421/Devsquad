import { NextResponse } from 'next/server';

export async function GET() {
  // Example: return a list of companies (demo data)
  return NextResponse.json([
    { id: 1, name: 'Acme Corp' },
    { id: 2, name: 'Globex' }
  ]);
}

export async function POST(request: Request) {
  // Example: create a new company (demo, not persistent)
  const data = await request.json();
  return NextResponse.json({ message: 'Company created', company: data });
}
