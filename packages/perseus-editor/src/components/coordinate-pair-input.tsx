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
        coord[0].toString(),
        coord[1].toString(),
    ]);

    // Update the local state when the props change. (Such as when the graph
    // type is changed, and the coordinates are reset.)
    React.useEffect(() => {
        setCoordState([coord[0].toString(), coord[1].toString()]);
    }, [coord]);

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
        <View className={styles.container} style={style}>
            <BodyText tag="label" className={styles.label}>
                <span className={labelClassName}>{xLabel}</span>

                <ScrolllessNumberTextField
                    value={coordState[0]}
                    disabled={disabled}
                    onChange={(newValue) => handleCoordChange(newValue, 0)}
                    style={[
                        textFieldStyle,
                        error ? errorFieldStyle : undefined,
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
                        error ? errorFieldStyle : undefined,
                    ]}
                />
            </BodyText>
        </View>
    );
};

export default CoordinatePairInput;
