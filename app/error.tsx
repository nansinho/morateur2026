'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-screen items-center justify-center gradient-teal-deep">
      <div className="text-center px-6">
        <h1 className="font-accent font-extrabold text-primary-foreground text-4xl uppercase tracking-tight mb-4">
          Erreur
        </h1>
        <p className="text-primary-foreground/60 mb-8 max-w-md mx-auto">
          Une erreur est survenue. Veuillez réessayer.
        </p>
        <button
          onClick={reset}
          className="gradient-lime text-accent-foreground px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
        >
          Réessayer
        </button>
      </div>
    </main>
  )
}
