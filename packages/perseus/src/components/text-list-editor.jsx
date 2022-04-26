/* eslint-disable @babel/no-invalid-this, react/forbid-prop-types, react/no-unsafe, react/sort-comp */
// @flow
import $ from "jquery";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

const textWidthCache = {};
function getTextWidth(text) {
    if (!textWidthCache[text]) {
        // Hacky way to guess the width of an input box
        const $test = $("<span>").text(text).appendTo("body");
        textWidthCache[text] = $test.width() + 5;
        $test.remove();
    }
    return textWidthCache[text];
}

class TextListEditor extends React.Component<$FlowFixMe, $FlowFixMe> {
    static propTypes = {
        options: PropTypes.array,
        layout: PropTypes.string,
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps: $FlowFixMe = {
        options: [],
        layout: "horizontal",
    };

    state: $FlowFixMe = {
        items: this.props.options.concat(""),
    };

    UNSAFE_componentWillReceiveProps(nextProps: $FlowFixMe) {
        this.setState({
            items: nextProps.options.concat(""),
        });
    }

    render(): React.Node {
        const className = [
            "perseus-text-list-editor",
            "perseus-clearfix",
            "layout-" + this.props.layout,
        ].join(" ");

        const inputs = _.map(
            this.state.items,
            function (item, i) {
                return (
                    <li key={i}>
                        <input
                            ref={"input_" + i}
                            type="text"
                            value={item}
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={this.onChange.bind(this, i)}
                            // eslint-disable-next-line react/jsx-no-bind
                            onKeyDown={this.onKeyDown.bind(this, i)}
                            style={{width: getTextWidth(item)}}
                        />
                    </li>
                );
            },
            this,
        );

        return <ul className={className}>{inputs}</ul>;
    }

    onChange: (number, SyntheticInputEvent<>) => void = (index, event) => {
        let items = _.clone(this.state.items);
        items[index] = event.target.value;

        if (index === items.length - 1) {
            items = items.concat("");
        }

        this.setState({items: items});
        this.props.onChange(_.compact(items));
    };

    onKeyDown: (number, SyntheticKeyboardEvent<>) => void = (index, event) => {
        const which = event.nativeEvent.keyCode;

        // Backspace deletes an empty input...
        if (which === 8 /* backspace */ && this.state.items[index] === "") {
            event.preventDefault();

            const items = _.clone(this.state.items);
            const focusIndex = index === 0 ? 0 : index - 1;

            if (
                index === items.length - 1 &&
                (index === 0 || items[focusIndex] !== "")
            ) {
                // ...except for the last one, iff it is the only empty
                // input at the end.
                // $FlowFixMe[incompatible-use]
                // $FlowFixMe[prop-missing]
                ReactDOM.findDOMNode(this.refs["input_" + focusIndex]).focus(); // eslint-disable-line react/no-string-refs
            } else {
                items.splice(index, 1);
                this.setState({items: items}, function () {
                    ReactDOM.findDOMNode(
                        // eslint-disable-next-line react/no-string-refs
                        this.refs["input_" + focusIndex],
                        // $FlowFixMe[incompatible-use]
                        // $FlowFixMe[prop-missing]
                    ).focus();
                });
            }

            // Deleting the last character in the second-to-last input
            // removes it
        } else if (
            which === 8 /* backspace */ &&
            this.state.items[index].length === 1 &&
            index === this.state.items.length - 2
        ) {
            event.preventDefault();

            const items = _.clone(this.state.items);
            items.splice(index, 1);
            this.setState({items: items});
            this.props.onChange(_.compact(items));

            // Enter adds an option below the current one...
        } else if (which === 13 /* enter */) {
            event.preventDefault();

            const items = _.clone(this.state.items);
            const focusIndex = index + 1;

            if (index === items.length - 2) {
                // ...unless the empty input is just below.
                // $FlowFixMe[incompatible-use]
                // $FlowFixMe[prop-missing]
                ReactDOM.findDOMNode(this.refs["input_" + focusIndex]).focus(); // eslint-disable-line react/no-string-refs
            } else {
                items.splice(focusIndex, 0, "");
                this.setState({items: items}, function () {
                    ReactDOM.findDOMNode(
                        // eslint-disable-next-line react/no-string-refs
                        this.refs["input_" + focusIndex],
                        // $FlowFixMe[incompatible-use]
                        // $FlowFixMe[prop-missing]
                    ).focus();
                });
            }
        }
    };
}

export default TextListEditor;
