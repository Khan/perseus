import {PolarMath} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";

type Props = {
    k: number;
    /** False when the author fixed k: the value shows, the buttons do not. */
    canChange: boolean;
    disabled: boolean;
    onChange: (k: number) => void;
};

/** The rose's k, read out under the graph, with buttons to step it. */
export function RoseKControls({k, canChange, disabled, onChange}: Props) {
    const {strings} = usePerseusI18n();
    const setK = (next: number) =>
        onChange(
            Math.min(
                PolarMath.MAX_ROSE_K,
                Math.max(PolarMath.MIN_ROSE_K, next),
            ),
        );
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.xSmall_8,
                marginBlockStart: spacing.xSmall_8,
            }}
        >
            <BodyText size="small" tag="span">
                {strings.polarRoseKLabel}
            </BodyText>
            {canChange && (
                <Button
                    kind="secondary"
                    size="small"
                    aria-label={strings.polarRoseDecreaseK}
                    disabled={disabled || k <= PolarMath.MIN_ROSE_K}
                    onClick={() => setK(k - 1)}
                >
                    −
                </Button>
            )}
            <BodyText size="small" weight="bold" tag="span" aria-live="polite">
                {k}
            </BodyText>
            {canChange && (
                <Button
                    kind="secondary"
                    size="small"
                    aria-label={strings.polarRoseIncreaseK}
                    disabled={disabled || k >= PolarMath.MAX_ROSE_K}
                    onClick={() => setK(k + 1)}
                >
                    +
                </Button>
            )}
        </View>
    );
}
