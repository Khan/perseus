#!/usr/bin/env -S node -r @swc-node/register

import fs from "fs";
import path from "path";

import {createGenerator} from "ts-json-schema-generator";

import type {Config} from "ts-json-schema-generator";

const config: Config = {
    schemaId: "https://khanacademy.org/schema/perseus.json",
    tsconfig: path.join(__dirname, "..", "tsconfig.json"),
    jsDoc: "extended",

    // type: "PerseusItem",
};

const outputPath = path.join(__dirname, "generated/schema.json");
fs.mkdirSync(path.dirname(outputPath), {recursive: true});

const schema = createGenerator(config).createSchema("PerseusItem"); // config.type);
const schemaString = JSON.stringify(schema, null, 2);
fs.writeFile(outputPath, schemaString, (err) => {
    if (err) {
        throw err;
    }
});
