/**
 * Generates JSON Schema files from Perseus TypeScript types in data-schema.ts.
 *
 * Outputs to packages/perseus-core/__genfiles__/schema/:
 *   - perseus-item.schema.json
 *   - perseus-article.schema.json
 *   - perseus-renderer.schema.json
 *   - widgets/<widget-name>.schema.json  (one per active widget)
 *
 * PerseusWidgetsMap fix
 * ─────────────────────
 * The production type `PerseusWidgetsMap = MakeWidgetMap<PerseusWidgetTypes>`
 * uses a template literal mapped type that ts-json-schema-generator cannot
 * traverse, producing an empty object in the generated schema.
 *
 * Instead, we use the TypeScript compiler API (typeToTypeNode with
 * NodeBuilderFlags.NoTruncation | InTypeAlias) to expand PerseusWidgetsMap to
 * its concrete per-widget index signatures, then convert those to a JSON Schema
 * `additionalProperties` + `anyOf` union discriminated by the widget `type`
 * field. Any generated schema that references PerseusWidgetsMap is
 * post-processed to swap in the correct definition and pull in all the widget
 * type definitions it needs.
 *
 * Widget schema files
 * ───────────────────
 * Each widget file is generated from the full wrapper type (e.g.
 * `InteractiveGraphWidget`) rather than just the options bag. The options type
 * is kept as a `$ref` within the file (not inlined) so the file stays readable
 * while remaining self-contained. All other $refs are inlined.
 *
 * Usage: node scripts/generate-schemas.mjs
 */

import {mkdirSync, writeFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

import {createGenerator} from "ts-json-schema-generator";
import ts from "typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");

const DATA_SCHEMA_PATH = join(
    repoRoot,
    "packages/perseus-core/src/data-schema.ts",
);
const TSCONFIG_PATH = join(
    repoRoot,
    "packages/perseus-core/tsconfig-schema.json",
);
const OUT_DIR = join(repoRoot, "packages/perseus-core/__genfiles__/schema");

// Top-level content types
const TOP_LEVEL_TYPES = [
    {typeName: "PerseusItem", outFile: "perseus-item.schema.json"},
    {typeName: "PerseusArticle", outFile: "perseus-article.schema.json"},
    {typeName: "PerseusRenderer", outFile: "perseus-renderer.schema.json"},
];

// Active widget types. optionsTypeName is the options bag (e.g.
// PerseusInteractiveGraphWidgetOptions); the wrapper type (e.g.
// InteractiveGraphWidget) is resolved at runtime from the expanded
// PerseusWidgetsMap. Deprecated widgets are omitted — they share
// DeprecatedStandinWidget and carry no useful schema information.
const WIDGET_TYPES = [
    {
        widgetName: "categorizer",
        optionsTypeName: "PerseusCategorizerWidgetOptions",
    },
    {
        widgetName: "cs-program",
        optionsTypeName: "PerseusCSProgramWidgetOptions",
    },
    {
        widgetName: "definition",
        optionsTypeName: "PerseusDefinitionWidgetOptions",
    },
    {
        widgetName: "dropdown",
        optionsTypeName: "PerseusDropdownWidgetOptions",
    },
    {
        widgetName: "explanation",
        optionsTypeName: "PerseusExplanationWidgetOptions",
    },
    {
        widgetName: "expression",
        optionsTypeName: "PerseusExpressionWidgetOptions",
    },
    {
        widgetName: "free-response",
        optionsTypeName: "PerseusFreeResponseWidgetOptions",
    },
    {
        widgetName: "grapher",
        optionsTypeName: "PerseusGrapherWidgetOptions",
    },
    {
        widgetName: "graded-group",
        optionsTypeName: "PerseusGradedGroupWidgetOptions",
    },
    {
        widgetName: "graded-group-set",
        optionsTypeName: "PerseusGradedGroupSetWidgetOptions",
    },
    {
        widgetName: "group",
        optionsTypeName: "PerseusGroupWidgetOptions",
    },
    {
        widgetName: "iframe",
        optionsTypeName: "PerseusIFrameWidgetOptions",
    },
    {
        widgetName: "image",
        optionsTypeName: "PerseusImageWidgetOptions",
    },
    {
        widgetName: "input-number",
        optionsTypeName: "PerseusInputNumberWidgetOptions",
    },
    {
        widgetName: "interaction",
        optionsTypeName: "PerseusInteractionWidgetOptions",
    },
    {
        widgetName: "interactive-graph",
        optionsTypeName: "PerseusInteractiveGraphWidgetOptions",
    },
    {
        widgetName: "label-image",
        optionsTypeName: "PerseusLabelImageWidgetOptions",
    },
    {
        widgetName: "matcher",
        optionsTypeName: "PerseusMatcherWidgetOptions",
    },
    {
        widgetName: "matrix",
        optionsTypeName: "PerseusMatrixWidgetOptions",
    },
    {
        widgetName: "measurer",
        optionsTypeName: "PerseusMeasurerWidgetOptions",
    },
    {
        widgetName: "molecule-renderer",
        optionsTypeName: "PerseusMoleculeRendererWidgetOptions",
    },
    {
        widgetName: "number-line",
        optionsTypeName: "PerseusNumberLineWidgetOptions",
    },
    {
        widgetName: "numeric-input",
        optionsTypeName: "PerseusNumericInputWidgetOptions",
    },
    {
        widgetName: "orderer",
        optionsTypeName: "PerseusOrdererWidgetOptions",
    },
    {
        widgetName: "phet-simulation",
        optionsTypeName: "PerseusPhetSimulationWidgetOptions",
    },
    {
        widgetName: "plotter",
        optionsTypeName: "PerseusPlotterWidgetOptions",
    },
    {
        widgetName: "python-program",
        optionsTypeName: "PerseusPythonProgramWidgetOptions",
    },
    {
        widgetName: "radio",
        optionsTypeName: "PerseusRadioWidgetOptions",
    },
    {
        widgetName: "sorter",
        optionsTypeName: "PerseusSorterWidgetOptions",
    },
    {
        widgetName: "table",
        optionsTypeName: "PerseusTableWidgetOptions",
    },
    {
        widgetName: "video",
        optionsTypeName: "PerseusVideoWidgetOptions",
    },
];

