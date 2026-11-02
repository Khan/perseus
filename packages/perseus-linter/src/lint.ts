import Rule from "./rule";

export interface LintOptions {
    location?: {start: number; end: number};
    metadata?: Record<string, any>;
}

/**
 * The type returned by the lint detection function passed to the Rule
 * constructor.
 */
export interface Lint extends LintOptions {
    message: string;
    severity: number;
    location?: {start: number; end: number};
    metadata?: Record<string, any>;
}

export function lintWarning(message: string, options?: LintOptions): Lint {
    return {
        message,
        // FIXME: move severity to this file to avoid circular imports
        severity: Rule.Severity.WARNING,
        ...options,
    };
}

export function lintError(message: string, options?: LintOptions): Lint {
    return {
        message,
        // FIXME: move severity to this file to avoid circular imports
        severity: Rule.Severity.ERROR,
        ...options,
    };
}

export function lintGuideline(message: string, options?: LintOptions): Lint {
    return {
        message,
        // FIXME: move severity to this file to avoid circular imports
        severity: Rule.Severity.GUIDELINE,
        ...options,
    };
}
