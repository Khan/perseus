import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";
import ScrolllessNumberTextField from "../../../components/scrollless-number-text-field";

import type {Coord} from "@khanacademy/perseus";

type CircleCoords = {
    center: Coord;
    radius: number;
};

type Props = {
    startCoords: CircleCoords;
    onChange: (startCoords: CircleCoords) => void;
};

const StartCoordsCircle = (props: Props) => {
    const {startCoords, onChange} = props;

    const [radiusState, setRadiusState] = React.useState(
        startCoords.radius.toString(),
    );

    // Update the local state when the props change. (Specifically, when
    // the radius is reset from the "Use default start coordinates" button.)
    React.useEffect(() => {
        setRadiusState(startCoords.radius.toString());
    }, [startCoords.radius]);

    function handleRadiuschange(newValue: string) {
        // Update the local state to update the input field.
        setRadiusState(newValue);

        // Assume the user is in the middle of typing. Don't update
        // the props until they've finished typing a valid number.
        if (isNaN(+newValue) || newValue === "" || +newValue === 0) {
            return;
        }

        // Update the props (update the graph).
        onChange({
            center: startCoords.center,
            radius: parseFloat(newValue),
        });
    }

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
            <LabelLarge tag="label" style={styles.row}>
                Radius:
                <Strut size={spacing.small_12} />
                <ScrolllessNumberTextField
                    value={radiusState}
                    onChange={handleRadiuschange}
                    style={styles.textField}
                />
            </LabelLarge>
        </View>
    );
};

const styles = StyleSheet.create({
    tile: {
        backgroundColor: semanticColor.core.background.instructive.subtle,
        marginTop: spacing.xSmall_8,
        padding: spacing.small_12,
        borderRadius: spacing.xSmall_8,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    textField: {
        width: spacing.xxxLarge_64,
    },
});

export default StartCoordsCircle;
