// @flow

/* Component for rendering a letter icon in radio choice */

/* global i18n */

const React = require("react");
const {StyleSheet, css} = require("aphrodite");

const styleConstants = require("../../styles/constants.js");
const {iconCheck, iconMinus} = require("../../icon-paths.js");
const InlineIcon = require("../../components/inline-icon.jsx");

class SATChoiceIcon extends React.Component {
    props: {
        letter: string,
        a11yText: string,
        checked: boolean,
        correct: boolean,
        reviewMode: boolean,
    };

    // TODO(amy): figure out a better scheme for specifying these
    // styles that isn't such a pain to grok. See some neat ideas
    // from MDR in https://phabricator.khanacademy.org/D35249.
    constructStyles(
        reviewMode: boolean,
        correct: boolean,
        checked: boolean
    ): {color: string, backgroundColor: ?string, borderColor: string} {
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
        return {color, backgroundColor, borderColor};
    }

    render() {
        const {letter, a11yText, reviewMode, checked, correct} = this.props;
        const {color, backgroundColor, borderColor} = this.constructStyles(
            reviewMode,
            correct,
            checked
        );

        return (
            <div>
                <div
                    className={css(styles.satCircle)}
                    style={{backgroundColor, borderColor}}
                />
                <div style={{color}} className={css(styles.letter)}>
                    <span className="perseus-sr-only">
                        {a11yText}
                    </span>
                    <span aria-hidden="true">
                        {letter}
                    </span>
                </div>
            </div>
        );
    }
}

class LibraryChoiceIcon extends React.Component {
    props: {
        letter: string,
        a11yText: string,
        checked: boolean,
        pressed: boolean,
        focused: boolean,
        correct: ?boolean,
        reviewMode: boolean,
        showCorrectness: boolean,
        primaryProductColor: string,
    };

    getChoiceInner() {
        const {letter, showCorrectness, correct} = this.props;

        if (!showCorrectness) {
            return letter;
        } else if (correct) {
            return (
                <InlineIcon
                    {...iconCheck}
                    style={{
                        position: "relative",
                        top: -1,
                    }}
                />
            );
        } else {
            return <InlineIcon {...iconMinus} />;
        }
    }

    // Handle dynamic styling of the multiple choice icon. Most
    // MC icon styles are constant, but we do allow the caller
    // to specify the selected color, and thus must control styles
    // related to the selected state dynamically.
    getDynamicStyles() {
        const {
            checked,
            showCorrectness,
            pressed,
            primaryProductColor,
            correct,
        } = this.props;
        if (!showCorrectness && pressed) {
            return {
                borderColor: primaryProductColor,
                color: primaryProductColor,
                backgroundColor: styleConstants.white,
            };
        } else if (checked) {
            // Note: kaGreen is not only the default product color,
            // but also the "correctness" color
            const bg =
                showCorrectness && correct
                    ? styleConstants.kaGreen
                    : primaryProductColor;
            return {
                color: styleConstants.white,
                backgroundColor: bg,
                borderColor: bg,
            };
        } else {
            return {
                borderColor: styleConstants.gray68,
                color: styleConstants.gray68,
            };
        }
    }

    render() {
        const {
            checked,
            showCorrectness,
            correct,
            focused,
            primaryProductColor,
        } = this.props;
        // Hack(amy) styling the focus ring dynamically is tricky with
        // the current implementation, so we show it only when usng
        // the default primaryProductColor (kaGreen). I should probably
        // make the focus circle be a directly-styled DOM element rather
        // than psuedoelement, but punting for now.
        const showFocusRing = primaryProductColor === styleConstants.kaGreen;
        return (
            <div
                style={this.getDynamicStyles()}
                className={css(
                    styles.libraryCircle,
                    showCorrectness && correct && styles.libraryCircleCorrect,
                    showCorrectness &&
                        !correct &&
                        styles.libraryCircleIncorrect,
                    showCorrectness &&
                        !correct &&
                        checked &&
                        styles.libraryCircleIncorrectSelected,
                    focused && showFocusRing && styles.libraryCircleFocused
                )}
            >
                {this.getChoiceInner()}
            </div>
        );
    }
}

