var _ = require("underscore");

var textWidthCache = {};
function getTextWidth(text) {
    if (!textWidthCache[text]) {
        // Hacky way to guess the width of an input box
        var $test = $("<span>").text(text).appendTo("body");
        textWidthCache[text] = $test.width() + 5;
        $test.remove();
    }
    return textWidthCache[text];
}


var TextListEditor = React.createClass({
    propTypes: {
        options: React.PropTypes.array,
        layout: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            options: [],
            layout: "horizontal"
        };
    },

    getInitialState: function() {
        return {
            items: this.props.options.concat("")
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            items: nextProps.options.concat("")
        });
    },

    render: function() {
        var className = [
            "perseus-text-list-editor",
            "ui-helper-clearfix",
            "layout-" + this.props.layout
        ].join(" ");

        var inputs = _.map(this.state.items, function(item, i) {
            return <li key={i}>
                <input
                    ref={"input_" + i}
                    type="text"
                    value={item}
                    onChange={this.onChange.bind(this, i)}
                    onKeyDown={this.onKeyDown.bind(this, i)}
                    style={{width: getTextWidth(item)}} />
            </li>;
        }, this);

        return <ul className={className}>{inputs}</ul>;
    },

    onChange: function(index, event) {
        var items = _.clone(this.state.items);
        items[index] = event.target.value;

        if (index === items.length - 1) {
            items = items.concat("");
        }

        this.setState({items: items});
        this.props.onChange(_.compact(items));
    },

    onKeyDown: function(index, event) {
        var which = event.nativeEvent.keyCode;

        // Backspace deletes an empty input...
        if (which === 8 /* backspace */ && this.state.items[index] === "") {
            event.preventDefault();

            var items = _.clone(this.state.items);
            var focusIndex = (index === 0) ? 0 : index - 1;

            if (index === items.length - 1 &&
                    (index === 0 || items[focusIndex] !== "")) {
                // ...except for the last one, iff it is the only empty
                // input at the end.
                this.refs["input_" + focusIndex].getDOMNode().focus();
            } else {
                items.splice(index, 1);
                this.setState({items: items}, function() {
                    this.refs["input_" + focusIndex].getDOMNode().focus();
                });                
            }

        // Deleting the last character in the second-to-last input removes it
        } else if (which === 8 /* backspace */ &&
                this.state.items[index].length === 1 &&
                index === this.state.items.length - 2) {
            event.preventDefault();

            var items = _.clone(this.state.items);
            items.splice(index, 1);
            this.setState({items: items});
            this.props.onChange(_.compact(items));

        // Enter adds an option below the current one...
        } else if (which === 13 /* enter */) {
            event.preventDefault();

            var items = _.clone(this.state.items);
            var focusIndex = index + 1;

            if (index === items.length - 2) {
                // ...unless the empty input is just below.
                this.refs["input_" + focusIndex].getDOMNode().focus();
            } else {
                items.splice(focusIndex, 0, "");
                this.setState({items: items}, function() {
                    this.refs["input_" + focusIndex].getDOMNode().focus();
                });
            }
        }
    }
});

module.exports = TextListEditor;
