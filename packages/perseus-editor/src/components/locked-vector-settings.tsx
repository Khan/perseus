/**
 * LockedVectorSettings is a component that allows the user to edit the
 * settings of specifically a locked vector on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import type {AccordionProps} from "./locked-figure-settings";
import type {LockedFigure, LockedVectorType} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import LineSwatch from "./line-swatch";
import * as React from "react";

import LockedFigureSettingsAccordion from "./locked-figure-settings-accordion";
import {StyleSheet} from "aphrodite";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens/dist/tokens/color";

export type Props = LockedVectorType &
    AccordionProps & {
        /**
         * Called when the delete button is pressed.
         */
        onRemove: () => void;
        /**
         * Called when the props (points, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedFigure>) => void;
    };

const LockedVectorSettings = (props: Props) => {
    const {points, color: lineColor, onChangeProps, onRemove} = props;
    const [point1, point2] = points;
    const lineLabel = `Vector (${point1[0]}, ${point1[1]}), (${point2[0]}, ${point2[1]})`;

    return (
        <LockedFigureSettingsAccordion
            expanded={props.expanded}
            onToggle={props.onToggle}
            header={
                <View style={styles.row}>
                    <LabelLarge>{lineLabel}</LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    <LineSwatch color={lineColor} lineStyle="solid" />
                </View>
            }
        ></LockedFigureSettingsAccordion>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default LockedVectorSettings;
