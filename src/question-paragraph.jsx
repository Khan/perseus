/** @jsx React.DOM */

var cx = React.addons.classSet;

var QuestionParagraph = React.createClass({
    propTypes: {
        usedWidgets: React.PropTypes.array,
        totalWidgets: React.PropTypes.array,
        shouldIndicate: React.PropTypes.bool
    },

    isAnswered: function() {
        var totalWidgets = this.props.totalWidgets;
        var usedWidgets = this.props.usedWidgets;
        return totalWidgets.length === usedWidgets.length;
    },

    render: function() {
        if (!this.props.shouldIndicate || _.isEmpty(this.props.totalWidgets)) {
            return <div className="paragraph">{this.props.children}</div>;
        }
        var answered = this.isAnswered();
        var className = cx({
            "perseus-indicator": true,
            "answered": answered,
            "unanswered": !answered,
            "ui-helper-clearfix": true,
            "wrapper": true,
            "paragraph": true
        });

        return <div className={className}>
            {this.props.children}
        </div>;
    }
});

module.exports = QuestionParagraph;
