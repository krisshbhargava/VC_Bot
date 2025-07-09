import { NextRequest, NextResponse } from "next/server";
import { createAnalysis, getAnalysis } from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyId, companyName } = body;

    if (!companyId) {
      return NextResponse.json(
        { error: "Company ID is required" },
        { status: 400 }
      );
    }

    // Check if analysis already exists
    const existingAnalysis = await getAnalysis(companyId);
    if (existingAnalysis) {
      return NextResponse.json(existingAnalysis);
    }

    // TODO: Integrate with actual AI analysis service
    // For now, generate a mock analysis
    const mockAnalysis = {
      company_id: companyId,
      summary: `${companyName || 'This company'} shows promising market potential with strong growth indicators and competitive positioning in their sector.`,
      score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
      market_size: "$10B - $50B",
      growth_rate: "15-25%",
      competitive_landscape: "Moderate competition with clear differentiation opportunities",
      risks: "Market saturation, regulatory changes, economic downturn",
      opportunities: "International expansion, product diversification, strategic partnerships",
    };

    const analysis = await createAnalysis(mockAnalysis);
    return NextResponse.json(analysis, { status: 201 });
  } catch (error) {
    console.error("Error running analysis:", error);
    return NextResponse.json(
      { error: "Failed to run analysis" },
      { status: 500 }
    );
  }
} 