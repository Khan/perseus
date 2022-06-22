// @flow
/* Component for rendering a letter icon in radio choice */

import Color from "@khanacademy/wonder-blocks-color";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import InlineIcon from "../../components/inline-icon.jsx";
import {iconCheck, iconMinus} from "../../icon-paths.js";
import * as styleConstants from "../../styles/constants.js";

import FocusRing from "./focus-ring.jsx";
import {getChoiceLetter} from "./util.js";

const SAT_ICON_SIZE = 25;
class SATChoiceIcon extends React.Component<{
    letter: string,
    a11yText: string,
    checked: boolean,
    correct: boolean,
    reviewMode: boolean,
    crossedOut: boolean,
    ...
}> {
    // TODO(amy): figure out a better scheme for specifying these
    // styles that isn't such a pain to grok. See some neat ideas
    // from MDR in https://phabricator.khanacademy.org/D35249.
    constructStyles(
        reviewMode: boolean,
        correct: boolean,
        checked: boolean,
    ): {
        color: string,
        backgroundColor: ?string,
        borderColor: string,
        ...
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
        return {color, backgroundColor, borderColor};
    }

    render(): React.Node {
        const {letter, a11yText, reviewMode, checked, correct, crossedOut} =
            this.props;
        const {color, backgroundColor, borderColor} = this.constructStyles(
            reviewMode,
            correct,
            checked,
        );

        return (
            <div className={css(styles.iconWrapper)}>
                <div
                    className={css(styles.satCircle)}
                    style={{backgroundColor, borderColor}}
                />
                <div style={{color}} className={css(styles.letter)}>
                    <span className="perseus-sr-only">{a11yText}</span>
                    <span aria-hidden="true">{letter}</span>
                </div>
                {crossedOut && <CrossOutLine color={borderColor} sat={true} />}
            </div>
        );
    }
}

const LIBRARY_ICON_SIZE = 24;

