/** Where a person can open a draft's preview. */
export interface PreviewLinks {
    /** The preview's URL, or null when nothing is serving previews. */
    urlFor(itemId: string): string | null;
    /** The exercise page's URL, or null when nothing is serving previews. */
    exerciseUrlFor(exerciseId: string): string | null;
    /** A diagram's page's URL, or null when nothing is serving previews. */
    graffitiUrlFor(graffitiId: string): string | null;
}
