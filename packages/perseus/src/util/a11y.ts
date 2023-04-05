/*
 * A11y (Accessibility) style rules
 * These are used to mark up areas on the site that should only be readable
 * when using a screen reader.
 */
import {StyleSheet} from "aphrodite";

import type {StyleDeclaration} from "aphrodite";

export default StyleSheet.create({
    // Make content only visible to screen readers.
    // Both collegeboard.org and Bootstrap 3 use this exact implementation.
    srOnly: {
        border: 0,
        clip: "rect(0,0,0,0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        width: 1,
    },
}) as StyleDeclaration;
