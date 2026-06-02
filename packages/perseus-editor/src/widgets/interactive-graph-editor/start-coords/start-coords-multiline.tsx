import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";

import CoordInput from "./coord-input";

import type {CollinearTuple} from "@khanacademy/perseus-core";

interface StartCoordsMultilineProps {
    type: "linear-system" | "segment";
    startCoords: CollinearTuple[];
    onChange: (startCoords: CollinearTuple[]) => void;
    pointLabels: ReadonlyArray<string>;
    onChangePointLabels: (pointLabels: ReadonlyArray<string>) => void;
}

const StartCoordsMultiline = (props: StartCoordsMultilineProps) => {
    const {startCoords, type, onChange, pointLabels, onChangePointLabels} =
        props;

    const graphName = type === "segment" ? "Segment" : "Line";
    const updatePointLabel = (flatIndex: number, newLabel: string) => {
        const totalPoints = startCoords.length * 2;
        const next = Array.from({length: totalPoints}, (_, i) =>
            i === flatIndex ? newLabel : pointLabels[i] ?? "",
        );
        onChangePointLabels(next);
    };

    return (
        <>
            {startCoords.map((coordPair, i) => (
                <PerseusEditorAccordion
                    key={`segment-${i}-start-coords`}
                    header={
                        <BodyText
                            size="medium"
                            weight="bold"
                            tag="span"
                        >{`${graphName} ${i + 1}`}</BodyText>
                    }
                    expanded={true}
                >
                    <CoordInput
                        label="Point 1"
                        coord={coordPair[0]}
                        onChange={(value) => {
                            const newCoords = [...startCoords];
                            newCoords[i] = [value, coordPair[1]];
                            onChange(newCoords);
                        }}
                        pointLabel={pointLabels[i * 2]}
                        onPointLabelChange={(newLabel) =>
                            updatePointLabel(i * 2, newLabel)
                        }
                    />
                    <CoordInput
                        label="Point 2"
                        coord={coordPair[1]}
                        onChange={(value) => {
                            const newCoords = [...startCoords];
                            newCoords[i] = [coordPair[0], value];
                            onChange(newCoords);
                        }}
                        pointLabel={pointLabels[i * 2 + 1]}
                        onPointLabelChange={(newLabel) =>
                            updatePointLabel(i * 2 + 1, newLabel)
                        }
                    />
                </PerseusEditorAccordion>
            ))}
        </>
    );
};

export default StartCoordsMultiline;
