/* eslint monorepo/no-internal-import: "off", monorepo/no-relative-import: "off", import/no-relative-packages: "off" */
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {useEffect, useReducer} from "react";
import {render} from "react-dom";

import {setDependencies} from "../packages/perseus/src/dependencies";
import {storybookTestDependencies} from "../testing/test-dependencies";

import {Flipbook} from "./flipbook";
import {Gallery} from "./gallery";

setDependencies(storybookTestDependencies);

render(
    <RenderStateRoot>
        <Router />
    </RenderStateRoot>,
    document.getElementById("app-root"),
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
