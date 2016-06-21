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

    responsiveInput: {
        [mediaQueries.smOrSmaller]: {
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

    responsiveRadioInput: {
        [mediaQueries.smOrSmaller]: {
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
});
