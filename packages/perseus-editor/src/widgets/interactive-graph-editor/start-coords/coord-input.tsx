import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";

import styles from "./start-coords-shared.module.css";

import type {Coord} from "@khanacademy/perseus";

interface CoordInputProps {
    label: string;
    coord: Coord;
    onChange: (coord: Coord) => void;
}

const CoordInput = (props: CoordInputProps) => {
    const {label, coord, onChange} = props;

    return (
        <View className={styles["tile-row"]}>
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
