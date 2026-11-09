export interface LintOptions {
    /** Indices into the content string where the issue occurs */
    location?: {start: number; end: number};
    metadata?: Record<string, any>;
}

export const Severity = {
    ERROR: 1,
    WARNING: 2,
    GUIDELINE: 3,
};

/**
 * The type returned by the lint detection function passed to the Rule
 * constructor.
 */
export interface Lint extends LintOptions {
    message: string;
    severity: number;
}

export function linterWarning(message: string, options?: LintOptions): Lint {
    return {
        message,
        severity: Severity.WARNING,
        ...options,
    };
}

export function linterError(message: string, options?: LintOptions): Lint {
    return {
        message,
        severity: Severity.ERROR,
        ...options,
    };
}

export function linterGuideline(message: string, options?: LintOptions): Lint {
    return {
        message,
        severity: Severity.GUIDELINE,
        ...options,
    };
}
