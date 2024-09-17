import * as React from "react";

import LockedLabel from "./locked-figures/locked-label";

import type {LockedFigure} from "../../perseus-types";
import type {APIOptions} from "../../types";

type Props = {
    flags?: APIOptions["flags"];
    lockedFigures: ReadonlyArray<LockedFigure>;
};

export default function GraphLockedLabelsLayer(props: Props) {
    const {flags, lockedFigures} = props;

    return lockedFigures.map((figure, i) => {
        if (figure.type === "label") {
            return <LockedLabel key={`label-${i}`} {...figure} />;
        }

        if (
            flags?.["mafs"]?.["locked-point-labels"] &&
            figure.type === "point"
        ) {
            return (
                <React.Fragment key={`point-${i}`}>
                    {figure.labels.map((label, j) => (
                        <LockedLabel
                            key={`locked-figure-${i}-label-${j}`}
                            {...label}
                        />
                    ))}
                </React.Fragment>
            );
        }

        return null;
    });
}
