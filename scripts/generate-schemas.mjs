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
 * its concrete per-widget index signatures, then convert those to JSON Schema
 * `patternProperties`. Any generated schema that references PerseusWidgetsMap
 * is post-processed to swap in the correct definition and pull in all the
 * widget type definitions it needs.
 *
 * Usage: node scripts/generate-schemas.mjs
 */

import ts from "typescript";
import {createGenerator} from "ts-json-schema-generator";
import {mkdirSync, writeFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

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
const OUT_DIR = join(
    repoRoot,
    "packages/perseus-core/__genfiles__/schema",
);

// Top-level content types
const TOP_LEVEL_TYPES = [
    {typeName: "PerseusItem", outFile: "perseus-item.schema.json"},
    {typeName: "PerseusArticle", outFile: "perseus-article.schema.json"},
    {typeName: "PerseusRenderer", outFile: "perseus-renderer.schema.json"},
];

// Active widget options types (deprecated widgets are omitted — they share
// DeprecatedStandinWidget and carry no useful schema information)
const WIDGET_TYPES = [
    {widgetName: "categorizer", typeName: "PerseusCategorizerWidgetOptions"},
    {widgetName: "cs-program", typeName: "PerseusCSProgramWidgetOptions"},
    {widgetName: "definition", typeName: "PerseusDefinitionWidgetOptions"},
    {widgetName: "dropdown", typeName: "PerseusDropdownWidgetOptions"},
    {widgetName: "explanation", typeName: "PerseusExplanationWidgetOptions"},
    {widgetName: "expression", typeName: "PerseusExpressionWidgetOptions"},
    {widgetName: "free-response", typeName: "PerseusFreeResponseWidgetOptions"},
    {widgetName: "grapher", typeName: "PerseusGrapherWidgetOptions"},
    {widgetName: "graded-group", typeName: "PerseusGradedGroupWidgetOptions"},
    {
        widgetName: "graded-group-set",
        typeName: "PerseusGradedGroupSetWidgetOptions",
    },
    {widgetName: "group", typeName: "PerseusGroupWidgetOptions"},
    {widgetName: "iframe", typeName: "PerseusIFrameWidgetOptions"},
    {widgetName: "image", typeName: "PerseusImageWidgetOptions"},
    {widgetName: "input-number", typeName: "PerseusInputNumberWidgetOptions"},
    {widgetName: "interaction", typeName: "PerseusInteractionWidgetOptions"},
    {
        widgetName: "interactive-graph",
        typeName: "PerseusInteractiveGraphWidgetOptions",
    },
    {widgetName: "label-image", typeName: "PerseusLabelImageWidgetOptions"},
    {widgetName: "matcher", typeName: "PerseusMatcherWidgetOptions"},
    {widgetName: "matrix", typeName: "PerseusMatrixWidgetOptions"},
    {widgetName: "measurer", typeName: "PerseusMeasurerWidgetOptions"},
    {
        widgetName: "molecule-renderer",
        typeName: "PerseusMoleculeRendererWidgetOptions",
    },
    {widgetName: "number-line", typeName: "PerseusNumberLineWidgetOptions"},
    {widgetName: "numeric-input", typeName: "PerseusNumericInputWidgetOptions"},
    {widgetName: "orderer", typeName: "PerseusOrdererWidgetOptions"},
    {
        widgetName: "phet-simulation",
        typeName: "PerseusPhetSimulationWidgetOptions",
    },
    {widgetName: "plotter", typeName: "PerseusPlotterWidgetOptions"},
    {widgetName: "python-program", typeName: "PerseusPythonProgramWidgetOptions"},
    {widgetName: "radio", typeName: "PerseusRadioWidgetOptions"},
    {widgetName: "sorter", typeName: "PerseusSorterWidgetOptions"},
    {widgetName: "table", typeName: "PerseusTableWidgetOptions"},
    {widgetName: "video", typeName: "PerseusVideoWidgetOptions"},
];

// ─── PerseusWidgetsMap expansion via TypeScript compiler API ─────────────────

/**
 * Uses the TypeScript compiler API to expand PerseusWidgetsMap into its
 * concrete per-widget index signatures, then extracts the widget key prefix
 * (e.g. "categorizer") and value type name (e.g. "CategorizerWidget") from
 * each entry.
 *
 * @returns {Array<{keyPrefix: string, typeName: string}>}
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
                    if (!ts.isIndexSignatureDeclaration(member)) continue;

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
                    if (!ts.isIdentifier(valueNode.typeName)) continue;

                    entries.push({
                        // Trim trailing space: "categorizer " → "categorizer"
                        keyPrefix: keyNode.head.text.trimEnd(),
                        typeName: valueNode.typeName.text,
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
 * Converts a list of widget map entries into a JSON Schema `patternProperties`
 * definition for PerseusWidgetsMap.
 *
 * Each entry `{ keyPrefix: "categorizer", typeName: "CategorizerWidget" }`
 * becomes a pattern `"^categorizer \\d+$"` mapping to the widget's $ref.
 */
function buildWidgetsMapSchema(entries) {
    const patternProperties = {};
    for (const {keyPrefix, typeName} of entries) {
        // Escape any regex metacharacters in the widget name (e.g. hyphens are
        // safe outside character classes, but escape to be explicit)
        const escaped = keyPrefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        patternProperties[`^${escaped} \\d+$`] = {
            $ref: `#/definitions/${typeName}`,
        };
    }
    return {
        type: "object",
        description:
            'A map of widget IDs to widget data. Keys are of the form' +
            ' "{widget-type} {number}" (e.g. "radio 1", "interactive-graph 3").' +
            " The widget\u2019s `type` field is the real discriminant \u2014 not the key.",
        patternProperties,
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
    for (const {typeName} of entries) {
        if (seen.has(typeName)) continue;
        seen.add(typeName);
        try {
            const schema = generator.createSchema(typeName);
            Object.assign(allDefs, schema.definitions ?? {});
        } catch (e) {
            console.warn(
                `  Warning: could not generate schema for ${typeName}: ${e.message}`,
            );
        }
    }
    return allDefs;
}

/**
 * Post-processes a generated schema to fix the PerseusWidgetsMap definition:
 *   1. Replaces the broken MakeWidgetMap<PerseusWidgetTypes> definition with
 *      the correct patternProperties schema.
 *   2. Removes the unreachable MakeWidgetMap<...> stub.
 *   3. Merges in all widget type definitions (CategorizerWidget, etc.) so that
 *      the patternProperties $refs resolve within the schema.
 *
 * Is a no-op for schemas that don't reference PerseusWidgetsMap.
 */
function fixWidgetsMap(schema, widgetsMapSchema, widgetDefs) {
    const defs = schema.definitions;
    if (!defs || !("PerseusWidgetsMap" in defs)) return schema;

    // Replace PerseusWidgetsMap with the patternProperties schema, preserving
    // any description that the generator wrote
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

    const widgetsMapSchema = buildWidgetsMapSchema(widgetMapEntries);

    console.log("Creating ts-json-schema-generator program...");
    const generator = createSchemaGenerator();

    console.log("Generating widget wrapper type definitions for patternProperties...");
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
        writeSchema(schema, outPath);
        console.log("done");
        count++;
    }

    console.log("Generating widget schemas...");
    const widgetOutDir = join(OUT_DIR, "widgets");
    for (const {widgetName, typeName} of WIDGET_TYPES) {
        const outFile = `${widgetName}.schema.json`;
        const outPath = join(widgetOutDir, outFile);
        process.stdout.write(`  ${typeName} → widgets/${outFile} ... `);
        const schema = fixWidgetsMap(
            generator.createSchema(typeName),
            widgetsMapSchema,
            widgetDefs,
        );
        writeSchema(schema, outPath);
        console.log("done");
        count++;
    }

    console.log(`\nGenerated ${count} schema files in ${OUT_DIR}`);
}

main();
