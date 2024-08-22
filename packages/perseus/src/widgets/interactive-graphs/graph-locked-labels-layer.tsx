import * as React from "react";

import LockedLabel from "./locked-figures/locked-label";

import type {LockedFigure} from "../../perseus-types";

type Props = {
    lockedFigures: ReadonlyArray<LockedFigure>;
};

export default function GraphLockedLabelsLayer(props: Props) {
    const {lockedFigures} = props;

    return lockedFigures.map((figure, i) => {
        if (figure.type === "label") {
            return <LockedLabel key={`label-${i}`} {...figure} />;
        }

        // TODO(LEMS-2271): Add support for labels within
        // other locked figure types
        return null;
    });
}
