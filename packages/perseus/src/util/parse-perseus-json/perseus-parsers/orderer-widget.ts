import {array, constant, object, string} from "../general-purpose-parsers";

import {parsePerseusRenderer} from "./perseus-renderer";
import {parseWidget} from "./widget";

import type {OrdererWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

// There is an import cycle between orderer-widget.ts and perseus-renderer.ts.
// This wrapper ensures that we don't refer to parsePerseusRenderer before
// it's defined.
function parseRenderer(rawValue, ctx) {
    return parsePerseusRenderer(rawValue, ctx);
}

export const parseOrdererWidget: Parser<OrdererWidget> = parseWidget(
    constant("orderer"),
    object({
        options: array(parseRenderer),
        correctOptions: array(parseRenderer),
        otherOptions: array(parseRenderer),
        height: string,
        layout: string,
    }),
);
