import {StatusBadge} from "@khanacademy/wonder-blocks-badge";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import minusCircleIcon from "@phosphor-icons/core/bold/minus-circle-bold.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

interface RadioStatusPillProps {
    index: number;
    correct?: boolean;
    multipleSelect: boolean;
}

/**
 * A read-only status indicator showing whether a choice is correct (a green
 * check) or incorrect (a red minus), labelled with the choice letter (A, B,
 * C...). Status is changed via the adjacent segmented control, so this is no
 * longer interactive — it is a Wonder Blocks `StatusBadge`.
 */
export function RadioStatusPill({
    index,
    correct,
    multipleSelect,
}: RadioStatusPillProps) {
    return (
        <StatusBadge
            kind={correct ? "success" : "critical"}
            icon={<PhosphorIcon icon={correct ? checkIcon : minusCircleIcon} />}
            label={String.fromCharCode(65 + index)}
            styles={{
                root: [
                    styles.badge,
                    // Round for single select, square for multiple select.
                    multipleSelect ? styles.square : styles.round,
                    // Correct uses the strong (dark green) fill with knockout
                    // (white) content, matching the runtime choice indicator.
                    // Incorrect keeps StatusBadge's default subtle critical
                    // (light red) styling.
                    correct && styles.correctStrong,
                ],
                label: correct ? styles.knockoutForeground : undefined,
                icon: correct ? styles.knockoutForeground : undefined,
            }}
        />
    );
}

const styles = StyleSheet.create({
    badge: {
        marginInlineEnd: sizing.size_080,
    },
    round: {
        borderRadius: sizing.size_240,
    },
    square: {
        borderRadius: border.radius.radius_040,
    },
    correctStrong: {
        backgroundColor: semanticColor.core.background.success.strong,
        borderColor: semanticColor.core.border.success.strong,
    },
    knockoutForeground: {
        color: semanticColor.core.foreground.knockout.default,
    },
});
