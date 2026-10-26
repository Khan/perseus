import * as React from "react";

/**
 * Measures the widest child of a container, and keeps measuring.
 *
 * The container must shrink to fit its widest child (for example, an
 * absolutely positioned column), so its width changes exactly when the
 * widest child's does. A ResizeObserver on the container then catches
 * every cause: TeX or images loading, a web font swapping in, a hidden
 * container becoming visible, or tiles being added or removed.
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
        const measure = () => {
            let max = 0;
            for (const child of Array.from(element.children)) {
                max = Math.max(max, child.getBoundingClientRect().width);
            }
            // Round up, so the blank is never narrower than its tile.
            // A hidden container reads 0, so report no width until it shows.
            setMaxWidth(max > 0 ? Math.ceil(max) : undefined);
        };
        // The observer also fires once when observation starts.
        observerRef.current = new ResizeObserver(measure);
        observerRef.current.observe(element);
    }, []);

    return {containerRef, maxWidth};
}
