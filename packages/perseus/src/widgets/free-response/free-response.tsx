/**
 * This widget is used for freeform text input. It is configured with a question
 * as an option and renders the question text along with a text input area where
 * the user can type any text as their answer. The initial use case for this widget
 * is "short answer" type questions.
 */

import {Text, View} from "@khanacademy/wonder-blocks-core";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import warningCircleIcon from "@phosphor-icons/core/regular/warning-circle.svg";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {PerseusFreeResponseWidgetOptions} from "@khanacademy/perseus-core";
import type {PerseusFreeResponseUserInput} from "@khanacademy/perseus-score";

type RenderProps = Pick<
    PerseusFreeResponseWidgetOptions,
    "allowUnlimitedCharacters" | "characterLimit" | "placeholder" | "question"
>;
type Props = WidgetProps<RenderProps>;

type State = {
    currentValue: string;
};

// TODO(agoforth): Create a custom validator for the widget that will cause
//   renderer.emptyWidgets() to work when there is no user input.

export class FreeResponse
    extends React.Component<Props, State>
    implements Widget
{
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    state: State = {
        currentValue: "",
    };

    characterCount = () => {
        return this.state.currentValue.replace(/\n/g, "").length;
    };

    getUserInput(): PerseusFreeResponseUserInput {
        return {
            currentValue: this.state.currentValue,
        };
    }

    handleChange = (newValue: string) => {
        this.setState({currentValue: newValue});
    };

    isOverLimit = () => {
        return (
            !this.props.allowUnlimitedCharacters &&
            this.characterCount() > this.props.characterLimit
        );
    };

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
                    style={
                        this.isOverLimit()
                            ? styles.overCharacterLimit
                            : undefined
                    }
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
            <View style={styles.container}>
                <label className={css(styles.labelAndTextarea)}>
                    <LabelLarge>{this.props.question}</LabelLarge>
                    <TextArea
                        error={this.isOverLimit()}
                        onChange={this.handleChange}
                        placeholder={this.props.placeholder}
                        style={styles.textarea}
                        value={this.state.currentValue}
                    />
                </label>
                {this.renderCharacterCount()}
            </View>
        );
    }
}

export default {
    name: "free-response",
    accessible: true,
    displayName: "Free Response",
    widget: FreeResponse,
    // Hides widget from content creators until full release
    hidden: true,
} as WidgetExports<typeof FreeResponse>;

const styles = StyleSheet.create({
    container: {
        gap: spacing.xSmall_8,
    },
    labelAndTextarea: {
        display: "flex",
        flexDirection: "column",
        gap: spacing.small_12,
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
