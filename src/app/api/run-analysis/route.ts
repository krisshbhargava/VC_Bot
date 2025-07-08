import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    company: "Acme Corp",
    summary: "Acme Corp is a leading provider of widgets and solutions in the global market. This is a sample analysis result.",
    score: 87,
  });
} 