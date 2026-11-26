import {useLayoutEffect, useState} from "react";

import type {RefObject} from "react";

export function useIsNarrow(
    ref: RefObject<HTMLElement | null>,
    maxWidth: number,
): boolean {
    const [isNarrow, setIsNarrow] = useState(false);

    useLayoutEffect(() => {
        const element = ref.current;
        if (element == null) {
            return;
        }

        // A width of 0 means the element hasn't been laid out (it's hidden,
        // or we're in jsdom), so it isn't actually narrow.
        function updateIsNarrow() {
            const width = element.clientWidth;
            setIsNarrow(width > 0 && width < maxWidth);
        }

        // Measuring once up front, before the browser paints, keeps the wide
        // layout from flashing on screen first.
        updateIsNarrow();
        const observer = new ResizeObserver(updateIsNarrow);
        observer.observe(element);
        return () => observer.disconnect();
    }, [ref, maxWidth]);

    return isNarrow;
}
