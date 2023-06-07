import MathQuill from "mathquill";

import {MathQuillInterface, MathFieldConfig} from "./mathquill-types";

// We only need one MathQuill instance and that contains some
// MQ constants and the MathField constructor
export const mathQuillInstance = MathQuill.getInterface(
    2,
) as MathQuillInterface;

function createBaseConfig(): MathFieldConfig {
    return {
        // LaTeX commands that, when typed, are immediately replaced by the
        // appropriate symbol. This does not include ln, log, or any of the
        // trig functions; those are always interpreted as commands.
        autoCommands: "pi theta phi sqrt nthroot",

        // Pop the cursor out of super/subscripts on arithmetic operators
        // or (in)equalities.
        charsThatBreakOutOfSupSub: "+-*/=<>≠≤≥",

        // Prevent excessive super/subscripts or fractions from being
        // created without operands, e.g. when somebody holds down a key
        supSubsRequireOperand: true,

        // The name of this option is somewhat misleading, as tabbing in
        // MathQuill breaks you out of a nested context (fraction/script)
        // if you're in one, but moves focus to the next input if you're
        // not. Spaces (with this option enabled) are just ignored in the
        // latter case.
        //
        // TODO(alex): In order to allow inputting mixed numbers, we will
        // have to accept spaces in certain cases. The desired behavior is
        // still to escape nested contexts if currently in one, but to
        // insert a space if not (we don't expect mixed numbers in nested
        // contexts). We should also limit to one consecutive space.
        spaceBehavesLikeTab: true,
    };
}

/**
 * We wanted to accomplish two things:
 * 1. We wanted to centralize (as much as possible) MathQuill logic. So
 *    that we only need to import it and get an interface in one place.
 *    We wanted to have smart defaults for a MathField config and put them
 *    in an easy-to-maintain area.
 * 2. We recognize that not all use-cases are the same, so we wanted to make
 *    sure we could customize the MathField.
 * So I'm trying to closely follow the MathQuill pattern of (container, config),
 * but instead of an object config, it's an optional callback that takes
 * our shared base config, allows the consumer to extend or overwrite it, and
 * uses the possibly modified config to make a MathField. If no config is
 * provided, then just use the base config.
 */
export function createMathField(
    container: HTMLDivElement | HTMLSpanElement,
    configCallback?: (baseConfig: MathFieldConfig) => MathFieldConfig,
) {
    const baseConfig = createBaseConfig();
    const config = configCallback ? configCallback(baseConfig) : baseConfig;

    return mathQuillInstance.MathField(container, config);
}
