import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {Range, Coord} from "@khanacademy/perseus";

type Props = {
    coord: [number, number];
    labels?: [string, string];
    range?: [Range, Range];
    error?: boolean;
    onChange: (newCoord: Coord) => void;
};

const CoordinatePairInput = (props: Props) => {
    const {coord, labels, error, range, onChange} = props;

    // Keep track of the coordinates via state as the user is editing them,
    // before they are updated in the props as a valid number.
    const [coordState, setCoordState] = React.useState([
        // Using strings to make it easier to work with the text fields.
        coord[0].toString(),
        coord[1].toString(),
    ]);

    function handleCoordChange(newValue, coordIndex) {
        // Update the local state (update the input field value).
        const newCoordState = [...coordState];
        newCoordState[coordIndex] = newValue;
        setCoordState(newCoordState);

        // If the new value is not a number, don't update the props.
        // If it's empty, keep the props the same value instead of setting to 0.
        if (isNaN(+newValue) || newValue === "") {
            return;
        }

        // Update the props (update the graph).
        const newCoords = [...coord] satisfies [number, number];
        newCoords[coordIndex] = +newValue;
        onChange(newCoords);
    }

    return (
        <View>
            <View style={[styles.row, styles.spaceUnder]}>
                <LabelMedium tag="label" style={styles.row}>
                    {labels ? labels[0] : "x coord"}

                    <Strut size={spacing.xxSmall_6} />
                    <TextField
                        type="number"
                        value={coordState[0]}
                        onChange={(newValue) =>
                            handleCoordChange(newValue, 0)
                        }
                        style={[
                            styles.textField,
                            error ? styles.errorField : undefined,
                        ]}
                    />
                </LabelMedium>

                <Strut size={spacing.medium_16} />

                <LabelMedium tag="label" style={styles.row}>
                    {labels ? labels[1] : "y coord"}

                    <Strut size={spacing.xxSmall_6} />
                    <TextField
                        type="number"
                        value={coordState[1]}
                        onChange={(newValue) =>
                            handleCoordChange(newValue, 1)
                        }
                        style={[
                            styles.textField,
                            error ? styles.errorField : undefined,
                        ]}
                    />
                </LabelMedium>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
    textField: {
        width: spacing.xxxLarge_64,
    },
    errorField: {
        borderColor: wbColor.red,
        backgroundColor: wbColor.fadedRed8,
    },
});

export default CoordinatePairInput;
