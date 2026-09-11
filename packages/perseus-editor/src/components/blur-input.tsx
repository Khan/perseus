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
// TODO(benchristel): this is not an ideal user experience, because changes you
//  make to the input aren't reflected anywhere else until you blur the input.
//  This means you can't preview intermediate changes without moving focus away
//  from the thing you want to change! Instead, we should take the approach used
//  in ScrolllessNumberTextField: take the input's value from state while it's
//  focused, and from props while it's not focused, and call onChange on every
//  input event.
class BlurInput extends React.Component<Props, State> {
    input = React.createRef<HTMLInputElement>();

    constructor(props: Props) {
        super(props);
        this.state = {value: this.props.value};
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        this.setState({value: nextProps.value});
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: e.target.value});
    };

    handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    };

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
