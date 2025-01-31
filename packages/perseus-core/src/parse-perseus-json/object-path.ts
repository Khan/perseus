import type {PathSegment} from "./parser-types";

export function formatPath(path: PathSegment[]): string {
    return "(root)" + path.map(formatPathSegment).join("");
}

function formatPathSegment(segment: PathSegment): string {
    if (typeof segment === "string") {
        return validIdentifier.test(segment)
            ? "." + segment
            : `[${JSON.stringify(segment)}]`;
    }
    return `[${segment.toString()}]`;
}

const validIdentifier = /^[A-Za-z$_][A-Za-z$_0-9]*$/;
