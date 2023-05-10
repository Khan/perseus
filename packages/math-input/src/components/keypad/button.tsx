import Color from "@khanacademy/wonder-blocks-color";
import {View, StyleType} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {connect} from "react-redux";

import {State} from "../../store/types";
import {KeyConfig} from "../../types";
import GestureManager from "../gesture-manager";

const styles = StyleSheet.create({
    base: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 1px 0px rgba(33, 36, 44, 0.32)",
        boxSizing: "border-box",
        background: Color.white,
        borderRadius: 4,
        border: `1px solid transparent`,
        flex: 1,
        minHeight: 42,
        minWidth: 42,
        padding: 1,
    },
    hovered: {
        border: `1px solid ${Color.blue}`,
        padding: 1,
        boxShadow: "none",
    },
    focused: {
        border: `2px solid ${Color.blue}`,
        padding: 0,
        boxShadow: "none",
    },
    pressed: {
        border: "2px solid #1B50B3",
        padding: 0,
        background: `linear-gradient(0deg, rgba(24, 101, 242, 0.32), rgba(24, 101, 242, 0.32)), ${Color.white}`,
        boxShadow: "none",
    },
    outerBoxBase: {
        padding: 1,
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        borderRadius: 7,
        border: "2px solid transparent",
    },
    outerBoxHover: {
        border: `2px solid ${Color.blue}`,
    },
    outerBoxPressed: {
        border: "2px solid #1B50B3",
    },
});

type OwnProps = {
    onPress: () => void;
    children: React.ReactNode;
    style?: StyleType;
    tintColor?: string;
    keyConfig: KeyConfig;
};

type ReduxProps = {
    gestureManager: GestureManager;
};

export type Props = OwnProps & ReduxProps;

class Button extends React.Component<Props> {
    render(): React.ReactNode {
        const {children, style, tintColor, gestureManager, keyConfig} =
            this.props;
        const hovered = false;
        const focused = false;
        const pressed = false;
        return (
            <View
                style={style}
                onTouchStart={(evt) =>
                    gestureManager.onTouchStart(evt, keyConfig.id)
                }
                onTouchEnd={(evt) => gestureManager.onTouchEnd(evt)}
                onTouchMove={(evt) => gestureManager.onTouchMove(evt)}
                onTouchCancel={(evt) => gestureManager.onTouchCancel(evt)}
            >
                <View
                    style={[
                        styles.outerBoxBase,
                        hovered && styles.outerBoxHover,
                        pressed && styles.outerBoxPressed,
                    ]}
                >
                    <View
                        style={[
                            styles.base,
                            tintColor != null
                                ? {background: tintColor}
                                : undefined,
                            hovered && styles.hovered,
                            focused && styles.focused,
                            pressed && styles.pressed,
                        ]}
                    >
                        {children}
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        gestureManager: state.gestures.gestureManager,
    };
}

export default connect(mapStateToProps, null, null, {forwardRef: true})(Button);
