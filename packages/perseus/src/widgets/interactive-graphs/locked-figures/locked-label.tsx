import {font} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {getDependencies} from "../../../dependencies";
import {lockedFigureColors, type LockedLabelType} from "../../../perseus-types";
import {pointToPixel} from "../graphs/use-transform";
import useGraphConfig from "../reducer/use-graph-config";

import type {GraphDimensions} from "../types";

export default function LockedLabel(props: LockedLabelType) {
    const {coord, text, color, size} = props;
    const {range, width, height} = useGraphConfig();

    const graphInfo: GraphDimensions = {
        range,
        width,
        height,
    };

    const [x, y] = pointToPixel(coord, graphInfo);

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
            }}
        >
            <TeX>{text}</TeX>
        </span>
    );
}
