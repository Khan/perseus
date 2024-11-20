import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/phet-simulation/prompt-utils";

import type {MockWidgetOptions} from "../../perseus-types";
import type {WidgetExports, WidgetProps, Widget, Path} from "../../types";
import type {PerseusMockWidgetUserInput} from "../../validation.types";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";

type Props = WidgetProps<MockWidgetOptions, MockWidgetOptions>;

type DefaultProps = {
    currentValue: Props["currentValue"];
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

    static getUserInputFromProps(props: Props): PerseusMockWidgetUserInput {
        return {
            currentValue: props.currentValue,
        };
    }

    getPromptJSON(): UnsupportedWidgetPromptJSON {
        return _getPromptJSON();
    }

    setInputValue: (arg1: Path, arg2: string, arg3: () => void) => void = (
        path,
        newValue,
        cb,
    ) => {
        this.props.onChange(
            {
                currentValue: newValue,
            },
            cb,
        );
    };

    getUserInput(): PerseusMockWidgetUserInput {
        return MockWidget.getUserInputFromProps(this.props);
    }

    render(): React.ReactNode {
        return <View style={styles.widgetContainer} />;
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
} satisfies WidgetExports<typeof MockWidget>;
