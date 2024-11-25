import {
    addStyle,
    type PropsFor,
    type StyleType,
} from "@khanacademy/wonder-blocks-core";
import {border, color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = Omit<PropsFor<"input">, "value" | "onInput"> & {
    value: string;
    onChange: (newValue: string) => unknown;
    style?: StyleType;
};

const StyledInput = addStyle("input");

/**
 * This is a custom text field of type="number" for use in Perseus Editors.
 *
 * This component makes it so that
 * 1. the text field's input number updates on scroll without
 *    scrolling the page.
 * 2. the input is controlled as long as it does not have focus.
 *    While it is focused, it becomes editable and emits onChange
 *    events. This is useful to make sure that input behavior
 *    remains predictable, rather than possibly having the cursor
 *    jump around uenxpectedly.
 *
 * NOTE 1: Native HTML number inputs do not update the number value on scroll,
 * they only scroll the page. Inputs in React do NOT work this way (explanation
 * here: https://stackoverflow.com/a/68266494). By default, scrolling on a
 * focused number input in React causes BOTH the input value to change AND
 * the page to scroll. The behavior in this component is an improvement on
 * the React behavior, but it's the opposite of the native HTML behavior.
 *
 * NOTE 2: Firefox seems to have a custom override for input scroll. Even
 * with this stopPropogation, Firefox matches the native HTML behavior.
 */
function ScrolllessNumberTextField(props: Props): React.ReactElement {
    const {value, onChange, style, ...restOfProps} = props;
    const [focused, setFocused] = React.useState(false);
    const [wipValue, setWipValue] = React.useState("");

    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const ref = inputRef.current;

        // stopPropogation makes it so that the page scroll event is not
        // triggered when the input is focused and the user scrolls.
        // The input value will still change on scroll.
        const ignoreScroll = (e) => {
            e.stopPropagation();
        };

        ref?.addEventListener("wheel", ignoreScroll);

        return () => {
            ref?.removeEventListener("wheel", ignoreScroll);
        };
    }, [inputRef]);

    return (
        <StyledInput
            {...restOfProps}
            type="number"
            value={focused ? wipValue : value}
            onChange={(e) => {
                setWipValue(e.target.value);
                onChange(e.target.value);
            }}
            onFocus={() => {
                setWipValue(value);
                setFocused(true);
            }}
            onBlur={() => {
                setFocused(false);
            }}
            style={[
                styles.wonderBlocksInputStyle,
                typographyStyles.LabelMedium,
                style,
            ]}
            ref={inputRef}
        />
    );
}

const styles = StyleSheet.create({
    wonderBlocksInputStyle: {
        height: 40,
        width: "100%",
        borderRadius: border.radius.medium_4,
        boxSizing: "border-box",
        paddingLeft: spacing.medium_16,
        margin: 0,
        background: color.white,
        border: `1px solid ${color.offBlack50}`,
        color: color.offBlack,
        "::placeholder": {
            color: color.offBlack64,
        },
    },
});

export default ScrolllessNumberTextField;
