import * as React from "react";

import type {CSSProperties} from "aphrodite";

type Props = {
    value: string;
    onChange: (arg1: string) => void;
    className?: string;
    style?: CSSProperties;
};

type State = {
    value: string;
};

/* You know when you want to propagate input to a parent...
 * but then that parent does something with the input...
 * then changing the props of the input...
 * on every keystroke...
 * so if some input is invalid or incomplete...
 * the input gets reset or otherwise effed...
 *
 * This is the solution.
 *
 * Enough melodrama. Its an input that only sends changes
 * to its parent on blur.
 */
// eslint-disable-next-line react/no-unsafe
class BlurInput extends React.Component<Props, State> {
    input = React.createRef<HTMLInputElement>();

    constructor(props: Props) {
        super(props);
        this.state = {value: this.props.value};
    }

    // eslint-disable-next-line react/no-unsafe
    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        this.setState({value: nextProps.value});
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({value: e.target.value});
    }

    handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        this.props.onChange(e.target.value);
    }

    focus() {
        this.input.current?.focus();
    }

    render(): React.ReactNode {
        return (
            <input
                ref={this.input}
                className={this.props.className}
                style={this.props.style}
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
            />
        );
    }
}

export default BlurInput;
