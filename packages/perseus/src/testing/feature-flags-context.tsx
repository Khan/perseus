import {PerseusFeatureFlags} from "@khanacademy/perseus-core";
import * as React from "react";

type PerseusFlags = Record<(typeof PerseusFeatureFlags)[number], boolean>;

// We need to cast here in order to create
// the correct type for this internal tool
// eslint-disable-next-line no-restricted-syntax
export const defaultFeatureFlags = Object.fromEntries(
    PerseusFeatureFlags.map((flag) => [flag, false]),
) as PerseusFlags;

export const StorybookFeatureFlagsContext =
    React.createContext<PerseusFlags>(defaultFeatureFlags);
