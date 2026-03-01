export function getPressStyle(source: string) {
  const s = source.toLowerCase()
  if (s.includes('marseillaise')) {
    return {
      bg: 'bg-primary',
      text: 'text-primary-foreground',
      accent: 'text-primary-foreground/60',
      tagBg: 'bg-campaign-lime/20',
      tagText: 'text-campaign-lime',
      linkColor: 'text-campaign-lime',
      logoBrightness: 'brightness-0 invert',
    }
  }
  if (s.includes('provence')) {
    return {
      bg: 'bg-campaign-lime-light',
      text: 'text-accent-foreground',
      accent: 'text-accent-foreground/60',
      tagBg: 'bg-accent-foreground/15',
      tagText: 'text-accent-foreground',
      linkColor: 'text-accent-foreground',
      logoBrightness: '',
    }
  }
  // Default style
  return {
    bg: 'bg-muted',
    text: 'text-foreground',
    accent: 'text-muted-foreground',
    tagBg: 'bg-foreground/10',
    tagText: 'text-foreground',
    linkColor: 'text-foreground',
    logoBrightness: '',
  }
}
