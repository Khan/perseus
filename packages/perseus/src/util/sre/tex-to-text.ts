import {liteAdaptor} from "mathjax-full/js/adaptors/liteAdaptor";
import {STATE} from "mathjax-full/js/core/MathItem";
import {SerializedMmlVisitor} from "mathjax-full/js/core/MmlTree/SerializedMmlVisitor";
import {HTMLDocument} from "mathjax-full/js/handlers/html/HTMLDocument";
import {TeX} from "mathjax-full/js/input/tex";
import {AllPackages} from "mathjax-full/js/input/tex/AllPackages";

import {toSpeech} from "./sre";

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
 * Converts TeX to speech using the speech rule engine.
 * Warning: This must be called after sre.setup.
 * @param tex The TeX to convert.
 * @returns The human-readable string.
 */
export const texToText = (tex: string) => toSpeech(tex2mml(tex));
