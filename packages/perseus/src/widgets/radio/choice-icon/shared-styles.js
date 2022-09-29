// @flow
import {StyleSheet} from "aphrodite";

import type {StyleDeclaration} from "aphrodite";

const SAT_ICON_SIZE = 25;
const LIBRARY_ICON_SIZE = 24;

const styles: StyleDeclaration = StyleSheet.create({
    iconWrapper: {
        display: "inline-block",
        position: "relative",
    },
});

export {SAT_ICON_SIZE, LIBRARY_ICON_SIZE};
export default styles;
