import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "./coordinate-pair-input";

import type {Coord, PerseusGraphType} from "@khanacademy/perseus";

type Props = {
    startCoords: {
        center: Coord;
        radius: number;
    };
    // center: number;
    onChange: (startCoords: PerseusGraphType["startCoords"]) => void;
};

const StartCoordsCircle = (props: Props) => {
    const {startCoords, onChange} = props;

    return (
        <View style={styles.tile}>
            {/* Center */}
            <View style={styles.row}>
                <LabelLarge>Center:</LabelLarge>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={startCoords.center}
                    labels={["x", "y"]}
                    onChange={(coord) =>
                        onChange({center: coord, radius: startCoords.radius})
                    }
                />
            </View>
            <Strut size={spacing.small_12} />

            {/* Radius */}
            <View style={styles.row}>
                <LabelLarge>Radius:</LabelLarge>
                <Strut size={spacing.small_12} />
                <TextField
                    value={startCoords.radius.toString()}
                    type="number"
                    onChange={(value) => {
                        onChange({
                            center: startCoords.center,
                            radius: parseFloat(value),
                        });
                    }}
                    style={styles.textField}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tile: {
        backgroundColor: color.fadedBlue8,
        marginTop: spacing.xSmall_8,
        padding: spacing.small_12,
        borderRadius: spacing.xSmall_8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    textField: {
        width: spacing.xxxLarge_64,
    },
});

export default StartCoordsCircle;
