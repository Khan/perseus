const {exec} = require("child_process");
const fs = require("fs");
const path = require("path");

const {parse} = require("@babel/parser");

/**
 * Extracts style information from JS and Aphrodite objects and writes them to a
 *      CSS Modules (*.module.css) file.
 * @example
 *      node utils/extract-css.js <name-of-tsx-file>
 * @param {string} name-of-tsx-file Pathname of file to convert (from project root)
 * @return Writes a new file (name-of-tsx-file.module.css) with converted style information.
 *         Removes style information from the original TSX file.
 */

/*************
 * Constants *
 *************/
const fileToExtract = process.argv.length > 2 ? process.argv[2] : "";
const filePath = path.join(process.cwd(), fileToExtract);
const fileDirectory = path.dirname(filePath);
const fileNameParts = path.basename(filePath).split(".");
const archiveFile = process.argv.includes("--archive");
const archivedFileName = `${fileNameParts[0]}.OLD.${fileNameParts[1]}`;
const archivedFilePath = path.join(fileDirectory, archivedFileName);
const cssFileName = `${fileNameParts[0]}.module.css`;
const cssFilePath = path.join(fileDirectory, cssFileName);
const indentation = "    ";
const wbColorValues = {
    // from node_modules/@khanacademy/wonder-blocks-tokens/dist/css/index.css
    "#21242c": "--wb-semanticColor-core-foreground-neutral-strong",
    "#5f6167": "--wb-semanticColor-core-foreground-neutral-default",
    "#b8b9bb": "--wb-semanticColor-core-foreground-disabled-default",
    "#ffffff": "--wb-semanticColor-core-foreground-knockout-default",
};
const mediaQueries = {
    // from packages/perseus/src/styles/media-queries.ts
    xs: `@media screen and (max-width: 567px)`,
    sm: `@media screen and (min-width: 568px) and (max-width: 767px)`,
    md: `@media screen and (min-width: 768px) and (max-width: 1023px)`,
    lg: `@media screen and (min-width: 1024px) and (max-width: 1279px)`,
    xl: `@media screen and (min-width: 1280px)`,
    xsOrSmaller: `@media screen and (max-width: 567px)`,
    smOrSmaller: `@media screen and (max-width: 767px)`,
    mdOrSmaller: `@media screen and (max-width: 1023px)`,
    lgOrSmaller: `@media screen and (max-width: 1279px)`,
    smOrLarger: `@media screen and (min-width: 568px)`,
    mdOrLarger: `@media screen and (min-width: 768px})`,
    lgOrLarger: `@media screen and (min-width: 1024px)`,
    xlOrLarger: `@media screen and (min-width: 1280px)`,
};

/*****************
 * WIP Variables *
 *****************/
const codeBlocksToDelete = [];
const importedModules = {};

/********************
 * Helper Functions *
 ********************/
const isExportNamedDeclaration = (node) =>
    node.type === "ExportNamedDeclaration";
const isVariableDeclaration = (node) => node.type === "VariableDeclaration";

const camelToKabob = (camel) => {
    // Keeps consecutive capital letters together as a word
    // i.e. externalHREFLocation => external-href-location
    return camel.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};

const pxToRem = (px) => {
    return parseFloat(px) / 10;
};

const replacePxWithRem = (cssString) => {
    return cssString.replace(/(\d+)px/g, (match, p1) => {
        const remValue = pxToRem(parseFloat(p1));
        return `${remValue}rem`;
    });
};

const validFileExtensions = ["js", "jsx", "ts", "tsx"];
const getFilePath = (rawFilePath) => {
    let filePath = path.join(fileDirectory, rawFilePath);
    if (rawFilePath.startsWith("@")) {
        filePath = path.join(
            process.cwd(),
            "node_modules",
            rawFilePath,
            "dist",
            "index",
        );
    }
    if (!fs.existsSync(filePath)) {
        filePath = validFileExtensions.reduce(
            (matchedExtension, possibleExtension) => {
                if (matchedExtension) {
                    return matchedExtension;
                } else {
                    const possibleFilePath = `${filePath}.${possibleExtension}`;
                    return fs.existsSync(possibleFilePath)
                        ? possibleFilePath
                        : null;
                }
            },
            "",
        );
    }
    return filePath;
};

/****************
 * Code Parsing *
 ****************/

