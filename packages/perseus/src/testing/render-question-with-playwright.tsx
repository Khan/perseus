import {MathInputI18nContextProvider} from "@khanacademy/math-input";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import * as React from "react";

// TODO(benchristel): Figure out why importing mockStrings from
// "@khanacademy/math-input/strings" fails here. Alternatively, export
// mockStrings from packages/math-input/src/index.ts.
import {mockStrings as mathInputMockStrings} from "../../../math-input/src/strings";
import AssetContext from "../asset-context";
import {DependenciesContext} from "../dependencies";
import * as Perseus from "../index";
import {mockStrings} from "../strings";
import UserInputManager from "../user-input-manager";

import {browserTestDependenciesV2} from "./test-dependencies";

import type {APIOptions} from "../types";
import type {
    PerseusRenderer,
    PerseusScore,
    UserInputMap,
} from "@khanacademy/perseus-core";

/**
 * The bridge that Playwright component tests use to reach into the rendered
 * question. The React tree runs in the browser while the test body runs in
 * Node, so we expose the pieces the tests need on `window` and read them from
 * the test via `page.evaluate`.
 */
export type PerseusTestApi = {
    /**
     * True once the renderer has rendered at least once and every registered
     * asset (KaTeX, images, ...) reports as loaded. Tests wait on this before
     * interacting, mirroring the old Cypress `waitUntil` + spinner checks.
     */
    ready: boolean;
    /** The current user input, equivalent to `renderer.getUserInputMap()`. */
    getUserInputMap: () => UserInputMap;
    /** Scores `question` against the renderer's current user input. */
    score: (question: PerseusRenderer) => PerseusScore;
};

declare global {
    // eslint-disable-next-line no-var
    var perseusTest: PerseusTestApi | undefined;
}

type Props = {
    question: PerseusRenderer;
    apiOptions?: APIOptions;
    reviewMode?: boolean;
};

/**
 * Renders the given question for a Playwright component test. It publishes a
 * `window.perseusTest` bridge (see {@link PerseusTestApi}) once mounted so the
 * test can read user input and score the question from Node.
 */
export function QuestionRenderer({
    question,
    apiOptions = Object.freeze({}),
    reviewMode = false,
}: Props): React.ReactElement {
    const rendererRef = React.useRef<Perseus.Renderer | null>(null);
    const renderedAtLeastOnceRef = React.useRef(false);
    const assetStatusesRef = React.useRef<Record<string, boolean>>({});
    const [ready, setReady] = React.useState(false);

    const getRenderer = (): Perseus.Renderer => {
        if (!rendererRef.current) {
            throw new Error("No renderer!");
        }
        return rendererRef.current;
    };

    const recomputeReady = React.useCallback(() => {
        const isReady =
            renderedAtLeastOnceRef.current &&
            Object.keys(assetStatusesRef.current).every(
                (key) => assetStatusesRef.current[key] === true,
            );
        if (isReady) {
            setReady(true);
        }
    }, []);

    const onRender = () => {
        renderedAtLeastOnceRef.current = true;
        recomputeReady();
    };

    const setAssetStatus = (assetKey: string, loaded: boolean) => {
        assetStatusesRef.current[assetKey] = loaded;
        recomputeReady();
    };

    // Publish the test bridge on `window`. `ready` is read back live so the
    // test's `waitForFunction` observes the latest value.
    React.useEffect(() => {
        globalThis.perseusTest = {
            get ready() {
                return ready;
            },
            getUserInputMap: () => getRenderer().getUserInputMap(),
            score: (q) =>
                scorePerseusItem(q, getRenderer().getUserInputMap(), "en"),
        };
        return () => {
            globalThis.perseusTest = undefined;
        };
    }, [ready]);

    return (
        <div className="framework-perseus">
            <AssetContext.Provider
                value={{
                    assetStatuses: assetStatusesRef.current,
                    setAssetStatus,
                }}
            >
                {/*
                 * NOTE: The Cypress helper wrapped this tree in a
                 * <RenderStateRoot> (Wonder Blocks). We intentionally omit it:
                 * the Jest `renderQuestion` helper doesn't use it either, the
                 * widgets render and behave correctly without it, and under
                 * Playwright CT's bundling RenderStateRoot resolves a React
                 * instance whose hooks dispatcher isn't wired, crashing the
                 * whole tree.
                 */}
                <DependenciesContext.Provider value={browserTestDependenciesV2}>
                    <MathInputI18nContextProvider
                        locale="en"
                        strings={mathInputMockStrings}
                    >
                        <Perseus.PerseusI18nContextProvider
                            locale="en"
                            strings={mockStrings}
                        >
                            <UserInputManager
                                widgets={question.widgets}
                                problemNum={0}
                            >
                                {({
                                    userInput,
                                    handleUserInput,
                                    initializeUserInput,
                                }) => (
                                    <Perseus.Renderer
                                        ref={(node) =>
                                            (rendererRef.current = node)
                                        }
                                        userInput={userInput}
                                        handleUserInput={handleUserInput}
                                        initializeUserInput={
                                            initializeUserInput
                                        }
                                        content={question.content}
                                        images={question.images}
                                        widgets={question.widgets}
                                        problemNum={0}
                                        apiOptions={apiOptions}
                                        reviewMode={reviewMode}
                                        onRender={onRender}
                                        strings={mockStrings}
                                    />
                                )}
                            </UserInputManager>
                        </Perseus.PerseusI18nContextProvider>
                    </MathInputI18nContextProvider>
                </DependenciesContext.Provider>
            </AssetContext.Provider>
        </div>
    );
}
