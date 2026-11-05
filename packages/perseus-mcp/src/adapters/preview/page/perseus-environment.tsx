// Sets Perseus up to render in the preview frame. Importing this module
// registers the widgets and installs the dependencies Perseus reads globally;
// the dependencies it reads from React context are exported for the frame.
import {MathJaxRenderer} from "@khanacademy/mathjax-renderer";
import {Dependencies, init} from "@khanacademy/perseus";
import * as React from "react";

// The page setup Perseus expects from the sites that host it.
import "@internal/perseus-environment/styles.css";
import "@internal/perseus-environment/lato.css";
import "@internal/perseus-environment/jakarta.css";
import "@khanacademy/mathjax-renderer/src/css/mathjax.css";
import "@khanacademy/mathjax-renderer/src/css/safari-hacks.css";
// The renderer always adds copy-paste spans, which need these styles.
import "@khanacademy/mathjax-renderer/src/css/selectable.css";

import {GRAFFITI_HOST} from "../../../domain/graffiti/diagram";

import type {
    PerseusDependencies,
    PerseusDependenciesV2,
} from "@khanacademy/perseus";

const mathJax = new MathJaxRenderer({
    shouldFixUnicodeLayout: true,
    fontURL: "https://cdn.kastatic.org/fonts/mathjax",
    locale: "en",
});

function TeX({
    children,
    onRender,
}: {
    children: string;
    onRender?: (root?: any) => unknown;
}) {
    const ref = React.useRef<HTMLSpanElement>(null);
    const {domElement} = React.useMemo(
        () => mathJax.render(children),
        [children],
    );

    React.useLayoutEffect(() => {
        ref.current?.replaceChildren(domElement);
        mathJax.updateStyles();
        onRender?.();
    }, [domElement, onRender]);

    return <span ref={ref} />;
}

const noLabels = {addLabel: () => {}};

// What Perseus makes of a diagram's web+graphie:// URL.
const DIAGRAM_ORIGIN = `https://${GRAFFITI_HOST}`;

const dependencies: PerseusDependencies = {
    JIPT: {useJIPT: false},
    graphieMovablesJiptLabels: noLabels,
    svgImageJiptLabels: noLabels,
    rendererTranslationComponents: {
        addComponent: () => -1,
        removeComponentAtIndex: () => {},
    },
    TeX,
    staticUrl: (url) => url ?? "",
    InitialRequestUrl: {
        origin: window.location.origin,
        host: window.location.host,
        protocol: window.location.protocol,
    },
    // The browser console is where whoever runs the preview looks.
    Log: {
        // eslint-disable-next-line no-console
        log: (message, extra) => console.log(message, extra),
        // eslint-disable-next-line no-console
        error: (message, kind, extra) => console.error(message, kind, extra),
    },
    isDevServer: true,
    kaLocale: "en",
};

export const dependenciesV2: PerseusDependenciesV2 = {
    analytics: {onAnalyticsEvent: async () => {}},
    // Graffiti diagrams are served by perseus-mcp, which serves this page.
    generateUrl: ({url}) =>
        url.startsWith(DIAGRAM_ORIGIN)
            ? window.location.origin + url.slice(DIAGRAM_ORIGIN.length)
            : url,
    // Drafts are local, so there's no video service to look videos up in.
    useVideo: () => ({status: "success", data: {video: null}}),
};

init();
Dependencies.setDependencies(dependencies);
