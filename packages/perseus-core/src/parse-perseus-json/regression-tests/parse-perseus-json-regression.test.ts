import * as fs from "fs";
import {join} from "path";

import splitPerseusItem from "../../utils/split-perseus-item";
import {getCurrentVersion, registerCoreWidgets} from "../../widgets/core-widget-registry";
import {anySuccess} from "../general-purpose-parsers/test-helpers";
import {
    parseAndMigratePerseusArticle,
    parseAndMigratePerseusItem,
    parseAndMigrateUserInputMap,
    parseAndMigratePerseusRenderer,
} from "../index";
import {parse} from "../parse";
import {parsePerseusArticle} from "../perseus-parsers/perseus-article";
import {parsePerseusItem} from "../perseus-parsers/perseus-item";
import {parsePerseusRenderer} from "../perseus-parsers/perseus-renderer";
import {parseUserInputMap} from "../perseus-parsers/user-input-map";
import {assertSuccess, mapFailure} from "../result";
import type {ExplanationWidget, GradedGroupSetWidget, GradedGroupWidget, PerseusItem, PerseusRenderer, PerseusWidget} from "../../data-schema";
import {PerseusGradedGroupWidgetOptions} from "../../data-schema";
import _ from "underscore";

const itemDataDir = join(__dirname, "item-data");
const itemDataFiles = fs.readdirSync(itemDataDir);

const articleDataDir = join(__dirname, "article-data");
const articleDataFiles = fs.readdirSync(articleDataDir);

const userInputDataDir = join(__dirname, "user-input-data");
const userInputDataFiles = fs.readdirSync(userInputDataDir);

const rendererDataDir = join(__dirname, "renderer-data");
const rendererDataFiles = fs.readdirSync(rendererDataDir);

describe("parseAndMigratePerseusItem", () => {
    beforeAll(() => {
        registerCoreWidgets();
    });

    describe.each(itemDataFiles)("given %s", (filename) => {
        async function getParseResult() {
            const {default: data} = await import(join(itemDataDir, filename));
            return parseAndMigratePerseusItem(data);
        }

        it("parses successfully", async () => {
            const result = await getParseResult();
            // If the parse fails, get just the error message. This makes the test
            // failure easier to read, since otherwise the entire `invalidObject`
            // from the ParseFailureDetail would be printed.
            const resultWithMessage = mapFailure(getMessage)(result);

            expect(resultWithMessage).toEqual(anySuccess);
        });

        it("returns the same result as before", async () => {
            const result = await getParseResult();
            assertSuccess(result);
            expect(result.value).toMatchSnapshot();
        });

        it("is not changed by a second pass through the parser", async () => {
            const result = await getParseResult();
            // This test ensures that the parser is idempotent, i.e. running it
            // once is the same as running it many times. Idempotency is
            // valuable because it means e.g. that if we run the parser on data
            // before saving it to datastore, it won't be changed by being
            // parsed again on read.
            assertSuccess(result);

            const result2 = parse(result.value, parsePerseusItem);

            expect(result2).toEqual(anySuccess);
            // Narrow the type. This assertion should always pass due to the
            // expectation above.
            assertSuccess(result2);
            expect(result2.value).toEqual(result.value);
        });

        it("round-trips through JSON", async () => {
            const result = await getParseResult();
            assertSuccess(result);

            const result2 = parse(
                JSON.parse(JSON.stringify(result.value)),
                parsePerseusItem,
            );

            expect(result2).toEqual(anySuccess);
            // Narrow the type. This assertion should always pass due to the
            // expectation above.
            assertSuccess(result2);
            expect(result2.value).toEqual(result.value);
        });

        it("parses the data with answer information removed", async () => {
            const result = await getParseResult();
            assertSuccess(result);
            const answerlessItem = splitPerseusItem(result.value);
            expect(parse(answerlessItem, parsePerseusItem)).toEqual(anySuccess);
        });

        it("returns the same result as before with answer information removed", async () => {
            const result = await getParseResult();
            assertSuccess(result);
            const answerlessItem = splitPerseusItem(result.value);
            const answerlessParseResult = parse(
                answerlessItem,
                parsePerseusItem,
            );
            assertSuccess(answerlessParseResult);
            expect(answerlessParseResult.value).toMatchSnapshot();
        });

        test("answerless data is not changed by a second pass through the parser", async () => {
            const result = await getParseResult();
            assertSuccess(result);

            const answerlessItem = splitPerseusItem(result.value);
            const answerlessParseResult1 = parse(
                answerlessItem,
                parsePerseusItem,
            );
            assertSuccess(answerlessParseResult1);

            const answerlessParseResult2 = parse(
                answerlessParseResult1.value,
                parsePerseusItem,
            );
            expect(answerlessParseResult2).toEqual(anySuccess);
            // Narrow the type. This assertion should always pass due to the
            // expectation above.
            assertSuccess(answerlessParseResult2);

            expect(answerlessParseResult2.value).toEqual(
                answerlessParseResult1.value,
            );
        });

        it("stamps each widget with the current version number", async () => {
            const result = await getParseResult();
            assertSuccess(result);

            const widgets = getWidgetsFromItem(result.value);

            for (const widget of widgets) {
                const expectedVersion = getCurrentVersion(widget.type);
                if (_.isEqual(expectedVersion, {major: 0, minor: 0})) {
                    // An undefined version is equivalent to 0.0.
                    if (widget.version === undefined) {
                        continue;
                    }
                }
                if (!_.isEqual(expectedVersion, widget.version)) {
                    throw Error(`Expected ${widget.type} widget to have version ${JSON.stringify(expectedVersion)}, but got ${widget.version}`);
                }
            }
        });
    });
});

