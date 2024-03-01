import {parse, compare} from "./kas/src";
import {init, Widgets, Renderer} from "./perseus/src";

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
}

export {
    init,
    Widgets,
    Renderer,
    parse as parseTex,
    compare as compareTex,
    GraphUtils,
};

export type {WidgetExports} from "./perseus/src";
