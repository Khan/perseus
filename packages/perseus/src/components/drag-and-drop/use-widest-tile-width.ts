import * as React from "react";

/**
 * Measures the widest child of a container. Widths only change while
 * content loads, so the hook measures on mount and the caller calls
 * `remeasure` when async content (TeX, images) finishes rendering.
 */
export function useWidestTileWidth(): {
    containerRef: (element: HTMLElement | null) => void;
    remeasure: () => void;
    maxWidth: number | undefined;
} {
    const [maxWidth, setMaxWidth] = React.useState<number>();
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
    }, []);

    const containerRef = React.useCallback(
        (element: HTMLElement | null) => {
            elementRef.current = element;
            measure();
        },
        [measure],
    );

    return {containerRef, remeasure: measure, maxWidth};
}