const getCode = (filePath) => {
    const code = fs.readFileSync(filePath, "utf8");
    const parsedCode = parse(code, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
    });
    return {code, parsedCode};
};

const mapVariables = (parsedCode) => {
    // Gather variable declarations, both regular and exported.
    const variableDeclarations = parsedCode.program.body
        .filter(isVariableDeclaration)
        .concat(
            parsedCode.program.body
                .filter(isExportNamedDeclaration)
                .map((node) => node.declaration),
        );

    return variableDeclarations
        .flatMap((node) => node.declarations)
        .filter(
            (node) =>
                node.init.type === "NumericLiteral" ||
                node.init.type === "StringLiteral" ||
                node.init.type === "ObjectExpression" ||
                node.init.type === "UnaryExpression", // UnaryExpression is used for negative numbers
        )
        .reduce((mappedVariables, node) => {
            if (node.init.type === "ObjectExpression") {
                const objectProperties = node.init.properties.reduce(
                    (allProperties, property) => {
                        if (property.type === "SpreadElement") {
                            const referencedObject =
                                mappedVariables[property.argument.name];
                            Object.assign(allProperties, referencedObject);
                        } else {
                            allProperties[property.key.name] =
                                property.value.value;
                        }
                        return allProperties;
                    },
                    {},
                );
                mappedVariables[node.id.name] = objectProperties;
            } else if (node.init.type === "UnaryExpression") {
                mappedVariables[node.id.name] =
                    `${node.init.operator}${node.init.argument.value}`;
            } else {
                mappedVariables[node.id.name] = node.init.value;
            }
            return mappedVariables;
        }, {});
};

// Archive the original file (if requested) in case something doesn't quite go right.
if (archiveFile && fs.existsSync(filePath)) {
    fs.copyFile(filePath, archivedFilePath, (error) => {
        if (error) {
            console.error(
                `Error while archiving ${fileNameParts.join(".")}: `,
                error,
            );
        }
    });
}

// Parse the code in order to extract and replace the CSS parts.
const {code, parsedCode} = getCode(filePath);

// Find the variables that have literal values (like numbers).
// Sometimes, the CSS settings reference these literal variables.
// In those cases, we need to reference the actual value of the variable in the CSS.
const literalVariables = {};
parsedCode.program.body
    .filter(isVariableDeclaration)
    .flatMap((node) => node.declarations)
    .filter(
        (node) =>
            node.init.type === "NumericLiteral" ||
            node.init.type === "StringLiteral" ||
            node.init.type === "UnaryExpression", // UnaryExpression is used for negative numbers
    )
    .forEach((node) => {
        if (node.init.type === "UnaryExpression") {
            literalVariables[node.id.name] =
                `${node.init.operator}${node.init.argument.value}`;
        } else {
            literalVariables[node.id.name] = node.init.value;
        }
    });

/**************************
 * CSS Parsing & Building *
 **************************/
let aphroditeDeclaration = null;

const associateCommentsToCssProperty = (property, index, allProperties) => {
    property.trailingComments = allProperties
        // Trailing Comments - comments at the end of a given line
        .flatMap((candidate) => candidate.trailingComments ?? [])
        .filter((comment) => {
            return comment.loc.start.line === property.line;
        })
        .concat(
            allProperties
                // Some trailing comments show up as "leading" comments
                .flatMap((candidate) => candidate.leadingComments ?? [])
                .filter((comment) => {
                    return comment.loc.start.line === property.line;
                }),
        );
    // Leading Comments - comments on their own line
    property.leadingComments = property.leadingComments.filter(
        (comment) =>
            !cssPropertyIsOnLine(allProperties, comment.loc.start.line),
    );
};

const convertToWbColor = (cssProperty, propertyValue) => {
    if (
        cssProperty === "color" &&
        Object.keys(wbColorValues).includes(propertyValue)
    ) {
        return `var(${wbColorValues[propertyValue]})`;
    }
    return propertyValue;
};

const cssPropertyIsOnLine = (allProperties, lineToCheck) => {
    return allProperties.some(
        (property) => property.key.loc.start.line === lineToCheck,
    );
};

const getClassName = (node) => {
    const camelCaseName = node.key?.name ?? node.id?.name;
    const kabobCaseName = camelToKabob(camelCaseName);
    let className = kabobCaseName;
    let nameVersion = 0;
    while (Object.keys(cssRules).includes(className)) {
        nameVersion++;
        className = `${kabobCaseName}-${nameVersion}`;
    }
    return className;
};

