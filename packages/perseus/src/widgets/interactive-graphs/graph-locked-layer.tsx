import {color} from "@khanacademy/wonder-blocks-tokens";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {Point} from "mafs";
import * as React from "react";

import type {LockedFigure, StyleParams} from "../../perseus-types";

type Props = {
    lockedFigures: ReadonlyArray<LockedFigure>;
};

/**
 * Takes a style object with color names and converts them to actual
 * Wonder Blocks color values. This way, we can use colors and their
 * names in the editor UI without having to convert them back and forth.
 */
function convertStyle(style?: StyleParams): StyleParams {
    return {
        ...style,
        stroke: color[style?.stroke || "blue"],
        fill: color[style?.fill || "blue"],
    };
}

const GraphLockedLayer = (props: Props) => {
    const {lockedFigures} = props;
    return (
        <>
            {lockedFigures.map((figure, index) => {
                switch (figure.type) {
                    case "point":
                        const [x, y] = figure.coord;
                        return (
                            <Point
                                key={`${figure.type}-${index}`}
                                x={x}
                                y={y}
                                svgCircleProps={{
                                    style: convertStyle(figure.style),
                                }}
                            />
                        );
                }

                /**
                 * Devlopment-time future-proofing: This `never` should
                 * fail during type-checking if we add a new locked
                 * shape type and forget to handle it in any other
                 * switch case here.
                 */
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                throw new UnreachableCaseError(figure.type);
            })}
        </>
    );
};

export default GraphLockedLayer;
