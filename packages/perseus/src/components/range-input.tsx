import * as React from "react";

import NumberInput from "./number-input";

const truth = () => true;

type Props = {
    value: [number, number];
    placeholder: [string, string];
    onChange: (start: number, end: number) => void;
    checkValidity: (vals: [number, number]) => boolean;
};

type DefaultProps = {
    placeholder: Props["placeholder"] | [null, null];
};

/**
 * A minor abstraction on top of NumberInput for ranges.
 */
class RangeInput extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        placeholder: [null, null],
    };

    render(): React.ReactNode {
        const value = this.props.value;
        const checkValidity = this.props.checkValidity || truth;

        return (
            <div className="range-input">
                <NumberInput
                    {...this.props}
                    value={value[0]}
                    checkValidity={(val) => checkValidity([val, value[1]])}
                    onChange={(val) => this.props.onChange(val, value[1])}
                    placeholder={this.props.placeholder[0]}
                />
                <NumberInput
                    {...this.props}
                    value={value[1]}
                    checkValidity={(val) => checkValidity([value[0], val])}
                    onChange={(val: any) => this.props.onChange(value[0], val)}
                    placeholder={this.props.placeholder[1]}
                />
            </div>
        );
    }
}

export default RangeInput;
