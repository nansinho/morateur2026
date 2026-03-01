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
import { Mail, MailOpen, Trash2, Search, Eye } from 'lucide-react'
import { toast } from 'sonner'

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
        <h2 className="text-2xl font-bold text-white">Messages</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-[200px] bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
          <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-white">Tous</SelectItem>
              <SelectItem value="unread" className="text-white">Non lus</SelectItem>
              <SelectItem value="read" className="text-white">Lus</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700/50 hover:bg-transparent">
              <TableHead className="text-slate-400">Statut</TableHead>
              <TableHead className="text-slate-400">Nom</TableHead>
              <TableHead className="text-slate-400 hidden md:table-cell">Email</TableHead>
              <TableHead className="text-slate-400 hidden lg:table-cell">Téléphone</TableHead>
              <TableHead className="text-slate-400 hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-slate-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-slate-700/50">
                  <TableCell colSpan={6}><div className="h-8 bg-slate-700/30 rounded animate-pulse" /></TableCell>
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow className="border-slate-700/50">
                <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                  Aucun message trouvé
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((msg) => (
                <TableRow
                  key={msg.id}
                  className="border-slate-700/50 hover:bg-slate-700/20 cursor-pointer"
                  onClick={() => openMessage(msg)}
                >
                  <TableCell>
                    {msg.is_read ? (
                      <MailOpen className="w-4 h-4 text-slate-500" />
                    ) : (
                      <Badge variant="default" className="bg-teal-500/20 text-teal-400 border-teal-500/30 text-[10px]">
                        Nouveau
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className={`font-medium ${msg.is_read ? 'text-slate-400' : 'text-white'}`}>
                    {msg.prenom} {msg.nom}
                  </TableCell>
                  <TableCell className="text-slate-400 hidden md:table-cell">{msg.email}</TableCell>
                  <TableCell className="text-slate-400 hidden lg:table-cell">{msg.tel}</TableCell>
                  <TableCell className="text-slate-500 text-sm hidden sm:table-cell">
                    {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white" onClick={() => openMessage(msg)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white" onClick={() => toggleRead(msg)}>
                        {msg.is_read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300" onClick={() => setDeleteId(msg.id)}>
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
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>Message de {selected?.prenom} {selected?.nom}</DialogTitle>
            <DialogDescription className="text-slate-400">
              Reçu le {selected && new Date(selected.created_at).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <p className="text-sm text-white">{selected?.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Téléphone</p>
                <p className="text-sm text-white">{selected?.tel}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Motivations</p>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-700/50 p-4 rounded-lg whitespace-pre-wrap">
                {selected?.motivations}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Supprimer ce message ?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Cette action est irréversible. Le message sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-500 text-white">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
