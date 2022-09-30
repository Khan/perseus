// @flow
/* Component for rendering a letter icon in a library radio choice */

import Color from "@khanacademy/wonder-blocks-color";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import InlineIcon from "../../../components/inline-icon.jsx";
import {iconCheck, iconMinus} from "../../../icon-paths.js";
import * as styleConstants from "../../../styles/constants.js";
import FocusRing from "../focus-ring.jsx";

import CrossOutLine from "./cross-out-line.jsx";
import sharedStyles, {LIBRARY_ICON_SIZE} from "./shared-styles.js";

type LibraryChoiceIconProps = {
    letter: string,
    a11yText: string,
    checked: boolean,
    crossedOut: boolean,
    focused: boolean,
    hovered: boolean,
    pressed: boolean,
    multipleSelect: boolean,
    correct: ?boolean,
    reviewMode: boolean,
    showCorrectness: boolean,
    primaryProductColor: string,
    previouslyAnswered: boolean,
    transparentBackground?: boolean,
};

function ChoiceInner(props: {
    letter: string,
    showCorrectness: boolean,
    correct: ?boolean,
}) {
    const {letter, showCorrectness, correct} = props;

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
    primaryProductColor: string,
    correct: ?boolean,
    transparentBackground?: boolean,
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
        borderColor = primaryProductColor;
        color = primaryProductColor;
        backgroundColor = transparentBackground
            ? "transparent"
            : styleConstants.white;
    } else if (checked) {
        // Note: kaGreen is not only the default product color,
        // but also the "correctness" color
        const bg =
            showCorrectness && correct ? Color.green : primaryProductColor;
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
        borderRadius = LIBRARY_ICON_SIZE;
    }

    return {backgroundColor, borderColor, color, borderRadius};
}

function LibraryChoiceIcon(props: LibraryChoiceIconProps): React.Node {
    const {
        a11yText,
        checked,
        crossedOut,
        showCorrectness,
        correct,
        focused,
        hovered,
        multipleSelect,
        primaryProductColor,
        previouslyAnswered,
        letter,
        pressed,
        transparentBackground,
    } = props;

    const dynamicStyles = getDynamicStyles(
        checked,
        showCorrectness,
        pressed,
        multipleSelect,
        primaryProductColor,
        correct,
        transparentBackground,
    );

    return (
        <div className={css(sharedStyles.iconWrapper)}>
            <FocusRing
                color={primaryProductColor}
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
                    // used in BaseRadio to check if we actually clicked on the
                    // radio icon
                    data-is-radio-icon={true}
                >
                    <div className="perseus-sr-only">{a11yText}</div>
                    <div aria-hidden>
                        <ChoiceInner
                            letter={letter}
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
    circle: {
        // Make the circle
        width: LIBRARY_ICON_SIZE,
        height: LIBRARY_ICON_SIZE,
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

        // Center the contents of the icon.
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
        fontSize: LIBRARY_ICON_SIZE,
    },

    circleIncorrect: {
        fontSize: LIBRARY_ICON_SIZE,
        borderColor: styleConstants.gray68,
        color: styleConstants.gray68,
    },

    circleIncorrectAnswered: {
        backgroundColor: Color.red,
        borderColor: Color.red,
        color: Color.white,
    },
});

export default LibraryChoiceIcon;
