/** @jsx React.DOM */

var QuestionParagraph = React.createClass({
    propTypes: {
        usedWidgets: React.PropTypes.array
    },

    render: function() {
        return <div>{this.props.children}</div>;
    }
});

module.exports = QuestionParagraph;