class LibraryChoiceIcon extends React.Component<{
    letter: string,
    a11yText: string,
    checked: boolean,
    crossedOut: boolean,
    pressed: boolean,
    focused: boolean,
    correct: ?boolean,
    reviewMode: boolean,
    showCorrectness: boolean,
    primaryProductColor: string,
    previouslyAnswered: boolean,
    transparentBackground?: boolean,
    ...
}> {
    getChoiceInner() {
        const {letter, showCorrectness, correct} = this.props;

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
    getDynamicStyles() {
        const {
            checked,
            showCorrectness,
            pressed,
            primaryProductColor,
            correct,
            transparentBackground,
        } = this.props;
        if (!showCorrectness && pressed) {
            return {
                borderColor: primaryProductColor,
                color: primaryProductColor,
                backgroundColor: transparentBackground
                    ? "transparent"
                    : styleConstants.white,
            };
        }
        if (checked) {
            // Note: kaGreen is not only the default product color,
            // but also the "correctness" color
            const bg =
                showCorrectness && correct ? Color.green : primaryProductColor;
            return {
                color: styleConstants.white,
                backgroundColor: bg,
                borderColor: bg,
            };
        }
        return {
            borderColor: Color.offBlack64,
            color: Color.offBlack64,
        };
    }

    render(): React.Node {
        const {
            a11yText,
            checked,
            crossedOut,
            showCorrectness,
            correct,
            focused,
            primaryProductColor,
            previouslyAnswered,
        } = this.props;

        const dynamicStyles = this.getDynamicStyles();

        return (
            <div className={css(styles.iconWrapper)}>
                <FocusRing color={primaryProductColor} visible={focused}>
                    <div
                        style={dynamicStyles}
                        className={css(
                            styles.libraryCircle,
                            showCorrectness &&
                                correct &&
                                styles.libraryCircleCorrect,
                            showCorrectness &&
                                !correct &&
                                styles.libraryCircleIncorrect,
                            showCorrectness &&
                                !correct &&
                                (checked || previouslyAnswered) &&
                                styles.libraryCircleIncorrectAnswered,
                        )}
                        // used in BaseRadio to check if we actually clicked on the
                        // radio icon
                        data-is-radio-icon={true}
                    >
                        <div className="perseus-sr-only">{a11yText}</div>
                        <div aria-hidden>{this.getChoiceInner()}</div>
                    </div>
                </FocusRing>
                {crossedOut && (
                    <CrossOutLine color={dynamicStyles.borderColor} />
                )}
            </div>
        );
    }
}

// The "cross-out line" SVG is a bit bigger than the library icon, to provide
// extra space for the cute rounded line cap.
const CROSS_OUT_LINE_PADDING = 2;
const CROSS_OUT_LINE_SIZE = LIBRARY_ICON_SIZE + CROSS_OUT_LINE_PADDING * 2;
const SAT_CROSS_OUT_LINE_SIZE = SAT_ICON_SIZE + CROSS_OUT_LINE_PADDING * 2;

/**
 * The "cross-out line" that appears over the icon when the choice has been
 * `crossedOut`.
 */
function CrossOutLine(props: {color: string, sat?: boolean, ...}) {
    const crossOutLineSize = props.sat
        ? SAT_CROSS_OUT_LINE_SIZE
        : CROSS_OUT_LINE_SIZE;
    return (
        <svg
            width={crossOutLineSize}
            height={crossOutLineSize}
            viewBox={`0 0 ${crossOutLineSize} ${crossOutLineSize}`}
            className={css(styles.crossOutLine)}
        >
            <line
                // The line stretches from the bottom-left to top-right.
                // We don't quite go to the _very_ corner, because the cute
                // rounded line cap needs to bleed into our padding.
                x1={CROSS_OUT_LINE_PADDING}
                x2={crossOutLineSize - CROSS_OUT_LINE_PADDING}
                y1={crossOutLineSize - CROSS_OUT_LINE_PADDING}
                y2={CROSS_OUT_LINE_PADDING}
                stroke={props.color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

type ChoiceIconProps = {|
    pos: number,
    checked: boolean,
    crossedOut: boolean,
    pressed: boolean,
    focused: boolean,
    correct: boolean,
    showCorrectness: boolean,
    // TODO(amy): if we go this "product" flag route, define this type
    // somewhere shared
    product: "sat" | "library",
    reviewMode: boolean,
    previouslyAnswered: boolean,
    // TODO(mdr): The CrossOutButton needs a transparent-background ChoiceIcon,
    //     so I've added this prop. I'm not sure why we have backgrounds in the
    //     general case, though? When does the choice container have a
    //     non-white background, aside from SAT, which uses a different icon?
    transparentBackground?: boolean,

    primaryProductColor: string,
|};

class ChoiceIcon extends React.Component<ChoiceIconProps> {
    static defaultProps: {|primaryProductColor: string|} = {
        primaryProductColor: Color.blue,
    };

    a11yText(letter: string): string {
        const {checked, correct, crossedOut, showCorrectness} = this.props;

        // There are two pieces of metadata we want to add to each a11yText:
        // whether the answer was checked/crossed-out/neither, and whether the
        // answer is correct/incorrect/not-yet-revealed.
        //
        // Translation is tricky for cross-product situations like this, so
        // we've just enumerated all 9 possibilities as separate strings.
        if (showCorrectness && correct) {
            if (checked) {
                return i18n._("(Choice %(letter)s, Checked, Correct)", {
                    letter,
                });
            }
            if (crossedOut) {
                return i18n._("(Choice %(letter)s, Crossed out, Correct)", {
                    letter,
                });
            }
            return i18n._("(Choice %(letter)s, Correct)", {
                letter,
            });
        }
        if (showCorrectness && !correct) {
            if (checked) {
                return i18n._("(Choice %(letter)s, Checked, Incorrect)", {
                    letter,
                });
            }
            if (crossedOut) {
                return i18n._("(Choice %(letter)s, Crossed out, Incorrect)", {
                    letter,
                });
            }
            return i18n._("(Choice %(letter)s, Incorrect)", {
                letter,
            });
        }
        if (checked) {
            return i18n._("(Choice %(letter)s, Checked)", {
                letter,
            });
        }
        if (crossedOut) {
            return i18n._("(Choice %(letter)s, Crossed out)", {
                letter,
            });
        }
        return i18n._("(Choice %(letter)s)", {
            letter,
        });
    }

    render(): React.Node {
        const {
            pos,
            reviewMode,
            checked,
            crossedOut,
            correct,
            product,
            showCorrectness,
            pressed,
            focused,
            primaryProductColor,
            previouslyAnswered,
            transparentBackground,
        } = this.props;

        const letter = getChoiceLetter(pos);

        if (product === "sat") {
            return (
                <SATChoiceIcon
                    letter={letter}
                    a11yText={this.a11yText(letter)}
                    reviewMode={reviewMode}
                    checked={checked}
                    correct={correct}
                    crossedOut={crossedOut}
                />
            );
        }
        return (
            <LibraryChoiceIcon
                letter={letter}
                a11yText={this.a11yText(letter)}
                reviewMode={reviewMode}
                checked={checked}
                crossedOut={crossedOut}
                pressed={pressed}
                focused={focused}
                correct={correct}
                showCorrectness={showCorrectness}
                primaryProductColor={primaryProductColor}
                previouslyAnswered={previouslyAnswered}
                transparentBackground={transparentBackground}
            />
        );
    }
}

const styles = StyleSheet.create({
    satCircle: {
        display: "block",
        borderRadius: SAT_ICON_SIZE,
        borderStyle: "solid",
        borderWidth: 2,
        content: `''`,
        height: SAT_ICON_SIZE,
        width: SAT_ICON_SIZE,
        top: 1,
        left: 1,
    },

    iconWrapper: {
        display: "inline-block",
        position: "relative",
    },

    crossOutLine: {
        // Center the icon within the container.
        position: "absolute",
        top: `calc(50% - ${CROSS_OUT_LINE_SIZE / 2}px)`,
        left: `calc(50% - ${CROSS_OUT_LINE_SIZE / 2}px)`,
    },

    libraryCircle: {
        // Make the circle
        width: LIBRARY_ICON_SIZE,
        height: LIBRARY_ICON_SIZE,
        boxSizing: "border-box",
        borderRadius: LIBRARY_ICON_SIZE,
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
        fontSize: LIBRARY_ICON_SIZE,
    },

    libraryCircleIncorrect: {
        fontSize: LIBRARY_ICON_SIZE,
        borderColor: styleConstants.gray68,
        color: styleConstants.gray68,
    },

    libraryCircleIncorrectAnswered: {
        backgroundColor: Color.red,
        borderColor: Color.red,
        color: Color.white,
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

export default ChoiceIcon;
