/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* Component for rendering a letter icon in a library radio choice */

import {color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import InlineIcon from "../../../components/inline-icon";
import {iconCheck, iconMinus} from "../../../icon-paths";
import * as styleConstants from "../../../styles/constants";
import FocusRing from "../focus-ring";
import {getChoiceLetter} from "../util";

import CrossOutLine from "./cross-out-line";
import sharedStyles, {CHOICE_ICON_SIZE} from "./shared-styles";

type ChoiceIconProps = {
    pos: number;
    checked: boolean;
    crossedOut: boolean;
    focused: boolean;
    hovered: boolean;
    pressed: boolean;
    correct: boolean;
    showCorrectness: boolean;
    multipleSelect: boolean;
    reviewMode: boolean;
    previouslyAnswered: boolean;
};

type ChoiceInnerProps = {
    pos: number;
    showCorrectness: boolean;
    correct: boolean | null | undefined;
};

function ChoiceInner(props: ChoiceInnerProps) {
    const {pos, showCorrectness, correct} = props;
    const {strings} = usePerseusI18n();
    const letter = getChoiceLetter(pos, strings);

    if (!showCorrectness) {
        return <span>{letter}</span>;
    }
    if (correct) {
        return (
            <InlineIcon
                {...iconCheck}
                style={{
                    position: "relative",
                    top: -1,
                }}
            />
        );
    }
    return <InlineIcon {...iconMinus} />;
}

// Handle dynamic styling of the multiple choice icon. Most
// MC icon styles are constant, but we do allow the caller
// to specify the selected color, and thus must control styles
// related to the selected state dynamically.
function getDynamicStyles(
    checked: boolean,
    showCorrectness: boolean,
    pressed: boolean,
    multipleSelect: boolean,
    correct?: boolean | null,
): {
    backgroundColor: string | undefined;
    borderColor: string;
    color: string;
    borderRadius: number;
} {
    // TODO: Rewrite this logic into the Aphrodite styling (at the bottom of this document).
    //       Make sure that stories exist that test all variations of this function.
    //          Add stories if any are missing.
    let backgroundColor: string | undefined;
    let borderColor: string;
    let color: string;
    if (!showCorrectness && pressed) { // never show color changes while being pressed
        borderColor = WBColor.blue;
        color = WBColor.blue;
        backgroundColor = "transparent";
    } else if (checked) { // not being pressed, option is checked
        // first handle showCorrectness
        // then handle correct/incorrect
        const bg = correct ? WBColor.green : WBColor.red;
        color = styleConstants.white;
        backgroundColor = bg;
        borderColor = bg;
    } else { // not checked, not being pressed
        borderColor = WBColor.offBlack64;
        color = WBColor.offBlack64;
    }

    // define shape
    let borderRadius;
    if (multipleSelect) {
        borderRadius = 3;
    } else {
        borderRadius = CHOICE_ICON_SIZE;
    }

    return {backgroundColor, borderColor, color, borderRadius};
}

const ChoiceIcon = function (props: ChoiceIconProps): React.ReactElement {
    const {
        checked,
        crossedOut,
        showCorrectness,
        correct,
        focused,
        hovered,
        multipleSelect,
        pos,
        previouslyAnswered, // Used in "review mode"/"show rationale" to show that option was previously chosen
        pressed,
    } = props;

    const dynamicStyles = getDynamicStyles(
        checked, // Learner selected the choice
        showCorrectness, // Lets learner see if the choice is correct or not
        pressed, // Is learner in the process of choosing option (aka mousedown)
        multipleSelect, // Single-select are circles, multi-select are square
        correct, // Choice is correct
    );

    const choiceStyling = [
        styles.choiceBase,
        multipleSelect ? styles.multiSelectShape : styles.singleSelectShape,
        showCorrectness ? styles.choiceHasIcon : styles.choiceHasLetter,
        checked ? styles.choiceIsChecked : styles.choiceIsUnchecked,
    ];
    if (showCorrectness && correct && checked) {
        choiceStyling.push(styles.choiceCorrect);
    } else if (showCorrectness && !correct && (checked || previouslyAnswered)) {
        choiceStyling.push(styles.choiceIncorrect);
    } else if (checked) {
        // Show filled neutral blue color (showCorrectness is false)
        choiceStyling.push(styles.choiceNeutral);
    } else if (pressed) {
        // Show outlined neutral blue color (showCorrectness is false)
        choiceStyling.push(styles.activeNeutral);
    } else {
        // choice is not checked
        choiceStyling.push(styles.uncheckedColors);
    }

    return (
        <div className={css(sharedStyles.iconWrapper)}>
            <FocusRing
                color={WBColor.blue}
                visible={focused || hovered}
                multipleSelect={multipleSelect}
            >
                <div
                    data-testid="choice-icon__library-choice-icon"
                    className={css(...choiceStyling)}
                    // used in BaseRadio editMode to check
                    // if we actually clicked on the radio icon
                    data-is-radio-icon={true}
                >
                    <div className={css(styles.innerWrapper)}>
                        <ChoiceInner
                            pos={pos}
                            showCorrectness={showCorrectness}
                            correct={correct}
                        />
                    </div>
                </div>
            </FocusRing>
            {
                // TODO: Need to account for loss of dynamicStyles variable
            }
            {crossedOut && <CrossOutLine color={dynamicStyles.borderColor} />}
        </div>
    );
};

const styles = StyleSheet.create({
    innerWrapper: {
        width: CHOICE_ICON_SIZE,
        height: CHOICE_ICON_SIZE,

        // Center the contents of the icon.
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    choiceBase: {
        width: CHOICE_ICON_SIZE,
        height: CHOICE_ICON_SIZE,
        boxSizing: "border-box",
        borderStyle: "solid",
        borderWidth: 2,

        // The default icons have letters in them. Style those letters.
        fontFamily: styleConstants.baseFontFamily,
        // NOTE(emily): We explicitly set the font weight instead of using the
        // "bold font family" so that characters which fall back to the default
        // font get bolded too.
        fontWeight: "bold",

        // Center the icon wrapper.
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // HACK(emily): I don't know why adding this line height makes the text
        // appear centered better than any other value, but it does. In
        // particular, at large zoom levels this line height does almost
        // nothing, but at the default size this shifts the letter down one
        // pixel so it is much better centered.
        lineHeight: "1px",
    },

    choiceHasLetter: {
        fontSize: 12,
    },

    choiceHasIcon: {
        fontSize: CHOICE_ICON_SIZE,
    },

    choiceIsChecked: {
        color: WBColor.white,
    },

    choiceIsUnchecked: {
        color: WBColor.offBlack64,
    },

    choiceCorrect: {
        backgroundColor: WBColor.green,
        borderColor: WBColor.green,
    },

    choiceIncorrect: {
        backgroundColor: WBColor.red,
        borderColor: WBColor.red,
    },

    choiceNeutral: {
        backgroundColor: WBColor.blue,
        borderColor: WBColor.blue,
    },

    activeNeutral: {
        color: WBColor.blue,
        borderColor: WBColor.blue,
        backgroundColor: "transparent",
    },

    multiSelectShape: {
        borderRadius: 3,
    },

    singleSelectShape: {
        borderRadius: CHOICE_ICON_SIZE,
    },

    uncheckedColors: {
        borderColor: WBColor.offBlack64,
    },
});

export default ChoiceIcon;
