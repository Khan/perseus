import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import caretRight from "@phosphor-icons/core/bold/caret-right-bold.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    isExpanded: boolean;
};

/**
 * Displays a caret in either expanded or collapsed state. For use in headings
 * that collapse a region.
 */
function ToggleableCaret(props: Props) {
    const iconStyle = props.isExpanded ? styles.expanded : styles.collapsed;

    return <PhosphorIcon icon={caretRight} style={iconStyle} />;
}

const styles = StyleSheet.create({
    collapsed: {
        transition: ".15s",
    },
    expanded: {
        transform: "rotate(90deg)",
        transition: ".15s",
    },
});

export default ToggleableCaret;
