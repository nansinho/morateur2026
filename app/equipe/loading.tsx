import { Skeleton } from '@/components/ui/skeleton'

export default function EquipeLoading() {
  return (
    <main className="min-h-screen gradient-teal-deep">
      <div className="h-20" />
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-28">
        <Skeleton className="h-10 w-48 mb-3 bg-primary-foreground/10" />
        <Skeleton className="h-16 w-64 mb-12 bg-primary-foreground/10" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <Skeleton className="w-32 h-32 rounded-full bg-primary-foreground/10" />
              <Skeleton className="h-5 w-28 bg-primary-foreground/10" />
              <Skeleton className="h-4 w-36 bg-primary-foreground/10" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
