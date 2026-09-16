#!/usr/bin/env -S node -r @swc-node/register
import fs from "fs";
import path from "path";

import ts from "typescript";

import type {WidgetManifest} from "../packages/perseus-core/src/utils/widget-manifest";

const root = path.resolve(__dirname, "..");
const manifestDirectory = path.join(root, ".widget-manifests");
const generatedImportMarker = "/* widget-manifest import */";
const setupStart = "// widget-manifest setup: start";
const setupEnd = "// widget-manifest setup: end";
const deprecatedTypes = new Set([
    "lights-puzzle",
    "molecule-renderer",
    "passage",
    "passage-ref",
    "passage-ref-target",
    "reaction-diagram",
    "sequence",
    "simulator",
    "transformer",
    "unit-input",
]);
const ignoredTestTypes = new Set([
    "_gone_",
    "_missing_",
    "_second_",
    "_test-widget_",
    "invalid-widget",
    "mock-asset-loading-widget",
    "mock-widget",
    "unknown-widget",
]);

type Registration = {name: string; importPath: string};
type RegistrationMaps = {
    widgets: Map<string, Registration>;
    editors: Map<string, Registration>;
    core: Map<string, Registration>;
};

type TransformResult = {
    source: string;
    changed: boolean;
    unsupportedTypes: ReadonlyArray<string>;
};

const toCamelCase = (name: string): string =>
    name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());

const relativeImport = (fromFile: string, target: string): string => {
    const result = path
        .relative(path.dirname(fromFile), target)
        .replace(/\.(?:ts|tsx)$/, "")
        .replace(/\\/g, "/");
    return result.startsWith(".") ? result : `./${result}`;
};

