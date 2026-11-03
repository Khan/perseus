import ts from "typescript";

/**
 * Looks up declarations in perseus-core's TypeScript type definitions, so
 * tools can show agents the exact, documented shape of each widget's options
 * and user input.
 *
 * This only needs the syntax tree of each file, not a full type-checked
 * program, so it stays fast.
 */
export interface SchemaIndex {
    /** The full text of `data-schema.ts`. */
    dataSchemaText: string;
    /**
     * Every widget type the schema (and so the parser) knows, from the
     * members of the `PerseusWidgetTypes` interface.
     */
    widgetTypes(): string[];
    /** The definition of a widget's options, with its helper types. */
    widgetOptionsSource(widgetType: string): string | null;
    /** The definition of a widget's user input; null if it takes none. */
    userInputSource(widgetType: string): string | null;
}

type Declaration =
    | ts.TypeAliasDeclaration
    | ts.InterfaceDeclaration
    | ts.VariableStatement;

/** A parsed file's top-level declarations, by name. */
type Declarations = Map<string, Declaration>;

export function createSchemaIndex(texts: {
    dataSchema: string;
    validationTypes: string;
}): SchemaIndex {
    const dataSchema = parseDeclarations("data-schema.ts", texts.dataSchema);
    const validationTypes = parseDeclarations(
        "validation.types.ts",
        texts.validationTypes,
    );
    const optionsTypeNames = widgetOptionsTypeNames(dataSchema);
    const userInputTypeNames = interfaceMemberTypeNames(
        validationTypes.get("UserInputRegistry"),
    );

    return {
        dataSchemaText: texts.dataSchema,
        widgetTypes: () =>
            interfaceMemberNames(dataSchema.get("PerseusWidgetTypes")),
        widgetOptionsSource(widgetType) {
            const name = optionsTypeNames[widgetType];
            return name == null
                ? null
                : collectDeclarations(name, [dataSchema]);
        },
        userInputSource(widgetType) {
            const name = userInputTypeNames[widgetType];
            // User input types refer to data-schema types (e.g. graph
            // coordinates), so look in both files.
            return name == null
                ? null
                : collectDeclarations(name, [validationTypes, dataSchema]);
        },
    };
}

function parseDeclarations(fileName: string, text: string): Declarations {
    const sourceFile = ts.createSourceFile(
        fileName,
        text,
        ts.ScriptTarget.Latest,
        /* setParentNodes */ true,
    );
    const declarations: Declarations = new Map();
    for (const statement of sourceFile.statements) {
        if (
            ts.isTypeAliasDeclaration(statement) ||
            ts.isInterfaceDeclaration(statement)
        ) {
            declarations.set(statement.name.text, statement);
        } else if (ts.isVariableStatement(statement)) {
            // e.g. `export const PerseusExpressionAnswerFormConsidered = [...]`,
            // which some types are derived from.
            for (const declaration of statement.declarationList.declarations) {
                if (ts.isIdentifier(declaration.name)) {
                    declarations.set(declaration.name.text, statement);
                }
            }
        }
    }
    return declarations;
}

function propertySignatures(
    declaration: Declaration | undefined,
): ts.PropertySignature[] {
    if (declaration == null || !ts.isInterfaceDeclaration(declaration)) {
        return [];
    }
    return declaration.members.filter(
        (member): member is ts.PropertySignature =>
            ts.isPropertySignature(member) &&
            (ts.isIdentifier(member.name) || ts.isStringLiteral(member.name)),
    );
}

function memberName(member: ts.PropertySignature): string {
    return ts.isIdentifier(member.name) || ts.isStringLiteral(member.name)
        ? member.name.text
        : member.name.getText();
}

function interfaceMemberNames(declaration: Declaration | undefined): string[] {
    return propertySignatures(declaration).map(memberName);
}

/**
 * Maps each member of an interface such as `UserInputRegistry` to the name of
 * the type it's declared with. Widgets that take no input (image, video, …)
 * have no entry there, so they have none here.
 */
function interfaceMemberTypeNames(
    declaration: Declaration | undefined,
): Record<string, string> {
    const names: Record<string, string> = {};
    for (const member of propertySignatures(declaration)) {
        if (member.type != null && ts.isTypeReferenceNode(member.type)) {
            names[memberName(member)] = member.type.typeName.getText();
        }
    }
    return names;
}

/**
 * Maps each widget type to the name of its options type, from aliases like
 * `type RadioWidget = WidgetOptions<'radio', PerseusRadioWidgetOptions>`.
 */
function widgetOptionsTypeNames(
    declarations: Declarations,
): Record<string, string> {
    const names: Record<string, string> = {};
    for (const declaration of declarations.values()) {
        if (!ts.isTypeAliasDeclaration(declaration)) {
            continue;
        }
        const {type} = declaration;
        if (
            !ts.isTypeReferenceNode(type) ||
            type.typeName.getText() !== "WidgetOptions" ||
            type.typeArguments?.length !== 2
        ) {
            continue;
        }
        const [widgetType, optionsType] = type.typeArguments;
        if (
            ts.isLiteralTypeNode(widgetType) &&
            ts.isStringLiteral(widgetType.literal) &&
            ts.isTypeReferenceNode(optionsType)
        ) {
            names[widgetType.literal.text] = optionsType.typeName.getText();
        }
    }
    return names;
}

/** The names of the types and values a declaration refers to. */
function referencedNames(node: ts.Node): string[] {
    const names: string[] = [];
    const visit = (child: ts.Node) => {
        if (ts.isTypeReferenceNode(child)) {
            names.push(child.typeName.getText());
        } else if (ts.isTypeQueryNode(child)) {
            // `typeof PerseusExpressionAnswerFormConsidered`
            names.push(child.exprName.getText());
        } else if (ts.isExpressionWithTypeArguments(child)) {
            // `interface Foo extends Bar`
            names.push(child.expression.getText());
        }
        ts.forEachChild(child, visit);
    };
    ts.forEachChild(node, visit);
    return names;
}

/** A declaration's source text, including its doc comment. */
function declarationText(declaration: Declaration): string {
    const sourceFile = declaration.getSourceFile();
    const jsDoc = ts.getJSDocCommentsAndTags(declaration).find(ts.isJSDoc);
    const start =
        jsDoc?.getStart(sourceFile) ?? declaration.getStart(sourceFile);
    return sourceFile.text.slice(start, declaration.getEnd());
}

/**
 * Returns the declarations of `rootName` and of every type it refers to that's
 * declared in `searchIn`, so the result reads on its own.
 */
function collectDeclarations(
    rootName: string,
    searchIn: ReadonlyArray<Declarations>,
): string {
    const find = (name: string) =>
        searchIn
            .map((declarations) => declarations.get(name))
            .find((declaration) => declaration != null);

    const seen = new Set<string>();
    const out: string[] = [];
    const queue = [rootName];
    while (queue.length > 0) {
        const name = queue.shift()!;
        if (seen.has(name)) {
            continue;
        }
        seen.add(name);
        const declaration = find(name);
        if (declaration == null) {
            continue;
        }
        out.push(declarationText(declaration));
        queue.push(...referencedNames(declaration));
    }
    return out.join("\n\n");
}
