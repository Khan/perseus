// Test dependencies without widget registration.
import * as React from "react";

export {TestMathjax} from "./test-mathjax";
import {TestMathjax} from "./test-mathjax";

import type {ILogger} from "../logging/log";
import type {PerseusDependencies, PerseusDependenciesV2} from "../types";

const testStaticUrl = (str?: string | null): string => `mockStaticUrl(${str})`;

const LogForTesting: ILogger = {
    log: () => {},
    error: () => {},
};

export const testDependencies: PerseusDependencies = {
    JIPT: {
        useJIPT: false,
    },
    graphieMovablesJiptLabels: {
        addLabel: (_label, _useMath) => {},
    },
    svgImageJiptLabels: {
        addLabel: (_label, _useMath) => {},
    },
    rendererTranslationComponents: {
        addComponent: (_renderer) => -1,
        removeComponentAtIndex: (_index) => {},
    },
    TeX: ({children}: {children: React.ReactNode}) => {
        return <span className="mock-TeX">{children}</span>;
    },
    // @ts-expect-error - The implementation accepts null test values.
    staticUrl: testStaticUrl,
    useVideo: (id, kind) => {
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
        return {status: "loading"};
    },
    InitialRequestUrl: {
        origin: "origin-test-interface",
        host: "host-test-interface",
        protocol: "file:",
    },
    isDevServer: false,
    kaLocale: "en",
    Log: LogForTesting,
};

export const testDependenciesV2: PerseusDependenciesV2 = {
    analytics: {
        onAnalyticsEvent: async () => {},
    },
    generateUrl: (args) => args.url,
    useVideo: () => ({
        status: "success",
        data: {video: null},
    }),
};

export const storybookDependenciesV2: PerseusDependenciesV2 = {
    ...testDependenciesV2,
    analytics: {
        onAnalyticsEvent: async (event) => {
            console.debug("⚡️ Sending analytics event:", event);
        },
    },
};

export const cypressTestDependencies: PerseusDependencies = {
    ...testDependencies,
    TeX: TestMathjax,
    staticUrl: (str) => str,
};

export const cypressDependenciesV2: PerseusDependenciesV2 = {
    ...testDependenciesV2,
};
