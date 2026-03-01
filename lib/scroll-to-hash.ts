export function scrollToHash(hash: string) {
  const el = document.querySelector(hash)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
