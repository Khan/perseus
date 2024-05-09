/* eslint-disable react/no-unsafe */
import Button from "@khanacademy/wonder-blocks-button";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import {useState, useEffect} from "react";
import _ from "underscore";

import {usePerseusI18n} from "../../components/i18n-context";
import Icon from "../../components/icon";
import {ApiOptions, ClassNames} from "../../perseus-api";
import mediaQueries from "../../styles/media-queries";

import getA11yText from "./choice-a11y-text";
import ChoiceIcon from "./choice-icon/choice-icon";
import OptionStatus from "./option-status";
import {getChoiceLetter} from "./util";

import type {APIOptions} from "../../types";

const intermediateCheckboxPadding = `16px 16px`;
const intermediateCheckboxPaddingPhone = `12px 16px`;

const ellipsisHorizontalIcon = {
    path: "M27.218 6.82l0 13.578q0 2.852-1.984 4.836t-4.836 1.984l-13.578 0q-2.852 0-4.836-1.984t-1.984-4.836l0-13.578q0-2.852 1.984-4.836t4.836-1.984l13.578 0q2.852 0 4.836 1.984t1.984 4.836zm36.27 0l0 13.578q0 2.852-1.984 4.836t-4.836 1.984l-13.578 0q-2.852 0-4.836-1.984t-1.984-4.836l0-13.578q0-2.852 1.984-4.836t4.836-1.984l13.578 0q2.852 0 4.836 1.984t1.984 4.836zm36.27 0l0 13.578q0 2.852-1.984 4.836t-4.836 1.984l-13.578 0q-2.852 0-4.836-1.984t-1.984-4.836l0-13.578q0-2.852 1.984-4.836t4.836-1.984l13.578 0q2.852 0 4.836 1.984t1.984 4.836z",
    width: 100,
    height: 27.284,
} as const;

export type ChoiceProps = {
    apiOptions?: APIOptions;
    checked?: boolean;
    rationale: React.ReactNode;
    content: React.ReactNode;
    correct?: boolean;
    disabled?: boolean;
    // This indicates the position of the choice relative to others
    // (so that we can display a nice little (A), (B), etc. next to it)
    // Also used to generate an id for each input.
    pos: number;
    reviewMode: boolean;
    showRationale: boolean;
    showCorrectness: boolean;
    multipleSelect: boolean;
    // Indicates whether the user has "crossed out" this choice, meaning
    // that they don't think it's correct. This value does not affect
    // scoring or other behavior; it's just a note for the user's
    // reference.
    crossedOut: boolean;
    // Indicates that the user has previously selected this answer. These
    // answers may be rendered orange in review, rather than grey if
    // incorrect.
    previouslyAnswered?: boolean;
    // A callback indicating that this choice has changed. Its argument is
    // an object with two keys: `checked` and `crossedOut`. Each contains a
    // boolean value specifying the new checked and crossed-out value of
    // this choice.
    onChange?: (newValues: {checked: boolean; crossedOut: boolean}) => void;
};

type WithForwardRef = {
    forwardedRef: React.ForwardedRef<HTMLButtonElement>;
};

type ChoicePropsWithForwardRef = ChoiceProps & WithForwardRef;

