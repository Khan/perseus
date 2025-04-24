import type {PerseusRenderer} from "@khanacademy/perseus-core";

export function generateTableRenderer(
    extend: Partial<PerseusRenderer> = {},
): PerseusRenderer {
    const base: PerseusRenderer = {
        content: "The answer is 42\n[[☃ table 1]]",
        widgets: {
            "table 1": {
                type: "table",
                options: {
                    headers: ["Column 1", "Column 2"],
                    rows: 2,
                    columns: 2,
                    answers: [
                        ["42", "42"],
                        ["42", "42"],
                    ],
                },
            },
        },
        images: {},
    };

    return {...base, ...extend};
}
