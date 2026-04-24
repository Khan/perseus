import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";

import type {Coord} from "@khanacademy/perseus";

type AbsoluteValueCoords = [Coord, Coord];

type Props = {
    startCoords: AbsoluteValueCoords;
    onChange: (startCoords: AbsoluteValueCoords) => void;
};

const StartCoordsAbsoluteValue = (props: Props) => {
    const {startCoords, onChange} = props;
    const [vertex, arm] = startCoords;

    return (
        <>
            <View style={styles.tile}>
                <BodyText size="medium" weight="bold" tag="span">
                    Vertex:
                </BodyText>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={vertex}
                    labels={["x", "y"]}
                    onChange={(value) => onChange([value, arm])}
                />
            </View>
            <View style={styles.tile}>
                <BodyText size="medium" weight="bold" tag="span">
                    Arm:
                </BodyText>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={arm}
                    labels={["x", "y"]}
                    onChange={(value) => onChange([vertex, value])}
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
});

export default StartCoordsAbsoluteValue;
