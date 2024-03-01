import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import questionIcon from "@phosphor-icons/core/regular/question.svg";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

const colors = {
    grayLight: "#aaa",
    basicBorderColor: "#ccc",
    white: "#fff",
} as const;

const triangleBeforeAfter = {
    borderBottom: "9px solid transparent",
    borderTop: "9px solid transparent",
    content: '" "',
    height: "0",
    position: "absolute",
    top: "0",
    width: "0",
} as const;

const styles = StyleSheet.create({
    infoTip: {
        display: "inline-block",
        marginLeft: "5px",
        position: "relative",
    },

    infoTipContainer: {
        position: "absolute",
        top: "-12px",
        left: "22px",
        zIndex: 1000,
    },

    infoTipTriangle: {
        height: "10px",
        left: "0",
        position: "absolute",
        top: "8px",
        width: "0",
        zIndex: 1,

        ":before": {
            ...triangleBeforeAfter,
            borderRight: "9px solid #bbb",
            right: "0",
        },

        ":after": {
            ...triangleBeforeAfter,
            borderRight: `9px solid ${colors.white}`,
            right: "-1px",
        },
    },

    verticalShadow: {
        border: `1px solid ${colors.basicBorderColor}`,
        boxShadow: `0 1px 3px ${colors.basicBorderColor}`,
        borderBottom: `1px solid ${colors.grayLight}`,
    },

    infoTipContentContainer: {
        background: colors.white,
        padding: "5px 10px",
        width: "240px",
    },
});

type Props = {
    children: React.ReactNode;
};

type State = {
    hover: boolean;
};

class InfoTip extends React.Component<Props, State> {
    state: State = {hover: false};

    handleMouseEnter: () => void = () => {
        this.setState({hover: true});
    };

    handleMouseLeave: () => void = () => {
        this.setState({hover: false});
    };

    render(): React.ReactNode {
        return (
            <div className={css(styles.infoTip)}>
                <View
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                >
                    <PhosphorIcon size={"small"} icon={questionIcon} />
                </View>
                <div
                    className={css(styles.infoTipContainer)}
                    style={{display: this.state.hover ? "block" : "none"}}
                >
                    <div className={css(styles.infoTipTriangle)} />
                    <div
                        className={css(
                            styles.verticalShadow,
                            styles.infoTipContentContainer,
                        )}
                    >
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoTip;
