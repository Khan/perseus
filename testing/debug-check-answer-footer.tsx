import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {Body, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import checkCircle from "@phosphor-icons/core/regular/check-circle.svg";
import * as React from "react";

import {mapErrorToString, mockStrings} from "../packages/perseus/src/strings";

import type {KEScore} from "@khanacademy/perseus-core";

// Constants for popover messages
const POPOVER_STRINGS = {
    correct: {
        title: "Correct!",
        message: "You got it. Onward!",
    },
    incorrect: {
        title: "Incorrect!",
        message: "Please check your answer",
    },
};

type DebugCheckAnswerFooterProps = {
    state: KEScore | null | undefined;
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
    popover,
    actions,
}: DebugCheckAnswerFooterProps): React.ReactElement => {
    /**
     * Get the content for the popover based on the state
     */
    const getPopoverContent = (state: KEScore | null | undefined) => {
        if (!state) {
            return null;
        }

        if (state.correct) {
            return (
                <>
                    <PhosphorIcon
                        size="large"
                        icon={checkCircle}
                        color="green"
                    />
                    <View>
                        <LabelLarge>{POPOVER_STRINGS.correct.title}</LabelLarge>
                        <Body>{POPOVER_STRINGS.correct.message}</Body>
                    </View>
                </>
            );
        }

        if (state.correct === false && !state.empty) {
            return (
                <View>
                    <View style={{fontWeight: "bold", marginBottom: 8}}>
                        {POPOVER_STRINGS.incorrect.title}
                    </View>
                    <View>{POPOVER_STRINGS.incorrect.message}</View>
                </View>
            );
        }

        const title = state?.suppressAlmostThere
            ? "Please check your answer"
            : "You're almost there";
        const errorMessage = mapErrorToString(state.message, mockStrings);
        return (
            <View>
                <View style={{fontWeight: "bold", marginBottom: 8}}>
                    {title}
                </View>
                <View>{errorMessage}</View>
            </View>
        );
    };

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
                padding: "10px 20px",
                backgroundColor: "white",
                border: "1px solid #e0e0e0",
            }}
        >
            <View>
                <Button
                    kind="tertiary"
                    color="destructive"
                    onClick={actions.reset}
                >
                    Reset State
                </Button>
            </View>
            <View style={{display: "flex", flexDirection: "row"}}>
                <Button
                    disabled={(state && state?.correct) || false}
                    kind="tertiary"
                    onClick={actions.skip}
                >
                    Skip
                </Button>
                <Strut size={8} />
                <Popover
                    opened={popover.isOpen}
                    onClose={() => popover.setOpen(false)}
                    content={
                        <PopoverContentCore
                            style={{
                                alignItems: "center",
                                flexDirection: "row",
                                gap: spacing.medium_16,
                            }}
                            closeButtonVisible
                        >
                            {getPopoverContent(state)}
                        </PopoverContentCore>
                    }
                >
                    <Button
                        disabled={(state && state?.correct) || false}
                        onClick={actions.check}
                    >
                        Check
                    </Button>
                </Popover>
            </View>
        </View>
    );
};
