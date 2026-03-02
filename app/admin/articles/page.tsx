'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Article } from '@/lib/types/database'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus, Newspaper, CalendarDays, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const tagColors: Record<string, string> = {
  'Événement': 'bg-campaign-lime/15 text-campaign-lime border-campaign-lime/30',
  'Terrain': 'bg-primary/30 text-primary-foreground border-primary/40',
  'Programme': 'bg-campaign-olive/20 text-campaign-olive border-campaign-olive/30',
  'Tribune': 'bg-campaign-steel/30 text-campaign-teal-light border-campaign-steel/40',
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const fetchArticles = useCallback(async () => {
    const { data } = await supabase.from('articles').select('*').order('sort_order')
    setArticles((data as Article[]) || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchArticles() }, [fetchArticles])

  const handleDelete = async () => {
    if (!deleteId) return
    await supabase.from('articles').delete().eq('id', deleteId)
    toast.success('Article supprimé')
    setDeleteId(null)
    fetchArticles()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground font-accent uppercase tracking-wide">
          Articles & Actualités
        </h2>
        <Link href="/admin/articles/new">
          <Button className="gradient-lime text-accent-foreground font-accent font-bold">
            <Plus className="w-4 h-4 mr-2" /> Nouvel article
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border/40 bg-card overflow-hidden animate-pulse">
              <div className="aspect-[16/10] bg-secondary" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-secondary rounded w-3/4" />
                <div className="h-3 bg-secondary rounded w-1/2" />
                <div className="h-3 bg-secondary rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Newspaper className="w-7 h-7 text-primary" />
          </div>
          <p className="text-foreground font-semibold mb-1">Aucun article</p>
          <p className="text-sm text-muted-foreground mb-4">Créez votre premier article pour commencer.</p>
          <Link href="/admin/articles/new">
            <Button className="gradient-lime text-accent-foreground font-accent font-bold">
              <Plus className="w-4 h-4 mr-2" /> Créer un article
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="group relative rounded-xl border border-border/40 bg-card overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              onClick={() => router.push(`/admin/articles/${article.id}`)}
            >
              {/* Image */}
              <div className="aspect-[16/10] relative overflow-hidden">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.image_alt || article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-sidebar flex items-center justify-center">
                    <Newspaper className="w-10 h-10 text-sidebar-foreground/30" />
                  </div>
                )}
                {/* Tag badge overlay */}
                <div className="absolute bottom-2 left-2">
                  <Badge
                    variant="outline"
                    className={`text-[11px] backdrop-blur-sm ${tagColors[article.tag] || 'text-muted-foreground bg-background/80'}`}
                  >
                    {article.tag}
                  </Badge>
                </div>
                {/* Dropdown menu */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white border-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem onClick={() => router.push(`/admin/articles/${article.id}`)}>
                        <Pencil className="w-4 h-4 mr-2" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteId(article.id)}>
                        <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-1.5">
                <h3 className="font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <CalendarDays className="w-3 h-3" />
                  <span className="text-xs">{article.date}</span>
                </div>
                {article.description && (
                  <p className="text-xs text-muted-foreground/70 line-clamp-2 mt-1">
                    {article.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Supprimer cet article ?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary text-foreground border-border hover:bg-secondary">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 text-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
