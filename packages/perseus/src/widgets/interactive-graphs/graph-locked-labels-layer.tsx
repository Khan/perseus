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
            // Point flag + point type
            (flags?.["mafs"]?.["locked-point-labels"] &&
                figure.type === "point") ||
            // Line flag + line type
            (flags?.["mafs"]?.["locked-line-labels"] && figure.type === "line")
        ) {
            return (
                <React.Fragment key={`locked-figure-${i}`}>
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
