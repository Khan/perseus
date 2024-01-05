import {liteAdaptor} from "mathjax-full/js/adaptors/liteAdaptor";
import {STATE} from "mathjax-full/js/core/MathItem";
import {SerializedMmlVisitor} from "mathjax-full/js/core/MmlTree/SerializedMmlVisitor";
import {HTMLDocument} from "mathjax-full/js/handlers/html/HTMLDocument";
import {TeX} from "mathjax-full/js/input/tex";
// eslint-disable-next-line no-restricted-syntax
import {AllPackages} from "mathjax-full/js/input/tex/AllPackages.js";
import {setupEngine, toSpeech} from "speech-rule-engine/js/common/system";

import type {MmlNode} from "mathjax-full/js/core/MmlTree/MmlNode";

// Code from https://github.com/Speech-Rule-Engine/sre-latex/blob/main/tex2mml/tex2mml.js

//  Busproofs requires an output jax, which we aren't using
const packages = AllPackages.filter((name) => name !== "bussproofs");

//  Create the input jax
const tex = new TeX({packages: packages});

//  Create an HTML document using a LiteDocument and the input jax
const html = new HTMLDocument("", liteAdaptor(), {InputJax: tex});

//  Create a MathML serializer
const visitor = new SerializedMmlVisitor();
const toMathML = (node: MmlNode) => visitor.visitTree(node);

const tex2mml = (tex: string) => {
    return toMathML(html.convert(tex, {display: true, end: STATE.CONVERT}));
};

/**
 * Sets up the speech rule engine with given options.
 * @param options Options to pass to the speech rule engine.
 * @returns A promise that resolves when the speech rule engine is ready: a string containing the locale.
 */
export const setupSRE = async (
    options: Parameters<typeof setupEngine>[0],
): Promise<string> => await setupEngine(options);

/**
 * Converts TeX to speech using the speech rule engine.
 * This must be called after setupSRE.
 * @param tex The TeX to convert.
 * @returns The human-readable string.
 */
export const texToText = (tex: string) => toSpeech(tex2mml(tex));
