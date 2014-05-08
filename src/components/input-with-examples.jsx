/** @jsx React.DOM */

Tooltip = require("./tooltip.jsx");
Renderer = require("../renderer.jsx");

var InputWithExamples = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        className: React.PropTypes.string,
        value: React.PropTypes.string,
        examples: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        shouldShowExamples: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            shouldShowExamples: true
        };
    },

    getInitialState: function() {
        return {
            showExamples: false
        };
    },

    render: function() {
        var examplesContent = _.map(this.props.examples, (example) => {
            return "- " + example;
        }).join("\n");

        var showExamples = this.props.shouldShowExamples &&
                this.state.showExamples;

        return <Tooltip
                ref="tooltip"
                className="perseus-formats-tooltip"
                horizontalPosition="left"
                horizontalAlign="right"
                verticalPosition="bottom"
                arrowSize={10}
                borderColor="#ccc"
                show={showExamples}>
            <input type="text"
                ref="input"
                className={this.props.className}
                value={this.props.value}
                onChange={this.handleChange}
                onFocus={this.show}
                onBlur={this.hide} />
            <Renderer content={examplesContent} />
        </Tooltip>;
    },

    focus: function() {
        this.refs.input.getDOMNode().focus()
    },

    show: function() {
        this.setState({showExamples: true});
    },

    hide: function() {
        this.setState({showExamples: false});
    },

    handleChange: function(e) {
        this.props.onChange(e.target.value);
    }
});

module.exports = InputWithExamples;
