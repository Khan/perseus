var diff = require("../../lib/jsdiff");

var classFor = function(entry, ifAdded, ifRemoved) {
    if (entry.added) {
        return ifAdded;
    } else if (entry.removed) {
        return ifRemoved;
    } else {
        return "";
    }
};

var TextDiff = React.createClass({
    render: function() {
        var diffed = diff.diffWords(this.props.before, this.props.after);

        var beforeContents = _(diffed).map(function(entry) {
            var className = classFor(entry, "not-present", "removed dark");
            return <span
                key={entry.value}
                className={className}>{entry.value}</span>;
        });

        var afterContents = _(diffed).map(function(entry) {
            var className = classFor(entry, "added dark", "not-present");
            return <span
                key={entry.value}
                className={className}>{entry.value}</span>;
        });

        return <div>
            <div className="diff-header">{this.props.title}</div>
            <div className="ui-helper-clearfix">
                <div className="diff-row before">
                    {beforeContents}
                </div>
                <div className="diff-row after">
                    {afterContents}
                </div>
            </div>
        </div>;
    }
});

module.exports = TextDiff;
