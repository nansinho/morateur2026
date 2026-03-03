'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main>
      <Navbar />
      <section className="min-h-screen gradient-teal-deep flex items-center justify-center pt-20">
        <div className="text-center px-6">
          <span className="font-accent text-[8rem] sm:text-[10rem] font-extrabold leading-none text-primary-foreground/5 select-none block">
            Oops
          </span>
          <h1 className="font-accent font-extrabold text-4xl text-primary-foreground uppercase tracking-tight -mt-12 sm:-mt-16 mb-4">
            Erreur
          </h1>
          <p className="text-primary-foreground/60 text-lg mb-8 max-w-md mx-auto">
            Une erreur est survenue. Veuillez réessayer.
          </p>
          <button
            onClick={reset}
            className="gradient-lime text-accent-foreground px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
          >
            Réessayer
          </button>
        </div>
      </section>
      <Footer />
    </main>
  )
}
