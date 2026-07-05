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
    legacyPerseusLint: ReadonlyArray<string>;
};

function legacyPerseusLintEqual(
    a: ReadonlyArray<string>,
    b: ReadonlyArray<string>,
): boolean {
    return a.length === b.length && a.every((warning, i) => warning === b[i]);
}

function inputsEqual(
    a: DerivePreviewContentInputs,
    b: DerivePreviewContentInputs,
): boolean {
    return (
        a.question === b.question &&
        a.apiOptions === b.apiOptions &&
        a.deviceType === b.deviceType &&
        a.highlightLint === b.highlightLint &&
        a.problemNum === b.problemNum &&
        legacyPerseusLintEqual(a.legacyPerseusLint, b.legacyPerseusLint)
    );
}

function buildContent(inputs: DerivePreviewContentInputs): QuestionPreview {
    return {
        type: "question",
        data: {
            // eslint-disable-next-line no-restricted-syntax -- inputs.question is checked non-null by the caller
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
            legacyPerseusLint: inputs.legacyPerseusLint,
            problemNum: inputs.problemNum,
        },
    };
}

/**
 * Returns a `derivePreviewContent` function that returns the same object
 * reference across calls when none of its inputs have actually changed.
 * `legacyPerseusLint` is rebuilt as a fresh array by the underlying editor on
 * every call, so it's compared by value rather than by reference — otherwise
 * every call would look "changed" and defeat the memoization.
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
