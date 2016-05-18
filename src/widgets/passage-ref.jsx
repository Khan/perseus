/* global $_:false */

const React = require("react");
const _ = require("underscore");

const Changeable   = require("../mixins/changeable.jsx");
const PerseusMarkdown = require("../perseus-markdown.jsx");
const WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");

const EN_DASH = "\u2013";

const PassageRef = React.createClass({
    propTypes: {
        interWidgets: React.PropTypes.func,
        passageNumber: React.PropTypes.number,
        referenceNumber: React.PropTypes.number,
        summaryText: React.PropTypes.string,
    },

    mixins: [WidgetJsonifyDeprecated, Changeable],

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

    componentDidMount: function() {
        _.defer(this._updateRange);
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) ||
            !_.isEqual(this.state, nextState);
    },

    componentDidUpdate: function() {
        _.defer(this._updateRange);
    },

    _updateRange: function() {
        const passage = this.props.interWidgets(
                "passage " + this.props.passageNumber)[0];

        let refInfo = null;
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
                    content: null,
                });
            }
        }
    },

    simpleValidate: function(rubric) {
        return PassageRef.validate(this.getUserInput(), rubric);
    },

    render: function() {
        const lineRange = this.state.lineRange;
        let lineRangeOutput;
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
                lineRange={lineRange[0] + EN_DASH + lineRange[1]}
            >
                lines %(lineRange)s
            </$_>;
        }

        let summaryOutput;
        if (this.props.summaryText) {
            const summaryTree = PerseusMarkdown.parseInline(
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
});

_.extend(PassageRef, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    },
});

module.exports = {
    name: "passage-ref",
    displayName: "PassageRef",
    defaultAlignment: "inline",
    widget: PassageRef,
    transform: (editorProps) => {
        return _.pick(editorProps,
            "passageNumber",
            "referenceNumber",
            "summaryText"
        );
    },
    version: {major: 0, minor: 1},
};
