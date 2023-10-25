/* eslint-disable @khanacademy/ts-no-error-suppressions */
/**
 * A side by side diff view for Perseus exercise items
 * that do not have the standard question layout.
 */
import {
    buildEmptyItemTreeForShape,
    buildMapper,
    itemToTree,
    shapes,
} from "@khanacademy/perseus";
import * as React from "react";

import RendererDiff from "./renderer-diff";
import TagsDiff from "./tags-diff";

import type {Item, Path, Shape} from "@khanacademy/perseus";

type ItemList = [unknown, Path];

/**
 * Outputs true if path begins with beginPath, false otherwise.
 */
function beginsWith(path: Path, beginPath: Path): boolean {
    let matches = true;
    for (let i = 0; i < beginPath.length; i++) {
        if (i >= path.length) {
            return false;
        }
        if (beginPath[i] !== path[i]) {
            matches = false;
        }
    }
    return matches;
}

/**
 * Outputs true if beforePath and afterPath are the same.
 */
function checkPath(beforePath: Path, afterPath: Path): boolean {
    if (beforePath.length !== afterPath.length) {
        return false;
    }
    for (let i = 0, l = beforePath.length; i < l; i++) {
        if (beforePath[i] !== afterPath[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Given a path, returns a title. Puts colons after numbers in the path.
 */
function getTitle(path: Path): string {
    const title: Array<string> = [];
    for (let i = 0; i < path.length; i++) {
        if (typeof path[i] === "number") {
            // @ts-expect-error - TS2365 - Operator '+' cannot be applied to types 'string | number' and 'number'.
            title.push((path[i] + 1).toString() + ":");
        } else {
            // @ts-expect-error - TS2345 - Argument of type 'string | number' is not assignable to parameter of type 'string'.
            title.push(path[i]);
        }
    }
    return title.join(" ");
}

type Tag = {
    idToName: (arg1: string) => string;
    nameToId: (arg1: string) => string;
    names: ReadonlyArray<string>;
};

type Props = {
    after: Item;
    before: Item;
    shape: Shape;
    tags: Tag;
};

class StructuredItemDiff extends React.Component<Props> {
    /**
     * Traverses the given shape and adds paths that are present in
     * beforeList and afterList to result. Note that this method assumes
     * the order of elements in beforeList and afterList, which are
     * from buildMapper(), is the same order they appear in in the shape.
     */
    static generateCompletePathsList(
        beforeList: Array<ItemList>,
        afterList: Array<ItemList>,
        result: Array<Path>,
        shape: Shape,
        path: ReadonlyArray<any>,
    ): void {
        if (
            shape.type === "content" ||
            shape.type === "hint" ||
            shape.type === "tags"
        ) {
            const beforePath =
                beforeList.length > 0 && checkPath(path, beforeList[0][1]);
            const afterPath =
                afterList.length > 0 && checkPath(path, afterList[0][1]);
            if (beforePath && afterPath) {
                result.push(path);
                beforeList.splice(0, 1);
                afterList.splice(0, 1);
            } else if (beforePath) {
                result.push(path);
                beforeList.splice(0, 1);
            } else if (afterPath) {
                result.push(path);
                afterList.splice(0, 1);
            }
        } else if (shape.type === "array") {
            let index = 0;
            let newPath = path.concat(index);

            // For array types, the paths will be in the form [<path>, n],
            // where n is an integer > 0 and increments.
            // As long as either beforeList or afterList has a next element that
            // matches [<path>, n], we recurse into that item with the new path.
            while (
                (beforeList.length > 0 &&
                    beginsWith(beforeList[0][1], newPath)) ||
                (afterList.length > 0 && beginsWith(afterList[0][1], newPath))
            ) {
                StructuredItemDiff.generateCompletePathsList(
                    beforeList,
                    afterList,
                    result,
                    shape.elementShape,
                    newPath,
                );
                index++;
                newPath = path.concat(index);
            }
        } else if (shape.type === "object") {
            const keys = Object.keys(shape.shape);
            for (let i = 0; i < keys.length; i++) {
                const newPath = path.concat([keys[i]]);
                StructuredItemDiff.generateCompletePathsList(
                    beforeList,
                    afterList,
                    result,
                    shape.shape[keys[i]],
                    newPath,
                );
            }
        }
    }

    render(): React.ReactNode {
        const {before, after, shape, tags} = this.props;

        const beforeList: Array<ItemList> = [];
        const afterList = [];

        buildMapper()
            .setContentMapper((c, _, p) => beforeList.push([c, p]))
            .setHintMapper((c, _, p) => beforeList.push([c, p]))
            .setTagsMapper((c, _, p) => beforeList.push([c, p]))
            .mapTree(itemToTree(before), shape);

        buildMapper()
            // @ts-expect-error - TS2322 - Type 'unknown' is not assignable to type 'never'. | TS2322 - Type 'Path' is not assignable to type 'never'.
            .setContentMapper((c, _, p) => afterList.push([c, p]))
            // @ts-expect-error - TS2322 - Type 'unknown' is not assignable to type 'never'. | TS2322 - Type 'Path' is not assignable to type 'never'.
            .setHintMapper((c, _, p) => afterList.push([c, p]))
            // @ts-expect-error - TS2322 - Type 'unknown' is not assignable to type 'never'. | TS2322 - Type 'Path' is not assignable to type 'never'.
            .setTagsMapper((c, _, p) => afterList.push([c, p]))
            .mapTree(itemToTree(after), shape);

        // These are used in generateCompletePathsList()
        // and are modified in that method.
        const beforeListModified = beforeList.slice();
        const afterListModified = afterList.slice();

        const allDiffPaths: Array<Path> = [];
        StructuredItemDiff.generateCompletePathsList(
            beforeListModified,
            afterListModified,
            allDiffPaths,
            shape,
            [],
        );

        const diffCount = allDiffPaths.length;

        const diffs: React.ReactNode = allDiffPaths.map((path, n) => {
            const isTag = path[path.length - 1] === "tags";
            const currentTitle = getTitle(path);

            let before = beforeList.find((e) => {
                return checkPath(e[1], path);
            });
            let after = afterList.find((e) => {
                return checkPath(e[1], path);
            });

            if (isTag) {
                if (!before) {
                    before = [[], path];
                }
                if (!after) {
                    // @ts-expect-error - TS2322 - Type 'Path[]' is not assignable to type 'undefined'.
                    after = [[], path];
                }

                const beforeTags: Array<string> = [];
                if (Array.isArray(before[0])) {
                    before[0].forEach((tagId) => {
                        if (typeof tagId === "string") {
                            beforeTags.push(tags.idToName(tagId));
                        }
                    });
                }
                const afterTags: Array<string> = [];
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                if (Array.isArray(after[0])) {
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                    after[0].forEach((tagId) => {
                        if (typeof tagId === "string") {
                            afterTags.push(tags.idToName(tagId));
                        }
                    });
                }

                const intersection = beforeTags.filter((tag) =>
                    afterTags.includes(tag),
                );
                const beforeOnly = beforeTags.filter(
                    (tag) => !afterTags.includes(tag),
                );
                const afterOnly = afterTags.filter(
                    (tag) => !beforeTags.includes(tag),
                );

                return (
                    <TagsDiff
                        beforeOnly={beforeOnly}
                        afterOnly={afterOnly}
                        intersection={intersection}
                        title={currentTitle}
                        showSeparator={n < diffCount - 1}
                        key={n}
                    />
                );
            }
            if (!before) {
                before = [buildEmptyItemTreeForShape(shapes.content), path];
            }
            if (!after) {
                // @ts-expect-error - TS2322 - Type 'any[]' is not assignable to type 'undefined'.
                after = [buildEmptyItemTreeForShape(shapes.content), path];
            }
            return (
                <RendererDiff
                    before={before[0] as any}
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                    after={after[0] as any}
                    title={currentTitle}
                    showAlignmentOptions={false}
                    showSeparator={n < diffCount - 1}
                    key={n}
                />
            );
        });

        return <div className="framework-perseus">{diffs}</div>;
    }
}

export default StructuredItemDiff;
