import {font} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {getDependencies} from "../../../dependencies";
import {lockedFigureColors, type LockedLabelType} from "../../../perseus-types";
import {pointToPixel} from "../graphs/use-transform";
import useGraphConfig from "../reducer/use-graph-config";

export default function LockedLabel(props: LockedLabelType) {
    const {coord, text, color, size} = props;

    const [x, y] = pointToPixel(coord, useGraphConfig());

    const {TeX} = getDependencies();

    // Move this all outside the SVG element
    return (
        <span
            className="locked-label"
            style={{
                position: "absolute",
                left: x,
                top: y,
                color: lockedFigureColors[color],
                fontSize: font.size[size],
                backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
        >
            <TeX>{text}</TeX>
        </span>
    );
}
