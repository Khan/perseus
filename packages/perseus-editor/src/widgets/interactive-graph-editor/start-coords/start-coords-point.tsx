import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";

import type {Coord} from "@khanacademy/perseus";

type Props = {
    startCoords: Coord[];
    pointNames?: string[];
    onChange: (startCoords: Coord[]) => void;
    onChangePointNames?: (pointNames: string[]) => void;
};

const StartCoordsPoint = (props: Props) => {
    const {startCoords, pointNames, onChange, onChangePointNames} = props;

    return (
        <>
            {startCoords.map((coord, index) => {
                const customName = pointNames?.[index] || "";
                const displayName = customName || `${index + 1}`;
                return (
                    <View key={index} style={styles.tile}>
                        <LabelLarge>{`Point ${displayName}:`}</LabelLarge>
                        <Strut size={spacing.xSmall_8} />
                        <View style={styles.inputsRow}>
                            <LabelMedium tag="label" style={styles.row}>
                                name
                                <Strut size={spacing.xxSmall_6} />
                                <TextField
                                    value={customName}
                                    placeholder={`${index + 1}`}
                                    onChange={(newName) => {
                                        const newPointNames = [
                                            ...(pointNames || []),
                                        ];
                                        // Ensure the array is long enough
                                        while (newPointNames.length <= index) {
                                            newPointNames.push("");
                                        }
                                        newPointNames[index] = newName;
                                        onChangePointNames?.(newPointNames);
                                    }}
                                    style={styles.nameTextField}
                                />
                            </LabelMedium>
                            <Strut size={spacing.medium_16} />
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
                    </View>
                );
            })}
        </>
    );
};

const styles = StyleSheet.create({
    tile: {
        backgroundColor: semanticColor.core.background.instructive.subtle,
        marginTop: spacing.xSmall_8,
        padding: spacing.small_12,
        borderRadius: spacing.xSmall_8,
        flexDirection: "column",
    },
    inputsRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    nameTextField: {
        width: spacing.xxxLarge_64,
    },
});

export default StartCoordsPoint;
