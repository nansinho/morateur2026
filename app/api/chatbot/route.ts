import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('chatbot_entries')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (error) {
      console.error('[CHATBOT] Supabase error:', error)
      return NextResponse.json({ entries: [] })
    }

    return NextResponse.json({ entries: data || [] })
  } catch {
    return NextResponse.json({ entries: [] })
  }
}
