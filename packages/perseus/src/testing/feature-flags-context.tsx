import {PerseusFeatureFlags} from "@khanacademy/perseus-core";
import * as React from "react";

type PerseusFlags = Record<(typeof PerseusFeatureFlags)[number], boolean>;

export const defaultFeatureFlags: PerseusFlags = Object.fromEntries(
    PerseusFeatureFlags.map((flag) => [flag, false]),
) as PerseusFlags;

export const StorybookFeatureFlagsContext =
    React.createContext<PerseusFlags>(defaultFeatureFlags);
