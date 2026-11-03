import * as React from "react";

/**
 * Measures the widest child of a container, which gives the
 * empty-blank width. Widths only change while content loads: the hook
 * measures once on mount, and the caller calls `remeasure` on each
 * async completion (TeX render, image load).
 */
export function useWidestTileWidth(): {
    containerRef: (element: HTMLElement | null) => void;
    remeasure: () => void;
    maxWidth: number | undefined;
    isMeasured: boolean;
} {
    const [maxWidth, setMaxWidth] = React.useState<number>();
    const [isMeasured, setIsMeasured] = React.useState(false);
    const elementRef = React.useRef<HTMLElement | null>(null);

    const measure = React.useCallback(() => {
        const element = elementRef.current;
        if (element == null) {
            return;
        }
        let max = 0;
        for (const child of Array.from(element.children)) {
            max = Math.max(max, child.getBoundingClientRect().width);
        }
        // Round up, so the blank is never narrower than its tile.
        setMaxWidth(max > 0 ? Math.ceil(max) : undefined);
        setIsMeasured(true);
    }, []);

    const containerRef = React.useCallback(
        (element: HTMLElement | null) => {
            elementRef.current = element;
            if (element != null) {
                measure();
            }
        },
        [measure],
    );

    return {containerRef, remeasure: measure, maxWidth, isMeasured};
}