describe("parseAndMigratePerseusArticle", () => {
    describe.each(articleDataFiles)("given %s", (filename) => {
        async function getParseResult() {
            const {default: data} = await import(
                join(articleDataDir, filename)
            );
            return parseAndMigratePerseusArticle(data);
        }

        it("parses successfully", async () => {
            const result = await getParseResult();
            // If the parse fails, get just the error message. This makes the test
            // failure easier to read, since otherwise the entire `invalidObject`
            // from the ParseFailureDetail would be printed.
            const resultWithMessage = mapFailure(getMessage)(result);

            expect(resultWithMessage).toEqual(anySuccess);
        });

        it("returns the same result as before", async () => {
            const result = await getParseResult();
            assertSuccess(result);
            expect(result.value).toMatchSnapshot();
        });

        it("is not changed by a second pass through the parser", async () => {
            const result = await getParseResult();
            // This test ensures that the parser is idempotent, i.e. running it
            // once is the same as running it many times. Idempotency is
            // valuable because it means e.g. that if we run the parser on data
            // before saving it to datastore, it won't be changed by being
            // parsed again on read.
            assertSuccess(result);

            const result2 = parse(result.value, parsePerseusArticle);

            expect(result2).toEqual(anySuccess);
            // Narrow the type. This assertion should always pass due to the
            // expectation above.
            assertSuccess(result2);
            expect(result2.value).toEqual(result.value);
        });

        it("round-trips through JSON", async () => {
            const result = await getParseResult();
            assertSuccess(result);

            const result2 = parse(
                JSON.parse(JSON.stringify(result.value)),
                parsePerseusArticle,
            );

            expect(result2).toEqual(anySuccess);
            // Narrow the type. This assertion should always pass due to the
            // expectation above.
            assertSuccess(result2);
            expect(result2.value).toEqual(result.value);
        });
    });
});

describe("parseAndMigrateUserInputMap", () => {
    beforeAll(() => {
        registerCoreWidgets();
    });

    describe.each(userInputDataFiles)("given the data from %s", (filename) => {
        async function getParseResult() {
            const {default: data} = await import(
                join(userInputDataDir, filename)
            );
            return parseAndMigrateUserInputMap(data);
        }

        it("parses successfully", async () => {
            const result = await getParseResult();
            // If the parse fails, get just the error message. This makes the test
            // failure easier to read, since otherwise the entire `invalidObject`
            // from the ParseFailureDetail would be printed.
            const resultWithMessage = mapFailure(getMessage)(result);

            expect(resultWithMessage).toEqual(anySuccess);
        });

        it("returns the same result as before", async () => {
            const result = await getParseResult();
            assertSuccess(result);
            expect(result.value).toMatchSnapshot();
        });

        it("is not changed by a second pass through the parser", async () => {
            // This test ensures that the parser is idempotent, i.e. running
            // it once is the same as running it many times. This is important
            // because we might parse the input many times, e.g. every time
            // it crosses a service boundary.
            const result = await getParseResult();
            assertSuccess(result);

            const result2 = parse(result.value, parseUserInputMap);

            expect(result2).toEqual(anySuccess);
            // Narrow the type. This assertion should always pass due to the
            // expectation above.
            assertSuccess(result2);
            expect(result2.value).toEqual(result.value);
        });
    });
});

