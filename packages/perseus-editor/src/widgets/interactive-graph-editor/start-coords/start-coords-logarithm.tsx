import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyMonospace, BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";
import ScrolllessNumberTextField from "../../../components/scrollless-number-text-field";

import styles from "./start-coords-logarithm.module.css";
import {getLogarithmEquation} from "./util";

import type {Coord} from "@khanacademy/perseus";

type LogarithmStartCoords = {
    coords: [Coord, Coord];
    asymptote: number;
};

type Props = {
    startCoords: LogarithmStartCoords;
    onChange: (startCoords: LogarithmStartCoords) => void;
};

const StartCoordsLogarithm = (props: Props) => {
    const {startCoords, onChange} = props;
    const {coords, asymptote} = startCoords;

    // Local state for the asymptote x-value text field so the user can type
    // freely without the field resetting mid-keystroke. Pattern from StartCoordsCircle.
    const [asymptoteXState, setAsymptoteXState] = React.useState(
        asymptote.toString(),
    );

    // Sync local state when props change (e.g. "Use default start coordinates" button).
    React.useEffect(() => {
        setAsymptoteXState(asymptote.toString());
    }, [asymptote]);

    function handleAsymptoteXChange(newValue: string) {
        // Update the local state to update the input field immediately.
        setAsymptoteXState(newValue);

        // Assume the user is still typing. Don't update props until a valid number.
        if (isNaN(+newValue) || newValue === "") {
            return;
        }

        // Update the props (updates the graph).
        const newX = parseFloat(newValue);
        // Spread coords into a new array so that startCoords always gets a
        // new reference. StatefulMafsGraph's useEffect only watches startCoords,
        // so a new reference is required to trigger reinitialization even when
        // only the asymptote changes. (Same reason circle creates a new
        // {center, radius} object on every onChange call.)
        onChange({
            coords: [coords[0], coords[1]],
            asymptote: newX,
        });
    }

    return (
        <>
            {/* Current equation */}
            <View className={styles.equationSection}>
                <BodyText>Starting equation:</BodyText>
                <BodyMonospace className={styles.equationBody}>
                    {getLogarithmEquation(coords, asymptote)}
                </BodyMonospace>
            </View>

            {/* Points UI */}
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

                {/* Asymptote x-value — single number, mirroring radius in StartCoordsCircle */}
                <BodyText weight="bold" tag="label" className={styles.row}>
                    Asymptote x =
                    <Strut size={spacing.small_12} />
                    <View className={styles.textFieldWrapper}>
                        <ScrolllessNumberTextField
                            value={asymptoteXState}
                            onChange={handleAsymptoteXChange}
                        />
                    </View>
                </BodyText>
            </View>
        </>
    );
};

export default StartCoordsLogarithm;
