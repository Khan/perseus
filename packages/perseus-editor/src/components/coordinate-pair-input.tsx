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
    const {
        coord,
        labels = ["x coord", "y coord"],
        error,
        range,
        onChange,
    } = props;

    const [xRangeError, setXRangeError] = React.useState<string | null>(null);
    const [yRangeError, setYRangeError] = React.useState<string | null>(null);

    const hasError = [error || xRangeError, error || yRangeError];

    // Keep track of the coordinates via state as the user is editing them,
    // before they are updated in the props as a valid number.
    const [coordState, setCoordState] = React.useState([
        // Using strings to make it easier to work with the text fields.
        coord[0].toString(),
        coord[1].toString(),
    ]);

    // Use effect to make sure that the error stays updated with the range prop
    React.useEffect(() => {
        if (!range) {
            return;
        }

        const xOutOfRange = coord[0] < range[0][0] || coord[0] > range[0][1];
        const yOutOfRange = coord[1] < range[1][0] || coord[1] > range[1][1];

        const xRangeError = `${labels[0]} out of range ${range[0][0]} to ${range[0][1]}`;
        const yRangeError = `${labels[1]} out of range ${range[1][0]} to ${range[1][1]}`;

        setXRangeError(xOutOfRange ? xRangeError : null);
        setYRangeError(yOutOfRange ? yRangeError : null);
    }, [coord, labels, range]);

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
            {/* Errors */}
            {xRangeError && (
                <LabelMedium style={styles.errorText}>
                    {xRangeError}
                </LabelMedium>
            )}
            {yRangeError && (
                <LabelMedium style={styles.errorText}>
                    {yRangeError}
                </LabelMedium>
            )}

            {/* Coordinate input fields */}
            <View style={[styles.row, styles.spaceUnder]}>
                <LabelMedium tag="label" style={styles.row}>
                    {labels[0]}

                    <Strut size={spacing.xxSmall_6} />
                    <TextField
                        type="number"
                        value={coordState[0]}
                        min={range ? range[0][0] : undefined}
                        max={range ? range[0][1] : undefined}
                        onChange={(newValue) =>
                            handleCoordChange(newValue, 0)
                        }
                        style={[
                            styles.textField,
                            hasError[0] ? styles.errorField : undefined,
                        ]}
                    />
                </LabelMedium>

                <Strut size={spacing.medium_16} />

                <LabelMedium tag="label" style={styles.row}>
                    {labels[1]}

                    <Strut size={spacing.xxSmall_6} />
                    <TextField
                        type="number"
                        value={coordState[1]}
                        min={range ? range[1][0] : undefined}
                        max={range ? range[1][1] : undefined}
                        onChange={(newValue) =>
                            handleCoordChange(newValue, 1)
                        }
                        style={[
                            styles.textField,
                            hasError[1] ? styles.errorField : undefined,
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
    errorText: {
        color: wbColor.red,
        marginBottom: spacing.xSmall_8,
    },
    errorField: {
        borderColor: wbColor.red,
        backgroundColor: wbColor.fadedRed8,
    },
});

export default CoordinatePairInput;
