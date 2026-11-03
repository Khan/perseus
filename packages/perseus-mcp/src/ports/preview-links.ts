/** Where a person can open a draft's preview. */
export interface PreviewLinks {
    /** The preview's URL, or null when nothing is serving previews. */
    urlFor(itemId: string): string | null;
}
