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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

const navGroups = [
  {
    label: null,
    items: [
      { href: '/admin', icon: LayoutDashboard, label: 'Tableau de bord' },
    ],
  },
  {
    label: 'Contenu',
    items: [
      { href: '/admin/articles', icon: Newspaper, label: 'Articles' },
      { href: '/admin/programme', icon: BookOpen, label: 'Programme' },
      { href: '/admin/events', icon: CalendarDays, label: 'Événements' },
      { href: '/admin/press', icon: FileText, label: 'Presse' },
      { href: '/admin/team', icon: Users, label: 'Équipe' },
    ],
  },
  {
    label: 'Communication',
    items: [
      { href: '/admin/messages', icon: Mail, label: 'Messages' },
      { href: '/admin/consultations', icon: MessageSquareText, label: 'Consultations' },
      { href: '/admin/quartiers', icon: MapPin, label: 'Quartiers' },
    ],
  },
  {
    label: 'Outils',
    items: [
      { href: '/admin/seo', icon: Search, label: 'SEO' },
      { href: '/admin/export', icon: Download, label: 'Export données' },
    ],
  },
]

// Flat list for header title lookup
const allNavItems = navGroups.flatMap(g => g.items)

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (pathname !== '/admin/login') {
      document.documentElement.classList.add('admin-theme')
    }
    return () => {
      document.documentElement.classList.remove('admin-theme')
    }
  }, [pathname])

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

  const NavLink = ({ item }: { item: typeof allNavItems[0] }) => {
    const active = isActive(item.href)
    const link = (
      <Link
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={cn(
          "flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors duration-100",
          active
            ? "bg-sidebar-primary/15 text-sidebar-primary border-l-2 border-sidebar-primary pl-[10px]"
            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/40",
          collapsed && "justify-center px-2 border-l-0 pl-2"
        )}
      >
        <item.icon className={cn("w-4 h-4 flex-shrink-0", active && "text-sidebar-primary")} />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    )

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{link}</TooltipTrigger>
          <TooltipContent side="right" className="bg-card text-foreground border-border text-xs">
            {item.label}
          </TooltipContent>
        </Tooltip>
      )
    }

    return link
  }

  const SidebarContent = () => (
    <>
      {/* Branding */}
      <div className={cn("flex items-center gap-2.5 px-4 py-3", collapsed && "justify-center px-2")}>
        <div className="w-8 h-8 rounded-lg gradient-lime flex items-center justify-center flex-shrink-0">
          <span className="text-accent-foreground font-accent font-bold text-xs">M</span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-accent font-semibold text-sidebar-foreground text-[13px] truncate">Morateur 2026</p>
            <p className="text-[10px] text-sidebar-foreground/50 truncate">Administration</p>
          </div>
        )}
      </div>

      <div className="h-px bg-sidebar-border/40" />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-2">
        <nav>
          {navGroups.map((group, gi) => (
            <div key={gi}>
              {group.label && !collapsed && (
                <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 font-semibold px-3 pt-4 pb-1">
                  {group.label}
                </p>
              )}
              {group.label && collapsed && <div className="h-px bg-sidebar-border/30 mx-2 my-2" />}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      <div className="h-px bg-sidebar-border/40" />

      {/* Footer */}
      <div className={cn("px-2 py-2 space-y-0.5", collapsed && "px-1")}>
        <Link
          href="/"
          target="_blank"
          className={cn(
            "flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/40 transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Voir le site</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-red-300/90 hover:text-red-300 hover:bg-red-400/15 transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col border-r border-sidebar-border/40 bg-sidebar transition-all duration-200 fixed inset-y-0 left-0 z-30",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside className={cn(
        "lg:hidden fixed inset-y-0 left-0 z-50 w-[240px] flex flex-col border-r border-sidebar-border/40 bg-sidebar transition-transform duration-200",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-200",
        collapsed ? "lg:ml-[60px]" : "lg:ml-[240px]"
      )}>
        {/* Header */}
        <header className="h-12 border-b border-border/40 bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 lg:px-5 sticky top-0 z-20">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground hover:text-foreground h-8 w-8"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <h1 className="text-[13px] font-medium text-foreground/70 ml-2 lg:ml-0">
              {allNavItems.find(item => isActive(item.href))?.label || 'Administration'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground/50 font-medium hidden sm:block">Admin</span>
            <div className="w-7 h-7 rounded-full bg-campaign-lime/15 flex items-center justify-center">
              <span className="text-[11px] font-semibold text-campaign-lime">A</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-5 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
