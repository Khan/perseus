import * as React from "react";

import {ApiOptions} from "../perseus-api";

import {StorybookFeatureFlagsContext} from "./feature-flags-context";

import type {APIOptions} from "../types";

/**
 * Merges the active Storybook feature flags (from the toolbar) into the given
 * apiOptions. Story-level flags take priority over toolbar-level flags.
 */
export function useStorybookApiOptions(apiOptions?: APIOptions): APIOptions {
    const storybookFlags = React.useContext(StorybookFeatureFlagsContext);
    return React.useMemo(
        () => ({
            ...(apiOptions ?? ApiOptions.defaults),
            flags: {...storybookFlags, ...apiOptions?.flags},
        }),
        [apiOptions, storybookFlags],
    );
}
