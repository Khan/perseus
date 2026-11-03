import * as React from "react";

import LockedLabel from "./locked-figures/locked-label";

import type {LockedFigure, LockedLabelType} from "@khanacademy/perseus-core";
import {getAutoLabelCoordinates} from "./locked-figures/label-placement-utils";
import useGraphConfig from "./reducer/use-graph-config";

type Props = {
    lockedFigures: ReadonlyArray<LockedFigure>;
};

export default function GraphLockedLabelsLayer(props: Props) {
    const {lockedFigures} = props;

    // The graph's range and pixel size both feed label placement, and this
    // layer renders inside the graph config provider, so read them from
    // context rather than threading them down from MafsGraph.
    const graphInfo = useGraphConfig();

    const setLabelPlacement = (figure: LockedLabelType, label: LockedLabelType): LockedLabelType => {
        const coord = getAutoLabelCoordinates(figure, graphInfo);
        return {...label, coord};
    };

    return lockedFigures.map((figure, i) => {
        if (figure.type === "label") {
            return <LockedLabel key={`label-${i}`} {...figure} />;
        }

        return (
            <React.Fragment key={i}>
                {figure.labels.map((label, j) => (
                    <LockedLabel
                        key={`${i}-label-${j}`}
                        {...setLabelPlacement(figure, label)}
                        autoPlaced={true}
                    />
                ))}

                {/* Account for the labels within the lines' defining points */}
                {figure.type === "line" && (
                    <>
                        {/* Point 1 labels */}
                        {figure.points[0].labels.map((label, k) => (
                            <LockedLabel
                                key={`locked-figure-${i}-point-1-label-${k}`}
                                {...label}
                            />
                        ))}
                        {/* Point 2 labels */}
                        {figure.points[1].labels.map((label, k) => (
                            <LockedLabel
                                key={`locked-figure-${i}-point-2-label-${k}`}
                                {...label}
                            />
                        ))}
                    </>
                )}
            </React.Fragment>
        );
    });
}
