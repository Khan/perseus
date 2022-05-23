// @flow
// This defines a version of PerseusDependencies that is suitable for use in tests.
// It should not make network requests, for example.
import katex from "katex";
import renderA11yString from "katex/dist/contrib/render-a11y-string.js";
import * as React from "react";

import {registerAllWidgetsForTesting} from "../packages/perseus/src/util/register-all-widgets-for-testing.js";

import {TestTeX} from "./test-tex.jsx";

import type {PerseusDependencies} from "../packages/perseus/src/index.js";
import type {ILogger} from "../packages/perseus/src/logging/log.js";

registerAllWidgetsForTesting();

// We do nothing in this implementation, but it is easy to spy on the .Log of
// the PerseusDependencies in tests and then assert on the calls.
const LogForTesting: ILogger = {
    log: () => {},
    error: () => {},
};

export const testDependencies: PerseusDependencies = {
    // JIPT
    JIPT: {
        domInsertChecks: [],
        useJIPT: false,
    },
    graphieMovablesJiptLabels: {
        addLabel: (label, useMath) => {},
    },
    svgImageJiptLabels: {
        addLabel: (label, useMath) => {},
    },
    rendererTranslationComponents: {
        addComponent: (renderer) => -1,
        removeComponentAtIndex: (index) => {},
    },

    // KaTeX
    getKaTeX: () => Promise.resolve(katex),
    getRenderA11yString: () => Promise.resolve(renderA11yString),
    loadMathjax: () => Promise.resolve(),
    // The KaTeX used in the 'should replace deprecated alignment tags in inline
    // math' test uses the `align` environment. This results in `array` nodes in
    // the parsed KaTeX node tree. When the Tex component tries to build an a11y
    // string for it, KaTeX throws an error because render-a11y-string.js doesn't
    // support `array` nodes. It then logs the error it to the server. However,
    // there is throttling code in the logKaTeXError() function which only reports
    // the error 1% of the time... so this causes _very_ rare test failures.
    // Mocking this here so that we don't fail because of this issue.
    logKaTeXError: (expression: string, error: Error): Promise<any> =>
        Promise.resolve({}),
    KatexProvider: ({children}: {|children: React.Node|}) => (
        <span className="mock-KatexProvider">{children}</span>
    ),
    shouldUseFutureKaTeX: (flag: boolean) => {},
    TeX: ({children}: {children: React.Node, ...}) => (
        <span className="mock-TeX">{children}</span>
    ),

    staticUrl: (str: ?string) => {
        // We define the interface such that flow can infer calls properly.
        // However, it means that return types are hard to match here in
        // the implementation.
        // $FlowIgnore[incompatible-type]
        return `mockStaticUrl(${str})`;
    },

    // video widget
    useVideo: (id, kind) => {
        // Used by video-transcript-link.jsx.fixture.js
        if (id === "YoutubeId" && kind === "YOUTUBE_ID") {
            return {
                status: "success",
                data: {
                    video: {
                        id: "YoutubeVideo",
                        contentId: "contentId",
                        youtubeId: "YoutubeId",
                        title: "Youtube Video Title",
                        __typename: "Video",
                    },
                },
            };
        }
        if (id === "slug-video-id" && kind === "READABLE_ID") {
            return {
                status: "success",
                data: {
                    video: {
                        title: "Slug Video Title",
                        id: "VideoId",
                        youtubeId: "YoutubeId",
                        contentId: "contentId",
                        __typename: "Video",
                    },
                },
            };
        }

        return {
            status: "loading",
        };
    },

    InitialRequestUrl: {
        origin: "origin-test-interface",
        host: "host-test-interface",
        protocol: "protocol-test-interface",
    },

    isDevServer: false,
    kaLocale: "en",
    isPhone: false,
    isMobile: false,
    isTablet: false,

    Log: LogForTesting,
};

export const cypressTestDependencies: PerseusDependencies = {
    ...testDependencies,
    TeX: TestTeX,
    // $FlowIgnore[incompatible-type]
    staticUrl: (str) => str,
};
