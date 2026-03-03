import { Skeleton } from '@/components/ui/skeleton'

export default function PresseLoading() {
  return (
    <main className="min-h-screen gradient-teal-deep">
      <div className="h-20" />
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-28">
        <Skeleton className="h-10 w-48 mb-3 bg-primary-foreground/10" />
        <Skeleton className="h-16 w-64 mb-12 bg-primary-foreground/10" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-2xl p-6 bg-primary-foreground/[0.04] flex gap-6">
              <Skeleton className="w-16 h-16 rounded-xl bg-primary-foreground/10 shrink-0" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4 bg-primary-foreground/10" />
                <Skeleton className="h-4 w-1/2 bg-primary-foreground/10" />
                <Skeleton className="h-4 w-24 bg-primary-foreground/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
