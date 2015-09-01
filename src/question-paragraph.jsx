var React = require('react');

var QuestionParagraph = React.createClass({
    render: function() {
        var className = (this.props.className) ?
            "paragraph " + this.props.className :
            "paragraph";
        // For perseus-article just-in-place-translation (jipt), we need
        // to attach some metadata to top-level QuestionParagraphs:
        return <div
                className={className}
                data-perseus-component-index={this.props.translationIndex}
                data-perseus-paragraph-index={this.props.paragraphIndex}>
            {this.props.children}
        </div>;
    }
});

module.exports = QuestionParagraph;
