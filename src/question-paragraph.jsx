/** @jsx React.DOM */

var QuestionParagraph = React.createClass({
    propTypes: {
        totalWidgets: React.PropTypes.array,
        usedWidgets: React.PropTypes.array
    },

    render: function() {
        return <div className="paragraph">{this.props.children}</div>;
    }
});

module.exports = QuestionParagraph;
