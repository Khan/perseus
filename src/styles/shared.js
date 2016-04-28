const { StyleSheet } = require("aphrodite");

const zIndexScratchPad = 1;
const zIndexAboveScratchpad = zIndexScratchPad + 1;
const zIndexInteractiveComponent = zIndexAboveScratchpad + 1;
//const zIndexCurrentlyDragging = zIndexInteractiveComponent + 1;
//const zIndexCalculator = zIndexCurrentlyDragging + 1;

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
});
