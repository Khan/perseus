/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable object-curly-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const { StyleSheet } = require("aphrodite");
const mediaQueries = require("./media-queries.js");
const {
    zIndexAboveScratchpad,
    zIndexInteractiveComponent,
    radioBorderColor,
    checkedColor,
    circleSize,
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
        [mediaQueries.lgOrSmaller]: {
            display: "inline-block",
            WebkitAppearance: "none",
            appearance: "none",

            backgroundColor: "#fff",
            border: "2px solid #fff",
            boxShadow: `0 0px 0px 1px ${radioBorderColor}`,
            outline: "none",

            boxSizing: "border-box",
            flexShrink: 0,
            marginBottom: 0,
            marginLeft: 15,
            marginRight: 15,
            marginTop: 0,

            height: circleSize,
            width: circleSize,
        },
    },

    // TODO(kevinb) move to choice.jsx
    responsiveRadioInput: {
        [mediaQueries.lgOrSmaller]: {
            borderRadius: "50%",

            ":checked": {
                backgroundColor: checkedColor,
                border: "2px solid #fff",
                borderRadius: "50%",
                boxShadow: `0 0px 0px 2px ${checkedColor}`,

                height: circleSize,
                width: circleSize,
            },
        },
    },

    // TODO(kevinb) move to choice.jsx
    responsiveMobileRadioInput: {
        // On phones and tablets, we hide the circular radio button itself,
        // and instead, show a green border when the item is selected. This
        // saves horizontal space for content on small screens.
        [mediaQueries.lgOrSmaller]: {
            display: "none",
        },
    },

    disableTextSelection: {
        userSelect: 'none',
    },
});
