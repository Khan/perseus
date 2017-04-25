// @flow

/* Component for rendering a letter icon in radio choice */

/* global i18n */

const React = require('react');
const {StyleSheet, css} = require("aphrodite");

const styleConstants = require("../../styles/constants.js");

// TODO(amy): figure out a better way to make flow recognize
// the i18n global
declare var i18n: {
    _(text: string, interpolations?: {[k: string]: string}): string,
};


type ChoiceIconProps = {
    pos: number,
    checked: boolean,
    correct: ?boolean,
    // TODO(amy): if we go this "product" flag route, define this type
    // somewhere shared
    product: "sat" | "gtp",
    reviewMode: boolean,
};
class ChoiceIcon extends React.Component {

    props: ChoiceIconProps

    a11yText(letter: string) {
        // If the option was checked we need to reveal more context about
        // what the result was (correct/incorrect)
        if (this.props.checked) {
            if (typeof this.props.correct === "boolean") {
                if (this.props.correct) {
                    return i18n._("(Choice %(letter)s, Checked, Correct)",
                                  {letter: letter});
                } else {
                    return i18n._("(Choice %(letter)s, Checked, Incorrect)",
                                  {letter: letter});
                }
            }

            return i18n._("(Choice %(letter)s, Checked)", {letter: letter});

            // If the option wasn't checked, but was correct, we need to tell
            // the user that this was, in fact, the correct answer.
        } else if (this.props.correct) {
            return i18n._("(Choice %(letter)s, Correct Answer)",
                          {letter: letter});
        }

        return i18n._("(Choice %(letter)s)", {letter: letter});
    }

    // TODO(amy): figure out a better scheme for specifying these
    // styles that isn't such a pain to grok. See some neat ideas
    // from MDR in https://phabricator.khanacademy.org/D35249.
    constructStyles(reviewMode: boolean,
                    product: string,
                    correct: ?boolean,
                    checked: boolean) {
        let color;
        let backgroundColor;
        let borderColor;
        if (this.props.product === "sat") {
            borderColor = styleConstants.satBlue;
            color = styleConstants.satBlue;
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
            // TODO(amy): if gtp/sat stay this similar, consolidate the
            // the styling logic.
        } else if (this.props.product === "gtp") {
            borderColor = styleConstants.gray41;
            color = styleConstants.gray41;
            if (reviewMode) {
                if (correct) {
                    // TODO(amy): update these colors when gtp
                    // reviewMode styles have solidified
                    borderColor = styleConstants.gtpCorrectColor;
                    color = checked
                          ? styleConstants.white
                          : styleConstants.gtpCorrectColor;
                    backgroundColor = checked
                                    ? styleConstants.gtpCorrectColor
                                    : styleConstants.white;
                } else if (checked) {
                    borderColor = styleConstants.gtpIncorrectColor;
                    color = styleConstants.white;
                    backgroundColor = styleConstants.gtpIncorrectColor;
                }
            } else if (checked) {
                color = styleConstants.white;
                backgroundColor = styleConstants.gtpBlue;
                borderColor = styleConstants.gtpBlue;
            }
        }
        return {color, backgroundColor, borderColor};
    }

    render() {
        const {reviewMode, checked, correct, product} = this.props;
        // NOTE(jeresig): This is not i18n appropriate and should probably be
        // changed to a map of common options that are properly translated.
        const letter = String.fromCharCode(65 + this.props.pos);

        const {color, backgroundColor, borderColor} = this.constructStyles(
            reviewMode, product, correct, checked);
        return <div>
            <div
                className={css(styles.circle)}
                style={{backgroundColor, borderColor}}
            />
            <div style={{color}} className={css(styles.letter)}>
                <span className="perseus-sr-only">
                    {this.a11yText(letter)}
                </span>
                <span aria-hidden="true">{letter}</span>
            </div>
        </div>;
    }
}

const styles = StyleSheet.create({
    circle: {
        display: "block",
        borderRadius: 25,
        borderStyle: "solid",
        borderWidth: 2,
        content: `''`,
        height: 25,
        width: 25,
        position: "absolute",
        top: 1,
        left: 1,
    },
    letter: {
        // These properties make sure that this element has the exact
        // same size as `circle` so that we can center things
        // inside of it.
        border: "2px solid transparent",
        width: 25,
        height: 25,
        position: "absolute",
        left: 1,
        top: 1,

        // Center contained items.
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontFamily: styleConstants.boldFontFamily,
        fontSize: 13,
    },
});
module.exports = ChoiceIcon;
