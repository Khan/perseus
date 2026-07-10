import * as React from "react";

import NumberInput from "./number-input";

import type {MathFormat} from "@khanacademy/perseus-core";

const truth = () => true;

type RangeValue = [number | null, number | null];

type Props = {
    value: ReadonlyArray<number | null>;
    onChange(value: RangeValue): void;
    checkValidity?(value: RangeValue): boolean;
    placeholder: [
        number | string | null | undefined,
        number | string | null | undefined,
    ];
    allowPiTruncation?: boolean;
    format?: MathFormat | null;
    useArrowKeys?: boolean;
};

/**
 * A minor abstraction on top of `NumberInput` for ranges
 */
class RangeInput extends React.Component<Props> {
    static defaultProps = {
        placeholder: [null, null],
    };

    onChange: (arg1: number, arg2: number | null) => void = (i, newVal) => {
        const value = this.props.value;
        if (i === 0) {
            this.props.onChange([newVal, value[1] ?? null]);
        } else {
            this.props.onChange([value[0] ?? null, newVal]);
        }
    };

    render(): React.ReactNode {
        const value = this.props.value;
        const checkValidity = this.props.checkValidity || truth;

        return (
            <div className="range-input">
                <NumberInput
                    value={value[0] ?? null}
                    checkValidity={(val) =>
                        checkValidity([val, value[1] ?? null])
                    }
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={this.onChange.bind(this, 0)}
                    placeholder={this.props.placeholder[0]}
                    allowPiTruncation={this.props.allowPiTruncation}
                    format={this.props.format}
                    useArrowKeys={this.props.useArrowKeys}
                />
                <NumberInput
                    value={value[1] ?? null}
                    checkValidity={(val) =>
                        checkValidity([value[0] ?? null, val])
                    }
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={this.onChange.bind(this, 1)}
                    placeholder={this.props.placeholder[1]}
                    allowPiTruncation={this.props.allowPiTruncation}
                    format={this.props.format}
                    useArrowKeys={this.props.useArrowKeys}
                />
            </div>
        );
    }
}

export default RangeInput;
