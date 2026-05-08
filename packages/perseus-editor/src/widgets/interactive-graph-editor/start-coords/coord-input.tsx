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
    /**
     * Optional screen-reader name for the point. When provided, an inline
     * TextField is rendered before the coord pair so authors can override
     * the default numeric "Point N" announcement (e.g. with "T"). The
     * `placeholder` reflects the default announcement so authors know what
     * the screen reader says when no name is entered.
     */
    pointLabel?: {
        value: string | undefined;
        placeholder: string;
        onChange: (newLabel: string) => void;
    };
}

const CoordInput = (props: CoordInputProps) => {
    const {label, coord, onChange, pointLabel} = props;

    return (
        <View className={styles["tile-row"]}>
            <BodyText weight="bold" tag="span">{`${label}:`}</BodyText>
            {pointLabel && (
                <View className={styles["point-label-field"]}>
                    <TextField
                        aria-label={`${label} name`}
                        value={pointLabel.value ?? ""}
                        placeholder={pointLabel.placeholder}
                        onChange={pointLabel.onChange}
                    />
                </View>
            )}
            <CoordinatePairInput
                coord={coord}
                labels={["x", "y"]}
                onChange={onChange}
            />
        </View>
    );
};

export default CoordInput;
