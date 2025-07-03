import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/mock-widget/prompt-utils";

import type {MockWidgetOptions} from "./mock-widget-types";
import type {WidgetProps, Widget, FocusPath, WidgetExports} from "../../types";
import type {MockWidgetPromptJSON} from "../../widget-ai-utils/mock-widget/prompt-utils";
import type {PerseusMockWidgetUserInput} from "@khanacademy/perseus-score";

type ExternalProps = WidgetProps<MockWidgetOptions, PerseusMockWidgetUserInput>;

type Props = ExternalProps;

type DefaultProps = {
    userInput: Props["userInput"];
};

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
    static defaultProps: DefaultProps = {
        userInput: {
            currentValue: "",
        },
    };

    inputRef: HTMLElement | null = null;

    getPromptJSON(): MockWidgetPromptJSON {
        return _getPromptJSON(this.props, this.getUserInput());
    }

    setInputValue: (
        path: FocusPath,
        newValue: string,
        cb?: () => unknown | null | undefined,
    ) => void = (path, newValue, cb) => {
        this.props.handleUserInput(
            {
                currentValue: newValue,
            },
            cb,
        );
    };

    focus: () => boolean = () => {
        this.inputRef?.focus();
        return true;
    };

    focusInputPath: () => void = () => {
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

    /**
     * TODO: remove this when everything is pulling from Renderer state
     * @deprecated get user input from Renderer state
     */
    getUserInput(): PerseusMockWidgetUserInput {
        return this.props.userInput;
    }

    handleChange: (
        newValue: string,
        cb?: () => unknown | null | undefined,
    ) => void = (newValue, cb) => {
        this.props.handleUserInput({currentValue: newValue}, cb);
        this.props.trackInteraction();
    };

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState/restoreSerializedState
     */
    getSerializedState() {
        const {userInput, ...rest} = this.props;
        return {
            ...rest,
            currentValue: userInput.currentValue,
        };
    }

    render(): React.ReactNode {
        return (
            <View style={styles.widgetContainer}>
                {/* eslint-disable-next-line jsx-a11y/no-redundant-roles -- TODO(LEMS-2871): Address a11y error */}
                <TextField
                    ref={(ref) => (this.inputRef = ref)}
                    aria-label="Mock Widget"
                    value={this.props.userInput.currentValue}
                    onChange={this.handleChange}
                    id={this.props.widgetId}
                    role="textbox"
                    onFocus={this.focusInputPath}
                    onBlur={this.blurInputPath}
                />
            </View>
        );
    }
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState/restoreSerializedState
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
