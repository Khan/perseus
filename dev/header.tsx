import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {css, StyleSheet} from "aphrodite";
import * as React from "react";

const styles = StyleSheet.create({
    header: {
        display: "flex",
        alignItems: "center",
        boxShadow: "0 0 10px #0002",
        borderBlockEnd: `1px solid ${color.offBlack32}`,
        background: color.offBlack8,
        padding: spacing.small_12,
        justifyContent: "space-between",
        flexDirection: "row-reverse",
        flexWrap: "wrap",
    },
});

export const Header = ({children}) => (
    <header className={css(styles.header)}>{children}</header>
);
