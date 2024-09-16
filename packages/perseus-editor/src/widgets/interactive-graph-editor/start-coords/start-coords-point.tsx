import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";

import type {Coord, PerseusGraphType} from "@khanacademy/perseus";

type Props = {
    startCoords: ReadonlyArray<Coord>;
    onChange: (startCoords: PerseusGraphType["startCoords"]) => void;
};

const StartCoordsPoint = (props: Props) => {
    const {startCoords, onChange} = props;

    return (
        <>
            {startCoords.map((coord, index) => {
                return (
                    <View key={index} style={styles.tile}>
                        <LabelLarge>{`Point ${index + 1}:`}</LabelLarge>
                        <Strut size={spacing.small_12} />
                        <CoordinatePairInput
                            coord={coord}
                            labels={["x", "y"]}
                            onChange={(newCoord) => {
                                const newStartCoords = [...startCoords];
                                newStartCoords[index] = newCoord;
                                onChange(newStartCoords);
                            }}
                        />
                    </View>
                );
            })}
        </>
    );
};

const styles = StyleSheet.create({
    tile: {
        backgroundColor: color.fadedBlue8,
        marginTop: spacing.xSmall_8,
        padding: spacing.small_12,
        borderRadius: spacing.xSmall_8,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default StartCoordsPoint;
