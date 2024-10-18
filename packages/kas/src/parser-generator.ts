#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
/* eslint-disable prettier/prettier */

const fs = require("fs");
const path = require("path");

const jison = require("jison");

const unitPrelude = "// this is a @gene" + "rated file\n\n";
const unitEpilogue = "\n\nexport const unitParser = parser;\n";

const unitParserInfile = path.resolve(__dirname, "unitvalue.jison");
const unitParserOutfile = path.resolve(
    __dirname,
    "__genfiles__",
    "unitparser.js",
);

const unitParserSource = fs.readFileSync(unitParserInfile);
const unitParser = new jison.Generator(unitParserSource.toString());
let generatedParser = unitParser.generate({moduleType: "js"});
// NOTE(jeresig): We need to comment out these two labels as they appear to be
// invalid ES5 (they also aren't referenced anywhere so this seems safe).
generatedParser = generatedParser.replace(/(_token_stack:)/g, "//$1");
fs.writeFileSync(
    unitParserOutfile,
    unitPrelude + generatedParser + unitEpilogue,
);
