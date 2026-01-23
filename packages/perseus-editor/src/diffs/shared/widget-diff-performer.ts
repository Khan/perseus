// For this file it might not make sense to add typing because it's a
// recursive series of functions to show the difference between two
// PerseusWidget objects.
import _ from "underscore";

const UNCHANGED = "unchanged";
const CHANGED = "changed";
const ADDED = "added";
const REMOVED = "removed";

// For values which do not have further values nested within them (strings,
// numbers, and booleans)
const valueEntry = function (before: any, after: any, key) {
    let status;
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
        status: status,
    };
};

// For values which require a more granular diff (objects and arrays)
const objectEntry = function (before: any, after: any, key) {
    const beforeKeys = _.isObject(before) ? _(before).keys() : [];
    const afterKeys = _.isObject(after) ? _(after).keys() : [];
    const keys = _.union(beforeKeys, afterKeys);

    const children = _.map(keys, function (key) {
        return performDiff((before || {})[key], (after || {})[key], key);
    });

    let status;
    if (before === undefined) {
        status = ADDED;
    } else if (after === undefined) {
        status = REMOVED;
    } else {
        const changed = _.any(children, function (child) {
            return child.status !== UNCHANGED;
        });
        status = changed ? CHANGED : UNCHANGED;
    }

    return {
        after: "",
        before: "",
        children: children,
        key: key,
        status: status,
    };
};

const performDiff = function (before: any, after: any, key?: any): any {
    if (typeof before === "object" || typeof after === "object") {
        return objectEntry(before, after, key);
    }
    return valueEntry(before, after, key);
};

export default performDiff;
