import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";

import LockedEllipse from "./locked-figures/locked-ellipse";
import LockedFunction from "./locked-figures/locked-function";
import LockedLine from "./locked-figures/locked-line";
import LockedPoint from "./locked-figures/locked-point";
import LockedPolygon from "./locked-figures/locked-polygon";
import LockedVector from "./locked-figures/locked-vector";

import type {LockedFigure} from "@khanacademy/perseus-core";
import type {Interval} from "mafs";

type Props = {
    lockedFigures: ReadonlyArray<LockedFigure>;
    range: [x: Interval, y: Interval];
};

const GraphLockedLayer = (props: Props) => {
    const {lockedFigures} = props;
    return (
        <>
            {lockedFigures.map((figure, index) => {
                switch (figure.type) {
                    case "point":
                        return (
                            <LockedPoint key={`point-${index}`} {...figure} />
                        );
                    case "line":
                        return (
                            <LockedLine
                                key={`line-${index}`}
                                range={props.range}
                                {...figure}
                            />
                        );
                    case "vector":
                        return (
                            <LockedVector key={`vector-${index}`} {...figure} />
                        );
                    case "ellipse":
                        return (
                            <LockedEllipse
                                key={`ellipse-${index}`}
                                {...figure}
                            />
                        );
                    case "polygon":
                        return (
                            <LockedPolygon
                                key={`polygon-${index}`}
                                {...figure}
                            />
                        );
                    case "function":
                        return (
                            <LockedFunction
                                key={`function-${index}`}
                                {...figure}
                            />
                        );
                    case "label":
                        // This is rendered outside the SVG element, since
                        // TeX cannot be rendered inside an SVG.
                        // See graph-locked-labels-layer.tsx for
                        // the component that renders these.
                        return null;
                    default:
                        /**
                         * Devlopment-time future-proofing: This should
                         * fail during type-checking if we add a new locked
                         * shape type and forget to handle it in any other
                         * switch case here.
                         */
                        throw new UnreachableCaseError(figure);
                }
            })}
        </>
    );
};

export default GraphLockedLayer;
