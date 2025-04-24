import {css, StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    /**
     * The initial values of the buttons selected, defaults to null (no
     * selection).
     */
    values: ReadonlyArray<any> | null | undefined;
    /**
     * The set of buttons to display in this MultiButtonGroup.
     */
    buttons: ReadonlyArray<{
        /**
         * the value returned when the button is selected
         */
        value: any;
        /**
         * The content shown within the button, typically a string that gets
         * rendered as the button's display text.
         */
        content: React.ReactNode;
        /**
         * The title-text shown on hover
         */
        title?: string;
    }>;
    /**
     * A function that is provided with the updated set of selected value
     * (which it then is responsible for updating)
     */
    onChange: (values?: any) => unknown;
    /**
     * If false, at least one button must be selected at all times.
     *
     * Defaults to `true`
     */
    allowEmpty?: boolean;
};

type DefaultProps = {
    allowEmpty: Props["allowEmpty"];
    values: Props["values"];
};

/**
 * MultiButtonGroup is an aesthetically pleasing group of buttons,
 * which allows multiple buttons to be selected at the same time.
 *
 * NOTE: This component is almost identical to ./button-group.jsx except that
 * this component allows multiple selection!
 */
class MultiButtonGroup extends React.Component<Props> {
    buttonContainerRef = React.createRef<HTMLDivElement>();

    static defaultProps: DefaultProps = {
        values: [],
        allowEmpty: true,
    };

    focus(): boolean {
        this.buttonContainerRef.current?.focus();
        return true;
    }

    toggleSelect: (arg1?: any) => void = (newValue: any) => {
        const values = (this.props.values || []).slice(0);
        const allowEmpty = this.props.allowEmpty;

        if (
            values.indexOf(newValue) >= 0 &&
            (values.length > 1 || allowEmpty)
        ) {
            // If the value is already selected, unselect it
            values.splice(values.indexOf(newValue), 1);
        } else {
            // Otherwise merge with other values and return
            if (values.indexOf(newValue) < 0) {
                values.push(newValue);
            }
        }

        this.props.onChange(values);
    };

    render(): React.ReactNode {
        const values = this.props.values || [];
        const buttons = this.props.buttons.map((button, i) => {
            const selected = values.indexOf(button.value) >= 0;
            return (
                <button
                    title={button.title}
                    type="button"
                    id={"" + i}
                    key={"" + i}
                    ref={"button" + i}
                    className={css(
                        styles.buttonStyle,
                        selected && styles.selectedStyle,
                    )}
                    onClick={() => this.toggleSelect(button.value)}
                >
                    {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
                    {button.content || "" + button.value}
                </button>
            );
        });

        const outerStyle = {
            display: "inline-block",
        } as const;
        return (
            <div style={outerStyle} ref={this.buttonContainerRef}>
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

export default MultiButtonGroup;
