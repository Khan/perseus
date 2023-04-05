/**
 * Provides a simple styled button
 *
 */

import {StyleSheet, css} from "aphrodite";
import PropTypes from "prop-types";
import * as React from "react";

class SimpleButton extends React.Component<any> {
    static propTypes = {
        children: PropTypes.node,
        color: PropTypes.oneOf(["orange", "green"]),
        onClick: PropTypes.func,
    };

    static defaultProps: any = {
        children: null,
        color: "green",
        onClick: () => {},
    };

    render(): React.ReactNode {
        const {children, color, onClick, ...otherProps} = this.props;
        return (
            <div
                className={css(
                    styles.baseButton,
                    color === "green" && styles.green,
                    color === "orange" && styles.orange,
                )}
                onClick={onClick}
                {...otherProps}
            >
                {children}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    baseButton: {
        top: "0",
        fontSize: "11px",
        padding: "3px 10px",
        backgroundRepeat: "repeat-x",
        borderColor: `
             rgba(0, 0, 0, 0.1)
             rgba(0, 0, 0, 0.1)
             rgba(0, 0, 0, 0.25)
         `,
        color: "#ffffff",
        borderRadius: "3px",
        lineHeight: "15px",
        cursor: "pointer",
        transition: "box-shadow ease-in-out 0.15s",
        appearance: "none",
        textDecoration: "none",
        textAlign: "center",
        ":hover": {
            boxShadow: `0 1px 1px rgba(0, 0, 0, 0.35),
                 inset 0 0 50px 5px rgba(255, 255, 255, 0.2)`,
        },
    },
    green: {
        border: "1px solid #7fab07",
        backgroundColor: "#80ac07",
        backgroundImage: "linear-gradient(to bottom, #8aba08, #719807)",
        ":hover": {
            borderBottomColor: "#547105",
            backgroundColor: "#719807",
        },
    },
    orange: {
        border: "1px solid #d45704",
        backgroundColor: "#d55704",
        backgroundImage: "linear-gradient(to bottom, #e35d04, #c04f03)",
        ":hover": {
            borderBottomColor: "#983e03",
            backgroundColor: "#c04f03",
        },
    },
});

export default SimpleButton;
