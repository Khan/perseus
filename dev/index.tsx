/* eslint monorepo/no-internal-import: "off", monorepo/no-relative-import: "off", import/no-relative-packages: "off" */
<<<<<<< HEAD
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
=======
import {
    useUniqueIdWithMock,
    RenderStateRoot,
    View,
} from "@khanacademy/wonder-blocks-core";
import {OptionItem, MultiSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Switch from "@khanacademy/wonder-blocks-switch";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {css, StyleSheet} from "aphrodite";
>>>>>>> 3ee5b688 (add flags to api options)
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
