import * as React from "react";

import AsymptoteInput from "./asymptote-input";
import CoordInput from "./coord-input";

import type {Coord} from "@khanacademy/perseus";

type ExponentialStartCoords = {
    coords: [Coord, Coord];
    asymptote: number;
};

interface StartCoordsExponentialProps {
    startCoords: ExponentialStartCoords;
    onChange: (startCoords: ExponentialStartCoords) => void;
    pointLabels: ReadonlyArray<string>;
    onChangePointLabels: (pointLabels: ReadonlyArray<string>) => void;
}

const StartCoordsExponential = (props: StartCoordsExponentialProps) => {
    const {startCoords, onChange, pointLabels, onChangePointLabels} = props;
    const {coords, asymptote} = startCoords;
    const updatePointLabel = (index: number, newLabel: string) => {
        const next: [string, string] = [
            index === 0 ? newLabel : pointLabels[0] ?? "",
            index === 1 ? newLabel : pointLabels[1] ?? "",
        ];
        onChangePointLabels(next);
    };

    return (
        <>
            <CoordInput
                label="Point 1"
                coord={coords[0]}
                onChange={(value) =>
                    onChange({coords: [value, coords[1]], asymptote})
                }
                pointLabel={pointLabels[0]}
                onPointLabelChange={(newLabel) => updatePointLabel(0, newLabel)}
            />
            <CoordInput
                label="Point 2"
                coord={coords[1]}
                onChange={(value) =>
                    onChange({coords: [coords[0], value], asymptote})
                }
                pointLabel={pointLabels[1]}
                onPointLabelChange={(newLabel) => updatePointLabel(1, newLabel)}
            />
            <AsymptoteInput
                axis="y"
                value={asymptote}
                onChange={(newY) =>
                    // Rebuild coords so startCoords gets a new reference;
                    // StatefulMafsGraph only reinitializes on identity change.
                    onChange({coords: [coords[0], coords[1]], asymptote: newY})
                }
            />
        </>
    );
};

export default StartCoordsExponential;
