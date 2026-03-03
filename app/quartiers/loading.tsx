import { Skeleton } from '@/components/ui/skeleton'

export default function QuartiersLoading() {
  return (
    <main className="min-h-screen gradient-teal-deep">
      <div className="h-20" />
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-28">
        <Skeleton className="h-10 w-48 mb-3 bg-primary-foreground/10" />
        <Skeleton className="h-16 w-72 mb-12 bg-primary-foreground/10" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl bg-primary-foreground/10" />
          ))}
        </div>
      </div>
    </main>
  )
}
