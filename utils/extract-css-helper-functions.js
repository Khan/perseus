const fs = require("fs");
const path = require("path");

const wbColorValues = {
    // from node_modules/@khanacademy/wonder-blocks-tokens/dist/css/index.css
    "#21242c": "--wb-semanticColor-core-foreground-neutral-strong",
    "#5f6167": "--wb-semanticColor-core-foreground-neutral-default",
    "#b8b9bb": "--wb-semanticColor-core-foreground-disabled-default",
    "#ffffff": "--wb-semanticColor-core-foreground-knockout-default",
};
const wbBorderWidths = {
    "1px": "--wb-border-width-thin",
    "2px": "--wb-border-width-medium",
    "4px": "--wb-border-width-thick",
};
const wbBorderRadii = {
    "1px": "--wb-border-radius-radius_010",
    "4px": "--wb-border-radius-radius_040",
    "8px": "--wb-border-radius-radius_080",
    "12px": "--wb-border-radius-radius_120",
    "24px": "--wb-border-radius-radius_240",
    "50%": "--wb-border-radius-full",
};

/********************
 * Helper Functions *
 ********************/
const camelToKabob = (camel) => {
    // Keeps consecutive capital letters together as a word
    // i.e. externalHREFLocation => external-href-location
    return camel.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
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

const convertToWbMeasurement = (cssProperty, propertyValue) => {
    if (cssProperty === "borderWidth" || cssProperty === "border-width") {
        if (Object.keys(wbBorderWidths).includes(propertyValue)) {
            return `var(${wbBorderWidths[propertyValue]})`;
        }
    } else if (
        cssProperty === "borderRadius" ||
        cssProperty === "border-radius"
    ) {
        if (Object.keys(wbBorderRadii).includes(propertyValue)) {
            return `var(${wbBorderRadii[propertyValue]})`;
        }
    }
    return propertyValue;
};

const getWbTokenValue = (tokenName) => {
    const tokenParts = tokenName.split(".");
    const tokenValue = `--wb-${tokenParts.join("-")}`;
    return `var(${tokenValue})`;
};

const isExportNamedDeclaration = (node) =>
    node.type === "ExportNamedDeclaration";

const isVariableDeclaration = (node) => node.type === "VariableDeclaration";

const propertyRejectsPx = (propertyName, testForLineHeight = true) => {
    return (
        propertyName === "zIndex" ||
        propertyName === "z-index" ||
        propertyName === "opacity" ||
        (testForLineHeight && propertyName === "lineHeight") ||
        (testForLineHeight && propertyName === "line-height")
    );
};

const propertyKeepsPx = (propertyName) => {
    return propertyName.includes("border");
};

const pxToRem = (px) => {
    return parseFloat(px) / 10;
};

const replacePxWithRem = (property, value) => {
    const tokenizedValue = convertToWbMeasurement(property, value);
    const convertToRem = !(
        propertyRejectsPx(property, false) ||
        propertyKeepsPx(property) ||
        tokenizedValue === 0
    );
    if (convertToRem) {
        return tokenizedValue.replace(/(\d+)px/g, (match, p1) => {
            const remValue = pxToRem(parseFloat(p1));
            return `${remValue}rem`;
        });
    }
    return value;
};

const validFileExtensions = ["js", "jsx", "ts", "tsx"];
const getFilePath = (rawFilePath, fileDirectory) => {
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

module.exports = {
    camelToKabob,
    convertToWbColor,
    getWbTokenValue,
    isExportNamedDeclaration,
    isVariableDeclaration,
    propertyRejectsPx,
    replacePxWithRem,
    getFilePath,
};
