import * as React from "react";

/**
 * Wrapper with Mafs transform styles for SVG elements.
 * Scales and translates the SVG element to match the Mafs view.
 * Use if you do not need/want to use the hook in `use-transform.ts`.
 */
export const MafsCssTransformWrapper = ({
    children,
}: React.PropsWithChildren<unknown>) => (
    <g
        style={{
            transform: `var(--mafs-view-transform) var(--mafs-user-transform)`,
        }}
    >
        {children}
    </g>
);
