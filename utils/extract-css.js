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

// Find the variables that have literal values (like numbers).
// Sometimes, the CSS settings reference these literal variables.
// In those cases, we need to reference the actual value in the CSS.
const literalVariables = {};
parsedCode.program.body
    .filter((node) => node.type === "VariableDeclaration")
    .flatMap((node) => node.declarations)
    .filter((node) => node.init.type === "NumericLiteral")
    .forEach((node) => {
        literalVariables[node.id.name] = node.init.value;
    });
const variableNames = Object.keys(literalVariables);

/**************************
 * CSS Parsing & Building *
 **************************/
const isStylesheetNode = (node) => {
    return (
        node.init?.callee?.object?.name === "StyleSheet" &&
        node.init?.callee?.property?.name === "create"
    );
};

const getClassName = (node) => {
    return node.key?.name;
};

const getCssProperty = (property) => {
    let propertyValue = property.value.value;
    switch (property.value.type) {
        case "Identifier":
            propertyValue = `${literalVariables[property.value.name]}px`;
            break;
        case "UnaryExpression":
            propertyValue = `${property.value.operator}${literalVariables[property.value.argument.name]}px`;
            break;
    }
    return `    ${camelToKabob(property.key.name)}: ${propertyValue};`;
};

const camelToKabob = (camel) => {
    // Keeps consecutive capital letters together as a word
    // i.e. externalHREFLocation => external-href-location
    return camel.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

// Dive into the node tree of the parsed code to find the stylesheet declaration.
const cssDeclaration = parsedCode.program.body
    .filter((node) => node.type === "VariableDeclaration")
    .flatMap((node) => node.declarations)
    .filter(isStylesheetNode);
const cssRules = parsedCode.program.body
    .filter((node) => node.type === "VariableDeclaration")
    .flatMap((node) => node.declarations)
    .filter(isStylesheetNode)
    .flatMap((node) => node.init.arguments)
    .flatMap((node) => node.properties);

// Rebuild the CSS rules with regular CSS syntax (remove quotes, add semicolons, etc.).
const css = cssRules
    .flatMap((node) => {
        return [
            `${camelToKabob(getClassName(node))} {`,
            ...node.value.properties.map(getCssProperty),
            "}\n",
        ];
    })
    .join("\n");

// Write the CSS to its own file.
fs.writeFileSync(cssFilePath, css);

/*********************
 * Replace Aphrodite *
 *********************/
const updatedCode = `${code.substring(0, cssDeclaration[0].start - 6).trim()}

${code.substring(cssDeclaration[0].end + 1).trim()}
`;
fs.writeFileSync(filePath, updatedCode);

// TODO: Need to find reference to Aphrodite import statement and remove that.
//       Add import for CSS file, using same variable name used for Aphrodite styles.
//       Add code to search for styling objects that aren't Aphrodite.
//           Add those styles to the CSS file and remove them from code file.
//           Copy any comments over as CSS comments.
//       Add comments to lines referencing the Aphrodite style object:
//           TODO: Make sure the following line has been adapted to CSS Modules