function createRegistrationMaps(): RegistrationMaps {
    const widgets = new Map<string, Registration>();
    const core = new Map<string, Registration>();
    const editors = new Map<string, Registration>();

    for (const directory of fs.readdirSync(
        path.join(root, "packages/perseus/src/widgets"),
    )) {
        const indexPath = path.join(
            root,
            "packages/perseus/src/widgets",
            directory,
            "index.ts",
        );
        if (!fs.existsSync(indexPath)) {
            continue;
        }
        const source = fs.readFileSync(indexPath, "utf8");
        const match = source.match(
            /(?:export const\s+|export \{\s*)(\w+Registration)\b/,
        );
        if (!match) {
            continue;
        }
        const type =
            directory === "interactive-graphs"
                ? "interactive-graph"
                : directory;
        widgets.set(type, {
            name: match[1],
            importPath: `@khanacademy/perseus/widgets/${directory}`,
        });
    }

    for (const directory of fs.readdirSync(
        path.join(root, "packages/perseus-core/src/widgets"),
    )) {
        const indexPath = path.join(
            root,
            "packages/perseus-core/src/widgets",
            directory,
            "index.ts",
        );
        if (!fs.existsSync(indexPath)) {
            continue;
        }
        core.set(directory, {
            name: `${toCamelCase(directory)}Logic`,
            importPath: `@khanacademy/perseus-core/widgets/${directory}`,
        });
    }

    for (const directory of fs.readdirSync(
        path.join(root, "packages/perseus-editor/src/widgets"),
    )) {
        const indexPath = path.join(
            root,
            "packages/perseus-editor/src/widgets",
            directory,
            "index.ts",
        );
        if (!fs.existsSync(indexPath)) {
            continue;
        }
        const source = fs.readFileSync(indexPath, "utf8");
        const match = source.match(/export const (\w+EditorRegistration)\b/);
        if (!match) {
            continue;
        }
        editors.set(directory.replace(/-editor$/, ""), {
            name: match[1],
            importPath: indexPath.replace(/\/index\.ts$/, ""),
        });
    }

    return {widgets, core, editors};
}

function stripGeneratedBlocks(source: string, fileName: string): string {
    const removals: Array<[number, number]> = [];
    for (const statement of parseSource(source, fileName).statements) {
        if (!ts.isImportDeclaration(statement)) {
            continue;
        }
        const lineEnd = source.indexOf("\n", statement.end);
        const end = lineEnd === -1 ? source.length : lineEnd + 1;
        if (
            source
                .slice(statement.getStart(), end)
                .includes(generatedImportMarker)
        ) {
            removals.push([statement.getStart(), end]);
        }
    }
    let result = source;
    for (const [start, end] of removals.reverse()) {
        result = `${result.slice(0, start)}${result.slice(end)}`;
    }

    const setupBlock = new RegExp(
        `${setupStart}[\\s\\S]*?${setupEnd}\\n?`,
        "g",
    );
    return result
        .replace(setupBlock, "")
        .replace(/^beforeAll\(registerManifestWidgets\);\n?/gm, "");
}

function parseSource(source: string, fileName: string): ts.SourceFile {
    return ts.createSourceFile(
        fileName,
        source,
        ts.ScriptTarget.Latest,
        true,
        fileName.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
}

function getImportEnd(
    source: string,
    fileName: string,
    valuesOnly = false,
): number {
    let end = 0;
    for (const statement of parseSource(source, fileName).statements) {
        if (
            ts.isImportDeclaration(statement) &&
            (!valuesOnly || !statement.importClause?.isTypeOnly)
        ) {
            end = statement.end;
        }
    }
    return end;
}

function importedIdentifiers(source: string, fileName: string): Set<string> {
    const identifiers = new Set<string>();
    for (const statement of parseSource(source, fileName).statements) {
        if (!ts.isImportDeclaration(statement) || !statement.importClause) {
            continue;
        }
        const clause = statement.importClause;
        if (clause.name) {
            identifiers.add(clause.name.text);
        }
        const bindings = clause.namedBindings;
        if (bindings && ts.isNamespaceImport(bindings)) {
            identifiers.add(bindings.name.text);
        } else if (bindings) {
            for (const element of bindings.elements) {
                identifiers.add(element.name.text);
            }
        }
    }
    return identifiers;
}

function localizeImportPath(importPath: string, fileName: string): string {
    const perseusPrefix = "@khanacademy/perseus/widgets/";
    if (
        fileName.includes("/packages/perseus/") &&
        importPath.startsWith(perseusPrefix)
    ) {
        return relativeImport(
            fileName,
            path.join(
                root,
                "packages/perseus/src/widgets",
                importPath.slice(perseusPrefix.length),
            ),
        );
    }

    const corePrefix = "@khanacademy/perseus-core/widgets/";
    if (
        fileName.includes("/packages/perseus-core/") &&
        importPath.startsWith(corePrefix)
    ) {
        return relativeImport(
            fileName,
            path.join(
                root,
                "packages/perseus-core/src/widgets",
                importPath.slice(corePrefix.length),
            ),
        );
    }

    return importPath;
}

function importLines(
    registrations: ReadonlyArray<Registration>,
    fileName: string,
    defaultImports = false,
): Array<string> {
    return registrations.map(({name, importPath}) => {
        const localizedPath = localizeImportPath(importPath, fileName);
        return defaultImports
            ? `import ${name} from "${localizedPath}";`
            : `import {${name}} from "${localizedPath}";`;
    });
}

export function transformTestFile(
    originalSource: string,
    fileName: string,
    manifest: WidgetManifest,
    maps: RegistrationMaps = createRegistrationMaps(),
): TransformResult {
    if (
        !fileName.includes("/packages/") ||
        fileName.endsWith("/register-all-widgets-for-testing.test.ts")
    ) {
        return {source: originalSource, changed: false, unsupportedTypes: []};
    }

    const hadGeneratedBlock = originalSource.includes(setupStart);
    const replacesCoreInit =
        originalSource.includes("initPerseusCore()") &&
        !fileName.endsWith("/init.test.ts");
    const usedBroadRegistration =
        originalSource.includes("registerAllWidgetsForTesting") ||
        originalSource.includes("registerAllWidgetsAndEditorsForTesting") ||
        /["'](?:\.\.?\/)+testing\/test-dependencies["']/.test(originalSource) ||
        replacesCoreInit;
    const hasRecordedLookups =
        manifest.widgets.length > 0 ||
        manifest.editors.length > 0 ||
        manifest.coreWidgets.length > 0;
    const isRegistryInfrastructureTest =
        /\/(?:init|widgets|widgets-pre-registration|core-widget-registry|editor-registry|editor-registration|all-widget-registrations|register-all-widgets-for-testing)\.test\.tsx?$/.test(
            fileName,
        ) || fileName.endsWith("/widgets-subpath.test.ts");
    if (
        !hadGeneratedBlock &&
        !usedBroadRegistration &&
        (!hasRecordedLookups || isRegistryInfrastructureTest)
    ) {
        return {source: originalSource, changed: false, unsupportedTypes: []};
    }

    let source = stripGeneratedBlocks(originalSource, fileName);
    const existingImports = importedIdentifiers(source, fileName);
    const isCoreFile = fileName.includes("/packages/perseus-core/");
    const requestedWidgets = new Set(
        manifest.widgets.filter((type) => !ignoredTestTypes.has(type)),
    );
    const requestedEditors = new Set(
        manifest.editors.filter((type) => !ignoredTestTypes.has(type)),
    );
    const requestedCore = new Set(
        manifest.coreWidgets.filter((type) => !ignoredTestTypes.has(type)),
    );
    const usesDeprecatedType = [
        ...requestedWidgets,
        ...requestedEditors,
        ...requestedCore,
    ].some((type) => deprecatedTypes.has(type));

    for (const type of deprecatedTypes) {
        requestedWidgets.delete(type);
        requestedEditors.delete(type);
        requestedCore.delete(type);
    }
    if (usesDeprecatedType) {
        if (fileName.includes("/packages/perseus-editor/")) {
            requestedEditors.add("deprecated-standin");
        } else if (fileName.includes("/packages/perseus/")) {
            requestedWidgets.add("deprecated-standin");
        } else {
            requestedCore.add("deprecated-standin");
        }
    }
    if (isCoreFile) {
        requestedWidgets.clear();
        requestedEditors.clear();
    }

    const editorRegistrations = [...requestedEditors]
        .map((type) => maps.editors.get(type))
        .filter((value): value is Registration => value != null);
    const editorTypes = new Set(requestedEditors);
    const widgetRegistrations = [...requestedWidgets]
        .filter((type) => !editorTypes.has(type))
        .map((type) => maps.widgets.get(type))
        .filter((value): value is Registration => value != null);
    const coveredTypes = new Set([...requestedWidgets, ...requestedEditors]);
    const coreRegistrations = [...requestedCore]
        .filter((type) => !coveredTypes.has(type))
        .map((type) => maps.core.get(type))
        .filter((value): value is Registration => value != null);

    const unsupportedTypes = [
        ...[...requestedWidgets].filter((type) => !maps.widgets.has(type)),
        ...[...requestedEditors].filter((type) => !maps.editors.has(type)),
        ...[...requestedCore].filter(
            (type) => !coveredTypes.has(type) && !maps.core.has(type),
        ),
    ].sort();
    if (unsupportedTypes.length > 0) {
        return {source: originalSource, changed: false, unsupportedTypes};
    }

    source = source.replace(
        /(["'](?:\.\.?\/)+testing\/test-dependencies)(["'])/g,
        "$1-data$2",
    );
    source = source
        .replace(
            /^import \{registerAllWidgetsForTesting\} from ["'][^"']+register-all-widgets-for-testing["'];\n/gm,
            "",
        )
        .replace(
            /^import \{registerAllWidgetsAndEditorsForTesting\} from ["'][^"']+register-all-widgets-and-editors-for-testing["'];\n/gm,
            "",
        );
    if (replacesCoreInit) {
        source = source.replace(
            /^import \{initPerseusCore\} from ["'][^"']+init["'];\n/gm,
            "",
        );
    }

    const imports: Array<string> = [];
    const calls: Array<string> = [];
    if (coreRegistrations.length > 0) {
        imports.push(
            ...(existingImports.has("CoreWidgetRegistry")
                ? []
                : [
                      `import {CoreWidgetRegistry} from "${
                          isCoreFile
                              ? relativeImport(
                                    fileName,
                                    path.join(
                                        root,
                                        "packages/perseus-core/src/registry",
                                    ),
                                )
                              : "@khanacademy/perseus-core/registry"
                      }";`,
                  ]),
            ...importLines(
                coreRegistrations.filter(
                    ({name}) => !existingImports.has(name),
                ),
                fileName,
                true,
            ),
        );
        calls.push(
            `CoreWidgetRegistry.registerLogics([${coreRegistrations.map(({name}) => name).join(", ")}]);`,
        );
    }
    if (!isCoreFile && (widgetRegistrations.length > 0 || usesDeprecatedType)) {
        const registryImports = [
            ...(widgetRegistrations.length > 0 ? ["registerWidgets"] : []),
            ...(usesDeprecatedType ? ["replaceDeprecatedWidgets"] : []),
        ];
        const missingRegistryImports = registryImports.filter(
            (name) => !existingImports.has(name),
        );
        imports.push(
            ...(missingRegistryImports.length > 0
                ? [
                      `import {${missingRegistryImports.join(", ")}} from "${
                          fileName.includes("/packages/perseus/")
                              ? relativeImport(
                                    fileName,
                                    path.join(
                                        root,
                                        "packages/perseus/src/widgets.ts",
                                    ),
                                )
                              : "@khanacademy/perseus/widgets/registry"
                      }";`,
                  ]
                : []),
            ...importLines(
                widgetRegistrations.filter(
                    ({name}) => !existingImports.has(name),
                ),
                fileName,
            ),
        );
        if (widgetRegistrations.length > 0) {
            calls.push(
                `registerWidgets([${widgetRegistrations.map(({name}) => name).join(", ")}]);`,
            );
        }
    }
    if (editorRegistrations.length > 0) {
        const editorRegistryImports = [
            "registerEditors",
            ...(usesDeprecatedType ? ["replaceDeprecatedEditors"] : []),
        ].filter((name) => !existingImports.has(name));
        imports.push(
            ...(editorRegistryImports.length > 0
                ? [
                      `import {${editorRegistryImports.join(", ")}} from "${relativeImport(fileName, path.join(root, "packages/perseus-editor/src/editor-registry"))}";`,
                  ]
                : []),
            ...editorRegistrations
                .filter(({name}) => !existingImports.has(name))
                .map(
                    ({name, importPath}) =>
                        `import {${name}} from "${relativeImport(fileName, importPath)}";`,
                ),
        );
        calls.push(
            `registerEditors([${editorRegistrations.map(({name}) => name).join(", ")}]);`,
        );
    }
    if (usesDeprecatedType) {
        calls.push("replaceDeprecatedWidgets();");
        if (editorRegistrations.length > 0) {
            calls.push("replaceDeprecatedEditors();");
        } else if (widgetRegistrations.length === 0) {
            calls.push("CoreWidgetRegistry.replaceDeprecatedLogics();");
        }
    }

    source = source
        .replace(/^\s*registerAllWidgetsForTesting\(\);\n/gm, "")
        .replace(/^\s*registerAllWidgetsAndEditorsForTesting\(\);\n/gm, "")
        .replace(/^\s*initPerseusCore\(\);\n/gm, "");

    if (calls.length > 0) {
        const generatedImports = imports
            .map((line) => `${line.slice(0, -1)} ${generatedImportMarker};`)
            .join("\n");
        if (generatedImports) {
            const importEndOffset = getImportEnd(source, fileName, true);
            source = `${source.slice(0, importEndOffset)}\n${generatedImports}${source.slice(importEndOffset)}`;
        }

        const setup = `${setupStart}\nfunction registerManifestWidgets(): void {\n${calls
            .map((call) => `    ${call}`)
            .join("\n")}\n}\n${setupEnd}\n`;
        const setupOffset = getImportEnd(source, fileName);
        source = `${source.slice(0, setupOffset)}\n\n${setup}${source.slice(setupOffset).replace(/^\s*/, "")}`;

        source = source.replace(
            setupEnd,
            `registerManifestWidgets();\n${setupEnd}`,
        );
    }

    return {
        source,
        changed: source !== originalSource,
        unsupportedTypes: [],
    };
}

function run(): void {
    const write = process.argv.includes("--write");
    if (!fs.existsSync(manifestDirectory)) {
        throw new Error(`Manifest directory not found: ${manifestDirectory}`);
    }

    const manifestFiles: Array<string> = [];
    const visit = (directory: string): void => {
        for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
            const entryPath = path.join(directory, entry.name);
            if (entry.isDirectory()) {
                visit(entryPath);
            } else if (entry.name.endsWith(".json")) {
                manifestFiles.push(entryPath);
            }
        }
    };
    visit(manifestDirectory);

    let changed = 0;
    const unsupported: Array<string> = [];
    const maps = createRegistrationMaps();
    for (const manifestPath of manifestFiles.sort()) {
        const fileName = manifestPath.slice(
            manifestDirectory.length + 1,
            -".json".length,
        );
        const absoluteFileName = path.join(root, fileName);
        if (!fs.existsSync(absoluteFileName)) {
            continue;
        }
        const originalSource = fs.readFileSync(absoluteFileName, "utf8");
        const manifest: WidgetManifest = JSON.parse(
            fs.readFileSync(manifestPath, "utf8"),
        );
        const result = transformTestFile(
            originalSource,
            absoluteFileName,
            manifest,
            maps,
        );
        if (result.unsupportedTypes.length > 0) {
            unsupported.push(
                `${fileName}: ${result.unsupportedTypes.join(", ")}`,
            );
            continue;
        }
        if (result.changed) {
            changed++;
            if (write) {
                fs.writeFileSync(absoluteFileName, result.source);
            } else {
                console.log(fileName);
            }
        }
    }

    console.log(`${write ? "Updated" : "Would update"} ${changed} test files.`);
    if (unsupported.length > 0) {
        console.error(
            `Skipped unsupported widget types:\n${unsupported.join("\n")}`,
        );
        process.exitCode = 1;
    }
}

if (require.main === module) {
    run();
}
