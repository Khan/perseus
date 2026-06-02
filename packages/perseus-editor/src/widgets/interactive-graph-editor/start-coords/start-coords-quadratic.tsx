import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, font, spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyMonospace, BodyText} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordInput from "./coord-input";
import {getQuadraticEquation} from "./util";

import type {Coord} from "@khanacademy/perseus";

interface StartCoordsQuadraticProps {
    startCoords: [Coord, Coord, Coord];
    onChange: (startCoords: [Coord, Coord, Coord]) => void;
    pointLabels: ReadonlyArray<string>;
    onChangePointLabels: (pointLabels: ReadonlyArray<string>) => void;
}

const StartCoordsQuadratic = (props: StartCoordsQuadraticProps) => {
    const {startCoords, onChange, pointLabels, onChangePointLabels} = props;
    const updatePointLabel = (index: number, newLabel: string) => {
        const next: [string, string, string] = [
            index === 0 ? newLabel : pointLabels[0] ?? "",
            index === 1 ? newLabel : pointLabels[1] ?? "",
            index === 2 ? newLabel : pointLabels[2] ?? "",
        ];
        onChangePointLabels(next);
    };

    return (
        <>
            {/* Current equation */}
            <View style={styles.equationSection}>
                <BodyText>Starting equation:</BodyText>
                <BodyMonospace style={styles.equationBody}>
                    {getQuadraticEquation(startCoords)}
                </BodyMonospace>
            </View>

            {/* Points UI */}
            <CoordInput
                label="Point 1"
                coord={startCoords[0]}
                onChange={(value) =>
                    onChange([value, startCoords[1], startCoords[2]])
                }
                pointLabel={pointLabels[0]}
                onPointLabelChange={(newLabel) => updatePointLabel(0, newLabel)}
            />
            <CoordInput
                label="Point 2"
                coord={startCoords[1]}
                onChange={(value) =>
                    onChange([startCoords[0], value, startCoords[2]])
                }
                pointLabel={pointLabels[1]}
                onPointLabelChange={(newLabel) => updatePointLabel(1, newLabel)}
            />
            <CoordInput
                label="Point 3"
                coord={startCoords[2]}
                onChange={(value) =>
                    onChange([startCoords[0], startCoords[1], value])
                }
                pointLabel={pointLabels[2]}
                onPointLabelChange={(newLabel) => updatePointLabel(2, newLabel)}
            />
        </>
    );
};

const styles = StyleSheet.create({
    equationSection: {
        marginTop: spacing.small_12,
    },
    equationBody: {
        backgroundColor: semanticColor.core.background.neutral.subtle,
        border: `1px solid ${semanticColor.core.border.neutral.subtle}`,
        marginTop: spacing.xSmall_8,
        paddingLeft: spacing.xSmall_8,
        paddingRight: spacing.xSmall_8,
        fontSize: font.size.xSmall,
    },
});

export default StartCoordsQuadratic;
