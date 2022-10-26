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
import {ApiOptions} from "../../perseus-api.jsx";
import * as styleConstants from "../../styles/constants.js";
import mediaQueries from "../../styles/media-queries.js";

import ChoiceIcon from "./choice-icon/choice-icon.jsx";
import OptionStatus from "./option-status.jsx";
import {getChoiceLetter} from "./util.js";

import type {APIOptions} from "../../types.js";

const intermediateCheckboxPadding = `16px 16px`;
const intermediateCheckboxPaddingPhone = `12px 16px`;

const ellipsisHorizontalIcon = {
    path: "M27.218 6.82l0 13.578q0 2.852-1.984 4.836t-4.836 1.984l-13.578 0q-2.852 0-4.836-1.984t-1.984-4.836l0-13.578q0-2.852 1.984-4.836t4.836-1.984l13.578 0q2.852 0 4.836 1.984t1.984 4.836zm36.27 0l0 13.578q0 2.852-1.984 4.836t-4.836 1.984l-13.578 0q-2.852 0-4.836-1.984t-1.984-4.836l0-13.578q0-2.852 1.984-4.836t4.836-1.984l13.578 0q2.852 0 4.836 1.984t1.984 4.836zm36.27 0l0 13.578q0 2.852-1.984 4.836t-4.836 1.984l-13.578 0q-2.852 0-4.836-1.984t-1.984-4.836l0-13.578q0-2.852 1.984-4.836t4.836-1.984l13.578 0q2.852 0 4.836 1.984t1.984 4.836z",
    width: 100,
    height: 27.284,
};

export type ChoiceProps = {|
    apiOptions: APIOptions,
    checked: boolean,
    rationale: React.Node,
    content: React.Node,
    correct: boolean,
    disabled: boolean,
    // This indicates the position of the choice relative to others
    // (so that we can display a nice little (A), (B), etc. next to it)
    // Also used to generate an id for each input.
    pos: number,
    reviewMode: boolean,
    showRationale: boolean,
    showCorrectness: boolean,
    multipleSelect: boolean,

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

type WithForwardRef = {|forwardedRef: React.Ref<"button">|};

type ChoicePropsWithForwardRef = {|
    ...ChoiceProps,
    ...WithForwardRef,
|};

function Choice(props: ChoicePropsWithForwardRef): React.Node {
    const {
        disabled,
        checked,
        content,
        crossedOut,
        showCorrectness,
        multipleSelect,
        onChange,
        reviewMode,
        correct,
        apiOptions,
        previouslyAnswered,
        pos,
        showRationale,
        rationale,
        forwardedRef,
    } = props;
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        if (isInputFocused && disabled) {
            setIsInputFocused(false);
        }
    }, [disabled, isInputFocused, setIsInputFocused]);

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

    // HACK: while most of the styling for rendering SAT items is handled
    // via aphrodite, we also need to assign normal CSS classnames here to
    // special-case the coloring of MathJax formulas (see .MathJax .math in
    // stylesheets/task-package/tasks.less)
    const satCorrectChoice = apiOptions.satStyling && reviewMode && correct;
    const satIncorrectChecked =
        apiOptions.satStyling && reviewMode && !correct && checked;
    const descriptionClassName = classNames(
        "description",
        satCorrectChoice && "sat-correct",
        satIncorrectChecked && "sat-incorrect",
        css(
            !apiOptions.satStyling && styles.description,
            apiOptions.satStyling && styles.satDescription,
            satCorrectChoice && styles.satDescriptionCorrect,
            satCorrectChoice && checked && styles.satDescriptionCorrectChecked,
            satIncorrectChecked && styles.satDescriptionIncorrectChecked,
        ),
    );

    const rationaleClassName = classNames(
        "perseus-radio-rationale-content",
        css(
            styles.rationale,
            !apiOptions.satStyling && styles.nonSatRationale,
            apiOptions.satStyling && styles.satReviewRationale,
        ),
    );

    // We want to show the choices as dimmed out when the choices are
    // disabled. However, we don't want to do this in the SAT product and
    // we also don't want to do this when we're in review mode in the
    // content library.
    const showDimmed =
        (!apiOptions.satStyling && !reviewMode && apiOptions.readOnly) ||
        crossedOut;

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
                            checked: !checked,
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
                    ref={(forwardedRef: any)}
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
                            <ChoiceIcon
                                pos={pos}
                                correct={correct}
                                crossedOut={crossedOut}
                                pressed={pressed}
                                focused={focused}
                                checked={checked}
                                hovered={hovered}
                                showCorrectness={showCorrectness}
                                multipleSelect={multipleSelect}
                                reviewMode={reviewMode}
                                product={
                                    apiOptions.satStyling ? "sat" : "library"
                                }
                                primaryProductColor={
                                    apiOptions.styling?.primaryProductColor
                                }
                                previouslyAnswered={previouslyAnswered}
                            />
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
                                        satStyling={apiOptions.satStyling}
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

Choice.defaultProps = {
    disabled: false,
    checked: false,
    onChange: (newValues: {checked: boolean, crossedOut: boolean}): void => {},
    correct: false,
    apiOptions: ApiOptions.defaults,
    previouslyAnswered: false,
    pos: 0,
    showRationale: false,
};

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

type ExportProps = $Diff<React.ElementConfig<typeof Choice>, WithForwardRef>;

export default (React.forwardRef<ExportProps, HTMLButtonElement>(
    (props, ref) => <Choice {...props} forwardedRef={ref} />,
): React.AbstractComponent<ExportProps, HTMLButtonElement>);
