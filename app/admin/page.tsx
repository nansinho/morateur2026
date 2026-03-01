'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Newspaper, CalendarDays, Users, FileText, Eye, MailOpen, BookOpen } from 'lucide-react'
import Link from 'next/link'
import type { Message } from '@/lib/types/database'

interface Stats {
  messages: number
  unreadMessages: number
  articles: number
  events: number
  team: number
  press: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ messages: 0, unreadMessages: 0, articles: 0, events: 0, team: 0, press: 0 })
  const [recentMessages, setRecentMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: messagesCount },
        { count: unreadCount },
        { count: articlesCount },
        { count: eventsCount },
        { count: teamCount },
        { count: pressCount },
        { data: recent },
      ] = await Promise.all([
        supabase.from('messages').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('team_members').select('*', { count: 'exact', head: true }),
        supabase.from('press_articles').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(5),
      ])

      setStats({
        messages: messagesCount ?? 0,
        unreadMessages: unreadCount ?? 0,
        articles: articlesCount ?? 0,
        events: eventsCount ?? 0,
        team: teamCount ?? 0,
        press: pressCount ?? 0,
      })
      setRecentMessages((recent as Message[]) || [])
      setLoading(false)
    }

    fetchStats()
  }, [supabase])

  const statCards = [
    { label: 'Messages', value: stats.messages, sub: `${stats.unreadMessages} non lu(s)`, icon: Mail, href: '/admin/messages', color: 'from-blue-500 to-cyan-500' },
    { label: 'Articles', value: stats.articles, icon: Newspaper, href: '/admin/articles', color: 'from-emerald-500 to-teal-500' },
    { label: 'Programme', value: '3 piliers', icon: BookOpen, href: '/admin/programme', color: 'from-violet-500 to-purple-500' },
    { label: 'Événements', value: stats.events, icon: CalendarDays, href: '/admin/events', color: 'from-orange-500 to-amber-500' },
    { label: 'Équipe', value: stats.team, icon: Users, href: '/admin/team', color: 'from-pink-500 to-rose-500' },
    { label: 'Presse', value: stats.press, icon: FileText, href: '/admin/press', color: 'from-indigo-500 to-blue-500' },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Tableau de bord</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-slate-800/50 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Tableau de bord</h2>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/80 transition-colors cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400 font-medium">{card.label}</p>
                    <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
                    {card.sub && <p className="text-xs text-slate-500 mt-1">{card.sub}</p>}
                  </div>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent messages */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-lg">Derniers messages</CardTitle>
          <Link href="/admin/messages" className="text-sm text-teal-400 hover:text-teal-300 font-medium">
            Voir tout →
          </Link>
        </CardHeader>
        <CardContent>
          {recentMessages.length === 0 ? (
            <p className="text-slate-500 text-sm py-4 text-center">Aucun message reçu</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.is_read ? 'bg-slate-600/50' : 'bg-teal-500/20'}`}>
                    {msg.is_read ? <MailOpen className="w-4 h-4 text-slate-400" /> : <Mail className="w-4 h-4 text-teal-400" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white truncate">
                        {msg.prenom} {msg.nom}
                      </p>
                      {!msg.is_read && (
                        <span className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">{msg.email}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{msg.motivations}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 flex-shrink-0">
                    {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
