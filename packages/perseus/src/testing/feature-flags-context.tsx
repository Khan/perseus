import {PerseusFeatureFlags} from "@khanacademy/perseus-core";
import * as React from "react";

type PerseusFlags = Record<(typeof PerseusFeatureFlags)[number], boolean>;

export const defaultFeatureFlags = Object.fromEntries(
    PerseusFeatureFlags.map((flag) => [flag, false]),
) satisfies PerseusFlags;

export const StorybookFeatureFlagsContext =
    React.createContext<PerseusFlags>(defaultFeatureFlags);
