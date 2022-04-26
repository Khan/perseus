/* eslint-disable react/sort-comp */
// @flow
import {Changeable, PerseusMarkdown} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

const mdParse = PerseusMarkdown.parse;
const mdOutput = PerseusMarkdown.basicOutput;

type Props = $FlowFixMe;

class SimpleMarkdownTester extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        value: PropTypes.string,
    };

    static defaultProps: Props = {
        value: "",
    };

    /**
     * This is the widget's grading function.
     *
     * simpleValidate generally defers to this function
     *
     * state is usually the result of toJSON on the widget
     * rubric is the result of calling toJSON() on the editor
     */
    static validate(state: $FlowFixMe, rubric: $FlowFixMe): $FlowFixMe {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    toJSON: () => {...} = () => {
        return {};
    };

    render(): React.Node {
        const parsed = mdParse(this.props.value);
        const output = mdOutput(parsed);
        return <div>{output}</div>;
    }

    /**
     * Widgets that are focusable should add a focus method that returns
     * true if focusing succeeded. The first such widget found will be
     * focused on page load.
     */
    focus: () => boolean = () => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.input.focus();
        return true;
    };

    /**
     * simpleValidate is called for grading. Rubric is the result of calling
     * toJSON() on the editor that created this widget.
     *
     * Should return an object representing the grading result, such as
     * {
     *     type: "points",
     *     earned: 1,
     *     total: 1,
     *     message: null
     * }
     */
    simpleValidate: ($FlowFixMe) => $FlowFixMe = (rubric) => {
        return SimpleMarkdownTester.validate(this.toJSON(), rubric);
    };
}

/**
 * For this widget to work, we must import this file in src/all-widgets.js
 */
export default {
    name: "simple-markdown-tester",
    displayName: "Simple Markdown Tester",
    hidden: true, // Hides this widget from the Perseus.Editor widget select
    widget: SimpleMarkdownTester,
    transform: _.identity,
};
