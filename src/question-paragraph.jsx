/** @jsx React.DOM */

var cx = React.addons.classSet;

var QuestionParagraph = React.createClass({
    render: function() {
        return <div className="paragraph">
            {this.props.children}
        </div>;
    }
});

module.exports = QuestionParagraph;
