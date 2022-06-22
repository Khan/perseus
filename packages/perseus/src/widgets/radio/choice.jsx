/* eslint-disable react/no-unsafe */
// @flow
import Button from "@khanacademy/wonder-blocks-button";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Icon from "../../components/icon.jsx";
import * as styleConstants from "../../styles/constants.js";
import mediaQueries from "../../styles/media-queries.js";

import ChoiceIcon from "./choice-icon.jsx";
import OptionStatus from "./option-status.jsx";
import {getChoiceLetter} from "./util.js";

const intermediateCheckboxPadding = `16px 16px`;
const intermediateCheckboxPaddingPhone = `12px 16px`;

export const TouchIgnoreTimeout = 10;

const ellipsisHorizontalIcon = {
    path: "M27.218 6.82l0 13.578q0 2.852-1.984 4.836t-4.836 1.984l-13.578 0q-2.852 0-4.836-1.984t-1.984-4.836l0-13.578q0-2.852 1.984-4.836t4.836-1.984l13.578 0q2.852 0 4.836 1.984t1.984 4.836zm36.27 0l0 13.578q0 2.852-1.984 4.836t-4.836 1.984l-13.578 0q-2.852 0-4.836-1.984t-1.984-4.836l0-13.578q0-2.852 1.984-4.836t4.836-1.984l13.578 0q2.852 0 4.836 1.984t1.984 4.836zm36.27 0l0 13.578q0 2.852-1.984 4.836t-4.836 1.984l-13.578 0q-2.852 0-4.836-1.984t-1.984-4.836l0-13.578q0-2.852 1.984-4.836t4.836-1.984l13.578 0q2.852 0 4.836 1.984t1.984 4.836z",
    width: 100,
    height: 27.284,
};

type State = {|
    isInputFocused: boolean,
    isInputActive: boolean,
|};

class Choice extends React.Component<$FlowFixMe, State> {
    justFinishedTouch: boolean;
    justFinishedTimeoutID: TimeoutID;
    _input: ?HTMLInputElement;

    static propTypes = {
        // TODO(kevinb) use Options.propTypes from perseus-api.jsx
        // This change will also require make sure that item-renderer.jsx and
        // server-item-renderer.jsx have appropriate defaults for apiOptions
        // because many of the properties on Options.propTypes are required.
        apiOptions: PropTypes.shape({
            satStyling: PropTypes.bool,
            isMobile: PropTypes.bool,
            styling: PropTypes.shape({
                radioStyleVersion: PropTypes.oneOf(["intermediate", "final"]),
                primaryProductColor: PropTypes.string,
            }),
            readOnly: PropTypes.bool,
        }),
        checked: PropTypes.bool,
        className: PropTypes.string,
        rationale: PropTypes.node,
        content: PropTypes.node,
        correct: PropTypes.bool,
        deselectEnabled: PropTypes.bool,
        disabled: PropTypes.bool,
        editMode: PropTypes.bool,
        groupName: PropTypes.string,
        isLastChoice: PropTypes.bool, // Needed for border styling
        // This indicates the position of the choice relative to others
        // (so that we can display a nice little (A), (B), etc. next to it)
        // Also used to generate an id for each input.
        pos: PropTypes.number,
        reviewMode: PropTypes.bool,
        showRationale: PropTypes.bool,
        showCorrectness: PropTypes.bool,
        type: PropTypes.string,

        // Indicates whether the user has "crossed out" this choice, meaning
        // that they don't think it's correct. This value does not affect
        // scoring or other behavior; it's just a note for the user's
        // reference.
        crossedOut: PropTypes.bool,

        // Indicates that the user has previously selected this answer. These
        // answers may be rendered orange in review, rather than grey if
        // incorrect.
        previouslyAnswered: PropTypes.bool,

        // A callback indicating that this choice has changed. Its argument is
        // an object with two keys: `checked` and `crossedOut`. Each contains a
        // boolean value specifying the new checked and crossed-out value of
        // this choice.
        onChange: PropTypes.func,

        // Callbacks for when the user presses the up arrow or down arrow
        // (respectively) to navigate between choices. When called, the parent
        // finds the prev/next choice, focuses the input, and checks the radio
        // button if appropriate. (The reason we have custom behavior is that
        // we actually _don't_ want to auto-select crossed-out choices!)
        goToPrevChoice: PropTypes.func.isRequired,
        goToNextChoice: PropTypes.func.isRequired,
    };

