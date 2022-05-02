#!/usr/bin/env node

/* TODO(charlie): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, comma-dangle, max-len, comma-spacing */

var fs = require("fs");
var path = require("path");
var jison = require("jison");

var grammar = {
    lex: {
        rules: [
            ["\\s+",                "/* skip whitespace */"],
            ["\\\\space",           "/* skip \\space */"],
            ["\\\\ ",               "/* skip '\\ ' */"],
            ["[0-9]+\\.?",          "return \"INT\""],
            ["([0-9]+)?\\.[0-9]+",  "return \"FLOAT\""],
            ["\\*\\*",              "return \"^\""],
            ["\\*",                 "return \"*\""],
            ["\\\\cdot|\u00b7",     "return \"*\""],
            ["\\\\times|\u00d7",    "return \"*\""],
            ["\\\\ast",             "return \"*\""],
            ["\\/",                 "return \"/\""],
            ["\\\\div|\u00F7",      "return \"/\""],
            ["-",                   "return \"-\""],
            ["\u2212",              "return \"-\""],    // minus
            ["\\+",                 "return \"+\""],
            ["\\^",                 "return \"^\""],
            ["\\(",                 "return \"(\""],
            ["\\)",                 "return \")\""],
            ["\\\\left\\(",         "return \"(\""],
            ["\\\\right\\)",        "return \")\""],
            ["\\[",                 "return \"[\""],
            ["\\]",                 "return \"]\""],
            ["\\{",                 "return \"{\""],
            ["\\}",                 "return \"}\""],
            ["\\\\left\\{",         "return \"{\""],
            ["\\\\right\\}",        "return \"}\""],
            ["_",                   "return \"_\""],
            ["\\|",                 "return \"|\""],
            ["\\\\left\\|",         "return \"LEFT|\""],
            ["\\\\right\\|",        "return \"RIGHT|\""],
            ["\\!",                 "return \"!\""],    // not yet interpreted
            ["<=|>=|<>|<|>|=",      "return \"SIGN\""],
            ["\\\\le",              "yytext = \"<=\"; return \"SIGN\""],
            ["\\\\ge",              "yytext = \">=\"; return \"SIGN\""],
            ["\\\\leq",             "yytext = \"<=\"; return \"SIGN\""],
            ["\\\\geq",             "yytext = \">=\"; return \"SIGN\""],
            ["=\\/=",               "yytext = \"<>\"; return \"SIGN\""],
            ["\\\\ne",              "yytext = \"<>\"; return \"SIGN\""],
            ["\\\\neq",             "yytext = \"<>\"; return \"SIGN\""],
            ["\u2260",              "yytext = \"<>\"; return \"SIGN\""],    // ne
            ["\u2264",              "yytext = \"<=\"; return \"SIGN\""],    // le
            ["\u2265",              "yytext = \">=\"; return \"SIGN\""],    // ge
            ["\\\\frac",            "return \"FRAC\""],
            ["\\\\dfrac",           "return \"FRAC\""],
            ["sqrt|\\\\sqrt",       "return \"sqrt\""],
            ["abs|\\\\abs",         "return \"abs\""],
            ["ln|\\\\ln",           "return \"ln\""],
            ["log|\\\\log",         "return \"log\""],
            ["sin|cos|tan",         "return \"TRIG\""],
            ["csc|sec|cot",         "return \"TRIG\""],
            ["sinh|cosh|tanh",      "return \"TRIG\""],
            ["csch|sech|coth",      "return \"TRIG\""],
            ["\\\\sin",             "yytext = \"sin\"; return \"TRIG\""],
            ["\\\\cos",             "yytext = \"cos\"; return \"TRIG\""],
            ["\\\\tan",             "yytext = \"tan\"; return \"TRIG\""],
            ["\\\\csc",             "yytext = \"csc\"; return \"TRIG\""],
            ["\\\\sec",             "yytext = \"sec\"; return \"TRIG\""],
            ["\\\\cot",             "yytext = \"cot\"; return \"TRIG\""],
            ["\\\\arcsin",          "yytext = \"arcsin\"; return \"TRIG\""],
            ["\\\\arccos",          "yytext = \"arccos\"; return \"TRIG\""],
            ["\\\\arctan",          "yytext = \"arctan\"; return \"TRIG\""],
            ["\\\\arccsc",          "yytext = \"arccsc\"; return \"TRIG\""],
            ["\\\\arcsec",          "yytext = \"arcsec\"; return \"TRIG\""],
            ["\\\\arccot",          "yytext = \"arccot\"; return \"TRIG\""],
            ["arcsin|arccos|arctan","return \"TRIGINV\""],
            ["arccsc|arcsec|arccot","return \"TRIGINV\""],
            ["\\\\sinh",            "yytext = \"sinh\"; return \"TRIG\""],
            ["\\\\cosh",            "yytext = \"cosh\"; return \"TRIG\""],
            ["\\\\tanh",            "yytext = \"tanh\"; return \"TRIG\""],
            ["\\\\csch",            "yytext = \"csch\"; return \"TRIG\""],
            ["\\\\sech",            "yytext = \"sech\"; return \"TRIG\""],
            ["\\\\coth",            "yytext = \"tanh\"; return \"TRIG\""],
            ["pi",                  "return \"CONST\""],
            ["\u03C0",              "yytext = \"pi\"; return \"CONST\""],   // pi
            ["\\\\pi",              "yytext = \"pi\"; return \"CONST\""],
            ["theta",               "return \"VAR\""],
            ["\u03B8",              "yytext = \"theta\"; return \"VAR\""],  // theta
            ["\\\\theta",           "yytext = \"theta\"; return \"VAR\""],
            ["phi",                 "return \"VAR\""],
            ["\u03C6",              "yytext = \"phi\"; return \"VAR\""],  // phi
            ["\\\\phi",             "yytext = \"phi\"; return \"VAR\""],
            ["[a-zA-Z]",            "return yy.symbolLexer(yytext)"],
            ["$",                   "return \"EOF\""],
            [".",                   "return \"INVALID\""]
        ],
        options: {
            flex: true              // pick longest matching token
        }
    },
    operators: [
        ["right", "|"],
        ["left", "+", "-"],
        ["left", "*", "/"],
        ["left", "UMINUS"],
        ["right", "^"]
    ],
    start: "equation",
    bnf: {
        "equation": [
            ["expression SIGN expression EOF", "return new yy.Eq($1, $2, $3);"],
            ["expression EOF", "return $1;"],
            ["EOF", "return new yy.Add([]);"]
        ],
        "expression": [
            ["additive", "$$ = $1;"]
        ],
        "additive": [
            ["additive + multiplicative", "$$ = yy.Add.createOrAppend($1, $3);"],
            ["additive - multiplicative", "$$ = yy.Add.createOrAppend($1, yy.Mul.handleNegative($3, \"subtract\"));"],
            ["multiplicative", "$$ = $1;", {prec: "+"}]
        ],
        "multiplicative": [
            // the second term in an implicit multiplication cannot be negative
            ["multiplicative triglog", "$$ = yy.Mul.fold(yy.Mul.createOrAppend($1, $2));"],
            ["multiplicative * negative", "$$ = yy.Mul.fold(yy.Mul.createOrAppend($1, $3));"],
            ["multiplicative / negative", "$$ = yy.Mul.fold(yy.Mul.handleDivide($1, $3));"],
            ["negative", "$$ = $1;"]
        ],
        "negative": [
            ["- negative", "$$ = yy.Mul.handleNegative($2);", {prec: "UMINUS"}],
            ["triglog", "$$ = $1;"]
        ],
        "trig": [
            ["TRIG", "$$ = [yytext];"]
        ],
        "trigfunc": [
            ["trig", "$$ = $1;"],
            ["trig ^ negative", "$$ = $1.concat($3);"],
            ["TRIGINV", "$$ = [yytext];"]
        ],
        "logbase": [
            ["ln", "$$ = yy.Log.natural();"],
            ["log", "$$ = yy.Log.common();"],
            ["log _ subscriptable", "$$ = $3;"]
        ],
        "triglog": [
            ["trigfunc negative", "$$ = yy.Trig.create($1, $2);"],
            ["logbase negative", "$$ = yy.Log.create($1, $2);"],
            ["power", "$$ = $1;"]
        ],
        "power": [
            ["primitive ^ negative", "$$ = new yy.Pow($1, $3);"],
            ["primitive", "$$ = $1;"]
        ],
        "variable": [
            ["VAR", "$$ = yytext;"]
        ],
        "subscriptable": [
            ["variable _ subscriptable", "$$ = new yy.Var($1, $3);"],
            ["variable", "$$ = new yy.Var($1);"],
            ["CONST", "$$ = new yy.Const(yytext.toLowerCase());"],
            ["INT", "$$ = yy.Int.create(Number(yytext));"],
            ["FLOAT", "$$ = yy.Float.create(Number(yytext));"],
            ["{ additive }", "$$ = $2.completeParse();"],
            ["( additive )", "$$ = $2.completeParse().addHint('parens');"] // this probably shouldn't be a hint...
        ],
        "function": [
            ["FUNC", "$$ = yytext;"]
        ],
        "invocation": [
            ["sqrt ( additive )", "$$ = yy.Pow.sqrt($3);"],
            ["sqrt { additive }", "$$ = yy.Pow.sqrt($3);"],
            ["sqrt [ additive ] { additive }", "$$ = new yy.Pow.nthroot($6, $3);"],
            ["abs ( additive )", "$$ = new yy.Abs($3);"],
            ["| additive |", "$$ = new yy.Abs($2);"],
            ["LEFT| additive RIGHT|", "$$ = new yy.Abs($2);"],
            ["function ( additive )", "$$ = new yy.Func($1, $3);"]
        ],
        "primitive": [
            ["subscriptable", "$$ = $1;"],
            ["invocation", "$$ = $1;"],
            ["FRAC { additive } { additive }", "$$ = yy.Mul.handleDivide($3, $6);"]
        ]
    }
};

