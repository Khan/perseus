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
            ["\\/",                 "return \"/\""],
            ["-",                   "return \"-\""],
            ["\\+",                 "return \"+\""],
            ["\\^",                 "return \"^\""],
            ["\\(",                 "return \"(\""],
            ["\\)",                 "return \")\""],
            ["<=|>=|<>|<|>|=",      "return \"SIGN\""],
            ["=\\/=",               "yytext = \"<>\"; return \"SIGN\""],
            ["\\/=",                "yytext = \"<>\"; return \"SIGN\""],
            ["\\!=",                "yytext = \"<>\"; return \"SIGN\""],
            ["\u2260",              "yytext = \"<>\"; return \"SIGN\""],
            ["\u2264",              "yytext = \"<=\"; return \"SIGN\""],
            ["\u2265",              "yytext = \">=\"; return \"SIGN\""],
            // ["sqrt",                "return \"sqrt\""],
            // ["ln",                  "return \"LOG\""],
            // ["log",                 "return \"LOG\""],
            // ["sin",                 "return \"FUNC\""],
            // ["cos",                 "return \"FUNC\""],
            // ["tan",                 "return \"FUNC\""],
            // ["abs",                 "return \"FUNC\""],
            // ["\\|",                 "return \"ABS\""],
            // ["\\!",                 "return \"FACT\""],
            ["pi",                  "return \"CONST\""],
            ["\u03C0",              "yytext = \"pi\"; return \"CONST\""],
            ["e",                   "return \"CONST\""],
            ["[a-zA-Z]",            "return \"VAR\""],
            ["$",                   "return \"EOF\""],
            [".",                   "return \"INVALID\""]
        ],
        options: {
            flex: true              // pick longest matching token
        }
    },
    operators: [
        ["left", "+", "-"],
        ["left", "*", "/"],
        ["left", "UMINUS"],
        ["right", "^"]
    ],
    start: "equation",
    bnf: {
        "equation": [
            ["expression SIGN expression EOF", "return new yy.Eq([$1, $2, $3]);"],
            ["expression EOF", "return $1;"],
            ["EOF", "return new yy.Add([]);"]
        ],
        "expression": [
            ["additive", "$$ = $1;"]
        ],
        "additive": [
            ["additive + multiplicative", "$$ = yy.Add.createOrAppend($1, $3);"],
            ["additive - multiplicative", "$$ = yy.Add.createOrAppend($1, yy.Mul.handleNegative($3, \"subtract\"));"],
            ["multiplicative", "$$ = $1;"]
        ],
        "multiplicative": [
            // the second term in an implicit multiplication cannot be negative
            ["multiplicative power", "$$ = yy.Mul.fold(yy.Mul.createOrAppend($1, $2));"],
            ["multiplicative * negative", "$$ = yy.Mul.fold(yy.Mul.createOrAppend($1, $3));"],
            ["multiplicative / negative", "$$ = yy.Mul.fold(yy.Mul.handleDivide($1, $3));"],
            ["negative", "$$ = $1;"]
        ],
        "power": [
            ["primitive ^ negative", "$$ = new yy.Pow([$1, $3]);"],
            ["primitive", "$$ = $1;"]
        ],
        "negative": [
            ["- negative", "$$ = yy.Mul.handleNegative($2);", {prec: "UMINUS"}],
            ["power", "$$ = $1;"]
        ],
        "primitive": [
            ["CONST", "$$ = new yy.Const(yytext.toLowerCase());"],
            ["VAR", "$$ = new yy.Var(yytext);"],
            ["INT", "$$ = new yy.Int(Number(yytext));"],
            ["FLOAT", "$$ = new yy.Float(Number(yytext));"],
            // ["sqrt ( additive )", "$$ = yy.Pow.handleSqrt($3);"],
            ["( additive )", "$$ = $2;"]
        ]
    }
};

var prelude = "(function(Perseus) {\n\n";
var parser = (new jison.Parser(grammar)).generate({moduleType: "js"});
var postlude = "\n\nPerseus.ExpressionTools = {};\nPerseus.ExpressionTools.parser = parser;\n})(Perseus);";

fs.writeFileSync(path.resolve(__dirname, "parser.js"), prelude + parser + postlude);
