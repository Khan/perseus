import {color} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";

import type {StyleDeclaration} from "aphrodite";

const CHOICE_ICON_SIZE = 24;

const styles: StyleDeclaration = StyleSheet.create({
    iconWrapper: {
        display: "inline-block",
        position: "relative",
        backgroundColor: color.white,
    },
});

export {CHOICE_ICON_SIZE};
export default styles;
