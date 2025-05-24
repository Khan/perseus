const fs = require("fs");
const path = require("path");

const {parse} = require("@babel/parser");

/*************
 * Constants *
 *************/
const fileToExtract = process.argv.length > 2 ? process.argv[2] : "";
const filePath = path.join(process.cwd(), fileToExtract);
const fileDirectory = path.dirname(filePath);
const fileNameParts = path.basename(filePath).split(".");
const archivedFileName = `${fileNameParts[0]}.OLD.${fileNameParts[1]}`;
const archivedFilePath = path.join(fileDirectory, archivedFileName);
const cssFileName = `${fileNameParts[0]}.module.css`;
const cssFilePath = path.join(fileDirectory, cssFileName);
const indentation = "    ";

/*****************
 * WIP Variables *
 *****************/
const codeBlocksToDelete = [];
const importedModules = {};

/********************
 * Helper Functions *
 ********************/
const isExportNamedDeclaration = (node) => node.type === "ExportNamedDeclaration";
const isVariableDeclaration = (node) => node.type === "VariableDeclaration";

const camelToKabob = (camel) => {
    // Keeps consecutive capital letters together as a word
    // i.e. externalHREFLocation => external-href-location
    return camel.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};

const pxToRem = (px) => {
    return parseFloat(px) / 10;
};

const validFileExtensions = ["js", "jsx", "ts", "tsx"];
const getFilePath = (rawFilePath) => {
    let filePath = path.join(fileDirectory, rawFilePath);
    if (!fs.existsSync(filePath)) {
        filePath = validFileExtensions.reduce((matchedExtension, possibleExtension) => {
            if (matchedExtension) {
                return matchedExtension;
            } else {
                const possibleFilePath = path.join(fileDirectory, `${rawFilePath}.${possibleExtension}`);
                return fs.existsSync(possibleFilePath) ? possibleFilePath : null;
            }
        }, "");
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
        .concat(parsedCode.program.body
            .filter(isExportNamedDeclaration)
            .map(node => node.declaration));
    // console.log(`Declarations: `, variableDeclarations);
    return variableDeclarations
        .flatMap((node) => node.declarations)
        .filter((node) => node.init.type === "NumericLiteral" || node.init.type === "StringLiteral")
        .reduce((mappedVariables, node) => {
            mappedVariables[node.id.name] = node.init.value;
            return mappedVariables;
        }, {});
}

// Archive the original file in case something doesn't quite go right.
fs.copyFile(filePath, archivedFilePath, (error) => {
    if (error) {
        console.error(
            `Error while archiving ${fileNameParts.join(".")}: `,
            error,
        );
    }
});

// Parse the code in order to extract and replace the CSS parts.
const {code, parsedCode} = getCode(filePath);

// Find the variables that have literal values (like numbers).
// Sometimes, the CSS settings reference these literal variables.
// In those cases, we need to reference the actual value of the variable in the CSS.
const literalVariables = {};
parsedCode.program.body
    .filter(isVariableDeclaration)
    .flatMap((node) => node.declarations)
    .filter((node) => node.init.type === "NumericLiteral" || node.init.type === "StringLiteral")
    .forEach((node) => {
        literalVariables[node.id.name] = node.init.value;
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
    const cssProperty = property.key.name ?? property.key.value;
    let propertyValue = property.value.value;
    // if (cssProperty === "borderBottom") {
    //     console.log(`Property: ${cssProperty}, Value: ${propertyValue}, Type: ${property.value.type}`);
    // }
    switch (property.value.type) {
        case "NumericLiteral":
            if (cssProperty !== "zIndex" && cssProperty !== "opacity" && propertyValue !== 0) {
                propertyValue = `${pxToRem(propertyValue)}rem`;
            }
            break;
        case "Identifier":
            propertyValue = `${pxToRem(literalVariables[property.value.name])}rem`;
            break;
        case "UnaryExpression":
            propertyValue = `${property.value.operator}${pxToRem(literalVariables[property.value.argument.name])}rem`;
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
                        const referencedValue = getMemberExpressionValue(part.object.name, part.property.name);
                        return `${builtString}${referencedValue}`;
                }
            }, "");
            break;
        case "MemberExpression":
            // console.log(`MemberExpression: `, property);
            // console.log(`Object Location: `, property.value.object.loc);
            // console.log(`Property Location: `, property.value.property.loc);
            // console.log("Loading imported values for: ", property.value.object.name);

            const expressionValue = getMemberExpressionValue(property.value.object.name, property.value.property.name);
            if (isNaN(expressionValue || cssProperty === "zIndex" || cssProperty === "opacity" || propertyValue === 0)) {
                propertyValue = expressionValue;
            } else {
                propertyValue = `${pxToRem(expressionValue)}rem`;
            }
    }

    return {
        property: camelToKabob(cssProperty),
        value: propertyValue,
        line: property.key.loc.start.line,
        leadingComments: property.leadingComments ?? [],
        trailingComments: [],
    };
};

