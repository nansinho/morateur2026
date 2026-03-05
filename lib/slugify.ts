/**
 * Converts a string to a URL-friendly slug.
 * "Écoles, crèches et centre aéré" → "ecoles-creches-et-centre-aere"
 */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
