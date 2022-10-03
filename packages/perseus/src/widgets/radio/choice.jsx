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
import * as React from "react";
import {useState, useEffect} from "react";
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

type ChoiceIconWrapperProps = {|
    radioStyleVersion: "intermediate" | "final",
    satStyling: boolean,
    children: React.Node,
|};

function ChoiceIconWrapper(props: ChoiceIconWrapperProps) {
    const {children, radioStyleVersion, satStyling} = props;
    const finalStyles =
        typeof radioStyleVersion === "undefined"
            ? false
            : radioStyleVersion === "final";

    if (!finalStyles && !satStyling) {
        return null;
    }

    return children;
}

type ChoiceProps = {|
    // TODO(kevinb) use Options.propTypes from perseus-api.jsx
    // This change will also require make sure that item-renderer.jsx and
    // server-item-renderer.jsx have appropriate defaults for apiOptions
    // because many of the properties on Options.propTypes are required.
    apiOptions: {
        satStyling: boolean,
        isMobile: boolean,
        styling: {
            radioStyleVersion: "intermediate" | "final",
            primaryProductColor: string,
        },
        readOnly: boolean,
        crossOutEnabled: boolean,
        staticRender: boolean,
    },
    checked: boolean,
    rationale: React.Node,
    content: React.Node,
    correct: boolean,
    deselectEnabled: boolean,
    disabled: boolean,
    editMode: boolean,
    groupName: string,
    isLastChoice: boolean, // Needed for border styling
    // This indicates the position of the choice relative to others
    // (so that we can display a nice little (A), (B), etc. next to it)
    // Also used to generate an id for each input.
    pos: number,
    reviewMode: boolean,
    showRationale: boolean,
    showCorrectness: boolean,
    type: string,

    // Indicates whether the user has "crossed out" this choice, meaning
    // that they don't think it's correct. This value does not affect
    // scoring or other behavior; it's just a note for the user's
    // reference.
    crossedOut: boolean,

    // Indicates that the user has previously selected this answer. These
    // answers may be rendered orange in review, rather than grey if
    // incorrect.
    previouslyAnswered: boolean,

    // A callback indicating that this choice has changed. Its argument is
    // an object with two keys: `checked` and `crossedOut`. Each contains a
    // boolean value specifying the new checked and crossed-out value of
    // this choice.
    onChange: (newValues: {checked: boolean, crossedOut: boolean}) => void,
|};

function Choice(props: ChoiceProps): React.Node {
    const {
        disabled = false,
        checked = false,
        content,
        crossedOut,
        showCorrectness,
        onChange = (newValues) => {},
        reviewMode,
        correct = false,
        apiOptions = {},
        previouslyAnswered = false,
        pos = 0,
        showRationale = false,
        rationale,
        registerRef,
    } = props;
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        registerRef(inputRef);
        return () => registerRef();
    });

    useEffect(() => {
        if (isInputFocused && disabled) {
            setIsInputFocused(false);
        }
    });

    // Call `this.props.onChange` with the given values. Any keys that are not
    // specified will be filled in with the current value. (For example, if
    // `checked` is specified but `crossedOut` is not, then `crossedOut` will
    // be filled in with `this.props.crossedOut`.)
    //
    // This enables us to use shorthand inside this component, while
    // maintaining a consistent API for the parent.
    function sendChange(newValues: {|
        checked?: boolean,
        crossedOut?: boolean,
    |}) {
        const updatedChecked = newValues.checked ?? checked;
        const updatedCrossedOut = newValues.crossedOut ?? crossedOut;
        onChange({checked: updatedChecked, crossedOut: updatedCrossedOut});
    }

    const sat = apiOptions.satStyling;
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
            satCorrectChoice && checked && styles.satDescriptionCorrectChecked,
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
        (!sat && !reviewMode && apiOptions.readOnly) || crossedOut;

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
                        sendChange({
                            checked: true,
                            crossedOut: false,
                        });
                    }}
                    className={descriptionClassName}
                    disabled={
                        disabled ||
                        apiOptions.staticRender ||
                        apiOptions.readOnly
                    }
                    aria-label={`Select Choice ${getChoiceLetter(pos)}`}
                    aria-checked={checked ? "true" : "false"}
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
                                <ChoiceIconWrapper
                                    radioStyleVersion={
                                        apiOptions.styling.radioStyleVersion
                                    }
                                    satStyling={sat}
                                >
                                    <ChoiceIcon
                                        pos={pos}
                                        correct={correct}
                                        crossedOut={crossedOut}
                                        pressed={pressed}
                                        focused={focused}
                                        checked={checked}
                                        showCorrectness={showCorrectness}
                                        reviewMode={reviewMode}
                                        product={
                                            apiOptions.satStyling
                                                ? "sat"
                                                : "library"
                                        }
                                        primaryProductColor={
                                            apiOptions.styling
                                                .primaryProductColor
                                        }
                                        previouslyAnswered={previouslyAnswered}
                                    />
                                </ChoiceIconWrapper>
                            </span>
                            <span
                                style={{
                                    paddingLeft: Spacing.small_12,
                                    textAlign: "left",
                                    flex: 1,
                                    paddingTop: 4,
                                }}
                            >
                                <div>
                                    <OptionStatus
                                        checked={checked}
                                        correct={correct}
                                        crossedOut={crossedOut}
                                        previouslyAnswered={previouslyAnswered}
                                        reviewMode={reviewMode}
                                        satStyling={sat}
                                    />
                                </div>
                                <div>{content}</div>
                            </span>
                        </div>
                    )}
                </Clickable>

                {apiOptions.crossOutEnabled && !reviewMode && (
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
                                                pos,
                                            )}`}
                                            disabled={
                                                apiOptions.readOnly ||
                                                reviewMode
                                            }
                                            onClick={() => {
                                                if (!crossedOut) {
                                                    // If we're crossing
                                                    // out a checked
                                                    // option, let's also
                                                    // uncheck it.
                                                    sendChange({
                                                        checked: false,
                                                        crossedOut: true,
                                                    });
                                                } else {
                                                    sendChange({
                                                        crossedOut: false,
                                                    });
                                                }
                                                close();
                                            }}
                                        >
                                            {crossedOut
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
                                    pos,
                                )}`}
                                disabled={apiOptions.staticRender}
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

            {showRationale && (
                <div
                    className={rationaleClassName}
                    data-test-id={`perseus-radio-rationale-content-${pos}`}
                >
                    {rationale}
                </div>
            )}
        </div>
    );
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
