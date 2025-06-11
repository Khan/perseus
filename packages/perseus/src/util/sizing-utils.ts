import * as constants from "../styles/constants";

const {interactiveSizes} = constants;

// Note: these size cutoffs represent content-width cutoffs as specified in
// http://zpl.io/1mVmvU (broken link - we no longer use Zeplin)
// TODO(benkomalo): these values aren't used in JS outside of this file, but
// are coupled to the values in styles/styles.css - DRY it up at some point
const smMax = constants.articleMaxWidthTableInPx;
const mdMax = constants.articleMaxWidthInPx;

export const containerSizeClass = {
    SMALL: "small" as const,
    MEDIUM: "medium" as const,
    LARGE: "large" as const,
    XLARGE: "xlarge" as const,
} as const;

export type SizeClass =
    (typeof containerSizeClass)[keyof typeof containerSizeClass];

export const getClassFromWidth = (width: number): SizeClass => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!width) {
        return containerSizeClass.MEDIUM;
    }

    if (width <= smMax) {
        return containerSizeClass.SMALL;
    }
    if (width <= mdMax) {
        return containerSizeClass.MEDIUM;
    }
    return containerSizeClass.LARGE;
};

export const getInteractiveBoxFromSizeClass = (
    sizeClass: SizeClass,
): [number, number] => {
    if (sizeClass === containerSizeClass.SMALL) {
        return [
            interactiveSizes.defaultBoxSizeSmall,
            interactiveSizes.defaultBoxSizeSmall,
        ];
    }
    return [interactiveSizes.defaultBoxSize, interactiveSizes.defaultBoxSize];
};
