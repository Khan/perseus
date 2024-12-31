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
// const cssRules = {};

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
    return kabobCaseName;
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
    return `    ${camelToKabob(cssProperty)}: ${propertyValue};`;
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

// Objects passed to 'style' property
const styleVariables = parsedCode.program.body
    .filter(isVariableDeclaration)
    .flatMap((node) => node.declarations)
    .filter((node) => !isStylesheetNode(node))
    .filter((node) => node.id.name.toLowerCase().includes("style"));

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

// Rebuild the CSS rules with regular CSS syntax (remove quotes, add semicolons, etc.).
const css = Object.keys(cssRules)
    .sort()
    .flatMap((className) => {
        return [
            `${className} {`,
            ...cssRules[className].map(getCssProperty),
            "}\n",
        ];
    })
    .join("\n");

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
        // const subsequentCode = revisedCode.substring(nodeToRemove.end + 1);
        // const subsequentBreakIndex =
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

fs.writeFileSync(filePath, updatedCode);

// TODO: √ Need to find reference to Aphrodite import statement and remove that.
//           √ Lines that are to be deleted should be tracked in an array and handled at the end.
//           √ This ensures that line numbers are correct (by starting at the end and working towards the start of the file).
//       √ Add import for CSS file, using same variable name used for Aphrodite styles.
//       √ Add code to search for styling objects that aren't Aphrodite.
//           √ Add those styles to the CSS file and remove them from code file.
//   =>      Watch for class names that already exist (append a number if already exists).
//           √ Track all CSS rules in an array to add all together to make sure they are added alphabetically.
//   =>      Copy any comments over as CSS comments.
//   =>  Add comments to lines referencing the Aphrodite style object:
//           TODO: Make sure the following line has been adapted to CSS Modules

// const blockTypes = parsedCode.program.body.map(node => node.type);

// console.log(`Style Variables: `, styleVariables);
// console.log(`Variables in Class: `, variablesInClass.flatMap(node => node.init.properties));