var prelude = "// This is a @gene" + "rated file\n" +
              "var _, KAS = {};\n\n" +
              "if (typeof module === \"object\" && module.exports) {\n" +
              "    _ = require(\"underscore\");\n" +
              "    module.exports = KAS;\n" +
              "} else {\n" +
              "    _ = window._;\n" +
              "    window.KAS = KAS;\n" +
              "}\n\n" +
              "(function(KAS) {\n\n";
var parser = (new jison.Generator(grammar)).generate({moduleType: "js"});
// NOTE(jeresig): We need to comment out these two labels as they appear to be
// invalid ES5 (they also aren't referenced anywhere so this seems safe).
parser = parser.replace(/(_token_stack:)/g, "//$1");
var postlude = "\n\nKAS.parser = parser;\n})(KAS);";

fs.writeFileSync(path.resolve(__dirname, "parser.js"), prelude + parser + postlude);

var unitPrelude = "// this is a @gene" + "rated file\n" +
                  "(function(KAS) {\n\n";
var unitEpilogue = "\n\nKAS.unitParser = parser;\n" +
                   "})(KAS);";

var unitParserInfile = path.resolve(__dirname, "unitvalue.jison");
var unitParserOutfile = path.resolve(__dirname, "unitparser.js");

var unitParserSource = fs.readFileSync(unitParserInfile);
var unitParser = new jison.Generator(unitParserSource.toString());
var generatedParser = unitParser.generate({ moduleType: "js" });
// NOTE(jeresig): We need to comment out these two labels as they appear to be
// invalid ES5 (they also aren't referenced anywhere so this seems safe).
generatedParser = generatedParser.replace(/(_token_stack:)/g, "//$1");
fs.writeFileSync(unitParserOutfile,
                 unitPrelude + generatedParser + unitEpilogue);
