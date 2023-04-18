/**
 * A keypad with two pages of keys.
 */

import {StyleSheet} from "aphrodite";
import * as React from "react";

import {View} from "../fake-react-native-web/index";

import {
    innerBorderColor,
    innerBorderStyle,
    innerBorderWidthPx,
    offBlack16,
} from "./common-style";
import Keypad from "./keypad";
import Styles from "./styles";
import Tabbar from "./tabbar/tabbar";
import type {Popover, Echo} from "../types";

const {column, row, fullWidth} = Styles;

interface Props {
    currentPage: number;
    leftPage: React.ReactNode;
    rightPage: React.ReactNode;
    paginationEnabled: boolean;
    active: boolean;
    echoes: ReadonlyArray<Echo>;
    popover: Popover | null;
    removeEcho?: (animationId: string) => void;
}

class TwoPageKeypad extends React.Component<Props> {
    state = {
        selectedPage: "Numbers",
    };

    render() {
        const {
            leftPage,
            paginationEnabled,
            rightPage,
            active,
            echoes,
            popover,
            removeEcho,
        } = this.props;

        const {selectedPage} = this.state;

        if (paginationEnabled) {
            return (
                <Keypad
                    style={[column, styles.keypad]}
                    active={active}
                    echoes={echoes}
                    popover={popover}
                    removeEcho={removeEcho}
                >
                    <Tabbar
                        items={["Numbers", "Operators"]}
                        onSelect={(selectedItem) => {
                            this.setState({selectedPage: selectedItem});
                        }}
                    />
                    <View style={styles.borderTop}>
                        {selectedPage === "Numbers" && rightPage}
                        {selectedPage === "Operators" && leftPage}
                    </View>
                </Keypad>
            );
        } else {
            return (
                <Keypad
                    style={styles.keypad}
                    active={active}
                    echoes={echoes}
                    popover={popover}
                    removeEcho={removeEcho}
                >
                    <View style={row}>
                        <View style={fullWidth}>{leftPage}</View>
                        <View style={[styles.borderLeft, fullWidth]}>
                            {rightPage}
                        </View>
                    </View>
                </Keypad>
            );
        }
    }
}

const styles = StyleSheet.create({
    keypad: {
        // Set the background to light grey, so that when the user drags the
        // keypad pages past the edges, there's a grey backdrop.
        backgroundColor: offBlack16,
    },

    borderTop: {
        borderTop:
            `${innerBorderWidthPx}px ${innerBorderStyle} ` +
            `${innerBorderColor}`,
    },
    borderLeft: {
        borderLeft:
            `${innerBorderWidthPx}px ${innerBorderStyle} ` +
            `${innerBorderColor}`,
        boxSizing: "content-box",
    },
});

export default TwoPageKeypad;
