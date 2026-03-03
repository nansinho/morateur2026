'use client'

import { useState } from 'react'
import { Facebook, Twitter, MessageCircle, Link2, Check } from 'lucide-react'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const links = [
    {
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: 'Partager sur Facebook',
      bg: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: 'Partager sur X',
      bg: 'bg-black hover:bg-gray-800',
    },
    {
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      label: 'Partager sur WhatsApp',
      bg: 'bg-green-600 hover:bg-green-700',
    },
  ]

  return (
    <div className="flex items-center gap-2">
      {links.map(({ icon: Icon, href, label, bg }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`${bg} text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors`}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Copier le lien"
        className="bg-gray-100 text-gray-500 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  )
}
