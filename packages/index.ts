import {parse, compare} from "./kas/src";
import {init, Widgets, Renderer, Dependencies} from "./perseus/src";
import KhanUtils from "./perseus/src/util";
import KhanAnswerTypesUtils from "./perseus/src/util/answer-types";
import GraphUtils from "./perseus/src/util/graphie";

export interface TexOptions {
    functions?: string[];
    simplify?: boolean;
    form?: boolean;
    times?: boolean;
}

export interface PerseusCore {
    init: typeof init;
    Widgets: typeof Widgets;
    Renderer: typeof Renderer;
    GraphUtils: typeof GraphUtils;
    KhanUtils: typeof KhanUtils;
    KhanAnswerTypesUtils: typeof KhanAnswerTypesUtils;
    parseTex: (
        tex: string,
        options?: TexOptions,
    ) => {
        parsed: boolean;
        expr: unknown;
        error?: string;
    };
    compareTex: (
        ans: unknown,
        solution: unknown,
        options?: TexOptions,
    ) => {equal: boolean; message: string};
    Dependencies: typeof Dependencies;
}

export {
    init,
    Widgets,
    Renderer,
    parse as parseTex,
    compare as compareTex,
    GraphUtils,
    Dependencies,
    KhanUtils,
    KhanAnswerTypesUtils,
};

export type {WidgetExports} from "./perseus/src";
