'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Newspaper, CalendarDays, Users, FileText, BookOpen, PenLine, Plus, Eye, ArrowRight } from 'lucide-react'
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

const quickLinks = [
  { href: '/admin/articles', icon: PenLine, label: 'Nouvel article' },
  { href: '/admin/events', icon: Plus, label: 'Créer un événement' },
  { href: '/admin/messages', icon: Mail, label: 'Lire les messages' },
  { href: '/', icon: Eye, label: 'Voir le site public', external: true },
]

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
    { label: 'Messages', value: stats.messages, sub: `${stats.unreadMessages} non lu(s)`, icon: Mail, href: '/admin/messages', accent: 'border-l-campaign-lime' },
    { label: 'Articles', value: stats.articles, icon: Newspaper, href: '/admin/articles', accent: 'border-l-campaign-teal' },
    { label: 'Programme', value: '3 piliers', icon: BookOpen, href: '/admin/programme', accent: 'border-l-campaign-teal-light' },
    { label: 'Événements', value: stats.events, icon: CalendarDays, href: '/admin/events', accent: 'border-l-blue-400' },
    { label: 'Équipe', value: stats.team, icon: Users, href: '/admin/team', accent: 'border-l-campaign-steel' },
    { label: 'Presse', value: stats.press, icon: FileText, href: '/admin/press', accent: 'border-l-purple-400' },
  ]

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="h-5 w-40 rounded bg-card/50 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[76px] rounded-lg bg-card/50 animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="h-64 rounded-lg bg-card/50 animate-pulse lg:col-span-2" />
          <div className="h-64 rounded-lg bg-card/50 animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-lg font-accent font-semibold text-foreground">Tableau de bord</h2>
        <p className="text-[13px] text-muted-foreground/60 mt-0.5">Vue d&#39;ensemble de votre campagne</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card className={`bg-card/60 border-border/40 hover:bg-card/80 transition-colors duration-150 cursor-pointer rounded-lg border-l-2 ${card.accent}`}>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-md bg-secondary/60 flex items-center justify-center">
                    <card.icon className="w-3.5 h-3.5 text-muted-foreground/60" />
                  </div>
                  <p className="text-[11px] text-muted-foreground/60 font-medium truncate">{card.label}</p>
                </div>
                <p className="text-xl font-accent font-semibold text-foreground pl-0.5">{card.value}</p>
                {card.sub && (
                  <p className="text-[10px] text-campaign-lime/70 mt-0.5 pl-0.5">{card.sub}</p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Bottom row: Messages + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Recent messages */}
        <Card className="bg-card/60 border-border/40 rounded-lg lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
            <CardTitle className="text-[13px] font-semibold text-foreground">Derniers messages</CardTitle>
            <Link href="/admin/messages" className="text-[11px] text-campaign-lime/80 hover:text-campaign-lime font-medium flex items-center gap-1">
              Voir tout <ArrowRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {recentMessages.length === 0 ? (
              <p className="text-muted-foreground/50 text-xs py-6 text-center">Aucun message reçu</p>
            ) : (
              <div>
                {/* Table header */}
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[200px_1fr_80px] gap-2 px-4 py-1.5 border-b border-border/30">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40 font-semibold">Expéditeur</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40 font-semibold hidden sm:block">Message</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40 font-semibold text-right">Date</span>
                </div>
                {/* Rows */}
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[200px_1fr_80px] gap-2 px-4 py-2.5 border-b border-border/20 last:border-0 hover:bg-secondary/15 transition-colors">
                    <div className="flex items-center gap-2 min-w-0">
                      {!msg.is_read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-campaign-lime flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-foreground truncate">{msg.prenom} {msg.nom}</p>
                        <p className="text-[10px] text-muted-foreground/50 truncate">{msg.email}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground/50 truncate hidden sm:block self-center">{msg.motivations}</p>
                    <span className="text-[10px] text-muted-foreground/40 text-right self-center whitespace-nowrap">
                      {new Date(msg.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card/60 border-border/40 rounded-lg">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-[13px] font-semibold text-foreground">Accès rapide</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 space-y-0.5">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-secondary/40 transition-colors text-[13px] text-muted-foreground/70 hover:text-foreground"
              >
                <div className="w-7 h-7 rounded-md bg-secondary/50 flex items-center justify-center">
                  <link.icon className="w-3.5 h-3.5" />
                </div>
                {link.label}
              </Link>
            ))}

            <div className="h-px bg-border/30 my-2" />

            <div className="px-2.5 pt-1">
              <p className="text-[10px] text-muted-foreground/30 uppercase tracking-wider font-semibold mb-2">Résumé</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground/50">Messages non lus</span>
                  <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-campaign-lime/10 text-campaign-lime border-0 font-semibold">
                    {stats.unreadMessages}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground/50">Total articles</span>
                  <span className="text-foreground/70 font-medium">{stats.articles}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground/50">Membres équipe</span>
                  <span className="text-foreground/70 font-medium">{stats.team}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
