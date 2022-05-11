// @flow
// eslint-disable-next-line import/no-extraneous-dependencies
import jsdiff from "jsdiff";
import _ from "underscore";

const statusFor = function (chunk) {
    if (chunk.added) {
        return "added";
    }
    if (chunk.removed) {
        return "removed";
    }
    return "unchanged";
};

// Turn a chunk (which contains an array of values and a status)
// into an array of values, each with the same status
const splitUpChunk = (chunk) =>
    _.map(chunk.value, (value) => {
        return {
            value: value,
            status: statusFor(chunk),
        };
    });

// Apply `fn` to every element in `lst` and then concatenate all the results
// http://clojuredocs.org/clojure_core/clojure.core/mapcat
const mapcat = function (lst, fn) {
    return _.flatten(_.map(lst, fn), true /* only flatten one level */);
};

// > ArrayDiff.diff([1,2,3], [2,3,4]);
// = [{ "value": [1],
//      "removed": true },
//    { "value": [2, 3] },
//    { "value": [4],
//      "added": true }]
const ArrayDiff = new jsdiff.Diff();
ArrayDiff.tokenize = (array) => _.map(array, (elem) => [elem]);
// The default is `+` for string concatenation, which doesn't work for array
// concatenation.
ArrayDiff.join = (a, b) => a.concat(b);
// By default jsDiff uses ===
ArrayDiff.equals = _.isEqual;

// Take the output of jsdiff's function (which concatenates adjacent entries)
// and make it just one entry per chunk
// > flattenChunks([{ "value": [1],
//                    "removed": true },
//                  { "value": [2, 3] },
//                  { "value": [4],
//                    "added": true }])
// = [{ "value":1, "status":"removed"},
//    { "value":2, "status":"unchanged"},
//    { "value":3, "status":"unchanged"},
//    { "value":4, "status":"added"}]
const flattenChunks = (chunks) => mapcat(chunks, splitUpChunk);

// Take two arrays and create a diff for them. The result is two arrays of
// objects, one for the things that should be included in a 'before', and one
// for 'after'
const stringArrayDiff = function (
    a: $ReadOnlyArray<$FlowFixMe>,
    b: $ReadOnlyArray<$FlowFixMe>,
): $FlowFixMe {
    const diffResult = ArrayDiff.diff(a, b);
    const flattened = flattenChunks(diffResult);

    return {
        before: _.filter(flattened, (entry) => entry.status !== "added"),
        after: _.filter(flattened, (entry) => entry.status !== "removed"),
    };
};

export default stringArrayDiff;
