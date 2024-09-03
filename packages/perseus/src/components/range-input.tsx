/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";
import * as React from "react";

import NumberInput from "./number-input";

const truth = () => true;

/* A minor abstraction on top of NumberInput for ranges
 *
 */
class RangeInput extends React.Component<any> {
    static propTypes = {
        value: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.array,
        checkValidity: PropTypes.func,
    };

    static defaultProps: any = {
        placeholder: [null, null],
    };

    onChange: (arg1: number, arg2: string) => void = (i, newVal) => {
        const value = this.props.value;
        if (i === 0) {
            this.props.onChange([newVal, value[1]]);
        } else {
            this.props.onChange([value[0], newVal]);
        }
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
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={this.onChange.bind(this, 0)}
                    placeholder={this.props.placeholder[0]}
                />
                <NumberInput
                    {...this.props}
                    value={value[1]}
                    checkValidity={(val) => checkValidity([value[0], val])}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={this.onChange.bind(this, 1)}
                    placeholder={this.props.placeholder[1]}
                />
            </div>
        );
    }
}

export default RangeInput;
