import * as React from "react";

/**
 * Measures the widest child of a container, and keeps measuring.
 *
 * The container must shrink to fit its widest child (for example, an
 * absolutely positioned column with no padding or border), so its own
 * width is the widest child's width. A ResizeObserver on the container
 * then catches every cause: TeX or images loading, a web font swapping in,
 * a hidden container becoming visible, or tiles being added or removed.
 *
 * ResizeObserver reports layout sizes, which ignore CSS transforms. The
 * width stays correct when the widget sits inside a scaled container,
 * where getBoundingClientRect() would report a scaled width.
 */
export function useWidestTileWidth(): {
    containerRef: (element: HTMLElement | null) => void;
    maxWidth: number | undefined;
} {
    const [maxWidth, setMaxWidth] = React.useState<number>();
    const observerRef = React.useRef<ResizeObserver | null>(null);

    const containerRef = React.useCallback((element: HTMLElement | null) => {
        observerRef.current?.disconnect();
        observerRef.current = null;
        if (element == null) {
            return;
        }
        // The observer also fires once when observation starts.
        observerRef.current = new ResizeObserver((entries) => {
            // Only one element is observed. The last entry is its latest
            // size.
            const entry = entries[entries.length - 1];
            const width = entry?.borderBoxSize[0]?.inlineSize ?? 0;
            // Round up, so the blank is never narrower than its tile.
            // A hidden container reads 0, so report no width until it shows.
            setMaxWidth(width > 0 ? Math.ceil(width) : undefined);
        });
        observerRef.current.observe(element, {box: "border-box"});
    }, []);

    return {containerRef, maxWidth};
}
