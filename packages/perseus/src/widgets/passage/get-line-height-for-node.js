// @flow
import $ from "jquery";

export const getLineHeightForNode = (
    line1: HTMLDivElement,
    line2: HTMLDivElement,
): number => {
    return $(line2).offset().top - $(line1).offset().top;
};
