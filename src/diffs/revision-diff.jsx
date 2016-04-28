/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/jsx-closing-bracket-location */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

// Responsible for combining the text diffs from text-diff and the widget
// diffs from widget-differ.
const React = require("react");
const _ = require("underscore");

const TextDiff = require("./text-diff.jsx");
const WidgetDiff = require("./widget-diff.jsx");

// Deeply look up a property in an object,
// -> getPath(obj, ["a", "b", "c"]) === obj["a"]["b"]["c"]
const getPath = function(obj, path, defaultValue) {
    let returningDefault = false;
    const result = _(path).reduce(function(obj, key) {
        if (returningDefault || !obj.hasOwnProperty(key)) {
            returningDefault = true;
            return defaultValue;
        }
        return obj[key];
    }, obj);
    return result;
};

const widgetsIn = function(item) {
    const question = item.question || {};
    const widgets = question.widgets || {};

    return _.keys(widgets);
};

const hintWidgetsIn = function(item, n) {
    const hints = item.hints || [];
    const hint = hints[n] || {};
    const widgets = hint.widgets || {};
    return _.keys(widgets);
};



const isWidget = obj => _.isObject(obj) && !("content" in obj);

const RevisionDiff = React.createClass({
    propTypes: {
        afterItem: React.PropTypes.any.isRequired,
        beforeItem: React.PropTypes.any.isRequired,
    },

    render: function() {
        const before = this.props.beforeItem;
        const after = this.props.afterItem;
        // Not going to handle inserting hints in the middle so well, but
        // that's pretty complicated to handle nicely.
        // This will do for now.
        let hintCount = 0;
        if (_(before).has("hints") && _(after).has("hints")) {
            hintCount = Math.max(before.hints.length, after.hints.length);
        }

        const widgets = _.union(widgetsIn(before), widgetsIn(after));

        const sections = [
            {
                title: "Question",
                path: ["question"],
            },
            {
                title: "Question extras",
                path: ["answerArea"],
            },
        ].concat(
            _.times(hintCount, function(n) {
                return {
                    title: "Hint #" + (n + 1),
                    path: ["hints", n],
                };
            })
        ).concat(
            _.map(widgets, function(widget) {
                return {
                    title: widget,
                    path: ["question", "widgets", widget, "options"],
                };
            })
        ).concat(
            _.flatten(
                _.times(hintCount, function(n) {
                    const hintWidgets = _.union(
                        hintWidgetsIn(before, n),
                        hintWidgetsIn(after, n));

                    return _.map(hintWidgets, function(widget) {
                        return {
                            title: "Hint #" + (n + 1) + "." + widget,
                            path: ["hints", n, "widgets", widget, "options"],
                        };
                    });
                })
            )
        );


        const result = [];

        _(sections).each(function(section, i) {
            const path = section.path;
            let beforeValue = getPath(before, path, "");
            let afterValue = getPath(after, path, "");
            let displayedDiff;
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
            result.push(<div key={i}>
                <div className="diff-header">{section.title}</div>
                <div className="diff-header">{section.title}</div>
                <div className="diff-body ui-helper-clearfix">
                    {displayedDiff}
                </div>
            </div>);
        });

        return <div>{result}</div>;
    },
});

module.exports = RevisionDiff;
