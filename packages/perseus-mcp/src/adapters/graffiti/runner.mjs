// Runs one Graffiti diagram script and prints what it draws, as JSON, to
// stdout: {svg, data, width, height, shapes}. The server starts it in a process of
// its own with Node's permission model on (see node-graffiti-renderer.ts):
// it can read only this file, the Graffiti library and the script.
//
//     node runner.mjs <Graffiti's index.js URL> <script path> [<style JSON>]
//
// With a style (Khan's colors, as domain/graffiti/khan-style.ts
// describes them), the script can import it as "khan-style", and the colors
// Graffiti draws with by default are swapped for the style's.
//
// The script's default export is {canvas, shapes, labels?} (shapes are
// Graffiti drawables, labels made with Graffiti's `label`), or a function,
// possibly async, returning that.
//
// Plain JavaScript, not TypeScript: the server runs it as is, in the
// repository and in the bundle.
import {registerHooks} from "node:module";
import {pathToFileURL} from "node:url";

const [graffitiUrl, scriptPath, styleJson] = process.argv.slice(2);
const style = styleJson == null ? null : JSON.parse(styleJson);
// A module of its own, from a data: URL, so it needs no file to read.
const styleUrl =
    style == null
        ? null
        : "data:text/javascript," +
          encodeURIComponent(
              Object.entries({
                  colors: style.colors,
                  ui: style.ui,
                  tints: style.tints,
              })
                  .map(
                      ([name, value]) =>
                          `export const ${name} = ${JSON.stringify(value)};`,
                  )
                  .join("\n"),
          );
const scriptUrl = pathToFileURL(scriptPath).href;
const graffitiDir = new URL(".", graffitiUrl).href;

// The script may import Graffiti and nothing else: no Node built-ins, no
// other files. (The permission model doesn't cover the network in Node 24,
// so this, with the globals removed below, is what keeps it offline.)
registerHooks({
    resolve(specifier, context, nextResolve) {
        if (specifier === "graffiti") {
            return {url: graffitiUrl, shortCircuit: true};
        }
        if (specifier === "khan-style" && styleUrl != null) {
            return {url: styleUrl, shortCircuit: true};
        }
        const fromGraffiti = context.parentURL?.startsWith(graffitiDir);
        const fromRunner = context.parentURL === import.meta.url;
        if (
            (fromGraffiti && specifier.startsWith(".")) ||
            (fromRunner &&
                (specifier === scriptUrl || specifier === graffitiUrl))
        ) {
            return nextResolve(specifier, context);
        }
        throw new Error(
            `A Graffiti script can import only ` +
                (styleUrl == null
                    ? `"graffiti"`
                    : `"graffiti" and "khan-style"`) +
                `, not "${specifier}".`,
        );
    },
});

for (const name of ["fetch", "WebSocket", "EventSource", "XMLHttpRequest"]) {
    delete globalThis[name];
}

const graffiti = await import(graffitiUrl);
const script = await import(scriptUrl);
const exported = script.default;
const diagram =
    typeof exported === "function" ? await exported(graffiti) : exported;

const canvas = diagram?.canvas;
const shapes = diagram?.shapes;
if (canvas == null || !Array.isArray(shapes)) {
    throw new Error(
        "The script's default export must be {canvas, shapes, labels?}, or " +
            "a function returning it.",
    );
}

const printed = graffiti.print(
    graffiti.svg(
        shapes.map((shape) => shape.draw(canvas)),
        canvas.viewport,
    ),
);
// Graffiti's default black and grays become Khan's ink and line colors.
const replaced = style?.defaultsReplaced ?? {};
const svg = printed.replace(
    /\b(stroke|fill)="([^"]*)"/g,
    (attribute, name, value) =>
        replaced[value] == null ? attribute : `${name}="${replaced[value]}"`,
);
const data = {
    range: graffiti.graphieRange(canvas),
    labels: diagram.labels ?? [],
};
// Each shape's kind and the style it was given, for the server to check:
// Graffiti ignores style keys it doesn't know, so the drawing can't show them.
const shapeStyles = shapes.map((shape) => ({
    kind: shape?.constructor?.name ?? "unknown",
    style: shape?.style ?? shape?.options?.style ?? {},
}));
process.stdout.write(
    JSON.stringify({
        svg,
        data,
        width: canvas.viewport.width,
        height: canvas.viewport.height,
        shapes: shapeStyles,
    }),
);
