export {libVersion} from "./version";

export {linterContextDefault} from "./proptypes";

export {default as Rule} from "./rule";
export {runLinter} from "./run-linter";
export {allRules as rules} from "./rules/all-rules";

export type {LinterWarning} from "./rule";
export type {LinterContextProps} from "./types";

export function pushContextStack(context: any, name: string): any {
    const stack = context.stack || [];
    return {
        ...context,
        stack: stack.concat(name),
    };
}

export {
    lintPerseusArticle,
    lintPerseusItem,
    lintPerseusRenderer,
    type LinterWarningItem,
} from "./lint-content";
