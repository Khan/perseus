import * as React from "react";

import type {A11yIssue} from "./issues-panel";
import type {A11yReport} from "../preview/use-preview-controller";

export interface A11yContextValue {
    /** Turns one issue's highlight on or off. */
    setIssueHighlight: (instanceId: string, highlighted: boolean) => void;
    /** Whether the preview iframe's axe-core scan is enabled. */
    a11yScanningEnabled: boolean;
    /** Enables/disables the preview iframe's axe-core scan. */
    setA11yScanningEnabled: (enabled: boolean) => void;
    /** instanceIds to highlight in the preview iframe, unioned across every
     * active "Show Me" toggle. */
    highlightInstanceIds: string[];
    /** Forwards the preview iframe's latest scan report to the owner. */
    onA11yReport: (report: A11yReport | null) => void;
    /** The latest scan's issues, for display in `IssuesPanel`. */
    axeCoreIssues: A11yIssue[];
}

/**
 * Builds an A11yContextValue, defaulting any field a caller doesn't
 * override to a production-safe no-op/empty value.
 */
export function createA11yContextValue(
    overrides: Partial<A11yContextValue> = {},
): A11yContextValue {
    return {
        setIssueHighlight: () => {},
        a11yScanningEnabled: false,
        setA11yScanningEnabled: () => {},
        highlightInstanceIds: [],
        onA11yReport: () => {},
        axeCoreIssues: [],
        ...overrides,
    };
}

export const A11yContext = React.createContext<A11yContextValue | null>(null);
