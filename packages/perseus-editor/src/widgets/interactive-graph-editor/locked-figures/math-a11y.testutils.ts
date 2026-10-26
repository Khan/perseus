import {LockedLabelType} from "@khanacademy/perseus-core";

/**
 * Non-async mocked version of joinLabelsAsSpokenMath for tests.
 */
export function mockedJoinLabelsAsSpokenMathForTests(
    labels: LockedLabelType[],
) {
    // Mock this so that each label's text says "spoken" before it.
    const jointMock = labels.map((input) => ` spoken ${input.text}`).join(",");
    return Promise.resolve(jointMock);
}

export function mockedGenerateSpokenMathDetailsForTests(mathString: string) {
    return Promise.resolve(`spoken ${mathString}`);
}
