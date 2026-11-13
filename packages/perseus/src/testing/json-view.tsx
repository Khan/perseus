/**
 * This file exists mostly to work around how Vite 8/Rolldown "wrap" the
 * react-json-view package. It is an older package and is bundled in a CJS
 * package that
 */
import * as React from "react";
import ReactJsonModule from "react-json-view";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

// Vite 8 applies Node's CJS interop in "type": "module" packages, so the
// default import is the whole `module.exports` ({default: ReactJson}).
// Jest/TS interop already unwraps it. Handle both.
const ReactJson: typeof ReactJsonModule =
    // eslint-disable-next-line no-restricted-syntax -- react-json-view's CommonJS/Vite interop exposes an untyped default at this external module boundary.
    (ReactJsonModule as any).default ?? ReactJsonModule;

type ReactJsonProps = PropsFor<typeof ReactJson>;

function JsonView(props: ReactJsonProps) {
    return <ReactJson {...props} />;
}

export default JsonView;
