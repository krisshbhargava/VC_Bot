import { NextRequest, NextResponse } from 'next/server'
import { getPipeline, updatePipeline, deletePipeline } from '@/lib/database'
import { createServerClient } from '@/lib/server-auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

    const pipeline = await getPipeline(id)
    
    // Check if the pipeline belongs to the authenticated user
    if (pipeline.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Pipeline not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(pipeline)
  } catch (error) {
    console.error('Error fetching pipeline:', error)
    return NextResponse.json(
      { error: 'Pipeline not found' },
      { status: 404 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

    // First get the pipeline to check ownership
    const existingPipeline = await getPipeline(id)
    if (existingPipeline.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Pipeline not found' },
        { status: 404 }
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

    const pipeline = await updatePipeline(id, {
      name: name.trim(),
      arr_min: arrMin || null,
      arr_max: arrMax || null,
      team_min: teamMin ? parseInt(teamMin) : null,
      team_max: teamMax ? parseInt(teamMax) : null,
      locations: locations || [],
      tags: tags || [],
    })

    return NextResponse.json(pipeline)
  } catch (error) {
    console.error('Error updating pipeline:', error)
    return NextResponse.json(
      { error: 'Failed to update pipeline' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

    // First get the pipeline to check ownership
    const existingPipeline = await getPipeline(id)
    if (existingPipeline.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Pipeline not found' },
        { status: 404 }
      )
    }

    await deletePipeline(id)
    return NextResponse.json({ message: 'Pipeline deleted successfully' })
  } catch (error) {
    console.error('Error deleting pipeline:', error)
    return NextResponse.json(
      { error: 'Failed to delete pipeline' },
      { status: 500 }
    )
  }
} 