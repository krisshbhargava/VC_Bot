import { NextRequest, NextResponse } from 'next/server'
import { createPipeline, getPipelines } from '@/lib/database'
import { createServerClient } from '@/lib/server-auth'

export async function GET() {
  try {
    const supabase = await createServerClient()
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get pipelines for the authenticated user
    const pipelines = await getPipelines(user.id)
    return NextResponse.json(pipelines)
  } catch (error) {
    console.error('Error fetching pipelines:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pipelines' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, arrMin, arrMax, teamMin, teamMax, locations, tags } = body

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Pipeline name is required' },
        { status: 400 }
      )
    }

    const pipeline = await createPipeline({
      user_id: user.id,
      name: name.trim(),
      arr_min: arrMin || null,
      arr_max: arrMax || null,
      team_min: teamMin ? parseInt(teamMin) : null,
      team_max: teamMax ? parseInt(teamMax) : null,
      locations: locations || [],
      tags: tags || [],
    })

    return NextResponse.json(pipeline, { status: 201 })
  } catch (error) {
    console.error('Error creating pipeline:', error)
    return NextResponse.json(
      { error: 'Failed to create pipeline' },
      { status: 500 }
    )
  }
} 