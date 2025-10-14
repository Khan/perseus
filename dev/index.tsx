/* eslint monorepo/no-internal-import: "off", monorepo/no-relative-import: "off", import/no-relative-packages: "off" */
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {useEffect, useReducer} from "react";
import {createRoot} from "react-dom/client";

import {
    DependenciesContext,
    setDependencies,
} from "../packages/perseus/src/dependencies";
import {
    storybookDependenciesV2,
    storybookTestDependencies,
} from "../testing/test-dependencies";

import {Flipbook} from "./flipbook";
import {Gallery} from "./gallery";

setDependencies(storybookTestDependencies);

const rootEl = document.getElementById("app-root");
if (rootEl === null) {
    throw new Error("No root element found");
}
const root = createRoot(rootEl);
root.render(
    <RenderStateRoot>
        <DependenciesContext.Provider value={storybookDependenciesV2}>
            <Router />
        </DependenciesContext.Provider>
    </RenderStateRoot>,
);

function Router() {
    const hash = useUrlHash();

    switch (hash) {
        case "#flipbook":
            return <Flipbook />;
        default:
            return <Gallery />;
    }
}

function useUrlHash() {
    const rerender = useRerender();

    useEffect(() => {
        window.addEventListener("hashchange", rerender);
        return () => window.removeEventListener("hashchange", rerender);
    }, [rerender]);

    return window.location.hash;
}

function useRerender(): () => void {
    return useReducer((n) => n + 1, 0)[1];
}
