var Changeable = require("../mixins/changeable.jsx");
var Editor = require("../editor.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var Renderer = require("../renderer.jsx");
var TextInput = require("../components/text-input.jsx");
var _ = require("underscore");


var defaultExplanationProps = {
    showPrompt: "Explain",
    hidePrompt: "Hide explanation",
    explanation: "explanation goes here\n\nmore explanation",
};

var Explanation = React.createClass({
    mixins: [Changeable],

    propTypes: {
        showPrompt: React.PropTypes.string,
        hidePrompt: React.PropTypes.string,
        explanation: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return defaultExplanationProps;
    },

    getInitialState: function() {
        return {
            expanded: false,
            contentHeight: 0,
        };
    },

    _onClick: function() {
        this.setState({
            expanded: !this.state.expanded
        });
    },

    // After rendering, we want to measure the height of the explanation so we
    // know what to animate the height to/from when showing/hiding the
    // explanation.
    _updateHeight: function() {
        contentElement = React.findDOMNode(this.refs.content);

        // Add up the heights of all the the child nodes
        var contentHeight = Array.prototype.reduce.call(
            contentElement.childNodes,
            function(memo, el) {
                return memo + (el.offsetHeight || 0);
            },
            0);

        // Add the height of the renderer's top and bottom margins
        var $renderer = $(contentElement).children(".perseus-renderer").eq(0);
        contentHeight += $renderer.outerHeight(true) - $renderer.outerHeight();

        // Only update state if the height is different, otherwise we'll end
        // up calling componentDidUpdate in an infinite loop!
        if (contentHeight !== this.state.contentHeight) {
            this.setState({
                contentHeight: contentHeight
            });
        }
    },

    componentDidMount: function() {
        this._updateHeight();
    },

    componentDidUpdate: function(prevProps, prevState) {
        this._updateHeight();
    },

    render: function() {
        return <div className="perseus-widget-explanation">
            <div className="perseus-widget-explanation-link">
                <a href="javascript:void(0)" onClick={this._onClick}>
                    {this.state.expanded ?
                        this.props.hidePrompt : this.props.showPrompt}
                </a>
            </div>
            <div className="perseus-widget-explanation-content" style={{
                    height: this.state.expanded ? this.state.contentHeight : 0,
                    overflow: "hidden"
                }} ref="content">
                <Renderer content={this.props.explanation} />
            </div>
        </div>;
    },

    getUserInput: function() {
        return {};
    },

    simpleValidate: function(rubric) {
        return Explanation.validate(this.getUserInput(), rubric);
    },

    statics: {
        displayMode: "block"
    }
});


_.extend(Explanation, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };
    }
});




var ExplanationEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        showPrompt: React.PropTypes.string,
        hidePrompt: React.PropTypes.string,
        explanation: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return defaultExplanationProps;
    },

    getInitialState: function() {
        return {
        };
    },

    render: function() {
        return <div className="perseus-widget-explanation-editor">
            <div className="perseus-widget-row"><label>
                Prompt to show explanation: <TextInput
                    value={this.props.showPrompt}
                    onChange={this.change("showPrompt")} />
            </label></div>
            <div className="perseus-widget-row"><label>
                Prompt to hide explanation: <TextInput
                    value={this.props.hidePrompt}
                    onChange={this.change("hidePrompt")} />
            </label></div>
            <div className="perseus-widget-row">
                <Editor
                    content={this.props.explanation}
                    onChange={(props) => {
                        this.change("explanation", props.content);
                    }}
                    widgetEnabled={false} />
            </div>
        </div>;
    }
});


module.exports = {
    name: "explanation",
    displayName: "Explanation (for hints)",
    widget: Explanation,
    editor: ExplanationEditor,
    transform: _.identity
};
