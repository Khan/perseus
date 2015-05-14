var _ = require("underscore");

var Traversal = require("../traversal.jsx");

var findPassageRefR = new RegExp(
    // [[ passage-ref 1]]
    // capture 1: widget markdown
    // capture 2: widgetId
    '(\\[\\[\u2603 (passage-ref [0-9]+)\\]\\])' +
    // spaces between the ref and the summary
    '\\s' +
    // opening paren + quote
    '\\(["\u201C]' +
    // summary of passage reference text
    // capture 3: summaryText
    '([\\s\\S]*)' +
    // closing quote + paren
    '["\u201D]\\)',
    "g"
);

var fixWholeOptions = (options) => {
    // This parsing is technically illegal and should be done via
    // PerseusMarkdown, but because of the snowperson it's safe
    // in practice.
    // We should probably just get rid of this code once all the
    // passage-refs have been converted.

    var newWidgets = _.clone(options.widgets || {});
    var newContent = (options.content || "").replace(
        findPassageRefR,
        (passageRefText, widgetMarkdown, widgetId, summaryText) => {
            newWidgets[widgetId] = _.extend({}, newWidgets[widgetId], {
                options: _.extend({}, newWidgets[widgetId].options, {
                    summaryText: summaryText,
                }),
            });

            return widgetMarkdown;
        }
    );

    return _.extend({}, options, {
        content: newContent,
        widgets: newWidgets,
    });
};

var fixRendererPassageRefs = (options) => {
    return Traversal.traverseRendererDeep(
        options,
        null,
        null,
        fixWholeOptions
    );
};

var FixPassageRefs = (itemData) => {
    var newQuestion = fixRendererPassageRefs(itemData.question);
    var newHints = _.map(
        itemData.hints,
        (hint) => fixRendererPassageRefs(hint)
    );
    return _.extend({}, itemData, {
        question: newQuestion,
        hints: newHints,
    });
};

module.exports = FixPassageRefs;