describe("parseAndMigratePerseusRenderer", () => {
    beforeAll(() => {
        registerCoreWidgets();
    });

    describe.each(rendererDataFiles)("given %s", (filename) => {
        async function getParseResult() {
            const {default: data} = await import(
                join(rendererDataDir, filename)
            );
            return parseAndMigratePerseusRenderer(data);
        }

        it("parses successfully", async () => {
            const result = await getParseResult();

            const resultWithMessage = mapFailure(getMessage)(result);

            expect(resultWithMessage).toEqual(anySuccess);
        });

        it("returns the same result as before", async () => {
            const result = await getParseResult();
            assertSuccess(result);
            expect(result.value).toMatchSnapshot();
        });

        it("is not changed by a second pass through the parser", async () => {
            const result = await getParseResult();
            assertSuccess(result);

            const result2 = parse(result.value, parsePerseusRenderer);

            expect(result2).toEqual(anySuccess);
            assertSuccess(result2);
            expect(result2.value).toEqual(result.value);
        });
    });
});

describe("the regression test data", () => {
    const inDirectory = (dir: string) => (file: string) => join(dir, file);

    const dataPaths = [
        ...articleDataFiles.map(inDirectory(articleDataDir)),
        ...itemDataFiles.map(inDirectory(itemDataDir)),
        ...userInputDataFiles.map(inDirectory(userInputDataDir)),
        ...rendererDataFiles.map(inDirectory(rendererDataDir)),
    ];

    describe.each(dataPaths)("in %s", (path) => {
        it("contains a warning", () => {
            const contents = fs.readFileSync(path, "utf-8");
            expect(contents).toContain(
                [
                    `// WARNING: Do not change or delete this file! If you do, Perseus might become`,
                    `// unable to parse the current data format, which will break clients.`,
                    `// If you need to add more regression tests, add a new file to this directory.`,
                ].join("\n"),
            );
        });
    });
});

function getMessage(obj: {message: string}): string {
    return obj.message;
}

function getWidgetsFromItem(item: PerseusItem): PerseusWidget[] {
    return [
        ...getWidgetsFromRenderer(item.question),
        ...item.hints.flatMap(getWidgetsFromRenderer),
    ];
}

function getWidgetsFromRenderer(renderer: PerseusRenderer): PerseusWidget[] {
    const topLevelWidgets = Object.values(renderer.widgets);
    return [
        ...topLevelWidgets,
        ...topLevelWidgets.filter(isExplanation).flatMap(getWidgetsFromExplanation),
        ...topLevelWidgets.filter(isGradedGroup).flatMap(getWidgetsFromGradedGroup),
        ...topLevelWidgets.filter(isGradedGroupSet).flatMap(getWidgetsFromGradedGroupSet),
    ];
}

function isExplanation(widget: PerseusWidget): widget is ExplanationWidget {
    return widget.type === "explanation"
}

function isGradedGroup(widget: PerseusWidget): widget is GradedGroupWidget {
    return widget.type === "graded-group";
}

function isGradedGroupSet(widget: PerseusWidget): widget is GradedGroupSetWidget {
    return widget.type === "graded-group-set";
}

function getWidgetsFromExplanation(widget: ExplanationWidget): PerseusWidget[] {
    return Object.values(widget.options.widgets);
}

function getWidgetsFromGradedGroup(widget: GradedGroupWidget): PerseusWidget[] {
    return getWidgetsFromGradedGroupOptions(widget.options);
}

function getWidgetsFromGradedGroupOptions(options: PerseusGradedGroupWidgetOptions): PerseusWidget[] {
    return Object.values(options.widgets);
}

function getWidgetsFromGradedGroupSet(widget: GradedGroupSetWidget): PerseusWidget[] {
    return widget.options.gradedGroups.flatMap(getWidgetsFromGradedGroupOptions);
}
