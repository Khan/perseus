import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/mock-widget/prompt-utils";

import scoreMockWidget from "./score-mock-widget";

import type {MockWidgetOptions} from "../../perseus-types";
import type {WidgetExports, WidgetProps, Widget, FocusPath} from "../../types";
import type {
    PerseusMockWidgetRubric,
    PerseusMockWidgetUserInput,
} from "../../validation.types";
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
 * across both Perseus and Webapp. It is a simple widget that renders an interactable
 * input field, and allows the user to input a string value.
 *
 * Please use this widget for all tests that require a widget to be rendered,
 * so that we can ensure that our tests are consistent across both platforms,
 * and so that we can more easily update our widget schemas without needing to
 * update irrelevant tests across our codebases.
 */
export class MockWidget extends React.Component<Props> implements Widget {
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
        /* c8 ignore next */
        this.props.onChange(
            {
                currentValue: newValue,
            },
            cb,
        );
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
        /* c8 ignore next */
        return [[]];
    };

    getUserInput(): PerseusMockWidgetUserInput {
        return MockWidget.getUserInputFromProps(this.props);
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
    widget: MockWidget,
    isLintable: true,
    // TODO(LEMS-2656): remove TS suppression
    // @ts-expect-error: Type 'UserInput' is not assignable to type 'MockWidget'.
    scorer: scoreMockWidget,
} satisfies WidgetExports<typeof MockWidget>;
