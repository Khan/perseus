import jsdiff from "jsdiff";
import _ from "underscore";

export type ImageEntry = {
    value: string[];
    added?: boolean;
    removed?: boolean;
};

type ImageStatus = "unchanged" | "added" | "removed";

type ImageDiff = {
    value: string;
    status: ImageStatus;
};

export type ImageDiffResult = {
    before: ImageDiff[];
    after: ImageDiff[];
};

function statusFor(chunk: ImageEntry): ImageStatus {
    if (chunk.added) {
        return "added";
    }
    if (chunk.removed) {
        return "removed";
    }
    return "unchanged";
}

// Turn a chunk (which contains an array of values and a status)
// into an array of values, each with the same status
function splitUpChunk(chunk: ImageEntry): ImageDiff[] {
    return _.map(chunk.value, (value) => {
        return {
            value: value,
            status: statusFor(chunk),
        };
    });
}

// Apply `fn` to every element in `lst` and then concatenate all the results
// http://clojuredocs.org/clojure_core/clojure.core/mapcat
const mapcat = function (
    lst: ImageEntry[],
    fn: (chunk: ImageEntry) => ImageDiff[],
) {
    return _.flatten(_.map(lst, fn), true /* only flatten one level */);
};

// > ArrayDiff.diff([1,2,3], [2,3,4]);
// = [{ "value": [1],
//      "removed": true },
//    { "value": [2, 3] },
//    { "value": [4],
//      "added": true }]
const ArrayDiff = new jsdiff.Diff();
ArrayDiff.tokenize = (array: ImageEntry[]) =>
    _.map(array, (elem: ImageEntry): ImageEntry[] => [elem]);
// The default is `+` for string concatenation, which doesn't work for array
// concatenation.
ArrayDiff.join = (a: ImageEntry[], b: ImageEntry[]) => a.concat(b);
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
const flattenChunks = (chunks: ImageEntry[]) => mapcat(chunks, splitUpChunk);

// Take two arrays and create a diff for them. The result is two arrays of
// objects, one for the things that should be included in a 'before', and one
// for 'after'
const stringArrayDiff = function (
    a: ReadonlyArray<string>,
    b: ReadonlyArray<string>,
): ImageDiffResult {
    // ArrayDiff.diff is jsdiff.Diff().diff(a, b), this is untyped so I'm
    // defining the result by the expected type our code infers.
    const diffResult: ImageEntry[] = ArrayDiff.diff(a, b);
    const flattened: ImageDiff[] = flattenChunks(diffResult);

    const result: ImageDiffResult = {
        before: _.filter(
            flattened,
            (entry: ImageDiff) => entry.status !== "added",
        ),
        after: _.filter(
            flattened,
            (entry: ImageDiff) => entry.status !== "removed",
        ),
    };
    return result;
};

export default stringArrayDiff;
