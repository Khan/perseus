// run `node parser-generator.js` to get parser.js

var fs = require("fs");
var path = require("path");
var jison = require("jison");

var grammar = {
    lex: {
        rules: [
            ["\\s+",                "/* skip whitespace */"],
            ["[0-9]+\\.?([0-9]+)?", "return \"NUMBER\""],
            ["\\.[0-9]+",           "return \"NUMBER\""],
            ["\\*",                 "return \"*\""],
            ["\\/",                 "return \"/\""],
            ["-",                   "return \"-\""],
            ["\\+",                 "return \"+\""],
            ["\\^",                 "return \"^\""],
            ["\\(",                 "return \"(\""],
            ["\\)",                 "return \")\""],
            // ["sqrt",                "return \"FUNC\""],
            // ["ln",                  "return \"FUNC\""],
            // ["log",                 "return \"FUNC\""],
            // ["sin",                 "return \"FUNC\""],
            // ["cos",                 "return \"FUNC\""],
            // ["tan",                 "return \"FUNC\""],
            ["pi",                  "return \"CONST\""],
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
        ["right", "^"]
    ],
    start: "expression",
    bnf: {
        "expression": [
            ["additive EOF", "return $1;"],
            ["EOF", "return new yy.Add([]);"]
        ],
        "additive": [
            ["additive + negative", "$$ = yy.Add.createOrAppend($1, $3);"],
            ["additive - negative", "$$ = yy.Add.createOrAppend($1, yy.Mul.createOrPrepend(new yy.Neg(true), $3));"],
            ["negative", "$$ = $1;"]
        ],
        "negative": [
            ["- negative", "$$ = yy.Mul.createOrPrepend(new yy.Neg(), $2);"],
            ["multiplicative", "$$ = $1;"]
        ],
        "multiplicative": [
            ["multiplicative power", "$$ = yy.Mul.createOrAppend($1, $2);"],
            ["multiplicative * power", "$$ = yy.Mul.createOrAppend($1, $3);"],
            ["multiplicative / power", "$$ = yy.Mul.createOrAppend($1, new yy.Pow([$3, new yy.Inv()]));"],
            ["power", "$$ = $1;"]
        ],
        "power": [
            ["primitive ^ exponent", "$$ = new yy.Pow([$1, $3]);"],
            ["primitive", "$$ = $1;"]
        ],
        "exponent": [
            ["- exponent", "$$ = yy.Mul.createOrPrepend(new yy.Neg(), $2);"],
            ["power", "$$ = $1;"]
        ],
        "primitive": [
            ["CONST", "$$ = new yy.Const(yytext.toLowerCase());"],
            ["VAR", "$$ = new yy.Var(yytext);"],
            ["NUMBER", "$$ = new yy.Num(Number(yytext));"],
            ["( additive )", "$$ = $2;"]
        ]
    }
};

var prelude = "(function(Perseus) {\n\n";
var parser = (new jison.Parser(grammar)).generate({moduleType: "js"});
var postlude = "\n\nPerseus.ExpressionTools = {};\nPerseus.ExpressionTools.parser = parser;\n})(Perseus);";

fs.writeFileSync(path.resolve(__dirname, "parser.js"), prelude + parser + postlude);