const getCssPropertyInfo = (property) => {
    const cssProperty =
        property.key.name ?? property.key.value ?? "unknownProperty";
    let cssPropertyName = camelToKabob(cssProperty);
    let nestedRuleSet = null;
    let propertyValue = property.value.value;
    switch (property.value.type) {
        case "Identifier":
            propertyValue = `${pxToRem(literalVariables[property.value.name])}rem`;
            break;
        case "BinaryExpression":
            propertyValue = getBinaryExpressionValue(property.value);
            break;
        case "MemberExpression":
            const expressionValue = getMemberExpressionValue(
                property.value.object.name,
                property.value.property.name,
            );
            if (
                isNaN(
                    expressionValue ||
                        cssProperty === "zIndex" ||
                        cssProperty === "opacity" ||
                        propertyValue === 0,
                )
            ) {
                propertyValue = expressionValue;
            } else {
                propertyValue = `${pxToRem(expressionValue)}rem`;
            }
            break;
        case "ObjectExpression":
            if (property.key.type === "MemberExpression") {
                cssPropertyName = `${property.key.object.name}.${property.key.property.name}`;
            }
            nestedRuleSet = getCssRuleSet(property.value.properties);
            if (nestedRuleSet.length === 0) {
                return null;
            }
            propertyValue = "";
            break;
        case "UnaryExpression":
            propertyValue = `${property.value.operator}${pxToRem(literalVariables[property.value.argument.name])}rem`;
            break;
        case "NumericLiteral":
            const convertToRem =
                cssProperty !== "zIndex" &&
                cssProperty !== "opacity" &&
                cssProperty !== "lineHeight" &&
                propertyValue !== 0;
            if (convertToRem) {
                propertyValue = `${pxToRem(propertyValue)}rem`;
            }
            break;
        case "TemplateLiteral":
            const literalParts = property.value.expressions
                .concat(property.value.quasis)
                .sort((a, b) => a.start - b.start);
            propertyValue = literalParts.reduce((builtString, part) => {
                switch (part.type) {
                    case "TemplateElement":
                        return `${builtString}${part.value.raw}`;
                    case "Identifier":
                        return `${builtString}${literalVariables[part.name]}`;
                    case "MemberExpression":
                        const referencedValue = getMemberExpressionValue(
                            part.object.name,
                            part.property.name,
                        );
                        return `${builtString}${referencedValue}`;
                }
            }, "");
            break;
    }

    propertyValue = replacePxWithRem(`${propertyValue}`);
    propertyValue = convertToWbColor(cssPropertyName, propertyValue);

    return {
        property: cssPropertyName,
        value: propertyValue,
        line: property.key.loc.start.line,
        leadingComments: property.leadingComments ?? [],
        trailingComments: [],
        nestedRuleSet,
    };
};

const getCssRuleSet = (properties) => {
    return properties
        .map((property, index, allPropertiesForClass) => {
            const cssProperty = getCssPropertyInfo(property);
            if (cssProperty) {
                associateCommentsToCssProperty(
                    cssProperty,
                    index,
                    allPropertiesForClass,
                );
            }
            return cssProperty;
        })
        .filter((property) => property !== null);
};

const getImportedValues = (sourceName) => {
    if (!Object.keys(importedModules).includes(sourceName)) {
        parsedCode.program.body
            .filter((node) => node.type === "ImportDeclaration")
            .filter((node) =>
                node.specifiers.some(
                    (specifier) => specifier.local.name === sourceName,
                ),
            )
            .forEach((node) => {
                const filePath = getFilePath(node.source.value);
                const {_, parsedCode} = getCode(filePath);
                const variablesFromCode = mapVariables(parsedCode);
                if (variablesFromCode[sourceName] === undefined) {
                    importedModules[sourceName] = variablesFromCode;
                } else {
                    importedModules[sourceName] = variablesFromCode[sourceName];
                }
            });
    }
    return importedModules[sourceName];
};

const getBinaryExpressionValue = (expressionNode) => {
    if (
        expressionNode.left.type === "StringLiteral" ||
        expressionNode.right.type === "StringLiteral"
    ) {
        return `${expressionNode.left.value}${expressionNode.right.value}`;
    } else {
        return `/* Unable to handle binary expression: ${expressionNode.left.type} ${expressionNode.operator} ${expressionNode.right.type}  */`;
    }
};

