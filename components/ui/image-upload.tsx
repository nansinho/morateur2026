'use client'

import { useState, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Loader2, Link2, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlDraft, setUrlDraft] = useState('')
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

  const handleUrlSubmit = () => {
    const url = urlDraft.trim()
    if (!url) return
    if (!url.startsWith('http') && !url.startsWith('/')) {
      setError('URL invalide')
      return
    }
    setError(null)
    onChangeUrl(url)
    setShowUrlInput(false)
    setUrlDraft('')
  }

  const openUrlInput = () => {
    setUrlDraft(value || '')
    setShowUrlInput(true)
  }

  const fileName = value ? value.split('/').pop() || '' : ''

  return (
    <div className={cn('space-y-3', className)}>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Image preview with actions */}
      {value && !showUrlInput && (
        <div className="space-y-2">
          <div
            className="relative group rounded-xl overflow-hidden border border-border bg-muted"
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <div className="aspect-[16/10] relative">
              <Image
                src={value}
                alt={alt || 'Preview'}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Drag overlay */}
            {dragging && (
              <div className="absolute inset-0 bg-primary/20 border-2 border-primary rounded-xl flex items-center justify-center z-20">
                <p className="text-sm font-medium text-primary bg-white/90 px-3 py-1.5 rounded-lg">
                  Déposer pour remplacer
                </p>
              </div>
            )}

            {/* Upload loading overlay */}
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}

            {/* Hover actions overlay */}
            {!dragging && !uploading && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => inputRef.current?.click()}
                  className="text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  Changer
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleRemove}
                  className="text-xs text-destructive hover:text-destructive"
                >
                  <X className="w-3.5 h-3.5 mr-1.5" />
                  Retirer
                </Button>
              </div>
            )}
          </div>

          {/* Always-visible action bar */}
          <div className="flex items-center justify-between gap-2 px-1">
            <span className="text-[11px] text-muted-foreground truncate max-w-[180px]" title={fileName}>
              {fileName}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={openUrlInput}
                className="p-1 rounded hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                title="Modifier l'URL"
              >
                <Link2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="p-1 rounded hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                title="Remplacer l'image"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                title="Retirer l'image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* URL input mode */}
      {showUrlInput && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleUrlSubmit(); if (e.key === 'Escape') { setShowUrlInput(false); setUrlDraft('') } }}
              placeholder="https://example.com/image.jpg"
              className="bg-secondary/50 border-border text-foreground text-sm flex-1"
              autoFocus
            />
            <Button type="button" size="sm" onClick={handleUrlSubmit}>
              OK
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setShowUrlInput(false); setUrlDraft('') }}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Collez l&apos;URL d&apos;une image, puis validez avec OK ou Entrée
          </p>
        </div>
      )}

      {/* Drop zone (no image set) */}
      {!value && !showUrlInput && (
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
      )}

      {/* Paste URL link (when no image and not in URL mode) */}
      {!value && !showUrlInput && !uploading && (
        <button
          type="button"
          className="text-[11px] text-muted-foreground/60 hover:text-muted-foreground underline flex items-center gap-1"
          onClick={openUrlInput}
        >
          <Link2 className="w-3 h-3" />
          Coller une URL
        </button>
      )}

      {/* Error message */}
      {error && (
        <p className="text-xs text-destructive font-medium">{error}</p>
      )}

      {/* Alt text input */}
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
