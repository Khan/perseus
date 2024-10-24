import type {StyleDeclaration} from "aphrodite";
import {StyleSheet} from "aphrodite";

const CHOICE_ICON_SIZE = 24;

const styles: StyleDeclaration = StyleSheet.create({
    iconWrapper: {
        display: "inline-block",
        position: "relative",
    },
});

export {CHOICE_ICON_SIZE};
export default styles;
