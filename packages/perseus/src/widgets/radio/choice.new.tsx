/* eslint-disable react/no-unsafe */
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import classNames from "classnames";
import * as React from "react";
import {useState, useEffect} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import {ApiOptions, ClassNames} from "../../perseus-api";
import mediaQueries from "../../styles/media-queries";

import ChoiceIcon from "./choice-icon/choice-icon.new";
import OptionStatus from "./option-status.new";
import {getChoiceLetter, getA11yText} from "./utils/string-utils";

import type {APIOptions} from "../../types";

const intermediateCheckboxPadding = `16px 16px`;
const intermediateCheckboxPaddingPhone = `12px 16px`;

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
    // Indicates that the user has previously selected this answer. These
    // answers may be rendered orange in review, rather than grey if
    // incorrect.
    previouslyAnswered?: boolean;
    // A callback indicating that this choice has changed. Its argument is
    // an object with a `checked` key. It contains a boolean value specifying
    // the new checked value of this choice.
    onChange?: (newValues: {checked: boolean}) => void;
};

/**
 * This component is a duplicate of the Choice component in choice.tsx
 * for the Radio Revitalization Project. (LEMS-2933)
 * This component will eventually replace choice.tsx when the feature flag is no longer needed.
 *
 * TODO(LEMS-2994): Clean up this file.
 */
const Choice = React.forwardRef<HTMLButtonElement, ChoiceProps>(
    (
        {
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
        },
        ref,
    ): React.ReactElement => {
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
        function sendChange(newValues: {
            checked?: boolean;
            crossedOut?: boolean;
        }) {
            const updatedChecked = newValues.checked ?? checked;
            const updatedCrossedOut = newValues.crossedOut ?? crossedOut;
            onChange({checked: updatedChecked, crossedOut: updatedCrossedOut});
        }

        const descriptionClassName = classNames("description");
        const rationaleClassName = classNames(
            "perseus-radio-rationale-content",
        );

        // We want to show the choices as dimmed out when the choices are disabled.
        // However, we don't want to do this when we're in review mode in the
        // content library.
        const showDimmed = (!reviewMode && apiOptions.readOnly) || crossedOut;

        const letter = getChoiceLetter(pos, strings);
        const a11yText = getA11yText({
            letter,
            checked,
            correct,
            crossedOut,
            showCorrectness,
            strings,
        });

        return (
            <div className={descriptionClassName} style={styles.description}>
                <div
                    style={{
                        display: "flex",
                        opacity: showDimmed ? 0.5 : 1.0,
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
                        style={{
                            flex: 1,
                            color: color.offBlack,
                            userSelect: "text",
                        }}
                        ref={ref as any}
                        aria-hidden="true"
                        hideDefaultFocusRing={true}
                    >
                        {({hovered, focused, pressed}) => (
                            <div style={styles.choiceRow}>
                                <div style={styles.choiceIcon}>
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
                                </div>
                                <span style={styles.choiceContent}>
                                    <div>
                                        <OptionStatus
                                            checked={checked}
                                            correct={correct}
                                            crossedOut={crossedOut}
                                            previouslyAnswered={
                                                previouslyAnswered
                                            }
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
                                                aria-label={strings.crossOutChoice(
                                                    {
                                                        letter: getChoiceLetter(
                                                            pos,
                                                            strings,
                                                        ),
                                                    },
                                                )}
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
                        style={styles.rationale}
                        data-testid={`perseus-radio-rationale-content-${pos}`}
                    >
                        {rationale}
                    </div>
                )}
            </div>
        );
    },
);

const styles = {
    description: {
        display: "inline-block",
        width: "100%",
        flexDirection: "column",
        color: color.offBlack,
    },

    choiceRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: spacing.xSmall_8,
        paddingBottom: spacing.xSmall_8,
        paddingLeft: spacing.xSmall_8,
        position: "relative",
        minWidth: "100%",
        left: 0,
        // The height and background will ensure content will be scrolled
        // behind the ChoiceIcon and will not be visible
        height: "100%",
        background: color.white64, // TODO: LEMS-3108 address light/dark mode theme
    },

    choiceIcon: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: "30px",
        position: "sticky",
        left: 0,
        background: "linear-gradient(to right, white 70%, transparent)",
        // TODO: LEMS-3107 adjust to support RTL
        paddingRight: spacing.xSmall_8,
        paddingTop: spacing.xxxSmall_4,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },

    choiceContent: {
        paddingLeft: spacing.small_12,
        textAlign: "left",
        flex: 1,
        paddingTop: spacing.xxxSmall_4,
        minWidth: 0,
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
} as const;

export default Choice;