type ChoiceIconProps = {
    pos: number,
    checked: boolean,
    pressed: boolean,
    focused: boolean,
    correct: boolean,
    showCorrectness: boolean,
    // TODO(amy): if we go this "product" flag route, define this type
    // somewhere shared
    product: "sat" | "library",
    primaryProductColor: string,
    reviewMode: boolean,
};
class ChoiceIcon extends React.Component {
    props: ChoiceIconProps;

    static defaultProps = {
        primaryProductColor: styleConstants.kaGreen,
    };

    a11yText(letter: string) {
        // If the option was checked we need to reveal more context about
        // what the result was (correct/incorrect)
        if (this.props.checked) {
            if (this.props.showCorrectness) {
                if (this.props.correct) {
                    return i18n._("(Choice %(letter)s, Checked, Correct)", {
                        letter: letter,
                    });
                } else {
                    return i18n._("(Choice %(letter)s, Checked, Incorrect)", {
                        letter: letter,
                    });
                }
            }

            return i18n._("(Choice %(letter)s, Checked)", {letter: letter});

            // If the option wasn't checked, but was correct, we need to tell
            // the user that this was, in fact, the correct answer.
        } else if (this.props.showCorrectness && this.props.correct) {
            return i18n._("(Choice %(letter)s, Correct Answer)", {
                letter: letter,
            });
        }

        return i18n._("(Choice %(letter)s)", {letter: letter});
    }

    getLetter() {
        /* I18N: This is a list of single-character labels that will appear in
         * front of multiple-choice options. For instance, a multiple-choice
         * question with three options would display
         *  (A) first option
         *  (B) second option
         *  (C) third option
         * There must be spaces between each of the different characters. The
         * characters will show up next to options in the order that they are
         * listed here. Most multiple choice questions have 5 or fewer options.
         */
        const lettersString = i18n._(
            "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"
        );

        const letters = lettersString.split(" ");
        const pos = this.props.pos;

        if (pos < letters.length) {
            // If the position we need is listed in the localized string, use
            // that.
            return letters[pos];
        } else {
            // If we're out of letters, give up and return a space.
            return " ";
        }
    }

    render() {
        const {
            reviewMode,
            checked,
            correct,
            product,
            showCorrectness,
            pressed,
            focused,
            primaryProductColor,
        } = this.props;

        const letter = this.getLetter();

        if (product === "sat") {
            return (
                <SATChoiceIcon
                    letter={letter}
                    a11yText={this.a11yText(letter)}
                    reviewMode={reviewMode}
                    checked={checked}
                    correct={correct}
                />
            );
        } else {
            return (
                <LibraryChoiceIcon
                    letter={letter}
                    a11yText={this.a11yText(letter)}
                    reviewMode={reviewMode}
                    checked={checked}
                    pressed={pressed}
                    focused={focused}
                    correct={correct}
                    showCorrectness={showCorrectness}
                    primaryProductColor={primaryProductColor}
                />
            );
        }
    }
}

const styles = StyleSheet.create({
    satCircle: {
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

    libraryCircle: {
        // Make the circle
        width: 24,
        height: 24,
        boxSizing: "border-box",
        borderRadius: 24,
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

    libraryCircleCorrect: {
        fontSize: 24,
    },

    libraryCircleIncorrect: {
        fontSize: 24,
        borderColor: styleConstants.warning1,
        color: styleConstants.warning1,
    },

    libraryCircleIncorrectSelected: {
        backgroundColor: styleConstants.warning1,
        color: styleConstants.white,
    },

    libraryCircleFocused: {
        position: "relative",

        // Make a ring around the icon
        "::after": {
            content: '""',
            position: "absolute",
            left: -4,
            right: -4,
            top: -4,
            bottom: -4,
            borderRadius: "50%",
            boxShadow: `0 0 0 2px ${styleConstants.kaGreen}`,
        },
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
