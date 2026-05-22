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
    pointLabel?: {
        value: string | undefined;
        placeholder: string;
        onChange: (newLabel: string) => void;
    };
}

const CoordInput = (props: CoordInputProps) => {
    const {label, coord, onChange, pointLabel} = props;

    if (pointLabel) {
        return (
            <View className={styles.tile}>
                <BodyText weight="bold" tag="span">{`${label}:`}</BodyText>
                <CoordinatePairInput
                    coord={coord}
                    labels={["x", "y"]}
                    onChange={onChange}
                    labelStyle={{
                        minWidth: 40,
                        textAlign: "right",
                    }}
                />
                <BodyText tag="label" className={styles.labelField}>
                    <span className={styles.labelPrefix}>Label</span>
                    <View className={styles.pointLabelField}>
                        <TextField
                            aria-label={`${label} name`}
                            value={pointLabel.value ?? ""}
                            placeholder={pointLabel.placeholder}
                            onChange={pointLabel.onChange}
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
