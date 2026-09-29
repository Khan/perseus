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

    function handleCoordChange(newValue: number, coordIndex: number) {
        // Update the props (update the graph).
        const newCoords: Coord = [...coord];
        newCoords[coordIndex] = newValue;
        onChange(newCoords);
    }

    return (
        <View className={styles.container} style={style}>
            <BodyText tag="label" className={styles.label}>
                <span className={labelClassName}>{xLabel}</span>

                <ScrolllessNumberTextField
                    value={coord[0]}
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
                    value={coord[1]}
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
