import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";

import styles from "./start-coords-shared.module.css";

import type {Coord} from "@khanacademy/perseus";

interface CoordInputProps {
    label: string;
    coord: Coord;
    onChange: (coord: Coord) => void;
    // Custom label for each interactive point that will help with the screen reader.
    pointLabel?: string;
    onPointLabelChange?: (newLabel: string) => void;
}

const CoordInput = (props: CoordInputProps) => {
    const {label, coord, onChange, pointLabel, onPointLabelChange} = props;

    if (onPointLabelChange) {
        const placeholder = label.match(/\d+$/)?.[0] ?? label;

        return (
            <View className={styles.tile}>
                <BodyText weight="bold" tag="span">{`${label}:`}</BodyText>
                <CoordinatePairInput
                    coord={coord}
                    labels={["x", "y"]}
                    onChange={onChange}
                    labelClassName={styles.labelPrefix}
                />
                <BodyText tag="label" className={styles.labelField}>
                    <span className={styles.labelPrefix}>Label</span>
                    <View className={styles.pointLabelField}>
                        <TextField
                            aria-label={`${label} name`}
                            value={pointLabel ?? ""}
                            placeholder={placeholder}
                            onChange={onPointLabelChange}
                        />
                    </View>
                </BodyText>
            </View>
        );
    }

    return (
        <View className={styles.tileRow}>
            <BodyText weight="bold" tag="span">{`${label}:`}</BodyText>
            <CoordinatePairInput
                coord={coord}
                labels={["x", "y"]}
                onChange={onChange}
            />
        </View>
    );
};

export default CoordInput;
