import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Body, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import checkCircle from "@phosphor-icons/core/regular/check-circle.svg";
import * as React from "react";

import {mapErrorToString, mockStrings} from "../packages/perseus/src/strings";

import type {KEScore, ShowSolutions} from "@khanacademy/perseus-core";

type DebugCheckAnswerFooterProps = {
    state: KEScore | null | undefined;
    showSolutions: ShowSolutions;
    popover: {
        isOpen: boolean;
        setOpen: (open: boolean) => void;
    };
    actions: {
        reset: () => void;
        skip: () => void;
        check: () => void;
    };
};

/**
 * A component that renders the debug check answer footer for Perseus items
 */
export const DebugCheckAnswerFooter = ({
    state,
    showSolutions,
    popover,
    actions,
}: DebugCheckAnswerFooterProps): React.ReactElement => {
    /**
     * Creates the popover content based on the scoring state
     */
    const getPopoverContent = (state: KEScore | null | undefined) => {
        if (!state) {
            return null;
        }

        // Correct answer
        if (state.correct) {
            return (
                <>
                    <PhosphorIcon
                        size="large"
                        icon={checkCircle}
                        color={color.green}
                        aria-hidden="true"
                    />
                    <View>
                        <LabelLarge>{mockStrings.correctExcited}</LabelLarge>
                        <Body>{mockStrings.nextQuestion}</Body>
                    </View>
                </>
            );
        }

        // Incorrect answer
        if (state.correct === false && !state.empty) {
            return (
                <View>
                    <LabelLarge style={{marginBottom: spacing.xxSmall_6}}>
                        {mockStrings.incorrect}
                    </LabelLarge>
                    <View>{mockStrings.tryAgain}</View>
                </View>
            );
        }

        // Error or "almost there" message
        const title = state?.suppressAlmostThere
            ? mockStrings.tryAgain
            : mockStrings.keepTrying;

        // Use mapErrorToString to correctly map error codes to their text representations
        const errorMessage = state.message
            ? mapErrorToString(state.message, mockStrings)
            : mockStrings.ERROR_MESSAGE;

        return (
            <View>
                <LabelLarge style={{marginBottom: spacing.xSmall_8}}>
                    {title}
                </LabelLarge>
                <Body>{errorMessage}</Body>
            </View>
        );
    };

    // Determine if buttons should be disabled
    const isCheckDisabled = Boolean(state?.correct) || showSolutions === "all";

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                padding: `${spacing.small_12}px ${spacing.medium_16}px`,
                backgroundColor: color.white,
                border: `1px solid ${color.offBlack8}`,
            }}
            aria-label="Debug controls"
            role="region"
        >
            <View>
                <Button
                    kind="tertiary"
                    onClick={actions.reset}
                    aria-label="Reset state"
                >
                    Reset State
                </Button>
            </View>
            <View style={{display: "flex", flexDirection: "row"}}>
                <Button
                    disabled={isCheckDisabled}
                    kind="tertiary"
                    onClick={actions.skip}
                    aria-label="Skip question"
                >
                    Skip
                </Button>
                <Strut size={spacing.small_12} />
                <Popover
                    opened={popover.isOpen}
                    onClose={() => popover.setOpen(false)}
                    showTail={false}
                    content={
                        <PopoverContentCore
                            style={{
                                alignItems: "flex-start",
                                flexDirection: "row",
                                gap: spacing.medium_16,
                                paddingRight: spacing.xxLarge_48,
                            }}
                            closeButtonVisible
                        >
                            {getPopoverContent(state)}
                        </PopoverContentCore>
                    }
                >
                    <Button
                        disabled={isCheckDisabled}
                        onClick={actions.check}
                        aria-label="Check answer"
                    >
                        {mockStrings.check}
                    </Button>
                </Popover>
            </View>
        </View>
    );
};
