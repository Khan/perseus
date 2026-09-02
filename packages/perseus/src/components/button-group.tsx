import {border, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {css, StyleSheet} from "aphrodite";
import * as React from "react";

import type {CSSProperties} from "aphrodite";

interface Props {
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

    /**
     * Customizes the selected button's styling.
     */
    selectedButtonStyle?: CSSProperties;

    /**
     * When true, all buttons are disabled (non-interactive and visually muted).
     */
    disabled?: boolean;
}

interface DefaultProps {
    value: Props["value"];
}

/**
 * ButtonGroup is an aesthetically pleasing group of buttons.
 */
class ButtonGroup extends React.Component<Props> {
    container: HTMLDivElement | null | undefined;

    static defaultProps: DefaultProps = {
        value: null,
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
        // Clicking the already-selected button is a no-op: exactly one
        // button is always selected, so there is no deselected state to
        // move to, and re-emitting the current value would make callers
        // rebuild state the user already has.
        if (this.props.value !== newValue) {
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
                    key={"" + i}
                    disabled={this.props.disabled}
                    className={css(
                        buttonGroupStyles.buttonStyle,
                        button.value === value &&
                            buttonGroupStyles.selectedStyle,
                        button.value === value &&
                            this.props.selectedButtonStyle,
                        this.props.disabled && buttonGroupStyles.disabledStyle,
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

// Shared with multi-button-group.tsx, which renders the same visual design
// with multi-select behavior, so the two components' styles can't drift apart.
export const buttonGroupStyles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: semanticColor.core.background.base.default,
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        borderInlineStart: "0",
        color: semanticColor.core.foreground.neutral.strong,
        cursor: "pointer",
        margin: "0",
        paddingBlock: "5px",
        paddingInline: "10px",
        position: "relative", // for hover

        ":first-child": {
            borderInlineStart: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
            borderStartStartRadius: border.radius.radius_040,
            borderEndStartRadius: border.radius.radius_040,
        },

        ":last-child": {
            borderInlineEnd: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
            borderStartEndRadius: border.radius.radius_040,
            borderEndEndRadius: border.radius.radius_040,
        },

        ":hover": {
            backgroundColor: semanticColor.core.background.instructive.subtle,
        },

        ":focus": {
            zIndex: 2,
        },
    },

    selectedStyle: {
        backgroundColor: semanticColor.core.background.instructive.subtle,
        boxShadow: `inset 0 calc(-1 * ${border.width.thick}) 0 ${semanticColor.core.border.instructive.default}`,
    },

    disabledStyle: {
        cursor: "not-allowed",
        backgroundColor: semanticColor.core.background.disabled.default,
        color: semanticColor.core.foreground.disabled.strong,
        ":hover": {
            backgroundColor: semanticColor.core.background.disabled.default,
        },
    },
});

export default ButtonGroup;
