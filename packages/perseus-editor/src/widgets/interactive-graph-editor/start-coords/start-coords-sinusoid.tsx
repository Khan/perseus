import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, font, spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyMonospace, BodyText} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordInputRow from "./coord-input-row";
import {getSinusoidEquation} from "./util";

import type {Coord} from "@khanacademy/perseus";

type SinusoidCoords = [Coord, Coord];

type Props = {
    startCoords: SinusoidCoords;
    onChange: (startCoords: SinusoidCoords) => void;
};

const StartCoordsSinusoid = (props: Props) => {
    const {startCoords, onChange} = props;

    return (
        <>
            {/* Current equation */}
            <View style={styles.equationSection}>
                <BodyText>Starting equation:</BodyText>
                <BodyMonospace style={styles.equationBody}>
                    {getSinusoidEquation(startCoords)}
                </BodyMonospace>
            </View>

            {/* Points UI */}
            <CoordInputRow
                label="Point 1"
                coord={startCoords[0]}
                onChange={(value) => onChange([value, startCoords[1]])}
            />
            <CoordInputRow
                label="Point 2"
                coord={startCoords[1]}
                onChange={(value) => onChange([startCoords[0], value])}
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

export default StartCoordsSinusoid;
