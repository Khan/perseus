import {createPreviewContentDeriver} from "./derive-question-preview-content";

import type {DerivePreviewContentInputs} from "./derive-question-preview-content";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

function question(content: string): PerseusRenderer {
    return {content, widgets: {}, images: {}};
}

// A single stable reference, reused by `inputs()` below — real callers pass
// `this.props.question`, whose reference only changes on a real edit.
const stableQuestion = question("content");

function inputs(
    overrides: Partial<DerivePreviewContentInputs> = {},
): DerivePreviewContentInputs {
    return {
        question: stableQuestion,
        apiOptions: undefined,
        deviceType: "phone",
        highlightLint: true,
        problemNum: 1,
        ...overrides,
    };
}

describe("createPreviewContentDeriver", () => {
    it("returns null when there is no question", () => {
        const derive = createPreviewContentDeriver();

        expect(derive(inputs({question: undefined}))).toBeNull();
    });

    it("builds question preview content from the inputs", () => {
        const derive = createPreviewContentDeriver();

        const content = derive(inputs());

        expect(content).toMatchObject({
            type: "question",
            data: {
                question: stableQuestion,
                problemNum: 1,
            },
        });
    });

    it("returns the same object reference when inputs are unchanged", () => {
        const derive = createPreviewContentDeriver();

        const first = derive(inputs());
        const second = derive(inputs());

        expect(second).toBe(first);
    });

    it("returns a new object reference when the question changes", () => {
        const derive = createPreviewContentDeriver();

        const first = derive(inputs());
        const second = derive(inputs({question: question("different")}));

        expect(second).not.toBe(first);
    });
});
