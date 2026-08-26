import * as React from "react";

/**
 * Measures the widest direct child of a container and keeps the value
 * live: a ResizeObserver re-measures as children change size, which is
 * how late-arriving content (async TeX typesetting, loading images)
 * flows into the measurement instead of being missed.
 *
 * FITB uses this on a hidden render of every answer tile to compute the
 * empty-blank width (the spec's "width of the widest answer tile" rule).
 *
 * Returns the ref callback for the container, the current max width in
 * pixels, and whether a first measurement pass has happened (for the
 * gate-reveal sizing mode).
 */
export function useMaxChildWidth(): {
    containerRef: (element: HTMLElement | null) => void;
    maxWidth: number | undefined;
    isMeasured: boolean;
} {
    const [maxWidth, setMaxWidth] = React.useState<number>();
    const [isMeasured, setIsMeasured] = React.useState(false);
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
            // Sub-pixel TeX widths round up so the blank never comes up
            // a hair short of its tile.
            setMaxWidth(max > 0 ? Math.ceil(max) : undefined);
            setIsMeasured(true);
        };

        // jsdom has no ResizeObserver; a single pass keeps tests and
        // non-browser environments working (widths are 0 there anyway).
        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(measure);
            for (const child of Array.from(element.children)) {
                observer.observe(child);
            }
            observerRef.current = observer;
        }
        measure();
    }, []);

    React.useEffect(() => {
        return () => observerRef.current?.disconnect();
    }, []);

    return {containerRef, maxWidth, isMeasured};
}
