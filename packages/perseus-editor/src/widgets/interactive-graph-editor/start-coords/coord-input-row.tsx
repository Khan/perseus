import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";

import styles from "./start-coords-shared.module.css";

import type {Coord} from "@khanacademy/perseus";

type Props = {
    label: string;
    coord: Coord;
    onChange: (coord: Coord) => void;
};

const CoordInputRow = (props: Props) => {
    const {label, coord, onChange} = props;

    return (
        <View className={styles.tileRow}>
            <BodyText weight="bold" tag="span">{`${label}:`}</BodyText>
            <Strut size={spacing.small_12} />
            <CoordinatePairInput
                coord={coord}
                labels={["x", "y"]}
                onChange={onChange}
            />
        </View>
    );
};

export default CoordInputRow;
