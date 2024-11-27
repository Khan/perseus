import {array, constant, enumeration, object} from "../general-purpose-parsers";

import {parsePerseusRenderer} from "./perseus-renderer";
import {parseWidget} from "./widget";

import type {OrdererWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";
import {defaulted} from "../general-purpose-parsers/defaulted";

// There is an import cycle between orderer-widget.ts and perseus-renderer.ts.
// This wrapper ensures that we don't refer to parsePerseusRenderer before
// it's defined.
function parseRenderer(rawValue, ctx) {
    return parsePerseusRenderer(rawValue, ctx);
}

export const parseOrdererWidget: Parser<OrdererWidget> = parseWidget(
    constant("orderer"),
    object({
        options: defaulted(array(parseRenderer), () => []),
        correctOptions: array(parseRenderer),
        otherOptions: array(parseRenderer),
        height: enumeration("normal", "auto"),
        layout: enumeration("horizontal", "vertical"),
    }),
);
