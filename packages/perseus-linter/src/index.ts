export {libVersion} from "./version";

export {linterContextDefault} from "./proptypes";

export {default as Rule} from "./rule";
export {type LinterWarning} from "./rule";
export {runLinter, allLintRules as rules} from "./run-linter";

export type {LinterContextProps} from "./types";

export function pushContextStack(context: any, name: string): any {
    const stack = context.stack || [];
    return {
        ...context,
        stack: stack.concat(name),
    };
}
