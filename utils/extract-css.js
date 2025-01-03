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

/*****************
 * WIP Variables *
 *****************/
const codeBlocksToDelete = [];

/****************
 * Code Parsing *
 ****************/
// Archive the original file in case something doesn't quite go right.
fs.copyFile(filePath, archivedFilePath, (error) => {
    if (error) {
        console.error(`Error while archiving ${fileNameParts.join(".")}: `,error);
    }
});

// Parse the code in order to extract and replace the CSS parts.
const code = fs.readFileSync(filePath, "utf8");
const parsedCode = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
});

const isVariableDeclaration = (node) => node.type === "VariableDeclaration";

// Find the variables that have literal values (like numbers).
// Sometimes, the CSS settings reference these literal variables.
// In those cases, we need to reference the actual value in the CSS.
const literalVariables = {};
parsedCode.program.body
    .filter(isVariableDeclaration)
    .flatMap((node) => node.declarations)
    .filter((node) => node.init.type === "NumericLiteral")
    .forEach((node) => {
        literalVariables[node.id.name] = node.init.value;
    });
const variableNames = Object.keys(literalVariables);

/**************************
 * CSS Parsing & Building *
 **************************/
let aphroditeDeclaration = null;

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

const getCssProperty = (property) => {
    const cssProperty = property.key.name ?? property.key.value;
    let propertyValue = property.value.value;
    switch (property.value.type) {
        case "Identifier":
            propertyValue = `${literalVariables[property.value.name]}px`;
            break;
        case "UnaryExpression":
            propertyValue = `${property.value.operator}${literalVariables[property.value.argument.name]}px`;
            break;
    }
    // Include comments, if they exist
    const indentation = "        ";
    let comments = "";
    if (property.leadingComments) {
        const newLine =
            property.leadingComments.length === 1
                ? "\n"
                : `${"\n"}${indentation}`;
        comments = property.leadingComments
            .map((comment) => comment.value.trim())
            .join(`${newLine}  `);
        comments =
            property.leadingComments.length === 1
                ? `${indentation}/* ${comments} */${newLine}`
                : `${indentation}/*${newLine}  ${comments}${newLine}*/${"\n"}`;
    }

    return `${comments}${indentation}${camelToKabob(cssProperty)}: ${propertyValue};`;
};

const camelToKabob = (camel) => {
    // Keeps consecutive capital letters together as a word
    // i.e. externalHREFLocation => external-href-location
    return camel.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
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
    .forEach((node) => (cssRules[getClassName(node)] = node.value.properties));

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
    .flatMap((node) => node.declarations)
    .filter((node) => node.id.name.toLowerCase().includes("style"))
    .forEach((node) => {
        cssRules[getClassName(node)] = node.init.properties;
        codeBlocksToDelete.push(node);
    });

// Objects passed to 'style' property (outside of React class 'render')
parsedCode.program.body
    .filter(isVariableDeclaration)
    .flatMap((node) => node.declarations)
    .filter((node) => !isStylesheetNode(node))
    .filter((node) => node.id.name.toLowerCase().includes("style"))
    .forEach((node) => {
        cssRules[getClassName(node)] = node.init.properties;
        codeBlocksToDelete.push(node);
    });

// Rebuild the CSS rules with regular CSS syntax (remove quotes, add semicolons, etc.).
const cssStringified = Object.keys(cssRules)
    .sort()
    .flatMap((className) => {
        if (className === "button-style-overrides") {
            console.log(cssRules[className].map(property => {
                const comments = property.leadingComments ?? [{loc:""}];
                return comments[0].loc;
            }));
        }
        return [
            `    ${className} {`,
            ...cssRules[className].map(getCssProperty),
            "    }\n",
        ];
    })
    .join("\n");

const css = `@layer reset, shared, legacy;

@layer legacy {

${cssStringified}
}
`;

// Write the CSS to its own file.
fs.writeFileSync(cssFilePath, css);

/*********************
 * Replace Aphrodite *
 *********************/
const cleanedCode = codeBlocksToDelete
    .sort((a, b) => b.start - a.start)
    .reduce((revisedCode, nodeToRemove) => {
        const precedingCode = revisedCode.substring(0, nodeToRemove.start - 1);
        const precedingBreakIndex = precedingCode.lastIndexOf("\n");
        return `${revisedCode.substring(0, precedingBreakIndex).trim()}

${revisedCode.substring(nodeToRemove.end + 1)}`;
    }, code);

const aphroditeImport = parsedCode.program.body.filter(
    (node) =>
        node.type === "ImportDeclaration" && node.source.value === "aphrodite",
)[0];

const updatedCode = `${cleanedCode.substring(0, aphroditeImport.start - 1)}
import ${aphroditeDeclaration.id.name} from "./${cssFileName}";
${cleanedCode.substring(aphroditeImport.end).trim()}
`;

// fs.writeFileSync(filePath, updatedCode);

// TODO: Trailing comments need to be copied
//           Watch out for trailing comments that show up as leading comments on next line
//       Add comments to lines referencing the Aphrodite style object:
//           TODO: Make sure the following line has been adapted to CSS Modules
