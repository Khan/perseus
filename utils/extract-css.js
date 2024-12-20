const fs = require("fs");
const path = require("path");

const {parse} = require("@babel/parser");

const fileToExtract = process.argv.length > 2 ? process.argv[2] : "";
const filePath = path.join(process.cwd(), fileToExtract);
const fileDirectory = path.dirname(filePath);
const cssFileName = path.basename(filePath).split(".")[0] + ".module.css";
const cssFilePath = path.join(fileDirectory, cssFileName);

const code = fs.readFileSync(filePath, "utf8");
const parsedCode = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
});

const literalVariables = {}
parsedCode.program.body
    .filter((node) => node.type === "VariableDeclaration")
    .flatMap((node) => node.declarations)
    .filter((node) => node.init.type === "NumericLiteral")
    .forEach((node) => {
        literalVariables[node.id.name] = node.init.value;
    });
const variableNames = Object.keys(literalVariables);

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
    if (property.value.type !== "StringLiteral") {
        // TODO: Need to handle "special" cases
        // console.log(`${property.key.name}: `, property);

    }
    return `    ${camelToKabob(property.key.name)}: ${property.value.value};`;
};

const camelToKabob = (camel) => {
    return camel.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
};

const nodeInfo = parsedCode.program.body
    .filter((node) => node.type === "VariableDeclaration")
    .flatMap((node) => node.declarations)
    .filter(isStylesheetNode)
    .flatMap((node) => node.init.arguments)
    .flatMap((node) => node.properties);

const css = nodeInfo
    .flatMap((node) => {
        return [
            `${camelToKabob(getClassName(node))} {`,
            ...node.value.properties.map(getCssProperty),
            "}\n",
        ];
    })
    .join("\n");

fs.writeFileSync(cssFilePath, css);
