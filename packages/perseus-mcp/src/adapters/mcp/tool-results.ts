import {ExerciseNotFoundError, DraftNotFoundError} from "../../app/errors";

import type {CallToolResult} from "@modelcontextprotocol/server";

/** A successful tool result carrying `value` as pretty-printed JSON. */
export function jsonResult(value: unknown): CallToolResult {
    return {
        content: [{type: "text", text: JSON.stringify(value, null, 2)}],
    };
}

/** A failed tool result, so the agent can correct its call and retry. */
export function errorResult(
    message: string,
    details?: unknown,
): CallToolResult {
    const text =
        details === undefined
            ? message
            : `${message}\n\n${JSON.stringify(details, null, 2)}`;
    return {content: [{type: "text", text}], isError: true};
}

/**
 * Runs a tool handler, turning a thrown error (an unknown itemId, an invalid
 * item) into an error result instead of a protocol-level failure.
 */
export async function runTool(
    handler: () => CallToolResult | Promise<CallToolResult>,
    onError?: (message: string) => void,
): Promise<CallToolResult> {
    let result: CallToolResult;
    try {
        result = await handler();
    } catch (e) {
        result = errorResult(describeError(e));
    }
    if (result.isError === true && onError != null) {
        const first = result.content[0];
        onError(first?.type === "text" ? first.text : "(no message)");
    }
    return result;
}

function describeError(e: unknown): string {
    if (e instanceof DraftNotFoundError) {
        return (
            `${e.message} Use create_item or open_item to start a draft, or ` +
            `list_items to see the saved ones.`
        );
    }
    if (e instanceof ExerciseNotFoundError) {
        return `${e.message} Use list_exercises to see the saved ones.`;
    }
    return e instanceof Error ? e.message : String(e);
}
