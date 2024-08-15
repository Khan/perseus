import _ from "underscore";

import {traverse} from "../traversal";

import type {PerseusItem} from "../perseus-types";

const findPassageRefR = new RegExp(
    // [[ passage-ref 1]]
    // capture 1: widget markdown
    // capture 2: widgetId
    "(\\[\\[\u2603 (passage-ref [0-9]+)\\]\\])" +
        // spaces between the ref and the summary
        "\\s" +
        // opening paren + quote
        '\\(["\u201C]' +
        // summary of passage reference text
        // capture 3: summaryText
        "([\\s\\S]*)" +
        // closing quote + paren
        '["\u201D]\\)',
    "g",
);

const fixWholeOptions = (options: any) => {
    // This parsing is technically illegal and should be done via
    // PerseusMarkdown, but because of the snowperson it's safe
    // in practice.
    // We should probably just get rid of this code once all the
    // passage-refs have been converted.

    const newWidgets = _.clone(options.widgets || {});
    const newContent = (options.content || "").replace(
        findPassageRefR,
        (passageRefText, widgetMarkdown, widgetId, summaryText) => {
            newWidgets[widgetId] = _.extend({}, newWidgets[widgetId], {
                options: _.extend({}, newWidgets[widgetId].options, {
                    summaryText: summaryText,
                }),
            });

            return widgetMarkdown;
        },
    );

    return _.extend({}, options, {
        content: newContent,
        widgets: newWidgets,
    });
};

const findRadioRefsR = new RegExp(
    // passage-ref notation
    "\\{\\{(passage-ref \\d+ \\d+)}}" +
        // a space
        "\\s+" +
        // ("
        '\\(["\\u201C]' +
        // <capture the content>
        '([^"]*)' +
        // ")
        '["\\u201D]\\)',
    // find all passage-refs
    "g",
);
const replaceRadioRefs = (fullText: any, reference, summaryText) => {
    if (/\n\n/.test(summaryText)) {
        return fullText;
    }
    return "{{" + reference + ' "' + summaryText + '"}}';
};

const fixRadioWidget = (widgetInfo: any) => {
    if (
        widgetInfo.type !== "radio" ||
        !widgetInfo.options ||
        !widgetInfo.options.choices
    ) {
        return widgetInfo;
    }

    const newChoices = _.map(widgetInfo.options.choices, (choice) => {
        if (!choice.content) {
            return choice;
        }

        const newChoice = choice.content.replace(
            findRadioRefsR,
            replaceRadioRefs,
        );
        return _.extend({}, choice, {
            content: newChoice,
        });
    });

    return _.extend({}, widgetInfo, {
        options: _.extend({}, widgetInfo.options, {
            choices: newChoices,
        }),
    });
};

const fixRendererPassageRefs = (options: any) => {
    return traverse(options, null, fixRadioWidget, fixWholeOptions);
};

const fixPassageRefs = (itemData: PerseusItem): any => {
    if ("_multi" in itemData) {
        // We're in a multi-item. Don't do anything, just return the original
        // item data.
        return itemData;
    }

    const newQuestion = fixRendererPassageRefs(itemData.question);
    const newHints = _.map(itemData.hints, (hint) =>
        fixRendererPassageRefs(hint),
    );
    return _.extend({}, itemData, {
        question: newQuestion,
        hints: newHints,
    });
};

export default fixPassageRefs;
