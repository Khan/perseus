/**
 * This widget is used for freeform text input. It is configured with a question
 * as an option and renders the question text along with a text input area where
 * the user can type any text as their answer. The initial use case for this widget
 * is "short answer" type questions.
 */

import {Text, View} from "@khanacademy/wonder-blocks-core";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {
    color,
    font,
    spacing,
    semanticColor,
} from "@khanacademy/wonder-blocks-tokens";
import warningCircleIcon from "@phosphor-icons/core/regular/warning-circle.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
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

type DefaultProps = Pick<Props, "userInput">;

// TODO(agoforth): Create a custom validator for the widget that will cause
//   renderer.emptyWidgets() to work when there is no user input.

export class FreeResponse extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    static defaultProps: DefaultProps = {
        userInput: {
            currentValue: "",
        },
    };

    characterCount = () => {
        return this.props.userInput.currentValue.replace(/\n/g, "").length;
    };

    _handleUserInput = (newValue: string) => {
        this.props.handleUserInput({currentValue: newValue});
    };

    isOverLimit() {
        return (
            !this.props.allowUnlimitedCharacters &&
            this.characterCount() > this.props.characterLimit
        );
    }

    renderCharacterCount(): React.ReactNode {
        if (this.props.allowUnlimitedCharacters) {
            return null;
        }

        const characterCountText = this.context.strings.characterCount({
            used: this.characterCount(),
            num: this.props.characterLimit,
        });

        return (
            <View>
                <Text
                    role="status"
                    style={[
                        styles.characterCountText,
                        this.isOverLimit()
                            ? styles.overCharacterLimit
                            : undefined,
                    ]}
                >
                    {this.isOverLimit() && (
                        <PhosphorIcon
                            icon={warningCircleIcon}
                            size="small"
                            style={styles.warningCircleIcon}
                        />
                    )}

                    {characterCountText}
                </Text>
            </View>
        );
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container} className={"free-response"}>
                <LabeledField
                    label={
                        <View className="free-response-question">
                            <Renderer
                                content={this.props.question}
                                strings={this.context.strings}
                            />
                        </View>
                    }
                    field={
                        <TextArea
                            error={this.isOverLimit()}
                            onChange={this._handleUserInput}
                            placeholder={this.props.placeholder}
                            style={styles.textarea}
                            value={this.props.userInput.currentValue}
                        />
                    }
                />
                {this.renderCharacterCount()}
            </View>
        );
    }
}

function getStartUserInput(): PerseusFreeResponseUserInput {
    return {
        currentValue: "",
    };
}

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
        fontSize: font.size.small,
    },
    overCharacterLimit: {
        color: color.red,
    },
    textarea: {
        padding: spacing.medium_16,
    },
    warningCircleIcon: {
        marginInlineEnd: spacing.xSmall_8,
    },
});
