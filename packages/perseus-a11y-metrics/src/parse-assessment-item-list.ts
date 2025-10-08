import {isFailure, parseAndMigratePerseusItem} from "@khanacademy/perseus-core";
import {array, object, string, unknown} from "zod";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {Infer} from "zod";

export function parseAssessmentItemList(
    raw: unknown,
): Infer<typeof AssessmentItemListSchema> {
    return AssessmentItemListSchema.parse(
        typeof raw === "string" ? JSON.parse(raw) : raw,
    );
}

const AssessmentItemListSchema = array(
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
