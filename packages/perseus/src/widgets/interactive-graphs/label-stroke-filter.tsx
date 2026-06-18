import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

/**
 * Creates a stroke around label text so it stays readable when drawn
 * over graph lines, shapes, or other geometry. This isn't as obvious as
 * it might seem because MathJax renders HTML and uses borders for some
 * lines, so a CSS text-stroke alone isn't enough.
 *
 * The filter is referenced by `filter: url(#math-stroke)` on the label
 * element. The same `id="math-stroke"` is reused across labels — if
 * multiple labels render on the same graph, the SVG `<defs>` only need
 * to live in the DOM once for all of them to pick up the filter.
 *
 * See: LEMS-4106 for more information.
 */
export default function LabelStrokeFilter() {
    const color = semanticColor.core.border.knockout.default;

    return (
        <svg width="0" height="0" style={{position: "absolute"}}>
            <defs>
                <filter id="math-stroke">
                    {/* expand edges outward */}
                    <feMorphology
                        operator="dilate"
                        radius="2"
                        in="SourceGraphic"
                        result="expanded"
                    />

                    {/* flood with color */}
                    <feFlood floodColor={color} result="flood" />

                    {/* clip the flood to the expanded shape */}
                    <feComposite
                        in="flood"
                        in2="expanded"
                        operator="in"
                        result="outline"
                    />

                    {/* draw outline behind original */}
                    <feMerge>
                        <feMergeNode in="outline" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
        </svg>
    );
}
