import * as React from "react";

import LockedLabel from "./locked-figures/locked-label";

import type {LockedFigure, LockedLabelType} from "@khanacademy/perseus-core";
import {getAutoLabelCoordinates} from "./locked-figures/label-placement-utils";
import useGraphConfig from "./reducer/use-graph-config";

import type {LabelSize} from "./locked-figures/label-placement-utils";

type Props = {
    lockedFigures: ReadonlyArray<LockedFigure>;
};

export default function GraphLockedLabelsLayer(props: Props) {
    const {lockedFigures} = props;

    // The graph's range and pixel size both feed label placement, and this
    // layer renders inside the graph config provider, so read them from
    // context rather than threading them down from MafsGraph.
    const graphInfo = useGraphConfig();

    // Labels report their rendered size once their text has been typeset.
    // Holding the measurements here rather than in each label keeps them all
    // in one place, which is what label-vs-label collision avoidance will
    // need.
    const [labelSizes, setLabelSizes] = React.useState<
        ReadonlyMap<string, LabelSize>
    >(() => new Map());

    const handleMeasure = React.useCallback((key: string, size: LabelSize) => {
        setLabelSizes((current) => {
            // Measuring is idempotent, so ignore repeat reports of the same
            // size; otherwise every measurement would re-render the layer.
            const existing = current.get(key);
            if (
                existing &&
                existing.width === size.width &&
                existing.height === size.height
            ) {
                return current;
            }

            const next = new Map(current);
            next.set(key, size);
            return next;
        });
    }, []);

    // Each label needs a callback with a stable identity, or its measurement
    // effect would re-run on every render of this layer.
    const measureHandlers = React.useRef(
        new Map<string, (size: LabelSize) => void>(),
    );
    const getMeasureHandler = (key: string) => {
        let handler = measureHandlers.current.get(key);
        if (!handler) {
            handler = (size: LabelSize) => handleMeasure(key, size);
            measureHandlers.current.set(key, handler);
        }
        return handler;
    };

    const setLabelPlacement = (
        figure: LockedLabelType,
        label: LockedLabelType,
        key: string,
    ) => {
        const {coord, anchorX, anchorY} = getAutoLabelCoordinates(
            figure,
            graphInfo,
            labelSizes.get(key),
        );
        return {...label, coord, anchorX, anchorY};
    };

    return lockedFigures.map((figure, i) => {
        if (figure.type === "label") {
            return <LockedLabel key={`label-${i}`} {...figure} />;
        }

        return (
            <React.Fragment key={i}>
                {figure.labels.map((label, j) => {
                    const key = `${i}-label-${j}`;
                    return (
                        <LockedLabel
                            key={key}
                            {...setLabelPlacement(figure, label, key)}
                            onMeasure={getMeasureHandler(key)}
                        />
                    );
                })}

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