const getMemberExpressionValue = (objectName, variableName) => {
    const errorMessage = `/* ${objectName}.${variableName} is not defined */`;
    const importedValues = getImportedValues(objectName);
    if (importedValues === undefined) {
        return errorMessage;
    } else {
        const importedValue = importedValues[variableName];
        return importedValue !== undefined ? importedValue : errorMessage;
    }
};

const isStylesheetNode = (node) => {
    const isStyleSheet =
        node.init?.callee?.object?.name === "StyleSheet" &&
        node.init?.callee?.property?.name === "create";
    if (isStyleSheet && aphroditeDeclaration === null) {
        aphroditeDeclaration = node;
        codeBlocksToDelete.push(node);
    }
    return isStyleSheet;
};

const stringifyComments = (commentLines, indentationCount) => {
    const indent = indentation.repeat(indentationCount);
    const comments = commentLines?.map((line) => line.value.trim()) ?? [];
    return comments.length === 0
        ? ""
        : comments.length === 1
          ? `${indent}/* ${comments[0]} */${"\n"}`
          : `${indent}/*${"\n"}${indent}  ${comments.join("\n" + indent + "  ")}${"\n"}${indent}*/${"\n"}`;
};

const stringifyCssProperty = (cssProperty, indentationCount = 1) => {
    const property = `${indentation.repeat(indentationCount)}${cssProperty.property}: ${cssProperty.value};`;
    const trailingComments =
        cssProperty.trailingComments.length === 0
            ? ""
            : ` /* ${cssProperty.trailingComments.map((comment) => comment.value.trim()).join(" ")} */`;
    const leadingComments = stringifyComments(
        cssProperty.leadingComments,
        indentationCount + 1,
    );
    return `${leadingComments}${property}${trailingComments}${"\n"}`;
};

const stringifyCssRuleset = (selector, ruleset, indentationCount = 0) => {
    let stringifiedRuleset = ruleset
        .filter((property) => property.nestedRuleSet === null)
        .map((property) => stringifyCssProperty(property, indentationCount + 1))
        .join("");
    const nestedRulesets = ruleset.filter(
        (property) => property.nestedRuleSet !== null,
    );
    if (stringifiedRuleset.length !== 0) {
        const rulesetSelector = `${indentation.repeat(indentationCount)}${selector} {${"\n"}`;
        const rulesetEnd = `${indentation.repeat(indentationCount)}}${"\n"}`;
        stringifiedRuleset = `${rulesetSelector}${stringifiedRuleset}${rulesetEnd}`;
    }
    nestedRulesets.forEach((nestedRuleset) => {
        if (stringifiedRuleset.length !== 0) {
            stringifiedRuleset = `${stringifiedRuleset}${"\n"}`;
        }
        let nestedSelector = `${selector}${nestedRuleset.property}`;
        let mediaQueryWrapper = "";
        let mediaQueryWrapperEnd = "";
        if (nestedRuleset.property.startsWith("mediaQueries")) {
            nestedSelector = selector;
            mediaQueryWrapper = `${mediaQueries[nestedRuleset.property.slice(13)]} {${"\n"}`;
            mediaQueryWrapperEnd = `}${"\n"}`;
        }
        const stringifiedNestedRuleset = stringifyCssRuleset(
            nestedSelector,
            nestedRuleset.nestedRuleSet,
            indentationCount +
                (nestedRuleset.property.startsWith("mediaQueries") ? 1 : 0),
        );
        stringifiedRuleset = `${stringifiedRuleset}${mediaQueryWrapper}${stringifiedNestedRuleset}${mediaQueryWrapperEnd}`;
    });
    return stringifiedRuleset;
};

// Dive into the node tree of the parsed code to find the stylesheet declaration.
const cssRules = {};

// Aphrodite 'create' statement
parsedCode.program.body
    .filter(isVariableDeclaration)
    .flatMap((node) => node.declarations)
    .filter(isStylesheetNode) // Aphrodite declaration
    .flatMap((node) => node.init.arguments)
    .flatMap((node) => node.properties)
    .forEach((node) => {
        cssRules[getClassName(node)] = {
            comments: [],
            properties: node.value.properties,
        };
    });

