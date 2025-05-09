import {css, StyleSheet} from "aphrodite";
import * as React from "react";

import type {CSSProperties} from "aphrodite";

type Props = {
    // the initial value of the button selected, defaults to null
    value: any;
    buttons: ReadonlyArray<{
        // the value returned when the button is selected
        value: any;
        // the content shown within the button, typically a string that gets
        // rendered as the button's display text
        content: React.ReactNode;
        // the title-text shown on hover
        title?: string;
    }>;
    // a function that is provided with the updated value (which it then is
    // responsible for updating)
    onChange: (value?: any) => unknown;
    // if false, exactly one button _must_ be selected;
    // defaults to true and _at most_ one button (0 or 1) may be selected.
    allowEmpty: boolean;

    /**
     * Customizes the selected button's styling.
     */
    selectedButtonStyle?: CSSProperties;
};

type DefaultProps = {
    allowEmpty: Props["allowEmpty"];
    value: Props["value"];
};

/**
 * ButtonGroup is an aesthetically pleasing group of buttons.
 */
class ButtonGroup extends React.Component<Props> {
    container: HTMLDivElement | null | undefined;

    static defaultProps: DefaultProps = {
        value: null,
        allowEmpty: true,
    };

    componentWillUnmount() {
        this.container = null;
    }

    focus(): undefined | boolean {
        if (this.container) {
            this.container.focus();
            return true;
        }
    }

    toggleSelect(newValue: any) {
        const value = this.props.value;

        if (this.props.allowEmpty) {
            // Select the new button or unselect if it's already selected
            this.props.onChange(value !== newValue ? newValue : null);
        } else {
            this.props.onChange(newValue);
        }
    }

    render(): React.ReactNode {
        const value = this.props.value;
        const buttons = this.props.buttons.map((button, i) => {
            return (
                <button
                    title={button.title}
                    type="button"
                    ref={"button" + i}
                    key={"" + i}
                    className={css(
                        styles.buttonStyle,
                        button.value === value && styles.selectedStyle,
                        button.value === value &&
                            this.props.selectedButtonStyle,
                    )}
                    onClick={() => this.toggleSelect(button.value)}
                >
                    {
                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                        button.content || "" + button.value
                    }
                </button>
            );
        });

        const outerStyle = {
            display: "inline-block",
        } as const;
        return (
            <div style={outerStyle} ref={(node) => (this.container = node)}>
                {buttons}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderLeft: "0",
        cursor: "pointer",
        margin: "0",
        padding: "5px 10px",
        position: "relative", // for hover

        ":first-child": {
            borderLeft: "1px solid #ccc",
            borderTopLeftRadius: "3px",
            borderBottomLeftRadius: "3px",
        },

        ":last-child": {
            borderRight: "1px solid #ccc",
            borderTopRightRadius: "3px",
            borderBottomRightRadius: "3px",
        },

        ":hover": {
            backgroundColor: "#ccc",
        },

        ":focus": {
            zIndex: 2,
        },
    },

    selectedStyle: {
        backgroundColor: "#ddd",
    },
});

export default ButtonGroup;
