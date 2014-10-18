// Responsible for combining the text diffs from text-diff and the widget
// diffs from widget-differ.

var TextDiff = require("./text-diff.jsx");
var WidgetDiff = require("./widget-diff.jsx");

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

var widgetsIn = function(item) {
    var question = item.question || {};
    var widgets = question.widgets || {};
    return _.keys(widgets);
};

var isWidget = obj => _.isObject(obj) && !("content" in obj);

var RevisionDiff = React.createClass({
    propTypes: {
        beforeItem: React.PropTypes.object.isRequired,
        afterItem: React.PropTypes.object.isRequired
    },

    render: function() {
        var before = this.props.beforeItem;
        var after = this.props.afterItem;
        // Not going to handle inserting hints in the middle so well, but
        // that's pretty complicated to handle nicely.
        // This will do for now.
        var hintCount = 0;
        if (_(before).has("hints") && _(after).has("hints")) {
            hintCount = Math.max(before.hints.length, after.hints.length);
        }

        var widgets = _.union(widgetsIn(before), widgetsIn(after));
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
            var displayedDiff;
            if (isWidget(beforeValue) || isWidget(afterValue)) {
                if (!isWidget(beforeValue)) {
                    beforeValue = {};
                }
                if (!isWidget(afterValue)) {
                    afterValue = {};
                }
                displayedDiff = <WidgetDiff
                    key={section.title}
                    title={section.title}
                    before={beforeValue}
                    after={afterValue} />;
            } else {
                displayedDiff = <TextDiff
                    key={section.title}
                    title={section.title}
                    before={beforeValue.content}
                    after={afterValue.content} />;
            }
            result.push(<div>
                <div className="diff-header">{section.title}</div>
                <div className="diff-header">{section.title}</div>
                <div className="diff-body ui-helper-clearfix">
                    {displayedDiff}
                </div>
            </div>);
        });

        return <div>{result}</div>;
    }
});

module.exports = RevisionDiff;