// Objects within React class 'render' method that are passed to 'style' property
parsedCode.program.body
    .filter((node) => node.type === "ClassDeclaration")
    .flatMap((node) => node.body.body)
    .filter(
        (node) =>
            node.type === "ClassMethod" &&
            node.key.name.toLowerCase().includes("render"),
    )
    .flatMap((node) => node.body.body)
    .filter(isVariableDeclaration)
    .flatMap((node) => {
        return node.declarations.map((declaration) => {
            return {
                declaration,
                comments: node.leadingComments ?? [],
            };
        });
    })
    .filter((node) => node.declaration.id.name.toLowerCase().includes("style"))
    .forEach((node) => {
        cssRules[getClassName(node.declaration)] = {
            comments: node.comments,
            properties: node.declaration.init.properties,
        };
        codeBlocksToDelete.push(node.declaration);
    });

// Objects passed to 'style' property (outside of React class 'render')
parsedCode.program.body
    .filter(isVariableDeclaration)
    .flatMap((node) => {
        return node.declarations.map((declaration) => {
            return {
                declaration,
                comments: node.leadingComments ?? [],
            };
        });
    })
    .filter((node) => !isStylesheetNode(node.declaration))
    .filter((node) => node.declaration.id.name?.toLowerCase().includes("style"))
    .forEach((node) => {
        if (node.declaration.init.properties) {
            cssRules[getClassName(node.declaration)] = {
                comments: node.comments,
                properties: node.declaration.init.properties,
            };
        } else if (Array.isArray(node.declaration.init.expression.properties)) {
            node.declaration.init.expression.properties.forEach((node) => {
                cssRules[getClassName(node)] = {
                    comments: node.comments,
                    properties: node.value.properties,
                };
            });
        }
        codeBlocksToDelete.push(node.declaration);
    });

// Rebuild the CSS rules with regular CSS syntax (remove quotes, add semicolons, etc.).
const cssStringified = Object.keys(cssRules)
    .sort()
    .map((className) => {
        const comments = stringifyComments(cssRules[className].comments, 0);
        if (cssRules[className].properties === undefined) {
            console.log(`Unable to find CSS properties for class: `, className);
        }
        const ruleSet = getCssRuleSet(cssRules[className].properties);
        return `${comments}${stringifyCssRuleset(`.${className}`, ruleSet)}`;
    })
    .join("\n");

// Write the CSS to its own file.
fs.writeFileSync(cssFilePath, cssStringified);
exec(`git add ${cssFilePath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error}`);
        return;
    }
});

/*********************
 * Replace Aphrodite *
 *********************/
// Include any leading comments
Object.keys(cssRules).forEach((className) => {
    cssRules[className].comments?.forEach((comment) => {
        codeBlocksToDelete.push(comment);
    });
});

const cleanedCode = codeBlocksToDelete
    .sort((a, b) => b.start - a.start)
    .reduce((revisedCode, nodeToRemove) => {
        const precedingCode = revisedCode.substring(0, nodeToRemove.start);
        const precedingBreakIndex = precedingCode.lastIndexOf("\n"); // Helps to keep existing line indents
        const remainingCode = revisedCode
            .substring(nodeToRemove.end + 1)
            .replace(/^\n+/, ""); // remove leading lines
        return `${revisedCode.substring(0, precedingBreakIndex).trim()}${"\n\n"}${remainingCode}`;
    }, code);

let updatedCode = cleanedCode;
const aphroditeImport = parsedCode.program.body.filter(
    (node) =>
        node.type === "ImportDeclaration" && node.source.value === "aphrodite",
)[0];
if (aphroditeImport) {
    updatedCode = `${cleanedCode.substring(0, aphroditeImport.start - 1)}
import ${aphroditeDeclaration.id.name} from "./${cssFileName}";
${cleanedCode.substring(aphroditeImport.end).trim()}
`;
} else {
    const lastImport = parsedCode.program.body.filter(
        (node) => node.type === "ImportDeclaration",
    );
    if (lastImport.length > 0) {
        updatedCode = `${cleanedCode.substring(0, lastImport[lastImport.length - 1].end)}
import styles from "./${cssFileName}";

${cleanedCode.substring(lastImport[lastImport.length - 1].end).trim()}`;
    }
}

fs.writeFileSync(filePath, updatedCode);
