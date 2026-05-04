import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";

import AsymptoteInput from "./asymptote-input";
import styles from "./start-coords-shared.module.css";

import type {Coord} from "@khanacademy/perseus";

type ExponentialStartCoords = {
    coords: [Coord, Coord];
    asymptote: number;
};

type Props = {
    startCoords: ExponentialStartCoords;
    onChange: (startCoords: ExponentialStartCoords) => void;
};

const StartCoordsExponential = (props: Props) => {
    const {startCoords, onChange} = props;
    const {coords, asymptote} = startCoords;

    return (
        <View className={styles.tile}>
            {/* Point 1 */}
            <View className={styles.row}>
                <BodyText weight="bold">Point 1:</BodyText>
                <CoordinatePairInput
                    coord={coords[0]}
                    labels={["x", "y"]}
                    onChange={(value) =>
                        onChange({coords: [value, coords[1]], asymptote})
                    }
                />
            </View>

            {/* Point 2 */}
            <View className={styles.row}>
                <BodyText weight="bold">Point 2:</BodyText>
                <CoordinatePairInput
                    coord={coords[1]}
                    labels={["x", "y"]}
                    onChange={(value) =>
                        onChange({coords: [coords[0], value], asymptote})
                    }
                />
            </View>

            <AsymptoteInput
                axis="y"
                value={asymptote}
                onChange={(newY) =>
                    // Rebuild coords so startCoords gets a new reference;
                    // StatefulMafsGraph only reinitializes on identity change.
                    onChange({coords: [coords[0], coords[1]], asymptote: newY})
                }
            />
        </View>
    );
};

export default StartCoordsExponential;
