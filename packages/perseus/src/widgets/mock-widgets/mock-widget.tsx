import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/mock-widget/prompt-utils";

import type {MockWidgetOptions} from "./mock-widget-types";
import type {WidgetProps, Widget, WidgetExports} from "../../types";
import type {MockWidgetPromptJSON} from "../../widget-ai-utils/mock-widget/prompt-utils";
import type {PerseusMockWidgetUserInput} from "@khanacademy/perseus-score";

type ExternalProps = WidgetProps<MockWidgetOptions, PerseusMockWidgetUserInput>;

type Props = ExternalProps;

/**
 * This is a Mock Perseus widget, which is used for our various rendering tests
 * both internally and in consuming projects. It is a simple widget that renders
 * an interactable input field, and allows the user to input a string value.
 *
 * Please use this widget for all tests that are not specifically testing the
 * functionality of a particular widget, such as testing the rendering components.
 * This allows us to more easily update our widget schemas and behaviour without needing to
 * update many different irrelevant tests across our codebases.
 *
 * You can register this widget for your tests by calling `registerWidget("mock-widget", MockWidget);`
 */
class MockWidgetComponent extends React.Component<Props> implements Widget {
    inputRef: HTMLElement | null = null;

    getPromptJSON(): MockWidgetPromptJSON {
        return _getPromptJSON(this.props);
    }

    focus: () => boolean = () => {
        this.inputRef?.focus();
        return true;
    };

    handleFocus: () => void = () => {
        this.props.onFocus([]);
        this.inputRef?.focus();
    };

    blurInputPath: () => void = () => {
        this.props.onBlur([]);
        this.inputRef?.blur();
    };

    getInputPaths: () => ReadonlyArray<ReadonlyArray<string>> = () => {
        // The widget itself is an input, so we return a single empty list to
        // indicate this.
        return [[]];
    };

    handleChange: (
        newValue: string,
        cb?: () => unknown | null | undefined,
    ) => void = (newValue, cb) => {
        this.props.handleUserInput({currentValue: newValue}, cb);
        this.props.trackInteraction();
    };

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState
     */
    getSerializedState() {
        const {userInput, options, ...rest} = this.props;
        return {
            // `rest` goes last because the renderer used to spread the universal
            // props over the options, so the universal `static` — not the
            // option of the same name — is the one that gets serialized.
            ...options,
            ...rest,
            currentValue: userInput.currentValue,
        };
    }

    render(): React.ReactNode {
        return (
            <View style={styles.widgetContainer}>
                <TextField
                    ref={(ref) => (this.inputRef = ref)}
                    aria-label="Mock Widget"
                    value={this.props.userInput.currentValue}
                    onChange={this.handleChange}
                    id={this.props.widgetId}
                    onFocus={this.handleFocus}
                    onBlur={this.blurInputPath}
                />
            </View>
        );
    }
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusMockWidgetUserInput {
    return {
        currentValue: serializedState.currentValue,
    };
}

function getStartUserInput(options: PerseusMockWidgetUserInput) {
    return {
        currentValue: "",
    };
}

const styles = StyleSheet.create({
    widgetContainer: {
        color: "red",
    },
});

export default {
    name: "mock-widget",
    displayName: "Mock Widget",
    widget: MockWidgetComponent,
    isLintable: true,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof MockWidgetComponent>;
