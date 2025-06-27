import {
    array,
    constant,
    enumeration,
    object,
    pipeParsers,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parsePerseusRenderer} from "./perseus-renderer";
import {parseWidget} from "./widget";

import type {PartialParser} from "../parser-types";

// There is an import cycle between orderer-widget.ts and perseus-renderer.ts.
// This wrapper ensures that we don't refer to parsePerseusRenderer before
// it's defined.
function parseRenderer(rawValue, ctx) {
    return parsePerseusRenderer(rawValue, ctx);
}

const largeToAuto: PartialParser<
    "normal" | "auto" | "large",
    "normal" | "auto"
> = (height, ctx) => {
    if (height === "large") {
        return ctx.success("auto");
    }
    return ctx.success(height);
};

export const parseOrdererWidget = parseWidget(
    constant("orderer"),
    object({
        options: defaulted(array(parseRenderer), () => []),
        correctOptions: defaulted(array(parseRenderer), () => []),
        otherOptions: defaulted(array(parseRenderer), () => []),
        height: pipeParsers(enumeration("normal", "auto", "large")).then(
            largeToAuto,
        ).parser,
        layout: defaulted(
            enumeration("horizontal", "vertical"),
            () => "horizontal" as const,
        ),
    }),
);
