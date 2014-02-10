/** @jsx React.DOM */

var diff = require("../lib/jsdiff");

var classFor = function(entry, ifAdded, ifRemoved) {
    if (entry.added) {
        return ifAdded;
    } else if (entry.removed) {
        return ifRemoved;
    } else {
        return "";
    }
};

var diffText = function(a, b) {
    var diffed = diff.diffWords(a, b);

    var before = _(diffed).map(function(entry) {
        var className = classFor(entry, "not-present", "removed");
        return <span className={className}>{entry.value}</span>;
    });

    var after = _(diffed).map(function(entry) {
        var className = classFor(entry, "added", "not-present");
        return <span className={className}>{entry.value}</span>;
    });

    return {
        before: before,
        after: after
    };
};

var access = function(obj, path) {
    var result = _(path).reduce(function(obj, key) {
        return obj[key];
    }, obj);
    return result;
};

var diffQuestions = function(before, after) {
    var beforeText;
    var afterText;
    var diffed;

    var textLenses = [
        ["question", "content"],
        ["answerArea", "options", "content"]
    ].concat(
        _.times(before.hints.length, function(n) {
            return ["hints", n, "content"];
        })
    );

    var beforeResult = [];
    var afterResult = [];

    _(textLenses).each(function(path) {
        beforeText = access(before, path);
        newText = access(after, path);
        diffed = diffText(beforeText, newText);
        beforeResult.push(diffed.before);
        afterResult.push(diffed.after);
    });

    return [beforeResult, afterResult];
};

module.exports = diffQuestions;
