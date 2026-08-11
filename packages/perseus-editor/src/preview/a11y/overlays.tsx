import * as React from "react";

type Props = {
    targets: ReadonlyArray<Element>;
    container: HTMLElement | null;
};

type Rect = Pick<DOMRect, "top" | "left" | "width" | "height">;

/**
 * Computes an overlay rect placed over a target, relative to its container.
 */
export function getOverlayRect(
    targetRect: Rect,
    containerRect: Pick<DOMRect, "top" | "left">,
): Rect {
    return {
        top: targetRect.top - containerRect.top - 4,
        left: targetRect.left - containerRect.left - 4,
        width: targetRect.width + 8,
        height: targetRect.height + 8,
    };
}

/**
 * Renders outline overlays over the given target elements.
 *
 * Requirements on `container`:
 * - Must be `position: relative` (or otherwise positioned) — overlays are
 *   `position: absolute` and measured against its box.
 * - Must be the actual DOM ancestor that scrolls `targets` (not just any
 *   positioned ancestor) — that's what lets the overlays scroll natively
 *   with the content, with no scroll listener needed.
 */
export function A11yOverlays({targets, container}: Props) {
    if (container == null) {
        return null;
    }
    const containerRect = container.getBoundingClientRect();
    return (
        <>
            {targets.map((target, index) => (
                <div
                    key={index}
                    data-testid="a11y-overlay"
                    style={{
                        position: "absolute",
                        border: "2px solid red",
                        borderRadius: "4px",
                        ...getOverlayRect(
                            target.getBoundingClientRect(),
                            containerRect,
                        ),
                    }}
                />
            ))}
        </>
    );
}
