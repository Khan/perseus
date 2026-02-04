// This defines a version of PerseusDependencies that is suitable for use in tests.
// It should not make network requests, for example.
import * as React from "react";

import {registerAllWidgetsForTesting} from "../util/register-all-widgets-for-testing";

import {TestMathjax} from "./test-mathjax";

import type {ILogger} from "../logging/log";
import type {
    PerseusDependencies,
    PerseusDependenciesV2,
} from "../types";

registerAllWidgetsForTesting();

// We do nothing in this implementation, but it is easy to spy on the .Log of
// the PerseusDependencies in tests and then assert on the calls.
const LogForTesting: ILogger = {
    log: () => {},
    error: () => {},
};

// PerseusDependenciesV2 are provided through a React Context. This object
// exists so that we can easily pass a "known" object into the renderers (see
// renderQuestion.tsx) and then spy on any functions to do assertions.
const testDependenciesV2: PerseusDependenciesV2 = {
    analytics: {
        onAnalyticsEvent: async () => {},
    },
    generateUrl: (args) => {
        return args.url;
    },
    useVideo: () => {
        return {
            status: "success",
            data: {
                video: null,
            },
        };
    },
};

export const storybookDependenciesV2: PerseusDependenciesV2 = {
    ...testDependenciesV2,
    analytics: {
        onAnalyticsEvent: async (event) => {
            console.info("⚡️ Sending analytics event:", event);
        },
    },
};

