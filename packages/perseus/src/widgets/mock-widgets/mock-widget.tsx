import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/mock-widget/prompt-utils";

import scoreMockWidget from "./score-mock-widget";
import validateMockWidget from "./validate-mock-widget";

import type {
    MockWidgetOptions,
    PerseusMockWidgetRubric,
    PerseusMockWidgetUserInput,
} from "./mock-widget-types";
import type {WidgetExports, WidgetProps, Widget, FocusPath} from "../../types";
import type {MockWidgetPromptJSON} from "../../widget-ai-utils/mock-widget/prompt-utils";

type ExternalProps = WidgetProps<MockWidgetOptions, PerseusMockWidgetRubric>;

type DefaultProps = {
    currentValue: Props["currentValue"];
};

type Props = ExternalProps & {
    currentValue: string;
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
        currentValue: "",
    };

    inputRef: HTMLElement | null = null;

    static getUserInputFromProps(props: Props): PerseusMockWidgetUserInput {
        return {
            currentValue: props.currentValue,
        };
    }

    getPromptJSON(): MockWidgetPromptJSON {
        return _getPromptJSON(this.props, this.getUserInput());
    }

    setInputValue: (
        arg1: FocusPath,
        arg2: string,
        arg3?: () => unknown | null | undefined,
    ) => void = (path, newValue, cb) => {
        this.props.onChange(
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

    getUserInput(): PerseusMockWidgetUserInput {
        return MockWidgetComponent.getUserInputFromProps(this.props);
    }

    handleChange: (
        arg1: string,
        arg2?: () => unknown | null | undefined,
    ) => void = (newValue, cb) => {
        this.props.onChange({currentValue: newValue}, cb);
        this.props.trackInteraction();
    };

    render(): React.ReactNode {
        return (
            <View style={styles.widgetContainer}>
                <TextField
                    ref={(ref) => (this.inputRef = ref)}
                    aria-label="Mock Widget"
                    value={this.props.currentValue}
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
    // TODO(LEMS-2656): remove TS suppression
    // @ts-expect-error: Type 'UserInput' is not assignable to type 'MockWidget'.
    scorer: scoreMockWidget,
    // TODO(LEMS-2656): remove TS suppression
    // @ts-expect-error: Type 'UserInput' is not assignable to type 'PerseusMockWidgetUserInput'.
    validator: validateMockWidget,
} satisfies WidgetExports<typeof MockWidgetComponent>;
