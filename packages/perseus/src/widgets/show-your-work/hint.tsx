import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import caretUp from "@phosphor-icons/core/regular/caret-up.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {Step} from "@math-blocks/solver";

type Props = {
    hint: Step;
    level: number;
};

export const Hint = ({hint, level}: Props) => {
    const [expanded, setExpanded] = React.useState(false);
    const background =
        level % 2 === 0
            ? {
                  background: color.offBlack8,
              }
            : {
                  background: color.offWhite,
              };

    const showCaret = hint.substeps.length > 0;

    return (
        <View style={[styles.hint, background]}>
            <View style={styles.textContainer}>
                <LabelMedium style={showCaret && styles.spaceForCaret}>
                    {hint.message}
                </LabelMedium>
                {showCaret && (
                    <IconButton
                        style={styles.icon}
                        icon={expanded ? caretUp : caretDown}
                        size="xsmall"
                        onClick={() => setExpanded((expanded) => !expanded)}
                    />
                )}
            </View>
            {expanded &&
                hint.substeps.map((substep, i) => (
                    <Hint key={i} hint={substep} level={level + 1} />
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    hint: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: color.offBlack16,
        padding: 6,
        marginTop: 6,
        flexShrink: 0,
    },
    textContainer: {
        position: "relative",
    },
    spaceForCaret: {
        paddingRight: 20,
    },
    icon: {
        position: "absolute",
        right: 6,
        bottom: 6,
        zIndex: 100,
    },
});
