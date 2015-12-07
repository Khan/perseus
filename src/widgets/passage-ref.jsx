var React = require("react");
var _ = require("underscore");

var Changeable   = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var InfoTip = require("react-components/info-tip.js");
var NumberInput = require("../components/number-input.jsx");
var PerseusMarkdown = require("../perseus-markdown.jsx");
var TextInput = require("../components/text-input.jsx");
var WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");

var EN_DASH = "\u2013";

var PassageRef = React.createClass({
    mixins: [WidgetJsonifyDeprecated, Changeable],

    propTypes: {
        passageNumber: React.PropTypes.number,
        referenceNumber: React.PropTypes.number,
        summaryText: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            passageNumber: 1,
            referenceNumber: 1,
            summaryText: "",
        };
    },

    getInitialState: function() {
        return {
            lineRange: null,
            content: null,
        };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) ||
            !_.isEqual(this.state, nextState);
    },

    render: function() {
        var lineRange = this.state.lineRange;
        var lineRangeOutput;
        if (!lineRange) {
            lineRangeOutput = <$_ lineRange={"?" + EN_DASH + "?"}>
                lines %(lineRange)s
            </$_>;
        } else if (lineRange[0] === lineRange[1]) {
            lineRangeOutput = <$_ lineNumber={lineRange[0]}>
                line %(lineNumber)s
            </$_>;
        } else {
            lineRangeOutput = <$_
                    lineRange={lineRange[0] + EN_DASH + lineRange[1]}>
                lines %(lineRange)s
            </$_>;
        }

        var summaryOutput;
        if (this.props.summaryText) {
            var summaryTree = PerseusMarkdown.parseInline(
                this.props.summaryText
            );
            summaryOutput = <span aria-hidden={true}>
                {" "}
                {/* curly quotes */}
                (&ldquo;
                {PerseusMarkdown.basicOutput(summaryTree)}
                &rdquo;)
            </span>;
        } else {
            summaryOutput = null;
        }

        return <span>
            {lineRangeOutput}
            {summaryOutput}
            {lineRange &&
                <div className="perseus-sr-only">
                    {this.state.content}
                </div>
            }
        </span>;
    },

    componentDidMount: function() {
        _.defer(this._updateRange);
    },

    componentDidUpdate: function() {
        _.defer(this._updateRange);
    },

    _updateRange: function() {
        var passage = this.props.interWidgets(
                "passage " + this.props.passageNumber)[0];

        var refInfo = null;
        if (passage) {
            refInfo = passage.getReference(this.props.referenceNumber);
        }

        if (this.isMounted()) {
            if (refInfo) {
                this.setState({
                    lineRange: [refInfo.startLine, refInfo.endLine],
                    content: refInfo.content,
                });
            } else {
                this.setState({
                    lineRange: null,
                    content: null
                });
            }
        }
    },

    simpleValidate: function(rubric) {
        return PassageRef.validate(this.getUserInput(), rubric);
    }
});

_.extend(PassageRef, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };
    }
});

var PassageRefEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        passageNumber: React.PropTypes.number,
        referenceNumber: React.PropTypes.number,
        summaryText: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            passageNumber: 1,
            referenceNumber: 1,
            summaryText: "",
        };
    },

    render: function() {
        return <div>
            <div>
                <label>
                    {"Passage Number: "}
                    <NumberInput
                        value={this.props.passageNumber}
                        onChange={this.change("passageNumber")} />
                </label>
            </div>
            <div>
                <label>
                    {"Reference Number: "}
                    <NumberInput
                        value={this.props.referenceNumber}
                        onChange={this.change("referenceNumber")} />
                </label>
            </div>
            <div>
                <label>
                    {"Summary Text: "}
                    <TextInput
                        value={this.props.summaryText}
                        onChange={this.change("summaryText")} />
                    <InfoTip>
                        <p>
                            Short summary of the referenced section. This
                            will be included in parentheses and quotes
                            automatically.
                        </p>
                        <p>
                            Ex: The start ... the end
                        </p>
                    </InfoTip>
                </label>
            </div>
        </div>;
    }
});

module.exports = {
    name: "passage-ref",
    displayName: "PassageRef",
    defaultAlignment: "inline",
    widget: PassageRef,
    editor: PassageRefEditor,
    transform: (editorProps) => {
        return _.pick(editorProps,
            "passageNumber",
            "referenceNumber",
            "summaryText"
        );
    },
    version: {major: 0, minor: 1}
};