const getImportedValues = (sourceName) => {
    if (!Object.keys(importedModules).includes(sourceName)) {
        parsedCode.program.body
            .filter((node) => node.type === "ImportDeclaration")
            .filter((node) => node.specifiers.some(specifier => specifier.local.name === sourceName))
            .forEach((node => {
                    const filePath = getFilePath(node.source.value);
                    const {_, parsedCode} = getCode(filePath);
                    importedModules[sourceName] = mapVariables(parsedCode);
                })
            );
    }
    return importedModules[sourceName];
};

const getMemberExpressionValue = (objectName, variableName) => {
    const errorMessage = `/* ${objectName} is not defined */`;
    const importedValues = getImportedValues(objectName);
    if (importedValues === undefined) {
        return errorMessage;
    } else {
        const importedValue = importedValues[variableName];
        return importedValue !== undefined ? importedValue : errorMessage;
    }
}

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
    const comments = commentLines.map((line) => line.value.trim());
    return comments.length === 0
        ? ""
        : comments.length === 1
          ? `${indent}/* ${comments[0]} */${"\n"}`
          : `${indent}/*${"\n"}${indent}  ${comments.join("\n" + indent + "  ")}${"\n"}${indent}*/${"\n"}`;
};

const stringifyCssProperty = (cssProperty) => {
    const property = `${indentation.repeat(2)}${cssProperty.property}: ${cssProperty.value};`;
    const trailingComments =
        cssProperty.trailingComments.length === 0
            ? ""
            : ` /* ${cssProperty.trailingComments.map((comment) => comment.value.trim()).join(" ")} */`;
    const leadingComments = stringifyComments(cssProperty.leadingComments, 2);
    return `${leadingComments}${property}${trailingComments}${"\n"}`;
};

const stringifyCssRuleset = (selector, ruleset) => {
    return `${indentation}${selector} {${"\n"}${ruleset.map(stringifyCssProperty).join("")}${indentation}}${"\n"}`;
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
        cssRules[getClassName(node.declaration)] = {
            comments: node.comments,
            properties: node.declaration.init.properties,
        };
        codeBlocksToDelete.push(node.declaration);
    });

// Rebuild the CSS rules with regular CSS syntax (remove quotes, add semicolons, etc.).
const cssStringified = Object.keys(cssRules)
    .sort()
    .map((className) => {
        const comments = stringifyComments(cssRules[className].comments, 1);
        const ruleSet = cssRules[className].properties
            // TODO: The following line is temporary to get past rulesets that include [media]
            .filter(property => property.key.name !== undefined || property.key.value !== undefined)
            .map(
            (property, index, allPropertiesForClass) => {
                const cssProperty = getCssPropertyInfo(property);
                associateCommentsToCssProperty(
                    cssProperty,
                    index,
                    allPropertiesForClass,
                );
                return cssProperty;
            },
        );
        return `${comments}${stringifyCssRuleset(`.${className}`, ruleSet)}`;
    })
    .join("\n");

// Write the CSS to its own file.
fs.writeFileSync(cssFilePath, cssStringified);

/*********************
 * Replace Aphrodite *
 *********************/
// Include any leading comments
Object.keys(cssRules).forEach((className) => {
    cssRules[className].comments.forEach((comment) => {
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

const aphroditeImport = parsedCode.program.body.filter(
    (node) =>
        node.type === "ImportDeclaration" && node.source.value === "aphrodite",
)[0];

const updatedCode = `${cleanedCode.substring(0, aphroditeImport.start - 1)}
import ${aphroditeDeclaration.id.name} from "./${cssFileName}";
${cleanedCode.substring(aphroditeImport.end).trim()}
`;

fs.writeFileSync(filePath, updatedCode);
