import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { rateLimit } from '@/lib/rate-limit'

export async function GET() {
  try {
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    const { success: allowed } = rateLimit(ip, 30, 60_000)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Trop de requêtes.' },
        { status: 429 }
      )
    }

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
