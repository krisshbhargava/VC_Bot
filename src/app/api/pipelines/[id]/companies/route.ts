import { NextRequest, NextResponse } from 'next/server'
import { getCompanies, createCompany } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const companies = await getCompanies(id)
    return NextResponse.json(companies)
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json()
    const { name, arr, teamSize, location, description, website, status } = body

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      )
    }

    const company = await createCompany({
      name: name.trim(),
      pipeline_id: id,
      arr: arr || null,
      team_size: teamSize ? parseInt(teamSize) : null,
      location: location || null,
      description: description || null,
      website: website || null,
      status: status || 'researching',
      notes: null,
    })

    return NextResponse.json(company, { status: 201 })
  } catch (error) {
    console.error('Error creating company:', error)
    return NextResponse.json(
      { error: 'Failed to create company' },
      { status: 500 }
    )
  }
} 