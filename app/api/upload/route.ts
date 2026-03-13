import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: 'Format non supporté' }, { status: 400 })
  }

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const filePath = `uploads/${fileName}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  // Creer le bucket s'il n'existe pas (idempotent)
  await supabase.storage.createBucket('images', { public: true }).catch(() => {})

  const { error } = await supabase.storage
    .from('images')
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(filePath)

  return NextResponse.json({ url: urlData.publicUrl })
}
