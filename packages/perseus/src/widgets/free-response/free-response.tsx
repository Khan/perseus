/**
 * This widget is used for freeform text input. It is configured with a question
 * as an option and renders the question text along with a text input area where
 * the user can type any text as their answer. The initial use case for this widget
 * is "short answer" type questions.
 */

import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {font, spacing, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import warningCircleIcon from "@phosphor-icons/core/regular/warning-circle.svg";
import {css, StyleSheet} from "aphrodite";
import * as React from "react";
import {forwardRef} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import Renderer from "../../renderer";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {
    PerseusFreeResponseUserInput,
    PerseusFreeResponseWidgetOptions,
} from "@khanacademy/perseus-core";

type Props = WidgetProps<
    PerseusFreeResponseWidgetOptions,
    PerseusFreeResponseUserInput
>;

// TODO(agoforth): Create a custom validator for the widget that will cause
//   renderer.emptyWidgets() to work when there is no user input.

export const FreeResponse = forwardRef<Widget, Props>(function FreeResponse(
    {options, userInput, handleUserInput},
    _ref,
) {
    const {strings} = usePerseusI18n();
    const {allowUnlimitedCharacters, characterLimit, question, placeholder} =
        options;

    const characterCount = userInput.currentValue.replace(/\n/g, "").length;
    const isOverLimit =
        !allowUnlimitedCharacters && characterCount > characterLimit;
    const characterCountText = allowUnlimitedCharacters
        ? undefined
        : strings.characterCount({
              used: characterCount,
              num: characterLimit,
          });
    if (characterCountText) {
        announceMessage({
            message: characterCountText,
            level: isOverLimit ? "assertive" : "polite",
            debounceThreshold: 750,
        });
    }

    return (
        <View style={styles.container} className={"free-response"}>
            <LabeledField
                label={
                    <View className="free-response-question">
                        <Renderer content={question} strings={strings} />
                    </View>
                }
                field={
                    <TextArea
                        error={isOverLimit}
                        onChange={(newValue: string) =>
                            handleUserInput({currentValue: newValue})
                        }
                        placeholder={placeholder}
                        style={styles.textarea}
                        value={userInput.currentValue}
                    />
                }
                additionalHelperMessage={
                    <p
                        className={css(
                            styles.characterCountText,
                            isOverLimit ? styles.overCharacterLimit : undefined,
                        )}
                    >
                        {isOverLimit && (
                            <PhosphorIcon
                                aria-label="Error:"
                                icon={warningCircleIcon}
                                size="small"
                                style={styles.warningCircleIcon}
                            />
                        )}
                        {characterCountText}
                    </p>
                }
            />
        </View>
    );
});

function getStartUserInput(): PerseusFreeResponseUserInput {
    return {
        currentValue: "",
    };
}

// eslint-disable-next-line no-restricted-syntax
export default {
    name: "free-response",
    accessible: true,
    displayName: "Free Response (Assessments only)",
    widget: FreeResponse,
    hidden: false,
    // FreeResponse doesn't serialize user input,
    // so just bring up the default user input when restoring
    // (which we likely never should/will for FreeResponse)
    getUserInputFromSerializedState: getStartUserInput,
    getStartUserInput,
} as WidgetExports<typeof FreeResponse>;

const styles = StyleSheet.create({
    container: {
        gap: spacing.xSmall_8,
    },
    characterCountText: {
        color: semanticColor.core.foreground.neutral.default,
        fontSize: font.body.size.small,
        margin: 0,
    },
    overCharacterLimit: {
        color: semanticColor.core.foreground.critical.default,
    },
    textarea: {
        padding: spacing.medium_16,
    },
    warningCircleIcon: {
        marginInlineEnd: spacing.xSmall_8,
    },
});
