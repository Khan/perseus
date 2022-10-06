// @flow
/* Component for rendering a letter icon in a SAT radio choice */

import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import * as styleConstants from "../../../styles/constants.js";

import CrossOutLine from "./cross-out-line.jsx";
import sharedStyles, {SAT_ICON_SIZE} from "./shared-styles.js";

type SATChoiceIconProps = {
    letter: string,
    a11yText: string,
    checked: boolean,
    multipleSelect: boolean,
    correct: boolean,
    reviewMode: boolean,
    crossedOut: boolean,
};

// TODO(amy): figure out a better scheme for specifying these
// styles that isn't such a pain to grok. See some neat ideas
// from MDR in https://phabricator.khanacademy.org/D35249.
function constructSATStyles(
    reviewMode: boolean,
    correct: boolean,
    checked: boolean,
    multipleSelect: boolean,
): {
    color: string,
    backgroundColor: ?string,
    borderColor: string,
    borderRadius: number,
} {
    let backgroundColor;
    let borderColor = styleConstants.satBlue;
    let color = styleConstants.satBlue;
    if (reviewMode) {
        if (correct) {
            borderColor = styleConstants.satCorrectColor;
            color = checked
                ? styleConstants.white
                : styleConstants.satCorrectColor;
            backgroundColor = checked
                ? styleConstants.satCorrectColor
                : styleConstants.white;
        } else if (checked) {
            borderColor = styleConstants.satIncorrectColor;
            color = styleConstants.white;
            backgroundColor = styleConstants.satIncorrectColor;
        }
    } else if (checked) {
        color = styleConstants.white;
        backgroundColor = styleConstants.satBlue;
    }

    let borderRadius;
    if (multipleSelect) {
        borderRadius = 3;
    } else {
        borderRadius = SAT_ICON_SIZE;
    }

    return {color, backgroundColor, borderColor, borderRadius};
}

function SATChoiceIcon(props: SATChoiceIconProps): React.Node {
    const {
        letter,
        a11yText,
        crossedOut,
        reviewMode,
        correct,
        checked,
        multipleSelect,
    } = props;

    const {color, backgroundColor, borderColor, borderRadius} =
        constructSATStyles(reviewMode, correct, checked, multipleSelect);

    return (
        <div className={css(sharedStyles.iconWrapper)}>
            <div
                className={css(styles.satCircle)}
                data-test-id="choice-icon__sat-choice-icon"
                style={{backgroundColor, borderColor, borderRadius}}
            />
            <div style={{color}} className={css(styles.letter)}>
                <span className="perseus-sr-only">{a11yText}</span>
                <span aria-hidden="true">{letter}</span>
            </div>
            {crossedOut && <CrossOutLine color={borderColor} sat={true} />}
        </div>
    );
}

const styles = StyleSheet.create({
    satCircle: {
        display: "block",
        borderStyle: "solid",
        borderWidth: 2,
        content: `''`,
        height: SAT_ICON_SIZE,
        width: SAT_ICON_SIZE,
        top: 1,
        left: 1,
    },
    letter: {
        // These properties make sure that this element has the exact
        // same size as `circle` so that we can center things
        // inside of it.
        border: "2px solid transparent",
        width: SAT_ICON_SIZE,
        height: SAT_ICON_SIZE,
        position: "absolute",
        top: 1,

        // Center contained items.
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontFamily: styleConstants.boldFontFamily,
        fontSize: 13,
    },
});

export default SATChoiceIcon;
