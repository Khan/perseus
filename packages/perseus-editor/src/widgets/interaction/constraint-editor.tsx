import {components, Changeable, Dependencies} from "@khanacademy/perseus";
import * as React from "react";

const {ButtonGroup, MathInput, NumberInput} = components;

type Props = (Changeable.ChangeableProps) & {
    constraint: string,
    constraintFn: string,
    constraintXMax: string,
    constraintXMin: string,
    constraintYMax: string,
    constraintYMin: string,
    snap: number
};

type DefaultProps = {
    constraint: Props['constraint'],
    constraintFn: Props['constraintFn'],
    constraintXMax: Props['constraintXMax'],
    constraintXMin: Props['constraintXMin'],
    constraintYMax: Props['constraintYMax'],
    constraintYMin: Props['constraintYMin'],
    snap: Props['snap']
};

class ConstraintEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        constraint: "none",
        snap: 0.5,
        constraintFn: "0",
        constraintXMin: "-10",
        constraintXMax: "10",
        constraintYMin: "-10",
        constraintYMax: "10",
    };

    change: (propName: string) => (value?: any, callback?: () => unknown) => unknown = (propName: string): (value?: any, callback?: () => unknown) => unknown => {
        return Changeable.change.call(this, propName);
    };

    render(): React.ReactElement<React.ComponentProps<'div'>> {
        const {TeX} = Dependencies.getDependencies();

        return (
            <div>
                <div className="perseus-widget-row">
                    Constraint:{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'ButtonGroup' cannot be used as a JSX component. */}
                    <ButtonGroup
                        value={this.props.constraint}
                        allowEmpty={false}
                        buttons={[
                            {value: "none", content: "None"},
                            {value: "snap", content: "Snap"},
                            {value: "x", content: "x="},
                            {value: "y", content: "y="},
                        ]}
                        onChange={this.change("constraint")}
                    />
                </div>
                {this.props.constraint === "snap" && (
                    <div className="perseus-widget-row">
                        Snap:{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'NumberInput' cannot be used as a JSX component. */}
                        <NumberInput
                            value={this.props.snap}
                            placeholder={0}
                            onChange={this.change("snap")}
                        />
                    </div>
                )}
                {this.props.constraint === "x" && (
                    <div className="graph-settings">
                        <div className="perseus-widget-row">
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'TeX' cannot be used as a JSX component. */}
                            <TeX>x=</TeX>{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'MathInput' cannot be used as a JSX component. */}
                            <MathInput
                                buttonSets={[]}
                                buttonsVisible="never"
                                value={this.props.constraintFn}
                                onChange={this.change("constraintFn")}
                            />
                        </div>
                    </div>
                )}
                {this.props.constraint === "y" && (
                    <div className="graph-settings">
                        <div className="perseus-widget-row">
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'TeX' cannot be used as a JSX component. */}
                            <TeX>y=</TeX>{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'MathInput' cannot be used as a JSX component. */}
                            <MathInput
                                buttonSets={[]}
                                buttonsVisible="never"
                                value={this.props.constraintFn}
                                onChange={this.change("constraintFn")}
                            />
                        </div>
                    </div>
                )}
                Ensure these are set so nothing can be dragged off the canvas:
                <div className="perseus-widget-row">
                    <div className="perseus-widget-row">
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'TeX' cannot be used as a JSX component. */}
                        <TeX>x \in \Large[</TeX>{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'MathInput' cannot be used as a JSX component. */}
                        <MathInput
                            buttonSets={[]}
                            buttonsVisible="never"
                            value={this.props.constraintXMin}
                            onChange={this.change("constraintXMin")}
                        />
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'TeX' cannot be used as a JSX component. */}
                        <TeX>, </TeX>{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'MathInput' cannot be used as a JSX component. */}
                        <MathInput
                            buttonSets={[]}
                            buttonsVisible="never"
                            value={this.props.constraintXMax}
                            onChange={this.change("constraintXMax")}
                        />{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'TeX' cannot be used as a JSX component. */}
                        <TeX>\Large]</TeX>
                    </div>
                </div>
                <div className="perseus-widget-row">
                    <div className="perseus-widget-row">
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'TeX' cannot be used as a JSX component. */}
                        <TeX>y \in \Large[</TeX>{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'MathInput' cannot be used as a JSX component. */}
                        <MathInput
                            buttonSets={[]}
                            buttonsVisible="never"
                            value={this.props.constraintYMin}
                            onChange={this.change("constraintYMin")}
                        />
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'TeX' cannot be used as a JSX component. */}
                        <TeX>, </TeX>{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'MathInput' cannot be used as a JSX component. */}
                        <MathInput
                            buttonSets={[]}
                            buttonsVisible="never"
                            value={this.props.constraintYMax}
                            onChange={this.change("constraintYMax")}
                        />{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'TeX' cannot be used as a JSX component. */}
                        <TeX>\Large]</TeX>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConstraintEditor;
