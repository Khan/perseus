/**
 * This is a Mock Perseus widget. It is used for our rendering tests.
 * If you make changes to this file, you will need to update the tests
 * in both Perseus and Webapp.
 */

import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/phet-simulation/prompt-utils";

import type {MockWidgetOptions} from "../../perseus-types";
import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {PerseusMockWidgetUserInput} from "../../validation.types";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";

type Props = WidgetProps<MockWidgetOptions, MockWidgetOptions>;

type DefaultProps = {
    currentValue: Props["currentValue"];
};

// This renders the PhET sim
export class MockWidget extends React.Component<Props> implements Widget {
    static defaultProps: DefaultProps = {
        currentValue: "Hello",
    };

    static getUserInputFromProps(props: Props): PerseusMockWidgetUserInput {
        return {
            currentValue: props.currentValue,
        };
    }

    getPromptJSON(): UnsupportedWidgetPromptJSON {
        return _getPromptJSON();
    }

    getUserInput(): PerseusMockWidgetUserInput {
        return MockWidget.getUserInputFromProps(this.props);
    }

    render(): React.ReactNode {
        return (
            <View style={styles.widgetContainer}>This is a mock widget.</View>
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
} satisfies WidgetExports<typeof MockWidget>;
