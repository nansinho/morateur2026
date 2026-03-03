import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Page introuvable',
  description: 'La page que vous recherchez n\'existe pas ou a été déplacée. Retournez à l\'accueil de Morateur 2026.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <section className="min-h-screen gradient-teal-deep flex items-center justify-center pt-20">
        <div className="text-center px-6">
          <span className="font-accent text-[10rem] font-extrabold leading-none text-primary-foreground/5 select-none block">
            404
          </span>
          <h1 className="font-accent font-extrabold text-4xl text-primary-foreground uppercase tracking-tight -mt-16 mb-4">
            Page introuvable
          </h1>
          <p className="text-primary-foreground/60 text-lg mb-8 max-w-md mx-auto">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex gradient-lime text-accent-foreground px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/contact"
              className="inline-flex border border-primary-foreground/20 text-primary-foreground/70 px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:border-primary-foreground/40 hover:text-primary-foreground transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
