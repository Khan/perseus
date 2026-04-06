import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {
    border,
    semanticColor,
    sizing,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import checkCircle from "@phosphor-icons/core/regular/check-circle.svg";
import * as React from "react";

import {mapErrorToString, mockStrings} from "../strings";
import {isCorrect} from "../util/scoring";

import type {PerseusScore, ShowSolutions} from "@khanacademy/perseus-core";

type DebugCheckAnswerFooterProps = {
    score: PerseusScore | undefined;
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
    score,
    showSolutions,
    popover,
    actions,
}: DebugCheckAnswerFooterProps): React.ReactElement => {
    /**
     * Creates the popover content based on the scoring state
     */
    const getPopoverContent = (score: PerseusScore | undefined) => {
        if (!score) {
            return null;
        }

        if (score.type === "invalid") {
            // Error or "almost there" message
            const title = score.suppressAlmostThere
                ? mockStrings.tryAgain
                : mockStrings.keepTrying;

            // Use mapErrorToString to correctly map error codes to their text representations
            const errorMessage = score.message
                ? mapErrorToString(score.message, mockStrings)
                : mockStrings.ERROR_MESSAGE;

            return (
                <View>
                    <BodyText
                        size="medium"
                        weight="bold"
                        style={styles.errorLabel}
                    >
                        {title}
                    </BodyText>
                    <BodyText>{errorMessage}</BodyText>
                </View>
            );
        }

        if (isCorrect(score)) {
            return (
                <>
                    <PhosphorIcon
                        size="large"
                        icon={checkCircle}
                        color={semanticColor.core.foreground.success.subtle}
                        aria-hidden="true"
                    />
                    <View>
                        <BodyText size="medium" weight="bold">
                            {mockStrings.correctExcited}
                        </BodyText>
                        <BodyText>{mockStrings.nextQuestion}</BodyText>
                    </View>
                </>
            );
        }

        // Incorrect answer
        {
            return (
                <View>
                    <BodyText
                        size="medium"
                        weight="bold"
                        style={styles.incorrectLabel}
                    >
                        {mockStrings.incorrect}
                    </BodyText>
                    <View>{mockStrings.tryAgain}</View>
                </View>
            );
        }
    };

    // Determine if buttons should be disabled
    const isCheckDisabled =
        (score != null && isCorrect(score)) || showSolutions === "all";

    return (
        <View
            style={styles.container}
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
            <View style={styles.buttonContainer}>
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
                            style={styles.popoverContent}
                            closeButtonVisible
                        >
                            {getPopoverContent(score)}
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

const styles = {
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: `${sizing.size_120} ${sizing.size_160}`,
        // We're using a hard coded white here to avoid a semantic colour issue. Given that this is just dev tooling,
        // we'll wait to update this back to semantic colours after the token names have settled.
        backgroundColor: "#FFFFFF",
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
    },
    incorrectLabel: {
        marginBottom: sizing.size_060,
    },
    errorLabel: {
        marginBottom: sizing.size_080,
    },
    popoverContent: {
        alignItems: "flex-start",
        flexDirection: "row",
        gap: sizing.size_160,
        paddingRight: sizing.size_480,
    },
} as const;
