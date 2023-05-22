/**
 * A keypad with two pages of keys.
 */

import Color from "@khanacademy/wonder-blocks-color";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {connect} from "react-redux";

import {View} from "../../fake-react-native-web/index";
import {
    innerBorderColor,
    innerBorderStyle,
    innerBorderWidthPx,
    offBlack16,
} from "../common-style";
import Tabbar from "../tabbar/tabbar";
import {TabbarItemType} from "../tabbar/types";

import Keypad from "./keypad";
import {State as ReduxState} from "./store/types";
import Styles from "./styles";

const {column, row, fullWidth} = Styles;

interface ReduxProps {
    paginationEnabled: boolean;
}

interface Props extends ReduxProps {
    leftPage: React.ReactNode;
    rightPage: React.ReactNode;
}

type State = {
    selectedPage: TabbarItemType;
};

class TwoPageKeypad extends React.Component<Props, State> {
    state: State = {
        selectedPage: "Numbers",
    };

    render() {
        const {leftPage, paginationEnabled, rightPage} = this.props;

        const {selectedPage} = this.state;

        if (paginationEnabled) {
            return (
                <Keypad style={[column, styles.keypad]}>
                    <Tabbar
                        items={["Numbers", "Operators"]}
                        selectedItem={selectedPage}
                        onSelectItem={(selectedItem) => {
                            this.setState({selectedPage: selectedItem});
                        }}
                        style={{
                            background: Color.offWhite,
                            borderTop: `1px solid ${Color.offBlack50}`,
                            borderBottom: `1px solid ${Color.offBlack50}`,
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
                <Keypad style={styles.keypad}>
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
    tabbarWrapper: {},
});

const mapStateToProps = (state: ReduxState): ReduxProps => {
    return {
        paginationEnabled: state.layout.paginationEnabled,
    };
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(
    TwoPageKeypad,
);
