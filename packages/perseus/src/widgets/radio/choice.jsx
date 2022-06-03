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
import {ClassNames} from "../../perseus-api.jsx";
import * as styleConstants from "../../styles/constants.js";
import mediaQueries from "../../styles/media-queries.js";
import sharedStyles from "../../styles/shared.js";

import ChoiceIcon from "./choice-icon.jsx";
import OptionStatus from "./option-status.jsx";

const focusedStyleMixin = {
    backgroundColor: styleConstants.satSelectedBackgroundColor,
    outline: `2px solid ${styleConstants.satBlue}`,
    // Render the outline higher than the next element's border
    zIndex: 1,
};

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

    renderChoiceIcon: (isFocused: boolean, isPressed: boolean) => React.Node = (
        isFocused,
        isPressed,
    ) => {
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

    /**
     * Public method. Focus the choice's <input> element.
     */
    focusInput: () => void = () => {
        this._input?.focus();
    };

    render(): React.Node {
        const sat = this.props.apiOptions.satStyling;
        const isMobile = this.props.apiOptions.isMobile;

        const {radioStyleVersion} = this.props.apiOptions.styling;
        const finalStyles =
            typeof radioStyleVersion === "undefined"
                ? false
                : radioStyleVersion === "final";

        const className = classNames(
            this.props.className,
            "checkbox-label",
            css(
                styles.label,
                isMobile && sharedStyles.disableTextSelection,
                !sat && styles.responsiveLabel,
                sat && styles.satLabel,
            ),
        );

        const satRadioMenuContainer = classNames(
            css(
                this.state.isInputFocused && styles.satDescriptionInputFocused,
                this.state.isInputActive && styles.satDescriptionInputActive,
            ),
        );

        // If we're showing an answer to be incorrect, we render it as
        // unchecked, regardless of the `checked` state we've stored.
        //
        // This is because the existence of a selected radio button makes it
        // impossible to tab-navigate to any other choices (standard radio
        // behavior), but the selected answer is now disabled and not tabbable,
        // which means that non-mouse/non-touch users can't select another
        // answer to try again!
        //
        // (This behavior is only necessary for type "radio", but we also apply
        // it for type "checkbox", for consistency.)
        const showingIncorrectness =
            this.props.showCorrectness && !this.props.correct;
        const inputIsChecked = this.props.checked && !showingIncorrectness;

        // There's two different input components we could use (the builtin
        // input component, or the ToggleableRadioButton component). These are
        // the props that we will pass to either.
        const commonInputProps = {
            type: this.props.type,
            name: this.props.groupName,
            id: `${this.props.groupName}-choice-${this.props.pos}`,
            checked: inputIsChecked,
            disabled: this.props.disabled,
            onFocus: this.onInputFocus,
            onBlur: this.onInputBlur,
            className: css(
                // intermediate styles are not different for radio and
                // checkbox, and have a separate active state.
                !finalStyles && sharedStyles.perseusInteractive,
                !finalStyles && styles.input,
                !finalStyles && sharedStyles.responsiveInput,
                !finalStyles && !sat && sharedStyles.responsiveRadioInput,
                !finalStyles &&
                    !sat &&
                    this.state.isInputActive &&
                    sharedStyles.responsiveRadioInputActive,
                finalStyles && sharedStyles.perseusSrOnly,
                sat && sharedStyles.perseusSrOnly,
                sat && this.props.reviewMode && styles.satReviewInput,
            ),
        };

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

        const checkboxContentClassName = classNames(
            "checkbox",
            css(
                sharedStyles.perseusInteractive,
                !sat && styles.choiceIconWrapper,
                sat && styles.satCheckboxOptionContent,
            ),
        );

        const checkboxAndOptionClassName = classNames(
            "checkbox-and-option",
            css(
                !sat && styles.intermediateResponsiveCheckbox,
                !sat &&
                    reviewMode &&
                    styles.intermediateResponsiveCheckboxReview,
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
                            this.props.onChange({
                                checked: true,
                                crossedOut: false,
                            });
                        }}
                        className={descriptionClassName}
                        disabled={reviewMode}
                        style={{
                            flex: 1,
                        }}
                    >
                        {({hovered, focused, pressed}) => (
                            <div>
                                <div className={checkboxAndOptionClassName}>
                                    <span className={checkboxContentClassName}>
                                        {this.renderChoiceIcon(
                                            focused,
                                            pressed,
                                        )}
                                    </span>
                                    <span
                                        className={classNames(
                                            ClassNames.RADIO.OPTION_CONTENT,
                                            ClassNames.INTERACTIVE,
                                            css(
                                                sat &&
                                                    styles.satRadioOptionContent,
                                                sat &&
                                                    reviewMode &&
                                                    styles.satReviewRadioOptionContent,
                                            ),
                                        )}
                                        style={{cursor: "default"}}
                                    >
                                        <div
                                            className={css(
                                                styles.optionStatusContainer,
                                            )}
                                        >
                                            {this.renderOptionStatus()}
                                        </div>
                                        <div>{this.props.content}</div>
                                    </span>
                                </div>
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
                                                onClick={() => {
                                                    if (
                                                        !this.props.crossedOut
                                                    ) {
                                                        this.props.onChange({
                                                            checked: false,
                                                            crossedOut: true,
                                                        });
                                                    } else {
                                                        this.props.onChange({
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
                                <Clickable onClick={open}>
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

    satDescriptionInputFocused: {
        ...focusedStyleMixin,
        display: "block",
    },

    satDescriptionInputActive: {
        ...focusedStyleMixin,
        backgroundColor: styleConstants.satActiveBackgroundColor,
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

    input: {
        display: "inline-block",
        width: 20,
        margin: 3,
        marginLeft: -20,
        marginRight: 0,
        float: "none",
    },

    satReviewInput: {
        pointerEvents: "none",
    },

    satRadioOptionContent: {
        userSelect: "text",
        display: "block",
        marginLeft: 45,
        // Overriding here, not sure why typically set
        // to "cursor: default" in js
        cursor: "inherit",
    },

    satReviewRadioOptionContent: {
        fontWeight: "bold",
    },

    satCheckboxOptionContent: {
        position: "absolute",
        display: "block",
        top: "50%",
        margin: "-16px 0 0 0",
        width: "auto",
    },

    choiceIconWrapper: {
        display: "flex",
        marginRight: 12,

        // NOTE(mdr): Without this style, the bubbles shrink on iOS
        //     when answer text gets long.
        flexShrink: 0,
    },

    optionStatusContainer: {
        display: "block",
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

    label: {
        display: "block",
        transition: "opacity 0.2s ease-out",
    },

    responsiveLabel: {
        WebkitTapHighlightColor: "transparent",
        display: "flex",

        // Ensure that all items consume the full height of the choice.
        // That way, the cross-out menu click target is full-height,
        // which makes it easier to click!
        alignItems: "stretch",
    },

    satLabel: {
        cursor: "pointer",
    },

    intermediateResponsiveCheckbox: {
        display: "flex",
        alignItems: "center",

        padding: intermediateCheckboxPadding,
        [mediaQueries.smOrSmaller]: {
            padding: intermediateCheckboxPaddingPhone,
        },
    },
    intermediateResponsiveCheckboxReview: {
        alignItems: "flex-start",
    },
});

export default Choice;