    static defaultProps: $FlowFixMe = {
        apiOptions: {
            styling: {},
        },
        checked: false,
        classSet: {},
        correct: false,
        disabled: false,
        editMode: false,
        onChange: function () {},
        showRationale: false,
        type: "radio",
        pos: 0,
        previouslyAnswered: false,
    };

    state: $FlowFixMe = {
        isInputFocused: false,
        isInputActive: false,
    };

    UNSAFE_componentWillUpdate(nextProps: $FlowFixMe) {
        if (this.state.isInputFocused && nextProps.disabled) {
            this.setState({
                isInputFocused: false,
            });
        }
    }

    inputRef: ($FlowFixMe) => void = (ref) => {
        this._input = ref;
    };

    renderOptionStatus: () => React.Node = () => {
        const {correct, checked, crossedOut, reviewMode, previouslyAnswered} =
            this.props;

        // Option status is exclued for SAT
        if (this.props.apiOptions.satStyling) {
            return null;
        }

        // Option status is shown only in review mode, or for incorrectly
        // answered items.
        if (!reviewMode && !previouslyAnswered) {
            return null;
        }

        return (
            <OptionStatus
                checked={checked}
                correct={correct}
                crossedOut={crossedOut}
                previouslyAnswered={previouslyAnswered}
            />
        );
    };

    renderChoiceIcon: (args: {|
        isFocused: boolean,
        isPressed: boolean,
    |}) => React.Node = ({isFocused, isPressed}) => {
        const {radioStyleVersion, primaryProductColor} =
            this.props.apiOptions.styling;
        const finalStyles =
            typeof radioStyleVersion === "undefined"
                ? false
                : radioStyleVersion === "final";

        if (!finalStyles && !this.props.apiOptions.satStyling) {
            return null;
        }

        return (
            <ChoiceIcon
                pos={this.props.pos}
                correct={this.props.correct}
                crossedOut={this.props.crossedOut}
                pressed={isPressed}
                focused={isFocused}
                checked={this.props.checked}
                showCorrectness={this.props.showCorrectness}
                reviewMode={this.props.reviewMode}
                product={this.props.apiOptions.satStyling ? "sat" : "library"}
                primaryProductColor={primaryProductColor}
                previouslyAnswered={this.props.previouslyAnswered}
            />
        );
    };

    // Call `this.props.onChange` with the given values. Any keys that are not
    // specified will be filled in with the current value. (For example, if
    // `checked` is specified but `crossedOut` is not, then `crossedOut` will
    // be filled in with `this.props.crossedOut`.)
    //
    // This enables us to use shorthand inside this component, while
    // maintaining a consistent API for the parent.
    _sendChange: ({|checked?: boolean, crossedOut?: boolean|}) => void = (
        newValues,
    ) => {
        const checked = newValues.checked ?? this.props.checked;
        const crossedOut = newValues.crossedOut ?? this.props.crossedOut;
        this.props.onChange({checked, crossedOut});
    };

    /**
     * Public method. Focus the choice's <input> element.
     */
    focusInput: () => void = () => {
        this._input?.focus();
    };

    render(): React.Node {
        const sat = this.props.apiOptions.satStyling;

        const {reviewMode, correct, checked} = this.props;
        // HACK: while most of the styling for rendering SAT items is handled
        // via aphrodite, we also need to assign normal CSS classnames here to
        // special-case the coloring of MathJax formulas (see .MathJax .math in
        // stylesheets/task-package/tasks.less)
        const satCorrectChoice = sat && reviewMode && correct;
        const satIncorrectChecked = sat && reviewMode && !correct && checked;
        const descriptionClassName = classNames(
            "description",
            satCorrectChoice && "sat-correct",
            satIncorrectChecked && "sat-incorrect",
            css(
                !sat && styles.description,
                sat && styles.satDescription,
                satCorrectChoice && styles.satDescriptionCorrect,
                satCorrectChoice &&
                    checked &&
                    styles.satDescriptionCorrectChecked,
                satIncorrectChecked && styles.satDescriptionIncorrectChecked,
            ),
        );

        const rationaleClassName = classNames(
            "perseus-radio-rationale-content",
            css(
                styles.rationale,
                !sat && styles.nonSatRationale,
                sat && styles.satReviewRationale,
            ),
        );

        // We want to show the choices as dimmed out when the choices are
        // disabled. However, we don't want to do this in the SAT product and
        // we also don't want to do this when we're in review mode in the
        // content library.
        const showDimmed =
            (!sat && !reviewMode && this.props.apiOptions.readOnly) ||
            this.props.crossedOut;

        return (
            <div
                style={{
                    dispay: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        opacity: showDimmed ? 0.5 : 1.0,
                    }}
                >
                    <Clickable
                        onClick={() => {
                            // If we're checking a crossed-out option, let's
                            // also uncross it.
                            this._sendChange({
                                checked: true,
                                crossedOut: false,
                            });
                        }}
                        className={descriptionClassName}
                        disabled={
                            this.props.disabled ||
                            this.props.apiOptions.staticRender ||
                            this.props.apiOptions.readOnly
                        }
                        aria-label={`Select Choice ${getChoiceLetter(
                            this.props.pos,
                        )}`}
                        aria-checked={this.props.checked}
                        role={"checkbox"}
                        style={{flex: 1}}
                    >
                        {({hovered, focused, pressed}) => (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    paddingTop: Spacing.xSmall_8,
                                    paddingBottom: Spacing.xSmall_8,
                                }}
                            >
                                <span>
                                    {this.renderChoiceIcon({
                                        isFocused: focused,
                                        isPressed: pressed,
                                    })}
                                </span>
                                <span
                                    style={{
                                        paddingLeft: Spacing.small_12,
                                        textAlign: "left",
                                        flex: 1,
                                        paddingTop: 4,
                                    }}
                                >
                                    <div>{this.renderOptionStatus()}</div>
                                    <div>{this.props.content}</div>
                                </span>
                            </div>
                        )}
                    </Clickable>

