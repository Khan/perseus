import {border, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";

import * as constants from "./constants";
import mediaQueries from "./media-queries";

import type {StyleDeclaration} from "aphrodite";

const {circleSize, radioMarginWidth} = constants;

// eslint-disable-next-line no-restricted-syntax
export default StyleSheet.create({
    blankBackground: {
        backgroundColor: semanticColor.core.background.base.default,
    },

    perseusSrOnly: {
        border: 0,
        clip: "rect(0,0,0,0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        width: 1,
    },

    responsiveLabel: {
        // NOTE(charlie): The values used here should be kept in sync with the
        // caption text sizing in Perseus' styles.css.
        [mediaQueries.smOrSmaller]: {
            fontSize: 14,
            lineHeight: 1.3,
        },
        [mediaQueries.md]: {
            fontSize: 17,
            lineHeight: 1.4,
        },
        [mediaQueries.lgOrLarger]: {
            fontSize: 20,
            lineHeight: 1.4,
        },
    },

    responsiveInput: {
        display: "inline-block",
        WebkitAppearance: "none",
        appearance: "none",

        "::-ms-check": {
            display: "none",
        },

        backgroundColor: semanticColor.core.background.base.default,
        // This border matches the input's background: it's a spacer between
        // the fill and the outer box-shadow ring, not a visible border.
        border: `${border.width.medium} solid ${semanticColor.core.background.base.default}`,
        boxShadow: `0 0px 0px ${border.width.medium} ${semanticColor.core.border.neutral.subtle}`,
        outline: "none",

        boxSizing: "border-box",
        flexShrink: 0,
        marginBlockEnd: 1,
        marginInlineStart: 1,
        marginInlineEnd: 1,
        marginBlockStart: 1,

        height: circleSize - 2,
        width: circleSize - 2,
    },

    responsiveRadioInput: {
        borderRadius: "50%",

        ":checked": {
            backgroundColor: semanticColor.core.foreground.instructive.default,
            border: "none",
            borderRadius: "50%",
            // The inset shadow is the radio's inner ring — the gap between
            // the dot and the rim — so it matches the input background.
            boxShadow:
                `inset 0px 0px 0px 2px ${semanticColor.core.background.base.default}, ` +
                `0 0px 0px 2px ${semanticColor.core.foreground.instructive.default}`,

            marginBlockStart: radioMarginWidth,
            marginBlockEnd: radioMarginWidth,
            marginInlineStart: radioMarginWidth,
            marginInlineEnd: radioMarginWidth,

            height: circleSize - 2 * radioMarginWidth,
            width: circleSize - 2 * radioMarginWidth,
        },
    },

    responsiveRadioInputStatic: {
        ":checked": {
            backgroundColor: semanticColor.core.foreground.disabled.strong,
            boxShadow:
                `inset 0px 0px 0px 2px ${semanticColor.core.background.base.default}, ` +
                `0 0px 0px 2px ${semanticColor.core.foreground.disabled.strong}`,
        },
    },

    responsiveRadioInputActive: {
        backgroundColor: semanticColor.core.background.base.default,
        border: `${border.width.medium} solid ${semanticColor.core.background.base.default}`,
        borderRadius: "50%",
        boxShadow: `0 0px 0px 2px ${semanticColor.core.border.neutral.strong}`,

        marginBlockStart: radioMarginWidth,
        marginBlockEnd: radioMarginWidth,
        marginInlineStart: radioMarginWidth,
        marginInlineEnd: radioMarginWidth,

        height: circleSize - 2 * radioMarginWidth,
        width: circleSize - 2 * radioMarginWidth,

        ":checked": {
            backgroundColor: semanticColor.core.background.base.default,
        },
    },

    disableTextSelection: {
        userSelect: "none",
    },
}) as StyleDeclaration;
