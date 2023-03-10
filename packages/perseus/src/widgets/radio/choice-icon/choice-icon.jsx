// @flow
/* Component for rendering a letter icon in a library radio choice */

import Color from "@khanacademy/wonder-blocks-color";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import InlineIcon from "../../../components/inline-icon.jsx";
import {iconCheck, iconMinus} from "../../../icon-paths.js";
import * as styleConstants from "../../../styles/constants.js";
import FocusRing from "../focus-ring.jsx";
import {getChoiceLetter} from "../util.js";

import CrossOutLine from "./cross-out-line.jsx";
import sharedStyles, {CHOICE_ICON_SIZE} from "./shared-styles.js";

type ChoiceIconProps = {
    pos: number,
    checked: boolean,
    crossedOut: boolean,
    focused: boolean,
    hovered: boolean,
    pressed: boolean,
    correct: boolean,
    showCorrectness: boolean,
    multipleSelect: boolean,
    reviewMode: boolean,
    previouslyAnswered: boolean,
};

function ChoiceInner(props: {
    pos: number,
    showCorrectness: boolean,
    correct: ?boolean,
}) {
    const {pos, showCorrectness, correct} = props;
    const letter = getChoiceLetter(pos);

    if (!showCorrectness) {
        return letter;
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
    correct: ?boolean,
): {
    backgroundColor: ?string,
    borderColor: string,
    color: string,
    borderRadius: number,
} {
    let backgroundColor;
    let borderColor;
    let color;
    if (!showCorrectness && pressed) {
        borderColor = Color.blue;
        color = Color.blue;
        backgroundColor = "transparent";
    } else if (checked) {
        const bg = showCorrectness && correct ? Color.green : Color.blue;
        color = styleConstants.white;
        backgroundColor = bg;
        borderColor = bg;
    } else {
        borderColor = Color.offBlack64;
        color = Color.offBlack64;
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

function ChoiceIcon(props: ChoiceIconProps): React.Node {
    const {
        checked,
        crossedOut,
        showCorrectness,
        correct,
        focused,
        hovered,
        multipleSelect,
        pos,
        previouslyAnswered,
        pressed,
    } = props;

    const dynamicStyles = getDynamicStyles(
        checked,
        showCorrectness,
        pressed,
        multipleSelect,
        correct,
    );

    return (
        <div className={css(sharedStyles.iconWrapper)}>
            <FocusRing
                color={Color.blue}
                visible={focused || hovered}
                multipleSelect={multipleSelect}
            >
                <div
                    style={dynamicStyles}
                    data-test-id="choice-icon__library-choice-icon"
                    className={css(
                        styles.circle,
                        showCorrectness && correct && styles.circleCorrect,
                        showCorrectness && !correct && styles.circleIncorrect,
                        showCorrectness &&
                            !correct &&
                            (checked || previouslyAnswered) &&
                            styles.circleIncorrectAnswered,
                    )}
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
            {crossedOut && <CrossOutLine color={dynamicStyles.borderColor} />}
        </div>
    );
}

const styles = StyleSheet.create({
    innerWrapper: {
        width: CHOICE_ICON_SIZE,
        height: CHOICE_ICON_SIZE,

        // Center the contents of the icon.
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    circle: {
        // Make the circle
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
        fontSize: 12,

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

    circleCorrect: {
        fontSize: CHOICE_ICON_SIZE,
    },

    circleIncorrect: {
        fontSize: CHOICE_ICON_SIZE,
        borderColor: styleConstants.gray68,
        color: styleConstants.gray68,
    },

    circleIncorrectAnswered: {
        backgroundColor: Color.red,
        borderColor: Color.red,
        color: Color.white,
    },
});

export default ChoiceIcon;
