import {StyleSheet} from "aphrodite";

import type {StyleDeclaration} from "aphrodite";

const CHOICE_ICON_SIZE = 24;

const styles: StyleDeclaration = StyleSheet.create({
    // It is by design decision that iconWrapper is not alignedContent center,
    // even though it might not look best in most of our cases, but when we have
    // the text answer paired with helper content (either images or descriptions)
    // it's important that we preserve a logical reading order from top to bottom here.
    iconWrapper: {
        display: "inline-block",
        position: "relative",
    },
});

export {CHOICE_ICON_SIZE};
export default styles;
