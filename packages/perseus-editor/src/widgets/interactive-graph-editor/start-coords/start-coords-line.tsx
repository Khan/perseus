import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";

import type {CollinearTuple} from "@khanacademy/perseus-core";

type Props = {
    startCoords: CollinearTuple;
    onChange: (startCoords: CollinearTuple) => void;
};

const StartCoordsLine = (props: Props) => {
    const {startCoords, onChange} = props;

    return (
        <>
            <View style={styles.tile}>
                <LabelLarge>Point 1:</LabelLarge>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={startCoords[0]}
                    labels={["x", "y"]}
                    onChange={(value) => onChange([value, startCoords[1]])}
                />
            </View>
            <View style={styles.tile}>
                <LabelLarge>Point 2:</LabelLarge>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={startCoords[1]}
                    labels={["x", "y"]}
                    onChange={(value) => onChange([startCoords[0], value])}
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

export default StartCoordsLine;
