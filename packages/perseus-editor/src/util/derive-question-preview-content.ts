import {ApiOptions} from "@khanacademy/perseus";

import type {PreviewContent} from "../preview/message-types";
import type {APIOptions, DeviceType} from "@khanacademy/perseus";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

type QuestionPreview = Extract<PreviewContent, {type: "question"}>;

export type DerivePreviewContentInputs = {
    question: PerseusRenderer | undefined;
    apiOptions: APIOptions | undefined;
    deviceType: DeviceType;
    highlightLint: boolean;
    problemNum: number | undefined;
};

function inputsEqual(
    a: DerivePreviewContentInputs,
    b: DerivePreviewContentInputs,
): boolean {
    return (
        a.question === b.question &&
        a.apiOptions === b.apiOptions &&
        a.deviceType === b.deviceType &&
        a.highlightLint === b.highlightLint &&
        a.problemNum === b.problemNum
    );
}

function buildContent(inputs: DerivePreviewContentInputs): QuestionPreview {
    return {
        type: "question",
        data: {
            question: inputs.question!,
            apiOptions: {
                ...ApiOptions.defaults,
                ...inputs.apiOptions,
                customKeypad:
                    inputs.deviceType === "phone" ||
                    inputs.deviceType === "tablet",
            },
            linterContext: {
                contentType: "exercise",
                highlightLint: inputs.highlightLint,
            },
            reviewMode: true,
            problemNum: inputs.problemNum,
        },
    };
}

/**
 * Returns a `derivePreviewContent` function that returns the same object
 * reference across calls when none of its inputs have actually changed.
 */
export function createPreviewContentDeriver(): (
    inputs: DerivePreviewContentInputs,
) => QuestionPreview | null {
    let lastInputs: DerivePreviewContentInputs | null = null;
    let lastContent: QuestionPreview | null = null;

    return (inputs: DerivePreviewContentInputs): QuestionPreview | null => {
        if (!inputs.question) {
            return null;
        }
        if (lastInputs && inputsEqual(inputs, lastInputs)) {
            return lastContent;
        }
        const content = buildContent(inputs);
        lastInputs = inputs;
        lastContent = content;
        return content;
    };
}
