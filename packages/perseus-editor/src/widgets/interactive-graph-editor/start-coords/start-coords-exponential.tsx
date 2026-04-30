import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";
import ScrolllessNumberTextField from "../../../components/scrollless-number-text-field";

import styles from "./start-coords-shared.module.css";

import type {Coord} from "@khanacademy/perseus";

type ExponentialStartCoords = {
    coords: [Coord, Coord];
    asymptote: number;
};

type Props = {
    startCoords: ExponentialStartCoords;
    onChange: (startCoords: ExponentialStartCoords) => void;
};

const StartCoordsExponential = (props: Props) => {
    const {startCoords, onChange} = props;
    const {coords, asymptote} = startCoords;

    // Local state for the asymptote y-value text field so the user can type
    // freely without the field resetting mid-keystroke. Pattern from StartCoordsCircle.
    const [asymptoteYState, setAsymptoteYState] = React.useState(
        asymptote.toString(),
    );

    // Sync local state when props change (e.g. "Use default start coordinates" button).
    React.useEffect(() => {
        setAsymptoteYState(asymptote.toString());
    }, [asymptote]);

    function handleAsymptoteYChange(newValue: string) {
        // Update the local state to update the input field immediately.
        setAsymptoteYState(newValue);

        // Assume the user is still typing. Don't update props until a valid number.
        if (isNaN(+newValue) || newValue === "") {
            return;
        }

        // Update the props (updates the graph).
        const newY = parseFloat(newValue);
        // Spread coords into a new array so that startCoords always gets a
        // new reference. StatefulMafsGraph's useEffect only watches startCoords,
        // so a new reference is required to trigger reinitialization even when
        // only the asymptote changes. (Same reason circle creates a new
        // {center, radius} object on every onChange call.)
        onChange({
            coords: [coords[0], coords[1]],
            asymptote: newY,
        });
    }

    return (
        <View className={styles.tile}>
            {/* Point 1 */}
            <View className={styles.row}>
                <BodyText weight="bold">Point 1:</BodyText>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={coords[0]}
                    labels={["x", "y"]}
                    onChange={(value) =>
                        onChange({coords: [value, coords[1]], asymptote})
                    }
                />
            </View>
            <Strut size={spacing.small_12} />

            {/* Point 2 */}
            <View className={styles.row}>
                <BodyText weight="bold">Point 2:</BodyText>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={coords[1]}
                    labels={["x", "y"]}
                    onChange={(value) =>
                        onChange({coords: [coords[0], value], asymptote})
                    }
                />
            </View>
            <Strut size={spacing.small_12} />

            {/* Asymptote y-value — single number, mirroring radius in StartCoordsCircle */}
            <BodyText weight="bold" tag="label" className={styles.row}>
                Asymptote y =
                <Strut size={spacing.small_12} />
                <View className={styles.textFieldWrapper}>
                    <ScrolllessNumberTextField
                        value={asymptoteYState}
                        onChange={handleAsymptoteYChange}
                    />
                </View>
            </BodyText>
        </View>
    );
};

export default StartCoordsExponential;
