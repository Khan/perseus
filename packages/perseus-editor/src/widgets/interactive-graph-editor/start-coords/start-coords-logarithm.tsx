import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {semanticColor, font, spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    BodyMonospace,
    LabelLarge,
    LabelMedium,
} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";
import ScrolllessNumberTextField from "../../../components/scrollless-number-text-field";

import {getLogarithmEquation} from "./util";

import type {Coord} from "@khanacademy/perseus";

type Props = {
    startCoords: [Coord, Coord];
    startAsymptote: [Coord, Coord];
    onChangeCoords: (startCoords: [Coord, Coord]) => void;
    onChangeAsymptote: (startAsymptote: [Coord, Coord]) => void;
};

const StartCoordsLogarithm = (props: Props) => {
    const {startCoords, startAsymptote, onChangeCoords, onChangeAsymptote} =
        props;

    const asymptoteX = startAsymptote[0][0];

    // Keep track of the asymptote x value as a string for editing.
    const [asymptoteXState, setAsymptoteXState] = React.useState(
        asymptoteX.toString(),
    );

    // Update local state when props change (e.g. reset to defaults).
    React.useEffect(() => {
        setAsymptoteXState(asymptoteX.toString());
    }, [asymptoteX]);

    function handleAsymptoteXChange(newValue: string) {
        setAsymptoteXState(newValue);

        if (isNaN(+newValue) || newValue === "") {
            return;
        }

        const newX = +newValue;
        onChangeAsymptote([
            [newX, startAsymptote[0][1]],
            [newX, startAsymptote[1][1]],
        ]);
    }

    return (
        <>
            {/* Current equation */}
            <View style={styles.equationSection}>
                <LabelMedium>Starting equation:</LabelMedium>
                <BodyMonospace style={styles.equationBody}>
                    {getLogarithmEquation(startCoords, startAsymptote)}
                </BodyMonospace>
            </View>

            {/* Points UI */}
            <View style={styles.tile}>
                <LabelLarge>Point 1:</LabelLarge>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={startCoords[0]}
                    labels={["x", "y"]}
                    onChange={(value) =>
                        onChangeCoords([value, startCoords[1]])
                    }
                />
            </View>
            <View style={styles.tile}>
                <LabelLarge>Point 2:</LabelLarge>
                <Strut size={spacing.small_12} />
                <CoordinatePairInput
                    coord={startCoords[1]}
                    labels={["x", "y"]}
                    onChange={(value) =>
                        onChangeCoords([startCoords[0], value])
                    }
                />
            </View>

            {/* Asymptote UI */}
            <View style={styles.tile}>
                <LabelLarge>Asymptote:</LabelLarge>
                <Strut size={spacing.small_12} />
                <LabelMedium tag="label" style={styles.row}>
                    x
                    <Strut size={spacing.xxSmall_6} />
                    <ScrolllessNumberTextField
                        value={asymptoteXState}
                        onChange={handleAsymptoteXChange}
                        style={styles.textField}
                    />
                </LabelMedium>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    tile: {
        backgroundColor: semanticColor.core.background.instructive.subtle,
        marginTop: spacing.xSmall_8,
        padding: spacing.small_12,
        borderRadius: spacing.xSmall_8,
        flexDirection: "row",
        alignItems: "center",
    },
    equationSection: {
        marginTop: spacing.small_12,
    },
    equationBody: {
        backgroundColor: semanticColor.core.background.neutral.subtle,
        border: `1px solid ${semanticColor.core.border.neutral.subtle}`,
        marginTop: spacing.xSmall_8,
        paddingLeft: spacing.xSmall_8,
        paddingRight: spacing.xSmall_8,
        fontSize: font.size.xSmall,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    textField: {
        width: spacing.xxxLarge_64,
    },
});

export default StartCoordsLogarithm;
