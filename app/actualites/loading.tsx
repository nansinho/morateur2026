import { Skeleton } from '@/components/ui/skeleton'

export default function ActualitesLoading() {
  return (
    <main className="min-h-screen gradient-teal-deep">
      <div className="h-20" />
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-28">
        <Skeleton className="h-10 w-48 mb-3 bg-primary-foreground/10" />
        <Skeleton className="h-16 w-72 mb-12 bg-primary-foreground/10" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-primary-foreground/[0.04]">
              <Skeleton className="h-48 w-full bg-primary-foreground/10" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-4 w-20 bg-primary-foreground/10" />
                <Skeleton className="h-6 w-full bg-primary-foreground/10" />
                <Skeleton className="h-4 w-3/4 bg-primary-foreground/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
