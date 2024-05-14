#!/usr/bin/env -S node -r @swc-node/register

import fs from "fs";
import path from "path";

import {createGenerator} from "ts-json-schema-generator";

import type {Config, SchemaGenerator} from "ts-json-schema-generator";

const RefNameExtractorRegex = /#\/definitions\/(?<name>.*)/;

const getRefDefinitionName = (ref: string) => {
    const match = ref.match(RefNameExtractorRegex);
    if (match) {
        return match.groups?.["name"];
    }
};

function derefSchema(schema: ReturnType<SchemaGenerator["createSchema"]>) {
    const derefIfRef = (level, key, obj) => {
        try {
            if (
                obj != null &&
                typeof obj === "object" &&
                !Array.isArray(obj) &&
                "$ref" in obj
            ) {
                const defName = getRefDefinitionName(obj["$ref"]);

                if (defName != null) {
                    return schema.definitions?.[defName];
                }
            }
        } catch (e) {
            console.log(key, obj);
            throw e;
        }
    };

    const processProps = (path: string[], props, level: number = 0) => {
        if (props == null) {
            return;
        }

        if (Array.isArray(props)) {
            for (let i = 0; i < props.length; i++) {
                const newPath = [...path, `[${i}]`];
                const refTarget = derefIfRef(level, i, props[i]);
                if (refTarget) {
                    props[i] = refTarget;
                }

                processProps(newPath, props[i], level + 1);
            }
        } else if (typeof props === "object") {
            for (const [key, val] of Object.entries(props)) {
                const newPath = [...path, key];
                const refTarget = derefIfRef(level, key, val);
                if (refTarget) {
                    props[key] = refTarget;
                }

                // Stop recursion of nested Renderers
                if (key === "widgets" && path.indexOf("widgets") !== -1) {
                    delete props[key];
                    continue;
                }
                processProps(newPath, props[key], level + 1);
            }
        }
    };

    processProps(["root"], schema.properties);
    processProps(["root"], schema.additionalProperties);

    return schema;
}

function generateSchema() {
    const config: Config = {
        schemaId: "https://khanacademy.org/schema/perseus.json",
        tsconfig: path.join(__dirname, "..", "tsconfig.json"),
        jsDoc: "extended",
        expose: "all",
        functions: "hide",
        encodeRefs: false,

        skipTypeCheck: true,
    };

    const generatedDir = path.join(__dirname, "generated");
    const rawSchemaPath = path.join(generatedDir, "schema-raw.json");
    const schemaPath = path.join(generatedDir, "schema.json");
    fs.mkdirSync(path.dirname(generatedDir), {recursive: true});

    console.log("Generating schema...");
    const schema = createGenerator(config).createSchema("PerseusItem");
    const perseusItem = schema.definitions?.["PerseusItem"];
    if (perseusItem == null) {
        throw new Error("Could not find PerseusItem type in defs!");
    }
    // Raise up the "PerseusItem" to the root
    schema.type = "object";
    for (const [name, val] of Object.entries(perseusItem)) {
        schema[name] = val;
    }

    const schemaString = JSON.stringify(schema, undefined, "  ");
    fs.writeFileSync(rawSchemaPath, schemaString);

    console.log("Dereferencing schema...");
    const dereferencedSchema = derefSchema(schema);
    fs.writeFileSync(
        schemaPath,
        JSON.stringify(dereferencedSchema, undefined, "  "),
    );
}

try {
    generateSchema();
} catch (e) {
    console.log("Script failed!!!");
    console.error(e);
    process.exit(1);
}
