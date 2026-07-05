import * as React from "react";

export type HighlightContextValue = {
    /** Activate highlight for an issue (null clears it). */
    setIssueHighlight: (issueId: string, previewId: string | null) => void;
};

export const HighlightContext =
    React.createContext<HighlightContextValue | null>(null);
