import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {semanticColor, font, spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    BodyMonospace,
    LabelLarge,
    LabelMedium,
} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";

import {getQuadraticEquation} from "./util";

import type {Coord} from "@khanacademy/perseus";

type Props = {
    startCoords: [Coord, Coord, Coord];
    onChange: (startCoords: [Coord, Coord, Coord]) => void;
};

const StartCoordsQuadratic = (props: Props) => {
    const {startCoords, onChange} = props;

    return (
        <>
            {/* Current equation */}
            <View style={styles.equationSection}>
                <LabelMedium>Starting equation:</LabelMedium>
                <BodyMonospace style={styles.equationBody}>
                    {getQuadraticEquation(startCoords)}
                </BodyMonospace>
            </View>

            {/* Points UI */}
            <View style={styles.tile}>
                <LabelLarge>Point 1:</LabelLarge>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={startCoords[0]}
                    labels={["x", "y"]}
                    onChange={(value) =>
                        onChange([value, startCoords[1], startCoords[2]])
                    }
                />
            </View>
            <View style={styles.tile}>
                <LabelLarge>Point 2:</LabelLarge>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={startCoords[1]}
                    labels={["x", "y"]}
                    onChange={(value) =>
                        onChange([startCoords[0], value, startCoords[2]])
                    }
                />
            </View>
            <View style={styles.tile}>
                <LabelLarge>Point 3:</LabelLarge>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={startCoords[2]}
                    labels={["x", "y"]}
                    onChange={(value) =>
                        onChange([startCoords[0], startCoords[1], value])
                    }
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    tile: {
        backgroundColor: semanticColor.core.background.instructive.subtle,
        marginTop: spacing.xSmall_8,
        padding: spacing.small_12,
        borderRadius: spacing.xSmall_8,
        flexDirection: "row",
        alignItems: "center",
    },
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
