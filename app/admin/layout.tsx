import { AdminLayoutClient } from './admin-layout-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Administration | Morateur 2026',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
