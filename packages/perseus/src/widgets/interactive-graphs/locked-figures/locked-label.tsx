import {
    lockedFigureColors,
    type LockedLabelType,
} from "@khanacademy/perseus-core";
import {font} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {getDependencies} from "../../../dependencies";
import {pointToPixel} from "../graphs/use-transform";
import LabelStrokeFilter from "../label-stroke-filter";
import useGraphConfig from "../reducer/use-graph-config";
import {replaceOutsideTeX} from "../utils";

export default function LockedLabel(props: LockedLabelType) {
    const {coord, text, color, size} = props;

    const [x, y] = pointToPixel(coord, useGraphConfig());

    const {TeX} = getDependencies();

    // Note: The TeX component cannot be rendered within an SVG
    return (
        <>
            <LabelStrokeFilter />
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
