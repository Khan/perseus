import * as React from "react";

import LockedLabel from "./locked-figures/locked-label";

import type {LockedFigure} from "@khanacademy/perseus-core";

type Props = {
    lockedFigures: ReadonlyArray<LockedFigure>;
};

export default function GraphLockedLabelsLayer(props: Props) {
    const {lockedFigures} = props;

    return lockedFigures.map((figure, i) => {
        if (figure.type === "label") {
            return <LockedLabel key={`label-${i}`} {...figure} />;
        }

        return (
            <React.Fragment key={i}>
                {figure.labels.map((label, j) => (
                    <LockedLabel key={`${i}-label-${j}`} {...label} />
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
