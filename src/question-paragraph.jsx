var React = require('react');

var QuestionParagraph = React.createClass({
    displayName: "QuestionParagraph",

    render: function() {
        var className = (this.props.className) ?
            "paragraph " + this.props.className :
            "paragraph";
        return <div className={className}>
            {this.props.children}
        </div>;
    }
});

module.exports = QuestionParagraph;
