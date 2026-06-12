/**
 * Gets the effective CSS zoom factor applied to an element or any of its ancestors.
 * This is used to compensate for the mobile font scaling zoom applied to the body
 * or exercise content via the fontScale query parameter.
 *
 * On mobile, the parent application may apply CSS zoom to accommodate device font
 * size settings. This zoom affects coordinate calculations for click/touch events,
 * as both clientX/clientY and getBoundingClientRect() return zoomed values, but
 * the SVG coordinate system expects unzoomed pixel values. It also shrinks the
 * widths reported by offsetWidth for viewport-constrained containers, which
 * fit-to-width logic (e.g. Zoomable) must account for.
 *
 * Note: We calculate the cumulative zoom by traversing the DOM tree rather than
 * targeting specific elements to avoid coupling Perseus to parent application
 * implementation details (e.g., specific class names or DOM hierarchy).
 *
 * @param element - The DOM element to check for CSS zoom
 * @returns The cumulative zoom factor (e.g., 1.5 for 150% zoom, 1.0 for no zoom)
 */
export function getCSSZoomFactor(element: Element): number {
    let zoomFactor = 1;
    let currentElement: Element | null = element;

    // Traverse up the DOM tree to accumulate all zoom values
    while (currentElement) {
        const computedStyle = window.getComputedStyle(currentElement);
        const zoom = computedStyle.zoom;

        if (zoom && zoom !== "normal") {
            const zoomValue = parseFloat(zoom);
            if (!isNaN(zoomValue)) {
                zoomFactor *= zoomValue;
            }
        }

        currentElement = currentElement.parentElement;
    }

    return zoomFactor;
}
