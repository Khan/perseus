// This file is processed by a Rollup plugin (replace) to inject the production
// version number during the release build.
// In dev, you'll never see the version number.

const libName = "@khanacademy/perseus-error";
const libVersion = "dev";

/**
 * Log library version to the console.
 */
if (globalThis && !globalThis.PERSEUS_SILENCE_LOGGING) {
    let prefix = "v";
    if (libVersion === "dev") {
        prefix = "";
    }
    const printString = ` * ${libName} ${prefix}${libVersion} * `;
    // eslint-disable-next-line no-console
    console.log(`%c${printString}`, "background: #000; color: #fff");
}

export default libVersion;
