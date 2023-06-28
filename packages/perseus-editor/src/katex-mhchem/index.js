/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  KaTeX mhchem.js
 *
 *  This file implements a KaTeX version of mhchem version 3.3.0.
 *  It is adapted from MathJax/extensions/TeX/mhchem.js
 *  It differs from the MathJax version as follows:
 *    1. The interface is changed so that it can be called from KaTeX, not MathJax.
 *    2. \rlap and \llap are replaced with \mathrlap and \mathllap.
 *    3. Four lines of code are edited in order to use \raisebox instead of \raise.
 *    4. The reaction arrow code is simplified. All reaction arrows are rendered
 *       using KaTeX extensible arrows instead of building non-extensible arrows.
 *    5. \tripledash vertical alignment is slightly adjusted.
 *
 *    This code, as other KaTeX code, is released under the MIT license.
 *
 * /*************************************************************
 *
 *  MathJax/extensions/TeX/mhchem.js
 *
 *  Implements the \ce command for handling chemical formulas
 *  from the mhchem LaTeX package.
 *
 *  ---------------------------------------------------------------------
 *
 *  Copyright (c) 2011-2015 The MathJax Consortium
 *  Copyright (c) 2015-2018 Martin Hensel
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

//
// Coding Style
//   - use '' for identifiers that can by minified/uglified
//   - use "" for strings that need to stay untouched

// version: "3.3.0" for MathJax and KaTeX

import katex from "katex";

import {chemParse} from "./parser";

// Add \ce, \pu, and \tripledash to the KaTeX macros.

katex.__defineMacro("\\ce", function (context) {
    return chemParse(context.consumeArgs(1)[0], "ce");
});

katex.__defineMacro("\\pu", function (context) {
    return chemParse(context.consumeArgs(1)[0], "pu");
});

//  Needed for \bond for the ~ forms
//  Raise by 2.56mu, not 2mu. We're raising a hyphen-minus, U+002D, not
//  a mathematical minus, U+2212. So we need that extra 0.56.
katex.__defineMacro(
    "\\tripledash",
    "{\\vphantom{-}\\raisebox{2.56mu}{$\\mkern2mu" +
        "\\tiny\\text{-}\\mkern1mu\\text{-}\\mkern1mu\\text{-}\\mkern2mu$}}",
);
