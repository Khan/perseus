import {StyleSheet} from "aphrodite";

import * as constants from "./constants";
import mediaQueries from "./media-queries";

import type {StyleDeclaration} from "aphrodite";

const {
    zIndexAboveScratchpad,
    zIndexInteractiveComponent,
    radioBorderColor,
    checkedColor,
    circleSize,
    radioMarginWidth,
} = constants;

export default StyleSheet.create({
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
        // caption text sizing in Perseus' articles.less.
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

        // @ts-expect-error [FEI-5003] - TS2322 - Type '{ display: "inline-block"; WebkitAppearance: "none"; appearance: "none"; "::-ms-check": { display: string; }; backgroundColor: "#fff"; border: string; boxShadow: "0 0px 0px 1px #BABEC2"; outline: string; ... 7 more ...; width: number; }' is not assignable to type 'CSSProperties'.
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

    responsiveRadioInput: {
        borderRadius: "50%",

        // @ts-expect-error [FEI-5003] - TS2322 - Type '{ borderRadius: string; ":checked": { backgroundColor: string; border: string; borderRadius: string; boxShadow: string; marginTop: number; marginBottom: number; marginLeft: number; marginRight: number; height: number; width: number; }; }' is not assignable to type 'CSSProperties'.
        ":checked": {
            backgroundColor: checkedColor,
            border: "none",
            borderRadius: "50%",
            boxShadow:
                `inset 0px 0px 0px 2px white, ` +
                `0 0px 0px 2px ${checkedColor}`,

            marginTop: radioMarginWidth,
            marginBottom: radioMarginWidth,
            marginLeft: radioMarginWidth,
            marginRight: radioMarginWidth,

            height: circleSize - 2 * radioMarginWidth,
            width: circleSize - 2 * radioMarginWidth,
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

        // @ts-expect-error [FEI-5003] - TS2322 - Type '{ backgroundColor: "#fff"; border: string; borderRadius: string; boxShadow: "0 0px 0px 2px #71B307"; marginTop: number; marginBottom: number; marginLeft: number; marginRight: number; height: number; width: number; ":checked": { ...; }; }' is not assignable to type 'CSSProperties'.
        ":checked": {
            backgroundColor: "#fff",
        },
    },

    disableTextSelection: {
        userSelect: "none",
    },
}) as StyleDeclaration;
