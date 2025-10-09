import {isFailure, parseAndMigratePerseusItem} from "@khanacademy/perseus-core";
import {array, object, string, unknown} from "zod";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {Infer} from "zod";

export function parseExerciseContent(
    raw: unknown,
): Infer<typeof ExerciseContentSchema> {
    return ExerciseContentSchema.parse(
        typeof raw === "string" ? JSON.parse(raw) : raw,
    );
}

const ExerciseContentSchema = array(
    object({
        item_data: unknown().transform(parsePerseusItemOrThrow),
        id: string(),
    }),
);

function parsePerseusItemOrThrow(raw: unknown): PerseusItem {
    const result = parseAndMigratePerseusItem(raw);
    if (isFailure(result)) {
        throw Error("Failed to parse Perseus item: " + result.detail.message);
    }
    return result.value;
}
