'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import {
  LayoutDashboard, Mail, Newspaper, BookOpen, CalendarDays,
  Users, FileText, Search, LogOut, ExternalLink, ChevronLeft, ChevronRight, Menu,
  MessageSquareText, MapPin, Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Tableau de bord' },
  { href: '/admin/messages', icon: Mail, label: 'Messages' },
  { href: '/admin/consultations', icon: MessageSquareText, label: 'Consultations' },
  { href: '/admin/quartiers', icon: MapPin, label: 'Quartiers' },
  { href: '/admin/export', icon: Download, label: 'Export' },
  { href: '/admin/articles', icon: Newspaper, label: 'Articles' },
  { href: '/admin/programme', icon: BookOpen, label: 'Programme' },
  { href: '/admin/events', icon: CalendarDays, label: 'Événements' },
  { href: '/admin/team', icon: Users, label: 'Équipe' },
  { href: '/admin/press', icon: FileText, label: 'Presse' },
  { href: '/admin/seo', icon: Search, label: 'SEO' },
]

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const SidebarContent = () => (
    <>
      <div className={cn("flex items-center gap-3 px-4 py-5", collapsed && "justify-center px-2")}>
        <div className="w-9 h-9 rounded-xl gradient-lime flex items-center justify-center flex-shrink-0">
          <span className="text-accent-foreground font-accent font-bold text-sm">M</span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-accent font-bold text-foreground text-sm truncate">Morateur 2026</p>
            <p className="text-[11px] text-muted-foreground/60 truncate">Administration</p>
          </div>
        )}
      </div>

      <Separator className="bg-border/50" />

      <ScrollArea className="flex-1 px-2 py-3">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href)
            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-campaign-lime/15 text-campaign-lime"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", active && "text-campaign-lime")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" className="bg-card text-foreground border-border">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return linkContent
          })}
        </nav>
      </ScrollArea>

      <Separator className="bg-border/50" />

      <div className={cn("px-2 py-3 space-y-1", collapsed && "px-1")}>
        <Link
          href="/"
          target="_blank"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all",
            collapsed && "justify-center px-2"
          )}
        >
          <ExternalLink className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Voir le site</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={cn(
        "hidden lg:flex flex-col border-r border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-200 fixed inset-y-0 left-0 z-30",
        collapsed ? "w-[68px]" : "w-[250px]"
      )}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-7 w-6 h-6 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={cn(
        "lg:hidden fixed inset-y-0 left-0 z-50 w-[250px] flex flex-col border-r border-border/50 bg-card transition-transform duration-200",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      <div className={cn(
        "flex-1 flex flex-col transition-all duration-200",
        collapsed ? "lg:ml-[68px]" : "lg:ml-[250px]"
      )}>
        <header className="h-14 border-b border-border/50 bg-card/30 backdrop-blur-sm flex items-center px-4 lg:px-6 sticky top-0 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-sm font-accent font-semibold text-foreground/80 ml-2 lg:ml-0 uppercase tracking-wider">
            {navItems.find(item => isActive(item.href))?.label || 'Administration'}
          </h1>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