const Choice = function (props: ChoicePropsWithForwardRef): React.ReactElement {
    const {
        disabled = false,
        checked = false,
        content,
        crossedOut,
        showCorrectness,
        multipleSelect,
        onChange = (newValues: {
            checked: boolean;
            crossedOut: boolean;
        }): void => {},
        reviewMode,
        correct = false,
        apiOptions = ApiOptions.defaults,
        previouslyAnswered = false,
        pos = 0,
        showRationale = false,
        rationale,
        forwardedRef,
    } = props;
    const [isInputFocused, setIsInputFocused] = useState(false);

    const {strings} = usePerseusI18n();

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
    function sendChange(newValues: {checked?: boolean; crossedOut?: boolean}) {
        const updatedChecked = newValues.checked ?? checked;
        const updatedCrossedOut = newValues.crossedOut ?? crossedOut;
        onChange({checked: updatedChecked, crossedOut: updatedCrossedOut});
    }

    const descriptionClassName = classNames(
        "description",
        css(styles.description),
    );

    const rationaleClassName = classNames(
        "perseus-radio-rationale-content",
        css(styles.rationale),
    );

    // We want to show the choices as dimmed out when the choices are disabled.
    // However, we don't want to do this when we're in review mode in the
    // content library.
    const showDimmed = (!reviewMode && apiOptions.readOnly) || crossedOut;

    const letter = getChoiceLetter(pos, strings);
    const a11yText = getA11yText(
        letter,
        checked,
        correct,
        crossedOut,
        showCorrectness,
        strings,
    );

    return (
        <div
            style={{
                // @ts-expect-error - TS2322 - Type '{ dispay: string; flexDirection: "column"; color: string; }' is not assignable to type 'Properties<string | number, string & {}>'.
                dispay: "flex",
                flexDirection: "column",
                color: color.offBlack,
            }}
            className={descriptionClassName}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    opacity: showDimmed ? 0.5 : 1.0,
                    overflowX: "auto",
                    overflowY: "hidden",
                }}
            >
                <div className="perseus-sr-only">
                    <label>
                        {a11yText} &nbsp; {content}
                        <input
                            type={multipleSelect ? "checkbox" : "radio"}
                            checked={checked}
                            onClick={() => {
                                // If we're checking a crossed-out option, let's
                                // also uncross it.
                                sendChange({
                                    checked: !checked,
                                    crossedOut: false,
                                });
                            }}
                            onChange={() => {}}
                            disabled={disabled || apiOptions.readOnly}
                            tabIndex={-1}
                            className={ClassNames.RADIO.OPTION_CONTENT}
                        />
                    </label>
                </div>
                <Clickable
                    onClick={() => {
                        // If we're checking a crossed-out option, let's
                        // also uncross it.
                        sendChange({
                            checked: !checked,
                            crossedOut: false,
                        });
                    }}
                    disabled={disabled || apiOptions.readOnly}
                    style={{flex: 1, color: color.offBlack, userSelect: "text"}}
                    ref={forwardedRef as any}
                    aria-hidden="true"
                >
                    {({hovered, focused, pressed}) => (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignContent: "center",
                                paddingTop: spacing.xSmall_8,
                                paddingBottom: spacing.xSmall_8,
                                paddingLeft: spacing.xSmall_8,
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
                                previouslyAnswered={previouslyAnswered}
                            />
                            <span
                                style={{
                                    paddingLeft: spacing.small_12,
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
                                title={strings.crossOut}
                                content={strings.crossOutOption}
                                closeButtonVisible
                                actions={
                                    <View>
                                        <Strut size={spacing.medium_16} />
                                        <Button
                                            kind="primary"
                                            aria-label={strings.crossOutChoice({
                                                letter: getChoiceLetter(
                                                    pos,
                                                    strings,
                                                ),
                                            })}
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
                                                ? strings.bringBack
                                                : strings.crossOut}
                                        </Button>
                                    </View>
                                }
                            />
                        )}
                    >
                        {({open}) => (
                            <Clickable
                                onClick={open}
                                aria-label={strings.openMenuForChoice({
                                    letter: getChoiceLetter(pos, strings),
                                })}
                                style={{
                                    alignSelf: "center",
                                    padding: "5px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginLeft: "10px",
                                }}
                            >
                                {({hovered, focused, pressed}) => (
                                    <Icon
                                        icon={ellipsisHorizontalIcon}
                                        size={3}
                                        color={color.offBlack64}
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
                    data-testid={`perseus-radio-rationale-content-${pos}`}
                >
                    {rationale}
                </div>
            )}
        </div>
    );
};

const styles = StyleSheet.create({
    description: {
        display: "inline-block",
        width: "100%",
    },

    rationale: {
        display: "block",
        padding: intermediateCheckboxPadding,
        paddingTop: 0,
        marginLeft: 54,
        color: color.offBlack64,
        [mediaQueries.smOrSmaller]: {
            padding: intermediateCheckboxPaddingPhone,
            paddingTop: 0,
        },
    },
});

export default React.forwardRef<HTMLButtonElement, ChoiceProps>(
    (props, ref) => <Choice {...props} forwardedRef={ref} />,
);
