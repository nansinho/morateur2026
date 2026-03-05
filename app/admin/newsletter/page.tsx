'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { NewsletterSubscriber } from '@/lib/types/database'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, MoreHorizontal, Trash2, UserX, UserCheck, Mail, Users } from 'lucide-react'
import { toast } from 'sonner'

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const supabase = createClient()

  const fetchSubscribers = useCallback(async () => {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false })

    if (error) {
      console.error('[NEWSLETTER ADMIN] Fetch error:', error)
      toast.error('Erreur lors du chargement des abonnés')
    }
    setSubscribers((data as NewsletterSubscriber[]) || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchSubscribers() }, [fetchSubscribers])

  const toggleActive = async (sub: NewsletterSubscriber) => {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ is_active: !sub.is_active })
      .eq('id', sub.id)

    if (error) {
      toast.error('Erreur lors de la mise à jour')
      return
    }
    toast.success(sub.is_active ? 'Abonné désactivé' : 'Abonné réactivé')
    fetchSubscribers()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', deleteId)

    if (error) {
      toast.error('Erreur lors de la suppression')
      return
    }
    toast.success('Abonné supprimé')
    setDeleteId(null)
    fetchSubscribers()
  }

  const filtered = subscribers.filter((s) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      s.email.toLowerCase().includes(q) ||
      (s.first_name?.toLowerCase().includes(q) ?? false)
    )
  })

  const activeCount = subscribers.filter(s => s.is_active).length
  const totalCount = subscribers.length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground font-accent uppercase tracking-wide">Newsletter</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {totalCount === 0 ? 'Aucun abonné' : (
              <>
                <span className="text-campaign-lime font-medium">{activeCount}</span> abonné{activeCount > 1 ? 's' : ''} actif{activeCount > 1 ? 's' : ''}
                {totalCount !== activeCount && (
                  <> · {totalCount - activeCount} désactivé{totalCount - activeCount > 1 ? 's' : ''}</>
                )}
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-[200px] bg-card/50 border-border text-foreground placeholder:text-muted-foreground/50"
            />
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-border/50 bg-card/30 p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Users className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Total</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalCount}</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card/30 p-4">
          <div className="flex items-center gap-2 text-campaign-lime mb-1">
            <UserCheck className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Actifs</span>
          </div>
          <p className="text-2xl font-bold text-campaign-lime">{activeCount}</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card/30 p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Mail className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Brevo</span>
          </div>
          <p className="text-xs text-muted-foreground/70 mt-1">Synchronisé automatiquement</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Statut</TableHead>
              <TableHead className="text-muted-foreground">Email</TableHead>
              <TableHead className="text-muted-foreground hidden md:table-cell">Prénom</TableHead>
              <TableHead className="text-muted-foreground hidden sm:table-cell">Inscrit le</TableHead>
              <TableHead className="text-muted-foreground hidden lg:table-cell">Consentement</TableHead>
              <TableHead className="text-muted-foreground text-right w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-border/50">
                  <TableCell colSpan={6}><div className="h-8 bg-secondary/30 rounded animate-pulse" /></TableCell>
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow className="border-border/50">
                <TableCell colSpan={6} className="text-center text-muted-foreground/60 py-8">
                  Aucun abonné trouvé
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((sub) => (
                <TableRow key={sub.id} className="border-border/50 hover:bg-secondary/20">
                  <TableCell>
                    {sub.is_active ? (
                      <Badge variant="default" className="bg-campaign-lime/20 text-campaign-lime border-campaign-lime/30 text-[10px]">
                        Actif
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">
                        Inactif
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{sub.email}</TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">
                    {sub.first_name || '—'}
                  </TableCell>
                  <TableCell className="text-muted-foreground/60 text-sm hidden sm:table-cell">
                    {new Date(sub.subscribed_at).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-muted-foreground/60 text-sm hidden lg:table-cell">
                    {sub.consent_date
                      ? new Date(sub.consent_date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                      : '—'
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem onClick={() => toggleActive(sub)}>
                          {sub.is_active ? (
                            <><UserX className="w-4 h-4 mr-2" /> Désactiver</>
                          ) : (
                            <><UserCheck className="w-4 h-4 mr-2" /> Réactiver</>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteId(sub.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Supprimer cet abonné ?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Cette action est irréversible. L&apos;abonné sera définitivement supprimé de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary text-foreground border-border hover:bg-secondary">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 text-foreground">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
