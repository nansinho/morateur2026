'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, Loader2, ImageIcon, Link } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Image from 'next/image'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  className?: string
}

export default function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Seules les images sont acceptées')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Taille maximale : 5 Mo')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur upload')
      onChange(data.url)
      toast.success('Image importée')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur lors de l\'upload')
    } finally {
      setUploading(false)
    }
  }, [onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }, [handleUpload])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
    e.target.value = ''
  }

  if (value && !showUrlInput) {
    return (
      <div className={`relative group rounded-xl overflow-hidden border border-border/50 bg-secondary/30 ${className || ''}`}>
        <div className="relative w-full h-32">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-8 text-xs"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-3 h-3 mr-1" />
            Changer
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-8 text-xs"
            onClick={() => { onChange(''); setShowUrlInput(false) }}
          >
            <X className="w-3 h-3 mr-1" />
            Retirer
          </Button>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
    )
  }

  return (
    <div className={className}>
      {showUrlInput ? (
        <div className="flex items-center gap-2">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-secondary/50 border-border text-foreground flex-1"
            placeholder="https://... ou /images/..."
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground flex-shrink-0"
            onClick={() => setShowUrlInput(false)}
            title="Importer un fichier"
          >
            <Upload className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`
            relative flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed transition-colors cursor-pointer
            ${dragOver ? 'border-campaign-lime bg-campaign-lime/5' : 'border-border/50 hover:border-muted-foreground/40 bg-secondary/20'}
            ${uploading ? 'pointer-events-none opacity-60' : ''}
          `}
          onClick={() => !uploading && fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-campaign-lime animate-spin" />
          ) : (
            <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
          )}
          <p className="text-xs text-muted-foreground/60 text-center">
            {uploading ? 'Import en cours...' : 'Glisser une image ou cliquer pour importer'}
          </p>
          <button
            type="button"
            className="text-[10px] text-muted-foreground/40 hover:text-muted-foreground underline"
            onClick={(e) => { e.stopPropagation(); setShowUrlInput(true) }}
          >
            <Link className="w-3 h-3 inline mr-1" />
            Coller une URL
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>
      )}
    </div>
  )
}
