/** @jsx React.DOM */

// Responsible for combining the text diffs from text-diff and the widget
// diffs from widget-differ.

(function(Perseus) {

var WidgetDiff = require("./widget-diff.jsx");
var TextDiff = require("./text-diff.jsx");

// Deeply look up a property in an object,
// -> getPath(obj, ["a", "b", "c"]) === obj["a"]["b"]["c"]
var getPath = function(obj, path, defaultValue) {
    var returningDefault = false;
    var result = _(path).reduce(function(obj, key) {
        if (returningDefault || !obj.hasOwnProperty(key)) {
            returningDefault = true;
            return defaultValue;
        }
        return obj[key];
    }, obj);
    return result;
};

var isWidget = obj => _.isObject(obj) && !("content" in obj);

var RevisionDiff = React.createClass({
    propTypes: {
        beforeItem: React.PropTypes.object,
        afterItem: React.PropTypes.object
    },

    render: function() {
        var before = this.props.beforeItem;
        var after = this.props.afterItem;
        // Not going to handle inserting hints in the middle so well, but
        // that's pretty complicated to handle nicely.
        // This will do for now.
        var hintCount = Math.max(before.hints.length, after.hints.length);
        var widgets = _.union(_.keys(before.question.widgets),
                              _.keys(after.question.widgets));
        var sections = [
            {
                title: "Question Area",
                path: ["question"]
            },
            {
                title: "Answer Area",
                path: ["answerArea", "options"]
            }
        ].concat(
            _.times(hintCount, function(n) {
                return {
                    title: "Hint #" + (n + 1),
                    path: ["hints", n]
                };
            })
        ).concat(
            _.map(widgets, function(widget) {
                return {
                    title: widget,
                    path: ["question", "widgets", widget, "options"]
                };
            })
        );

        var result = [];

        _(sections).each(function(section) {
            var path = section.path;
            var beforeValue = getPath(before, path, "");
            var afterValue = getPath(after, path, "");
            if (isWidget(beforeValue) && isWidget(afterValue)) {
                result.push(<WidgetDiff 
                    key={section.title}
                    title={section.title}
                    before={beforeValue}
                    after={afterValue} />);
            } else {
                result.push(<TextDiff
                    key={section.title}
                    title={section.title}
                    before={beforeValue.content}
                    after={afterValue.content} />);
            }
        });

        return <div>{result}</div>;
    }
});

Perseus.RevisionDiff = RevisionDiff;

})(Perseus);
