import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyMonospace, BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";

import AsymptoteInput from "./asymptote-input";
import styles from "./start-coords-shared.module.css";
import {getLogarithmEquation} from "./util";

import type {Coord} from "@khanacademy/perseus";

type LogarithmStartCoords = {
    coords: [Coord, Coord];
    asymptote: number;
};

type Props = {
    startCoords: LogarithmStartCoords;
    onChange: (startCoords: LogarithmStartCoords) => void;
};

const StartCoordsLogarithm = (props: Props) => {
    const {startCoords, onChange} = props;
    const {coords, asymptote} = startCoords;

    return (
        <>
            {/* Current equation */}
            <View className={styles.equationSection}>
                <BodyText>Starting equation:</BodyText>
                <BodyMonospace className={styles.equationBody}>
                    {getLogarithmEquation(coords, asymptote)}
                </BodyMonospace>
            </View>

            {/* Points UI */}
            <View className={styles.tile}>
                {/* Point 1 */}
                <View className={styles.row}>
                    <BodyText weight="bold">Point 1:</BodyText>
                    <Strut size={spacing.small_12} />
                    <CoordinatePairInput
                        coord={coords[0]}
                        labels={["x", "y"]}
                        onChange={(value) =>
                            onChange({coords: [value, coords[1]], asymptote})
                        }
                    />
                </View>
                <Strut size={spacing.small_12} />

                {/* Point 2 */}
                <View className={styles.row}>
                    <BodyText weight="bold">Point 2:</BodyText>
                    <Strut size={spacing.small_12} />
                    <CoordinatePairInput
                        coord={coords[1]}
                        labels={["x", "y"]}
                        onChange={(value) =>
                            onChange({coords: [coords[0], value], asymptote})
                        }
                    />
                </View>
                <Strut size={spacing.small_12} />

                {/* Spread coords into a new array on every change so
                    startCoords always gets a new reference (see
                    StartCoordsExponential for the full rationale). */}
                <AsymptoteInput
                    axis="x"
                    value={asymptote}
                    onChange={(newX) =>
                        onChange({
                            coords: [coords[0], coords[1]],
                            asymptote: newX,
                        })
                    }
                />
            </View>
        </>
    );
};

export default StartCoordsLogarithm;
