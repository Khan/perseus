import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type SectionControlButtonProps = {
    icon: any;
    onClick: () => unknown;
    title: string;
    disabled: boolean;
};

const SectionControlButton = ({
    icon,
    onClick,
    title,
    disabled,
}: SectionControlButtonProps) => {
    return (
        <IconButton
            icon={icon}
            disabled={disabled}
            aria-label={title}
            style={styles.button}
            size="xsmall"
            onClick={onClick}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        marginLeft: 5,
    },
});

export default SectionControlButton;
