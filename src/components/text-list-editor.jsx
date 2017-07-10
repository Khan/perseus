/* eslint-disable react/forbid-prop-types, react/sort-comp */

const React = require("react");
const ReactDOM = require("react-dom");
const _ = require("underscore");

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

const TextListEditor = React.createClass({
    propTypes: {
        options: React.PropTypes.array,
        layout: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            options: [],
            layout: "horizontal",
        };
    },

    getInitialState: function() {
        return {
            items: this.props.options.concat(""),
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            items: nextProps.options.concat(""),
        });
    },

    render: function() {
        const className = [
            "perseus-text-list-editor",
            "perseus-clearfix",
            "layout-" + this.props.layout,
        ].join(" ");

        const inputs = _.map(
            this.state.items,
            function(item, i) {
                return (
                    <li key={i}>
                        <input
                            ref={"input_" + i}
                            type="text"
                            value={item}
                            onChange={this.onChange.bind(this, i)}
                            onKeyDown={this.onKeyDown.bind(this, i)}
                            style={{width: getTextWidth(item)}}
                        />
                    </li>
                );
            },
            this
        );

        return (
            <ul className={className}>
                {inputs}
            </ul>
        );
    },

    onChange: function(index, event) {
        let items = _.clone(this.state.items);
        items[index] = event.target.value;

        if (index === items.length - 1) {
            items = items.concat("");
        }

        this.setState({items: items});
        this.props.onChange(_.compact(items));
    },

    onKeyDown: function(index, event) {
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
                ReactDOM.findDOMNode(this.refs["input_" + focusIndex]).focus();
            } else {
                items.splice(index, 1);
                this.setState({items: items}, function() {
                    ReactDOM.findDOMNode(
                        this.refs["input_" + focusIndex]
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
                ReactDOM.findDOMNode(this.refs["input_" + focusIndex]).focus();
            } else {
                items.splice(focusIndex, 0, "");
                this.setState({items: items}, function() {
                    ReactDOM.findDOMNode(
                        this.refs["input_" + focusIndex]
                    ).focus();
                });
            }
        }
    },
});

module.exports = TextListEditor;
