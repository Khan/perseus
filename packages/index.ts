// 為了使答案驗證跟均一舊版 perseus 行為一樣，我們從均一舊 code 搬來 old-kas 使用
import { KAS } from "./kas/src/old-kas";
import {init, Widgets, Renderer, Dependencies} from "./perseus/src";
import Interactive2 from "./perseus/src/interactive2";
import KhanUtils from "./perseus/src/util";
import KhanAnswerTypesUtils from "./perseus/src/util/answer-types";
import {similar} from "./perseus/src/util/geometry";
import GraphUtils from "./perseus/src/util/graphie";
import KhanMath from "./perseus/src/util/math";

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
    KhanMath: typeof KhanMath;
    Interactive2: typeof Interactive2;
    similarCoords: typeof similar;
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

const { parse, compare } = KAS;

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
    KhanMath,
    Interactive2,
    similar as similarCoords,
};

export type {WidgetExports} from "./perseus/src";
