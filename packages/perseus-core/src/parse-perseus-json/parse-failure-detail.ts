import {formatPath} from "./object-path";

import type {Mismatch} from "./parser-types";

export function message(failure: Mismatch): string {
    const expected = conjoin(failure.expected);
    const path = formatPath(failure.path);
    const badValue = JSON.stringify(failure.badValue);
    return `At ${path} -- expected ${expected}, but got ${badValue}`;
}

function conjoin(items: string[]): string {
    switch (items.length) {
        // FUTURE(benchristel): handle 0 if this is reused elsewhere.
        case 1:
            return items[0];
        case 2:
            return items.join(" or ");
        default: {
            const allButLast = items.slice(0, items.length - 1);
            const last = items[items.length - 1];
            return allButLast.join(", ") + ", or " + last;
        }
    }
}
