import {
    lockedFigureColors,
    type LockedLabelType,
} from "@khanacademy/perseus-core";
import {font, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {getDependencies} from "../../../dependencies";
import {pointToPixel} from "../graphs/use-transform";
import useGraphConfig from "../reducer/use-graph-config";
import {replaceOutsideTeX} from "../utils";

export default function LockedLabel(props: LockedLabelType) {
    const {coord, text, color, size} = props;

    const [x, y] = pointToPixel(coord, useGraphConfig());

    const {TeX} = getDependencies();

    // Note: The TeX component cannot be rendered within an SVG
    return (
        <>
            <LockedLabelStrokeFilter />
            <span
                className="locked-label"
                style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    color: lockedFigureColors[color],
                    fontSize: font.size[size],
                    filter: "url(#math-stroke)",
                }}
                aria-hidden={true}
            >
                <TeX>{replaceOutsideTeX(text)}</TeX>
            </span>
        </>
    );
}

/**
 * This helps us create a stroke around locked labels
 * which isn't as obvious as it would seem because Mathjax
 * renders HTML and uses borders for some lines.
 *
 * This creates a composite of the rendered output and
 * thickens the output.
 *
 * See: LEMS-4106 for more information
 */
function LockedLabelStrokeFilter() {
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
