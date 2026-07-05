import * as React from "react";

import type {A11yIssue} from "./issues-panel";
import type {A11yReport} from "../preview/use-preview-controller";

export type A11yContextValue = {
    /** Activate highlight for an issue (null clears it). */
    setIssueHighlight: (issueId: string, previewId: string | null) => void;
    /** Whether the preview iframe's axe-core scan is enabled. */
    a11yEnabled: boolean;
    /** Enables/disables the preview iframe's axe-core scan. */
    setA11yEnabled: (enabled: boolean) => void;
    /** previewIds to highlight in the preview iframe, unioned across every
     * active "Show Me" toggle. */
    highlightPreviewIds: string[];
    /** Forwards the preview iframe's latest scan report to the owner. */
    onA11yReport: (report: A11yReport | null) => void;
    /** The latest scan's issues, for display in `IssuesPanel`. */
    axeCoreIssues: A11yIssue[];
};

/**
 * Builds an A11yContextValue, defaulting any field a caller doesn't
 * override to a production-safe no-op/empty value.
 */
export function createA11yContextValue(
    overrides: Partial<A11yContextValue> = {},
): A11yContextValue {
    return {
        setIssueHighlight: () => {},
        a11yEnabled: false,
        setA11yEnabled: () => {},
        highlightPreviewIds: [],
        onA11yReport: () => {},
        axeCoreIssues: [],
        ...overrides,
    };
}

export const A11yContext = React.createContext<A11yContextValue | null>(null);
