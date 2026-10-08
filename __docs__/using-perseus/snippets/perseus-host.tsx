import {
    Dependencies,
    DependenciesContext,
    init,
    PerseusI18nContextProvider,
} from "@khanacademy/perseus";
import {mockStrings} from "@khanacademy/perseus/strings";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import type {
    PerseusDependencies,
    PerseusDependenciesV2,
} from "@khanacademy/perseus";

// Perseus's compiled styles. Load them once, anywhere in your app.
import "@khanacademy/perseus/styles.css";

// TODO(perseus): link to the reference setup in khan/frontend, which wires
// these to real TeX rendering, translated strings, logging and analytics.

// A stand-in for your app's TeX renderer (e.g. a MathJax or KaTeX
// component). It shows the raw TeX source so this example runs as-is.
function YourTeX({children}: {children: string}) {
    return <span>{children}</span>;
}

// Global dependencies, set once at startup.
const dependencies: PerseusDependencies = {
    JIPT: {useJIPT: false},
    graphieMovablesJiptLabels: {addLabel: () => {}},
    svgImageJiptLabels: {addLabel: () => {}},
    rendererTranslationComponents: {
        addComponent: () => -1,
        removeComponentAtIndex: () => {},
    },
    TeX: YourTeX,
    staticUrl: <T,>(url: T): T => url,
    InitialRequestUrl: {
        origin: window.location.origin,
        host: window.location.host,
        protocol: window.location.protocol,
    },
    Log: {
        log: () => {},
        // Forward to your error reporting.
        error: () => {},
    },
    isDevServer: false,
    kaLocale: "en",
};

// Dependencies provided through React context. Without these, generateUrl
// and useVideo throw as soon as an item contains an image or video.
const dependenciesV2: PerseusDependenciesV2 = {
    analytics: {onAnalyticsEvent: async () => {}},
    generateUrl: ({url}) => url,
    useVideo: () => ({status: "success", data: {video: null}}),
};

init();
Dependencies.setDependencies(dependencies);

export function PerseusHost({children}: {children: React.ReactNode}) {
    return (
        <RenderStateRoot>
            {/* English strings. Pass translated strings for other locales. */}
            <PerseusI18nContextProvider strings={mockStrings} locale="en">
                <DependenciesContext.Provider value={dependenciesV2}>
                    {/* Perseus styles are scoped to this class. */}
                    <div className="framework-perseus">{children}</div>
                </DependenciesContext.Provider>
            </PerseusI18nContextProvider>
        </RenderStateRoot>
    );
}
