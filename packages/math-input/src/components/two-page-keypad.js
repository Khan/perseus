/**
 * A keypad with two pages of keys.
 */

import {StyleSheet} from "aphrodite";
import PropTypes from "prop-types";
import * as React from "react";
import {connect} from "react-redux";

import {View} from "../fake-react-native-web/index.js";

import {
    innerBorderColor,
    innerBorderStyle,
    innerBorderWidthPx,
    offBlack16,
} from "./common-style.js";
import Keypad from "./keypad.js";
import Styles from "./styles.js";
import Tabbar from "./tabbar/tabbar.js";

const {column, row, fullWidth} = Styles;

class TwoPageKeypad extends React.Component {
    static propTypes = {
        currentPage: PropTypes.oneOf([0, 1]).isRequired,
        leftPage: PropTypes.node.isRequired,
        paginationEnabled: PropTypes.bool.isRequired,
        rightPage: PropTypes.node.isRequired,
    };

    state = {
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
});

const mapStateToProps = (state) => {
    return {
        paginationEnabled: state.layout.paginationEnabled,
    };
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(
    TwoPageKeypad,
);
