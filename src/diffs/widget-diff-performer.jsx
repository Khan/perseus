var UNCHANGED = "unchanged";
var CHANGED = "changed";
var ADDED = "added";
var REMOVED = "removed";

// For values which do not have further values nested within them (strings,
// numbers, and booleans)
var valueEntry = function(before, after, key) {
    var status;
    if (before === after) {
        status = UNCHANGED;
    } else if (before === undefined) {
        status = ADDED;
    } else if (after === undefined) {
        status = REMOVED;
    } else {
        status = CHANGED;
    }

    return {
        after: JSON.stringify(after),
        before: JSON.stringify(before),
        children: [],
        key: key,
        status: status
    };
};

// For values which require a more granular diff (objects and arrays)
var objectEntry = function(before, after, key) {
    var beforeKeys = (_.isObject(before)) ? _(before).keys() : [];
    var afterKeys = (_.isObject(after)) ? _(after).keys() : [];
    var keys = _.union(beforeKeys, afterKeys);

    var children = _.map(keys, function(key) {
        return performDiff((before || {})[key], (after || {})[key], key);
    });

    var status;
    if (before === undefined) {
        status = ADDED;
    } else if (after === undefined) {
        status = REMOVED;
    } else {
        var changed = _.any(children, function(child) {
            return child.status !== UNCHANGED;
        });
        status = changed ? CHANGED : UNCHANGED;
    }

    return {
        after: "",
        before: "",
        children: children,
        key: key,
        status: status
    };
};

var performDiff = function(before, after, /* optional */ key) {
    if (typeof before === "object" || typeof after === "object") {
        return objectEntry(before, after, key);
    } else {
        return valueEntry(before, after, key);
    }
};

module.exports = performDiff;
