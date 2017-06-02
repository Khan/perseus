/* eslint-disable object-curly-spacing */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const { StyleSheet } = require("aphrodite");
const mediaQueries = require("./media-queries.js");
const {
    zIndexAboveScratchpad,
    zIndexInteractiveComponent,
    radioBorderColor,
    checkedColor,
    legacyCircleSize,
    circleSize,
    radioMarginWidth,
} = require("./constants.js");

module.exports = StyleSheet.create({
    perseusInteractive: {
        zIndex: zIndexInteractiveComponent,
        position: "relative",
    },

    aboveScratchpad: {
        position: "relative",
        zIndex: zIndexAboveScratchpad,
    },

    blankBackground: {
        // TODO(emily): Use KhanUtil._BACKGROUND?
        backgroundColor: "#FDFDFD",
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
        // caption text sizing in articles.less.
        // TODO(charlie): Migrate the captions over to using this style.
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

        backgroundColor: "#fff",
        border: "2px solid #fff",
        boxShadow: `0 0px 0px 1px ${radioBorderColor}`,
        outline: "none",

        boxSizing: "border-box",
        flexShrink: 0,
        marginBottom: 1,
        marginLeft: 1,
        marginRight: 1,
        marginTop: 1,

        height: circleSize - 2,
        width: circleSize - 2,
    },

    legacyResponsiveInput: {
        marginBottom: 0,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 0,
        height: legacyCircleSize,
        width: legacyCircleSize,
    },

    responsiveRadioInput: {
        borderRadius: "50%",

        ":checked": {
            backgroundColor: checkedColor,
            border: "none",
            borderRadius: "50%",
            boxShadow: `inset 0px 0px 0px 2px white, ` +
                `0 0px 0px 2px ${checkedColor}`,

            marginTop: radioMarginWidth,
            marginBottom: radioMarginWidth,
            marginLeft: radioMarginWidth,
            marginRight: radioMarginWidth,

            height: circleSize - 2 * radioMarginWidth,
            width: circleSize - 2 * radioMarginWidth,
        },
    },

    legacyResponsiveRadioInput: {
        ":checked": {
            height: legacyCircleSize,
            width: legacyCircleSize,
            marginBottom: 0,
            marginLeft: 15,
            marginRight: 15,
            marginTop: 0,
        },
    },

    responsiveRadioInputActive: {
        backgroundColor: "#fff",
        border: "2px solid #fff",
        borderRadius: "50%",
        boxShadow: `0 0px 0px 2px ${checkedColor}`,

        marginTop: radioMarginWidth,
        marginBottom: radioMarginWidth,
        marginLeft: radioMarginWidth,
        marginRight: radioMarginWidth,

        height: circleSize - 2 * radioMarginWidth,
        width: circleSize - 2 * radioMarginWidth,

        ":checked": {
            backgroundColor: "#fff",
        },
    },

    disableTextSelection: {
        userSelect: 'none',
    },
});
