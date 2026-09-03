import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import styles from "./coordinate-pair-input.module.css";
import ScrolllessNumberTextField from "./scrollless-number-text-field";

import type {Coord} from "@khanacademy/perseus";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

interface Props {
    coord: [number, number];
    labels?: [string, string];
    error?: boolean;
    style?: StyleType;
    labelClassName?: string;
    disabled?: boolean;
    onChange: (newCoord: Coord) => void;
}

// Passed to ScrolllessNumberTextField's `style` prop, which is typed as Wonder
// Blocks `StyleType` and does not accept a CSS-module className.
const textFieldStyle: StyleType = {width: sizing.size_640};
const errorFieldStyle: StyleType = {
    borderColor: semanticColor.core.border.critical.default,
    backgroundColor: semanticColor.core.background.critical.subtle,
};

// Item data that skipped validation can carry null or non-finite coordinate
// values (LEMS-4564), so render those as an empty field instead of crashing.
// The parameter type is wider than `Coord` promises because that corrupted
// data defeats the type system.
function coordValueToString(value: number | null | undefined): string {
    return Number.isFinite(value) ? String(value) : "";
}

const CoordinatePairInput = (props: Props) => {
    const {
        coord,
        labels,
        error,
        style,
        labelClassName,
        disabled = false,
        onChange,
    } = props;

    const xLabel = labels ? labels[0] : "x coord";
    const yLabel = labels ? labels[1] : "y coord";

    // Keep track of the coordinates via state as the user is editing them,
    // before they are updated in the props as a valid number.
    const [coordState, setCoordState] = React.useState([
        // Using strings to make it easier to work with the text fields.
        coordValueToString(coord[0]),
        coordValueToString(coord[1]),
    ]);

    // Update the local state when the props change. (Such as when the graph
    // type is changed, and the coordinates are reset.)
    React.useEffect(() => {
        setCoordState([
            coordValueToString(coord[0]),
            coordValueToString(coord[1]),
        ]);
    }, [coord]);

    function handleCoordChange(newValue, coordIndex) {
        // Update the local state (update the input field value).
        const newCoordState = [...coordState];
        newCoordState[coordIndex] = newValue;
        setCoordState(newCoordState);

        // If the new value is not a finite number, don't update the props.
        // If it's empty, keep the props the same value instead of setting
        // to 0. Infinity is excluded because JSON.stringify turns it into
        // null, corrupting the item data (LEMS-4564).
        if (!Number.isFinite(+newValue) || newValue === "") {
            return;
        }

        // Update the props (update the graph). If the coordinate NOT being
        // edited is corrupted (null/non-finite), repair it to 0 instead of
        // writing the bad value back into the item data.
        const siblingIndex = coordIndex === 0 ? 1 : 0;
        const newCoords = [...coord] satisfies [number, number];
        newCoords[coordIndex] = +newValue;
        if (!Number.isFinite(newCoords[siblingIndex])) {
            newCoords[siblingIndex] = 0;
        }
        onChange(newCoords);
    }

    // Highlight corrupted incoming values so a blank field reads as a
    // problem to fix, not an empty input.
    const hasInvalidCoord = !coord.every(Number.isFinite);
    const showError = error || hasInvalidCoord;

    return (
        <View className={styles.container} style={style}>
            <BodyText tag="label" className={styles.label}>
                <span className={labelClassName}>{xLabel}</span>

                <ScrolllessNumberTextField
                    value={coordState[0]}
                    disabled={disabled}
                    onChange={(newValue) => handleCoordChange(newValue, 0)}
                    style={[
                        textFieldStyle,
                        showError ? errorFieldStyle : undefined,
                    ]}
                />
            </BodyText>

            <BodyText tag="label" className={styles.label}>
                <span className={labelClassName}>{yLabel}</span>

                <ScrolllessNumberTextField
                    value={coordState[1]}
                    disabled={disabled}
                    onChange={(newValue) => handleCoordChange(newValue, 1)}
                    style={[
                        textFieldStyle,
                        showError ? errorFieldStyle : undefined,
                    ]}
                />
            </BodyText>
        </View>
    );
};

export default CoordinatePairInput;
