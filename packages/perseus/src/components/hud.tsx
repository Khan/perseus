import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import eyeIcon from "@phosphor-icons/core/bold/eye-bold.svg";
import eyeSlashIcon from "@phosphor-icons/core/bold/eye-slash-bold.svg";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import * as constants from "../styles/constants";

type Props = {
    message: string;
    enabled: boolean;
    onClick: () => void;
    fixedPosition?: boolean;
};

/**
 * A "heads-up display" (HUD) indicator that includes a short message (usually
 * used for linting errors). The indicator can be disabled.
 */
const HUD = ({message, enabled, onClick, fixedPosition = true}: Props) => {
    const [state, icon] = enabled
        ? [styles.enabled, eyeIcon]
        : [styles.disabled, eyeSlashIcon];

    return (
        <button
            className={css(
                styles.hud,
                fixedPosition && styles.hudFixedPosition,
                state,
            )}
            onClick={(e) => {
                onClick();
            }}
        >
            <PhosphorIcon icon={icon} style={styles.icon} />
            {message}
        </button>
    );
};

const styles = StyleSheet.create({
    hud: {
        boxSizing: "border-box",
        height: 36,
        padding: "9px 16px",
        borderRadius: 18,
        fontFamily: constants.boldFontFamily,
        fontSize: "15px",
        lineHeight: "18px",
        color: constants.white,
        userSelect: "none",
        borderWidth: 0, // <button> gives us a border by default
    },

    // We want to render the element in-place in our fixtures, so allow us to
    // render in the bottom corner in production and in-place in testing.
    hudFixedPosition: {
        bottom: 20,
        position: "fixed",
        right: 20,
        zIndex: 1,
    },

    icon: {
        width: 24,
        height: 24,
        marginRight: 8,
        marginTop: -3,
        verticalAlign: "middle",
    },

    enabled: {
        backgroundColor: constants.warningColor,
        ":hover": {
            backgroundColor: constants.warningColorHover,
        },
        ":active": {
            backgroundColor: constants.warningColorActive,
        },
    },

    disabled: {
        backgroundColor: constants.gray76,
        ":hover": {
            backgroundColor: "#a1a5a9", // in between those two grays
        },
        ":active": {
            backgroundColor: constants.gray68,
        },
    },
});

export default HUD;
