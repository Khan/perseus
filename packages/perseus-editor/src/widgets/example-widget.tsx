/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/sort-comp */
/**
 * This is a simple number-entry widget
 * It is not as powerful as number-input, but has a simpler, more
 * representative structure as an example widget, and is easier to
 * test new ideas on.
 *
 * TODO(jack): Add more comments
 */
import {Changeable} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import type {WidgetExports} from "@khanacademy/perseus";

class TextInput extends React.Component<any> {
    input = React.createRef<HTMLInputElement>();

    render(): React.ReactNode {
        return (
            <input
                ref={this.input}
                value={this.props.value || ""}
                onChange={this.changeValue}
            />
        );
    }

    focus = () => {
        this.input.current?.focus();
        return true;
    };

    changeValue = (e: any) => {
        // Translating from the js event e to the value
        // of the textbox to send to onChange
        this.props.onChange(e.target.value);
    };
}

/**
 * This is the widget's renderer. It shows up in the right column
 * in the demo, and is what is visible to users, and where
 * users enter their answers.
 */
class ExampleWidget extends React.Component<any> {
    static propTypes = {
        ...Changeable.propTypes,
        value: PropTypes.string,
    };

    static defaultProps: any = {
        value: "",
    };

    input = React.createRef<TextInput>();

    /**
     * This is the widget's grading function. simpleValidate generally
     * defers to this function.
     *
     * value is usually the result of getUserInput on the widget
     * rubric is the result of calling serialize() on the editor
     */
    static validate(value: string, rubric: any): any {
        if (value === "") {
            return {
                type: "invalid",
                message:
                    "It looks like you haven't answered all of the " +
                    "question yet.",
            };
        }
        if (value === rubric.correct) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null,
            };
        }
        return {
            type: "points",
            earned: 0,
            total: 1,
            message: null,
        };
    }

    /**
     * Tell our parent to update our props.
     */
    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    render(): React.ReactNode {
        return (
            <TextInput
                ref={this.input}
                value={this.props.value}
                // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                onChange={this.change("value")}
            />
        );
    }

    getUserInput: () => string = () => {
        return this.props.value;
    };

    /**
     * Widgets that are focusable should add a focus method that returns
     * true if focusing succeeded. The first such widget found will be
     * focused on page load.
     */
    focus: () => boolean = () => {
        this.input.current?.focus();
        return true;
    };

    /**
     * simpleValidate is called for grading. Rubric is the result of calling
     * getUserInput() on the editor that created this widget.
     *
     * Should return an object representing the grading result, such as
     * {
     *     type: "points",
     *     earned: 1,
     *     total: 1,
     *     message: null
     * }
     */
    simpleValidate: (arg1: any) => any = (rubric) => {
        return ExampleWidget.validate(this.getUserInput(), rubric);
    };
}

/**
 * For this widget to work, we must import this file in src/all-widgets.js
 */
export default {
    name: "example-widget",
    displayName: "Example Widget",

    // Tell the renderer what type of `display:` style we would like
    // for the component wrapping this one.
    defaultAlignment: "inline-block",

    hidden: true, // Hides this widget from the Perseus.Editor widget select
    widget: ExampleWidget,
} as WidgetExports<typeof ExampleWidget>;