                    {this.props.apiOptions.crossOutEnabled && !reviewMode && (
                        <Popover
                            dismissEnabled
                            content={({close}) => (
                                <PopoverContent
                                    title="Cross out"
                                    content="Cross out option"
                                    closeButtonVisible
                                    actions={
                                        <View>
                                            <Strut size={Spacing.medium_16} />
                                            <Button
                                                kind="primary"
                                                aria-label={`Cross out Choice ${getChoiceLetter(
                                                    this.props.pos,
                                                )}`}
                                                disabled={
                                                    this.props.apiOptions
                                                        .readOnly || reviewMode
                                                }
                                                onClick={() => {
                                                    if (
                                                        !this.props.crossedOut
                                                    ) {
                                                        // If we're crossing
                                                        // out a checked
                                                        // option, let's also
                                                        // uncheck it.
                                                        this._sendChange({
                                                            checked: false,
                                                            crossedOut: true,
                                                        });
                                                    } else {
                                                        this._sendChange({
                                                            crossedOut: false,
                                                        });
                                                    }
                                                    close();
                                                }}
                                            >
                                                {this.props.crossedOut
                                                    ? "Bring back"
                                                    : "Cross out"}
                                            </Button>
                                        </View>
                                    }
                                />
                            )}
                        >
                            {({open}) => (
                                <Clickable
                                    onClick={open}
                                    aria-label={`Open menu for Choice ${getChoiceLetter(
                                        this.props.pos,
                                    )}`}
                                    disabled={
                                        this.props.apiOptions.staticRender
                                    }
                                >
                                    {({hovered, focused, pressed}) => (
                                        <Icon
                                            icon={ellipsisHorizontalIcon}
                                            size={3}
                                            color={Color.offBlack64}
                                        />
                                    )}
                                </Clickable>
                            )}
                        </Popover>
                    )}
                </div>

                {this.props.showRationale && (
                    <div
                        className={rationaleClassName}
                        data-test-id={`perseus-radio-rationale-content-${this.props.pos}`}
                    >
                        {this.props.rationale}
                    </div>
                )}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        display: "inline-block",
        width: "100%",
    },

    satDescription: {
        display: "block",
        position: "relative",
        boxSizing: "border-box",
        cursor: "pointer",
        marginLeft: 0,
        padding: "17px 14px",
    },

    satDescriptionCorrect: {
        color: styleConstants.satCorrectColor,
    },

    satDescriptionCorrectChecked: {
        backgroundColor: styleConstants.satCorrectBackgroundColor,
    },

    satDescriptionIncorrectChecked: {
        color: styleConstants.satIncorrectColor,
        backgroundColor: styleConstants.satIncorrectBackgroundColor,
    },

    rationale: {
        display: "block",
    },

    nonSatRationale: {
        padding: intermediateCheckboxPadding,
        paddingTop: 0,
        marginLeft: 44,
        [mediaQueries.smOrSmaller]: {
            padding: intermediateCheckboxPaddingPhone,
            paddingTop: 0,
        },
    },

    satReviewRationale: {
        marginTop: 13,
        marginLeft: 45,
    },
});

export default Choice;
