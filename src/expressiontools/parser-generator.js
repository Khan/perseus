// run `node parser-generator.js` to get parser.js

var fs = require("fs");
var path = require("path");
var jison = require("jison");

var grammar = {
    lex: {
        rules: [
            ["\\s+",                "/* skip whitespace */"],
            ["[0-9]+\\.?",          "return \"INT\""],
            ["([0-9]+)?\\.[0-9]+",  "return \"FLOAT\""],
            ["\\*\\*",              "return \"^\""],
            ["\\*",                 "return \"*\""],
            ["\u00b7",              "return \"*\""],    // cdot
            ["\u00d7",              "return \"*\""],    // times
            ["\\/",                 "return \"/\""],
            ["-",                   "return \"-\""],
            ["\\+",                 "return \"+\""],
            ["\\^",                 "return \"^\""],
            ["\\(",                 "return \"(\""],
            ["\\)",                 "return \")\""],
            ["_",                   "return \"_\""],
            ["\\|",                 "return \"|\""],
            ["\\!",                 "return \"!\""],
            ["<=|>=|<>|<|>|=",      "return \"SIGN\""],
            ["=\\/=",               "yytext = \"<>\"; return \"SIGN\""],
            ["\\/=",                "yytext = \"<>\"; return \"SIGN\""],
            ["\\!=",                "yytext = \"<>\"; return \"SIGN\""],
            ["\u2260",              "yytext = \"<>\"; return \"SIGN\""],    // ne
            ["\u2264",              "yytext = \"<=\"; return \"SIGN\""],    // le
            ["\u2265",              "yytext = \">=\"; return \"SIGN\""],    // ge
            ["sqrt",                "return \"sqrt\""],
            ["abs",                 "return \"abs\""],
            ["ln",                  "return \"ln\""],
            ["log",                 "return \"log\""],
            ["sin|cos|tan",         "return \"TRIG\""],
            ["csc|sec|cot",         "return \"TRIG\""],
            ["arcsin|arccos|arctan","return \"TRIGINV\""],
            ["arccsc|arcsec|arccot","return \"TRIGINV\""],
            ["pi",                  "return \"CONST\""],
            ["\u03C0",              "yytext = \"pi\"; return \"CONST\""],   // pi
            ["theta",               "return \"VAR\""],
            ["\u03B8",              "yytext = \"theta\"; return \"VAR\""],  // theta
            ["phi",                 "return \"VAR\""],
            ["\u03C6",              "yytext = \"phi\"; return \"VAR\""],  // phi
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
            ["TRIG", "$$ = [yytext];"],
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
            ["INT", "$$ = new yy.Int(Number(yytext));"],
            ["FLOAT", "$$ = new yy.Float(Number(yytext));"],
            ["( additive )", "$$ = $2.completeParse().addHint('parens');"] // this probably shouldn't be a hint...
        ],
        "function": [
            ["FUNC", "$$ = yytext;"]
        ],
        "invocation": [
            ["sqrt ( additive )", "$$ = yy.Pow.sqrt($3);"],
            ["abs ( additive )", "$$ = new yy.Abs($3);"],
            ["| additive |", "$$ = new yy.Abs($2);"],
            ["function ( additive )", "$$ = new yy.Func($1, $3);"]
        ],
        "primitive": [
            ["subscriptable", "$$ = $1;"],
            ["invocation", "$$ = $1;"]
        ]
    }
};

var prelude = "(function(Perseus) {\n\n";
var parser = (new jison.Parser(grammar)).generate({moduleType: "js"});
var postlude = "\n\nPerseus.ExpressionTools = {};\nPerseus.ExpressionTools.parser = parser;\n})(Perseus);";

fs.writeFileSync(path.resolve(__dirname, "parser.js"), prelude + parser + postlude);
