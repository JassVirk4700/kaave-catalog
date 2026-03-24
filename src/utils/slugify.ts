/**
 * Converts a string into a URL-friendly slug.
 * Consistent across creation, editing, and deletion for storage path matching.
 */
export function toSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric except spaces and hyphens
        .replace(/\s+/g, "-")          // Replace spaces with hyphens
        .replace(/-+/g, "-");         // Replace multiple hyphens with single hyphen
}
