'use client'

import { useState, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Loader2, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

interface ImageUploadProps {
  value: string
  alt?: string
  onChangeUrl: (url: string) => void
  onChangeAlt?: (alt: string) => void
  bucket?: string
  folder?: string
  className?: string
}

export function ImageUpload({
  value,
  alt = '',
  onChangeUrl,
  onChangeAlt,
  bucket = 'articles',
  folder = 'images',
  className,
}: ImageUploadProps) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const MAX_SIZE = 5 * 1024 * 1024 // 5MB

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Seules les images sont acceptées')
      return
    }
    if (file.size > MAX_SIZE) {
      setError('L\'image ne doit pas dépasser 5 MB')
      return
    }

    setError(null)
    setUploading(true)

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { cacheControl: '31536000', upsert: false })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName)
    onChangeUrl(urlData.publicUrl)
    setUploading(false)
  }, [supabase, bucket, folder, onChangeUrl, MAX_SIZE])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) uploadFile(file)
  }, [uploadFile])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
    if (inputRef.current) inputRef.current.value = ''
  }, [uploadFile])

  const handleRemove = () => {
    onChangeUrl('')
    onChangeAlt?.('')
  }

  if (value) {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="relative group rounded-xl overflow-hidden border border-border bg-muted">
          <div className="aspect-[16/10] relative">
            <Image
              src={value}
              alt={alt || 'Preview'}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {onChangeAlt && (
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Texte alternatif (SEO)
            </label>
            <Input
              value={alt}
              onChange={(e) => onChangeAlt(e.target.value)}
              placeholder="Description de l'image pour le référencement..."
              className="bg-secondary/50 border-border text-foreground text-sm"
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        className={cn(
          'relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all duration-200',
          dragging
            ? 'border-primary bg-primary/5 scale-[1.01]'
            : 'border-border hover:border-primary/50 hover:bg-muted/50',
          uploading && 'pointer-events-none opacity-70'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {uploading ? (
          <>
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground font-medium">Upload en cours...</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Glissez une image ici
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                ou cliquez pour parcourir
              </p>
            </div>
            <span className="text-[11px] text-muted-foreground/60">
              JPG, PNG, WebP — 5 MB max
            </span>
          </>
        )}
      </div>

      {error && (
        <p className="text-xs text-destructive font-medium">{error}</p>
      )}

      {onChangeAlt && (
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Texte alternatif (SEO)
          </label>
          <Input
            value={alt}
            onChange={(e) => onChangeAlt(e.target.value)}
            placeholder="Description de l'image pour le référencement..."
            className="bg-secondary/50 border-border text-foreground text-sm"
          />
        </div>
      )}
    </div>
  )
}
