// @flow
import colors from "@khanacademy/wonder-blocks-color";
import * as React from "react";

import {getFixtureFnFor} from "../../../testing/sandbox/fixture.js";

import CrossOutMenuWrapper from "./cross-out-menu-wrapper.jsx";

const fixture = getFixtureFnFor(CrossOutMenuWrapper);
export const instances: $ReadOnlyArray<mixed> = [
    fixture("Cross-out menu for choice A (colored default KA Green)", {
        children: <div>Hello, world!</div>,
        enabled: true,
        pos: 0,
        crossedOut: false,
        onCrossedOutChange: () => {},
    }),

    fixture("Re-enable menu for choice C (colored Wonder Blocks Blue)", {
        children: <div>Hello, world!</div>,
        enabled: true,
        pos: 0,
        primaryProductColor: colors.blue,
        crossedOut: true,
        onCrossedOutChange: () => {},
    }),

    fixture("No cross-out menu", {
        children: <div>Hello, world!</div>,
        enabled: true,
        pos: 0,
        crossedOut: false,
        onCrossedOutChange: () => {},
    }),
];

export const log = ["onCrossedOutChange"];
