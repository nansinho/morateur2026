'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Message } from '@/lib/types/database'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Mail, MailOpen, Trash2, Search, Eye, Download } from 'lucide-react'
import { toast } from 'sonner'
import { downloadCSV } from '@/lib/export-csv'

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [selected, setSelected] = useState<Message | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const supabase = createClient()

  const fetchMessages = useCallback(async () => {
    let query = supabase.from('messages').select('*').order('created_at', { ascending: false })
    if (filter === 'unread') query = query.eq('is_read', false)
    if (filter === 'read') query = query.eq('is_read', true)
    const { data } = await query
    setMessages((data as Message[]) || [])
    setLoading(false)
  }, [supabase, filter])

  useEffect(() => { fetchMessages() }, [fetchMessages])

  const toggleRead = async (msg: Message) => {
    await supabase.from('messages').update({ is_read: !msg.is_read }).eq('id', msg.id)
    toast.success(msg.is_read ? 'Marqué comme non lu' : 'Marqué comme lu')
    fetchMessages()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await supabase.from('messages').delete().eq('id', deleteId)
    toast.success('Message supprimé')
    setDeleteId(null)
    fetchMessages()
  }

  const openMessage = async (msg: Message) => {
    setSelected(msg)
    if (!msg.is_read) {
      await supabase.from('messages').update({ is_read: true }).eq('id', msg.id)
      fetchMessages()
    }
  }

  const filtered = messages.filter((m) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      m.prenom.toLowerCase().includes(q) ||
      m.nom.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-foreground font-accent uppercase tracking-wide">Messages</h2>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => {
            if (filtered.length === 0) { toast.error('Aucun message à exporter'); return }
            downloadCSV('messages', ['Date', 'Prénom', 'Nom', 'Email', 'Téléphone', 'Statut', 'Motivations'], filtered.map(m => [
              new Date(m.created_at).toLocaleDateString('fr-FR'), m.prenom, m.nom, m.email, m.tel || '', m.is_read ? 'Lu' : 'Non lu', m.motivations || '',
            ]))
            toast.success(`${filtered.length} message(s) exporté(s)`)
          }} className="border-border text-muted-foreground hover:text-foreground">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-[200px] bg-card/50 border-border text-foreground placeholder:text-muted-foreground/50"
            />
          </div>
          <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <SelectTrigger className="w-[140px] bg-card/50 border-border text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all" className="text-foreground">Tous</SelectItem>
              <SelectItem value="unread" className="text-foreground">Non lus</SelectItem>
              <SelectItem value="read" className="text-foreground">Lus</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Statut</TableHead>
              <TableHead className="text-muted-foreground">Nom</TableHead>
              <TableHead className="text-muted-foreground hidden md:table-cell">Email</TableHead>
              <TableHead className="text-muted-foreground hidden lg:table-cell">Téléphone</TableHead>
              <TableHead className="text-muted-foreground hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-muted-foreground text-right">Actions</TableHead>
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
                  Aucun message trouvé
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((msg) => (
                <TableRow
                  key={msg.id}
                  className="border-border/50 hover:bg-secondary/20 cursor-pointer"
                  onClick={() => openMessage(msg)}
                >
                  <TableCell>
                    {msg.is_read ? (
                      <MailOpen className="w-4 h-4 text-muted-foreground/60" />
                    ) : (
                      <Badge variant="default" className="bg-campaign-lime/20 text-campaign-lime border-campaign-lime/30 text-[10px]">
                        Nouveau
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className={`font-medium ${msg.is_read ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {msg.prenom} {msg.nom}
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">{msg.email}</TableCell>
                  <TableCell className="text-muted-foreground hidden lg:table-cell">{msg.tel}</TableCell>
                  <TableCell className="text-muted-foreground/60 text-sm hidden sm:table-cell">
                    {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => openMessage(msg)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => toggleRead(msg)}>
                        {msg.is_read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteId(msg.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader>
            <DialogTitle>Message de {selected?.prenom} {selected?.nom}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Reçu le {selected && new Date(selected.created_at).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground/60 mb-1">Email</p>
                <p className="text-sm text-foreground">{selected?.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground/60 mb-1">Téléphone</p>
                <p className="text-sm text-foreground">{selected?.tel}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground/60 mb-1">Motivations</p>
              <p className="text-sm text-foreground/80 leading-relaxed bg-secondary/50 p-4 rounded-lg whitespace-pre-wrap">
                {selected?.motivations}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Supprimer ce message ?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Cette action est irréversible. Le message sera définitivement supprimé.
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