// ─── PerseusWidgetsMap expansion via TypeScript compiler API ─────────────────

/**
 * Uses the TypeScript compiler API to expand PerseusWidgetsMap into its
 * concrete per-widget index signatures, then extracts the widget key prefix
 * (e.g. "categorizer") and wrapper type name (e.g. "CategorizerWidget") from
 * each entry.
 *
 * @returns {Array<{keyPrefix: string, wrapperTypeName: string}>}
 */
function expandWidgetsMap() {
    const program = ts.createProgram([DATA_SCHEMA_PATH], {
        strict: true,
        skipLibCheck: true,
        target: ts.ScriptTarget.ES2020,
    });
    const checker = program.getTypeChecker();
    const sourceFile = program.getSourceFile(DATA_SCHEMA_PATH);

    const entries = [];

    function visit(node) {
        if (
            ts.isTypeAliasDeclaration(node) &&
            node.name.text === "PerseusWidgetsMap"
        ) {
            const type = checker.getTypeAtLocation(node);
            const expanded = checker.typeToTypeNode(
                type,
                undefined,
                ts.NodeBuilderFlags.NoTruncation |
                    ts.NodeBuilderFlags.InTypeAlias,
            );

            // The expanded node is a TypeLiteralNode whose members are
            // IndexSignatureDeclarations of the form:
            //   [x: `categorizer ${number}`]: CategorizerWidget
            if (ts.isTypeLiteralNode(expanded)) {
                for (const member of expanded.members) {
                    if (!ts.isIndexSignatureDeclaration(member)) {
                        continue;
                    }

                    const keyNode = member.parameters[0]?.type;
                    const valueNode = member.type;

                    // Key: TemplateLiteralTypeNode — head.text is "categorizer "
                    if (!keyNode || !ts.isTemplateLiteralTypeNode(keyNode)) {
                        continue;
                    }
                    // Value: TypeReferenceNode — typeName.text is "CategorizerWidget"
                    if (!valueNode || !ts.isTypeReferenceNode(valueNode)) {
                        continue;
                    }
                    if (!ts.isIdentifier(valueNode.typeName)) {
                        continue;
                    }

                    entries.push({
                        // Trim trailing space: "categorizer " → "categorizer"
                        keyPrefix: keyNode.head.text.trimEnd(),
                        wrapperTypeName: valueNode.typeName.text,
                    });
                }
            }
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return entries;
}

/**
 * Converts a list of widget map entries into a JSON Schema
 * `additionalProperties` + `anyOf` definition for PerseusWidgetsMap.
 *
 * The widget key (e.g. "interactive-graph 1") is an opaque ID; the `type`
 * field inside each widget entry is the real discriminator.
 */
function buildWidgetsMapSchema(entries) {
    return {
        type: "object",
        description:
            "Maps widget IDs (e.g. 'interactive-graph 1') to widget entries. " +
            "The ID must match the [[☃ widget-id]] placeholder in the content field. " +
            "The 'type' field inside each entry is the discriminator — not the key.",
        additionalProperties: {
            anyOf: entries.map(({wrapperTypeName}) => ({
                $ref: `#/definitions/${wrapperTypeName}`,
            })),
        },
    };
}

/**
 * Generates JSON Schema definitions for all widget wrapper types referenced in
 * the expanded PerseusWidgetsMap (e.g. CategorizerWidget, RadioWidget, ...).
 * Returns a merged definitions object ready to be spread into any schema.
 */
function buildWidgetDefinitions(entries, generator) {
    const allDefs = {};
    const seen = new Set();
    for (const {wrapperTypeName} of entries) {
        if (seen.has(wrapperTypeName)) {
            continue;
        }
        seen.add(wrapperTypeName);
        try {
            const schema = generator.createSchema(wrapperTypeName);
            Object.assign(allDefs, schema.definitions ?? {});
        } catch (e) {
            console.warn(
                `  Warning: could not generate schema for ${wrapperTypeName}: ${e.message}`,
            );
        }
    }
    return allDefs;
}

/**
 * Post-processes a generated schema to fix the PerseusWidgetsMap definition:
 *   1. Replaces the broken MakeWidgetMap<PerseusWidgetTypes> definition with
 *      the correct additionalProperties/anyOf schema.
 *   2. Removes the unreachable MakeWidgetMap<...> stub.
 *   3. Merges in all widget type definitions (CategorizerWidget, etc.) so that
 *      the anyOf $refs resolve within the schema.
 *
 * Is a no-op for schemas that don't reference PerseusWidgetsMap.
 */
function fixWidgetsMap(schema, widgetsMapSchema, widgetDefs) {
    const defs = schema.definitions;
    if (!defs || !("PerseusWidgetsMap" in defs)) {
        return schema;
    }

    // Replace PerseusWidgetsMap with the anyOf schema, preserving any
    // description that the generator wrote
    const existing = defs["PerseusWidgetsMap"];
    defs["PerseusWidgetsMap"] = {
        ...widgetsMapSchema,
        ...(existing.description ? {description: existing.description} : {}),
    };

    // Merge in widget type definitions, but don't overwrite anything the
    // generator already resolved correctly
    for (const [key, def] of Object.entries(widgetDefs)) {
        if (!(key in defs)) {
            defs[key] = def;
        }
    }

    // Remove MakeWidgetMap stubs — do this after merging so any copies
    // introduced via widgetDefs are also cleaned up
    for (const key of Object.keys(defs)) {
        if (key.startsWith("MakeWidgetMap")) {
            delete defs[key];
        }
    }

    return schema;
}

// ─── $ref inlining ───────────────────────────────────────────────────────────

/**
 * Inlines all $ref chains in a JSON Schema, producing a flat schema with no
 * reference indirection. Designed for LLM consumption where following $ref
 * chains is a cognitive burden.
 *
 * Circular references are detected via an expansion stack and kept as $ref to
 * break the cycle. Any definitions still needed for circular refs are retained
 * in the output; all others are dropped.
 */
function inlineRefs(schema) {
    return inlineRefsExcept(schema, new Set());
}

/**
 * Inlines all $ref chains except those whose target name is in `keepRefs`.
 * Kept refs remain as `$ref` and their definitions are preserved in the output.
 *
 * Useful for widget schema files: inline everything except the options type so
 * the file remains readable (the options definition lives in `definitions`).
 *
 * @param {object} schema
 * @param {Set<string>} keepRefs - definition names to keep as $ref
 */
function inlineRefsExcept(schema, keepRefs) {
    const defs = schema.definitions ?? {};
    const retainedRefs = new Set(keepRefs);

    function decodeRef(ref) {
        // "$ref": "#/definitions/Foo%3CBar%3E" → "Foo<Bar>"
        return decodeURIComponent(ref.replace("#/definitions/", ""));
    }

    function inline(node, stack) {
        if (node === null || typeof node !== "object") {
            return node;
        }
        if (Array.isArray(node)) {
            return node.map((n) => inline(n, stack));
        }

        if ("$ref" in node && typeof node.$ref === "string") {
            const name = decodeRef(node.$ref);

            // Explicitly kept refs stay as-is
            if (keepRefs.has(name)) {
                retainedRefs.add(name);
                return node;
            }

            if (stack.has(name)) {
                // Circular: keep the $ref to break the cycle
                retainedRefs.add(name);
                return node;
            }

            const def = defs[name];
            if (!def) {
                // Unknown ref — keep as-is
                retainedRefs.add(name);
                return node;
            }

            // Any siblings alongside $ref (e.g. a description annotation)
            // are merged on top of the inlined definition
            const siblings = Object.fromEntries(
                Object.entries(node).filter(([k]) => k !== "$ref"),
            );
            const expanded = inline(def, new Set([...stack, name]));
            return Object.keys(siblings).length
                ? {...expanded, ...siblings}
                : expanded;
        }

        return Object.fromEntries(
            Object.entries(node)
                // Drop the definitions block — it will be rebuilt below if needed
                .filter(([k]) => k !== "definitions")
                .map(([k, v]) => [k, inline(v, stack)]),
        );
    }

    const result = inline(schema, new Set());

    // Re-attach only the definitions that are still referenced
    if (retainedRefs.size > 0) {
        result.definitions = {};
        for (const name of retainedRefs) {
            if (defs[name]) {
                // Inline within the retained definition too, seeding the stack
                // with its own name so it doesn't recurse into itself
                result.definitions[name] = inline(defs[name], new Set([name]));
            }
        }
    }

    return result;
}

// ─── Widget schema helpers ────────────────────────────────────────────────────

/**
 * Generates a schema for a widget from its full wrapper type (e.g.
 * InteractiveGraphWidget), keeping the options type as a $ref rather than
 * inlining it. All other $refs are inlined.
 */
function generateWidgetSchema(generator, wrapperTypeName, optionsTypeName) {
    const schema = generator.createSchema(wrapperTypeName);
    return inlineRefsExcept(schema, new Set([optionsTypeName]));
}

/**
 * Removes deprecated field names from the `required` array of a named type
 * definition within a schema (or the schema root if the type is not in
 * definitions).
 */
function removeDeprecatedRequired(schema, typeName, fieldsToRemove) {
    const target = schema.definitions?.[typeName] ?? schema;
    if (Array.isArray(target.required)) {
        target.required = target.required.filter(
            (f) => !fieldsToRemove.includes(f),
        );
    }
    return schema;
}

// ─── Schema generation ───────────────────────────────────────────────────────

function createSchemaGenerator() {
    return createGenerator({
        path: DATA_SCHEMA_PATH,
        tsconfig: TSCONFIG_PATH,
        // Include all exported types so the generator can resolve references
        type: "*",
        // Emit JSDoc descriptions into the schema
        jsDoc: "extended",
        // Use $ref for the root type so the schema is self-contained
        topRef: true,
        // Skip TypeScript type checking for speed (types are already checked by tsc)
        skipTypeCheck: true,
        // Only expose exported types
        expose: "export",
    });
}

function writeSchema(schema, outPath) {
    mkdirSync(dirname(outPath), {recursive: true});
    writeFileSync(outPath, JSON.stringify(schema, null, 2) + "\n");
}

function main() {
    console.log("Expanding PerseusWidgetsMap via TypeScript compiler API...");
    const widgetMapEntries = expandWidgetsMap();
    console.log(`  Found ${widgetMapEntries.length} widget map entries.`);

    // Build a lookup from widgetName → wrapperTypeName
    const wrapperTypeByWidgetName = new Map(
        widgetMapEntries.map(({keyPrefix, wrapperTypeName}) => [
            keyPrefix,
            wrapperTypeName,
        ]),
    );

    const widgetsMapSchema = buildWidgetsMapSchema(widgetMapEntries);

    console.log("Creating ts-json-schema-generator program...");
    const generator = createSchemaGenerator();

    console.log(
        "Generating widget wrapper type definitions for anyOf entries...",
    );
    const widgetDefs = buildWidgetDefinitions(widgetMapEntries, generator);
    console.log(`  Collected ${Object.keys(widgetDefs).length} definitions.`);

    let count = 0;

    console.log("Generating top-level schemas...");
    for (const {typeName, outFile} of TOP_LEVEL_TYPES) {
        const outPath = join(OUT_DIR, outFile);
        process.stdout.write(`  ${typeName} → ${outFile} ... `);
        const schema = fixWidgetsMap(
            generator.createSchema(typeName),
            widgetsMapSchema,
            widgetDefs,
        );
        writeSchema(inlineRefs(schema), outPath);
        console.log("done");
        count++;
    }

    console.log("Generating widget schemas...");
    const widgetOutDir = join(OUT_DIR, "widgets");
    for (const {widgetName, optionsTypeName} of WIDGET_TYPES) {
        const outFile = `${widgetName}.schema.json`;
        const outPath = join(widgetOutDir, outFile);
        const wrapperTypeName = wrapperTypeByWidgetName.get(widgetName);

        if (!wrapperTypeName) {
            console.warn(
                `  Warning: no wrapper type found for widget "${widgetName}", skipping.`,
            );
            continue;
        }

        process.stdout.write(
            `  ${wrapperTypeName} → widgets/${outFile} ... `,
        );
        let schema = generateWidgetSchema(
            generator,
            wrapperTypeName,
            optionsTypeName,
        );

        // Remove deprecated fields from required arrays
        if (widgetName === "plotter") {
            schema = removeDeprecatedRequired(schema, optionsTypeName, [
                "plotDimensions",
                "picSize",
                "picBoxHeight",
            ]);
        }

        writeSchema(schema, outPath);
        console.log("done");
        count++;
    }

    console.log(`\nGenerated ${count} schema files in ${OUT_DIR}`);
}

main();
