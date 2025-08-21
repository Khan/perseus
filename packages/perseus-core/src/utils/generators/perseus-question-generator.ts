import type {PerseusRenderer} from "../../data-schema";

export function generateQuestion(
    questionProperties: Partial<PerseusRenderer>,
): PerseusRenderer {
    return {
        content: "",
        images: {},
        widgets: {},
        ...questionProperties,
    };
}
