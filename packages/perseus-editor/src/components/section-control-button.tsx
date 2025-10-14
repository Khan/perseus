import {components} from "@khanacademy/perseus";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const {InlineIcon} = components;

type InlineIconProps = PropsFor<typeof InlineIcon>;

type SectionControlButtonProps = {
    icon: InlineIconProps;
    onClick: () => unknown;
    title: string;
    disabled: boolean;
};

export default class SectionControlButton extends React.Component<SectionControlButtonProps> {
    render(): React.ReactNode {
        const {icon, onClick, title, disabled} = this.props;

        return (
            <Clickable
                className={
                    "section-control-button " +
                    "simple-button " +
                    "simple-button--small "
                }
                onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }}
                disabled={disabled}
                role="button"
                hideDefaultFocusRing={true}
                aria-label={title}
                style={styles.button}
            >
                {({hovered, focused, pressed}) => <InlineIcon {...icon} />}
            </Clickable>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: color.gold,
        margin: 2,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 2,
    },
});
