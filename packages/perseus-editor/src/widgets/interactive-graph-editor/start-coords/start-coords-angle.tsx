import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, font, spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyMonospace, BodyText} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordInputRow from "./coord-input-row";
import {getAngleEquation} from "./util";

import type {Coord} from "@khanacademy/perseus";

type AngleCoords = [Coord, Coord, Coord];

type Props = {
    startCoords: AngleCoords;
    allowReflexAngles?: boolean;
    onChange: (startCoords: AngleCoords) => void;
};

const StartCoordsAngle = (props: Props) => {
    const {startCoords, allowReflexAngles, onChange} = props;
    return (
        <>
            {/* Current equation */}
            <View style={styles.equationSection}>
                <BodyText>Starting equation:</BodyText>
                <BodyMonospace style={styles.equationBody}>
                    {getAngleEquation(startCoords, allowReflexAngles)}
                </BodyMonospace>
            </View>

            {/* Points UI */}
            <CoordInputRow
                label="Point 1"
                coord={startCoords[0]}
                onChange={(value) =>
                    onChange([value, startCoords[1], startCoords[2]])
                }
            />
            <CoordInputRow
                label="Vertex"
                coord={startCoords[1]}
                onChange={(value) =>
                    onChange([startCoords[0], value, startCoords[2]])
                }
            />
            <CoordInputRow
                label="Point 2"
                coord={startCoords[2]}
                onChange={(value) =>
                    onChange([startCoords[0], startCoords[1], value])
                }
            />
        </>
    );
};

const styles = StyleSheet.create({
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
});

export default StartCoordsAngle;
