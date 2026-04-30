import {View} from "@khanacademy/wonder-blocks-core";
import {BodyMonospace, BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import CoordInput from "./coord-input";
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
            <CoordInput
                label="Point 1"
                coord={startCoords[0]}
                onChange={(value) => onChange([value, startCoords[1]])}
            />
            <CoordInput
                label="Point 2"
                coord={startCoords[1]}
                onChange={(value) => onChange([startCoords[0], value])}
            />
        </>
    );
};

export default StartCoordsTangent;
