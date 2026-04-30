import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyMonospace, BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";

import styles from "./start-coords-shared.module.css";
import {getTangentEquation} from "./util";

import type {Coord} from "@khanacademy/perseus";

type TangentCoords = [Coord, Coord];

type Props = {
    startCoords: TangentCoords;
    onChange: (startCoords: TangentCoords) => void;
};

const StartCoordsTangent = (props: Props) => {
    const {startCoords, onChange} = props;

    return (
        <>
            {/* Current equation */}
            <View className={styles.equationSection}>
                <BodyText>Starting equation:</BodyText>
                <BodyMonospace className={styles.equationBody}>
                    {getTangentEquation(startCoords)}
                </BodyMonospace>
            </View>

            {/* Points UI */}
            <View className={styles.tileRow}>
                <BodyText size="medium" weight="bold" tag="span">
                    Point 1:
                </BodyText>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={startCoords[0]}
                    labels={["x", "y"]}
                    onChange={(value) => onChange([value, startCoords[1]])}
                />
            </View>
            <View className={styles.tileRow}>
                <BodyText size="medium" weight="bold" tag="span">
                    Point 2:
                </BodyText>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={startCoords[1]}
                    labels={["x", "y"]}
                    onChange={(value) => onChange([startCoords[0], value])}
                />
            </View>
        </>
    );
};

export default StartCoordsTangent;
