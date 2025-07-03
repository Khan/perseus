/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* Component for rendering a letter icon in a library radio choice */

import Button from "@khanacademy/wonder-blocks-button";
import {
    border,
    sizing,
    semanticColor,
    font,
} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {getChoiceLetter} from "../util";

import "./choice-icon.new.css";

interface ChoiceIconProps {
    pos: number;
    checked: boolean;
    focused: boolean;
    hovered: boolean;
    pressed: boolean;
    correct: boolean;
    showCorrectness: boolean;
    multipleSelect: boolean;
    reviewMode: boolean;
    previouslyAnswered: boolean;
}

/**
 * A simplified radio/checkbox choice icon with multiple states
 * including checked/unchecked, correct/incorrect, and focus states.
 * Uses Wonder Blocks Button for more consistent design.
 */
const ChoiceIcon = ({
    checked,
    showCorrectness,
    correct,
    focused,
    hovered,
    multipleSelect,
    pos,
    previouslyAnswered,
    pressed,
}: ChoiceIconProps): React.ReactElement => {
    const {strings} = usePerseusI18n();

    // Determine visualization state for icon
    const showAsChecked =
        checked || (showCorrectness && !correct && previouslyAnswered);

    // Get the letter for the choice (e.g., A, B, C)
    const letter = getChoiceLetter(pos, strings);

    // Determine button appearance based on state
    const kind = showAsChecked ? "primary" : "secondary";

    // WB Button only supports neutral, progressive, and destructive
    let actionType: "neutral" | "progressive" | "destructive" = "neutral";

    if (showCorrectness) {
        // For correctness, use destructive for wrong answers
        // The correct answers will use custom styling for green
        if (!correct && (showAsChecked || previouslyAnswered)) {
            actionType = "destructive"; // Red for incorrect answers
        }
    } else if (showAsChecked || hovered) {
        // Only show progressive style when not showing correctness
        actionType = "progressive";
    }

    // Determine the content to display
    let content = letter;

    if (showCorrectness) {
        if (correct) {
            content = "✓"; // checkmark symbol
        } else {
            content = "—"; // minus symbol
        }
    }

    // Button style based on circle or square shape
    const buttonStyle = {
        borderRadius: multipleSelect
            ? border.radius.radius_040
            : border.radius.radius_full,
        width: sizing.size_240,
        height: sizing.size_240,
        padding: 0,
        minWidth: "unset",
        fontSize: font.body.size.xsmall,
        borderWidth: border.width.medium,
        boxShadow: "none",
        fontWeight: font.weight.bold,
        // Custom styling for correctness states
        ...(showCorrectness && {
            pointerEvents: "none", // Disable hover effects when showing correctness
            ...(correct && {
                // For correct answers, use semantic success background color
                backgroundColor: semanticColor.core.background.success.default,
                borderColor: semanticColor.core.background.success.default,
                color: semanticColor.text.inverse,
            }),
        }),
    };

    return (
        <div className="choice-icon-wrapper">
            <Button
                kind={kind as "primary" | "secondary"}
                actionType={actionType}
                size="small"
                style={buttonStyle}
            >
                {content}
            </Button>
        </div>
    );
};

export default ChoiceIcon;
