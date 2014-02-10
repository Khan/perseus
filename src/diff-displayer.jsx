/** @jsx React.DOM */

(function(Perseus) {

var diffQuestions = require("./question-differ.jsx");

var DiffDisplayer = React.createClass({
    getDefaultProps: function() {
        return {
            beforeItem: null,
            afterItem: null
        };
    },
    render: function() {
        var diffs = diffQuestions(this.props.beforeItem,
                                  this.props.afterItem);

        var beforeDiff = diffs[0];
        var afterDiff = diffs[1];

        return <div>
            <div className="single-diff-view">{beforeDiff}</div>
            <div className="single-diff-view">{afterDiff}</div>
        </div>;
    }
});

Perseus.DiffDisplayer = DiffDisplayer;

})(Perseus);
