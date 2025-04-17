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

/**
 * This component is a duplicate of the ChoiceIcon component in choice-icon.tsx
 * for the Radio Revitalization Project. (LEMS-2933)
 * This component will eventually replace choice-icon.tsx when the feature flag is no longer needed.
 *
 * TODO(LEMS-2994): Clean up this file.
 */
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

    // Accounts for incorrect choice still displaying as learner tries again
    const choiceIsChecked =
        checked || (showCorrectness && !correct && previouslyAnswered);

    // Core styling
    const choiceStyling = [
        styles.choiceBase,
        multipleSelect ? styles.multiSelectShape : styles.singleSelectShape,
        showCorrectness ? styles.choiceHasIcon : styles.choiceHasLetter,
        choiceIsChecked ? styles.choiceIsChecked : styles.choiceIsUnchecked,
    ];

    // Color styling
    // Handle dynamic styling of the multiple choice icon. Most
    // MC icon styles are constant, but we do allow the caller
    // to specify the selected color, and thus must control styles
    // related to the selected state dynamically.
    let crossOutColor: string;
    if (showCorrectness && correct && checked) {
        choiceStyling.push(styles.choiceCorrect);
        crossOutColor = WBColor.green;
    } else if (showCorrectness && !correct && (checked || previouslyAnswered)) {
        choiceStyling.push(styles.choiceIncorrect);
        crossOutColor = WBColor.red;
    } else if (checked) {
        // Show filled neutral blue color (showCorrectness is false)
        choiceStyling.push(styles.choiceNeutral);
        crossOutColor = WBColor.blue;
    } else if (pressed) {
        // Show outlined neutral blue color (showCorrectness is false)
        choiceStyling.push(styles.activeNeutral);
        crossOutColor = WBColor.blue;
    } else {
        // choice is not checked
        choiceStyling.push(styles.uncheckedColors);
        crossOutColor = WBColor.offBlack64;
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
            {crossedOut && <CrossOutLine color={crossOutColor} />}
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
