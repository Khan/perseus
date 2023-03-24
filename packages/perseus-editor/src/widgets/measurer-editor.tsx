/* eslint-disable react/sort-comp */
import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

const {InfoTip, NumberInput, PropCheckBox, RangeInput} = components;

const defaultImage = {
    url: null,
    top: 0,
    left: 0,
} as const;

type Props = any;

class MeasurerEditor extends React.Component<Props> {
    static widgetName: 'measurer' = "measurer";

    static propTypes = {
        ...Changeable.propTypes,
        box: PropTypes.arrayOf(PropTypes.number),
        image: PropTypes.shape({
            url: PropTypes.string,
            top: PropTypes.number,
            left: PropTypes.number,
        }),
        showProtractor: PropTypes.bool,
        showRuler: PropTypes.bool,
        rulerLabel: PropTypes.string,
        rulerTicks: PropTypes.number,
        rulerPixels: PropTypes.number,
        rulerLength: PropTypes.number,
    };

    static defaultProps: Props = {
        box: [480, 480],
        image: {},
        showProtractor: true,
        showRuler: false,
        rulerLabel: "",
        rulerTicks: 10,
        rulerPixels: 40,
        rulerLength: 10,
    };

    className: string = "perseus-widget-measurer";

    render(): React.ReactElement {
        const image = _.extend({}, defaultImage, this.props.image);

        return (
            <div className="perseus-widget-measurer">
                <div>Image displayed under protractor and/or ruler:</div>
                <div>
                    URL:{" "}
                    <input
                        type="text"
                        className="perseus-widget-measurer-url"
                        // eslint-disable-next-line react/no-string-refs
                        ref="image-url"
                        defaultValue={image.url}
                        onChange={this._changeUrl}
                    />
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'InfoTip' cannot be used as a JSX component. */}
                    <InfoTip>
                        <p>
                            Create an image in graphie, or use the "Add image"
                            function to create a background.
                        </p>
                    </InfoTip>
                </div>
                {image.url && (
                    <div className="perseus-widget-row">
                        <label className="perseus-widget-left-col">
                            Pixels from top:{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'NumberInput' cannot be used as a JSX component. */}
                            <NumberInput
                                placeholder={0}
                                onChange={this._changeTop}
                                value={image.top}
                                useArrowKeys={true}
                            />
                        </label>
                        <label className="perseus-widget-right-col">
                            Pixels from left:{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'NumberInput' cannot be used as a JSX component. */}
                            <NumberInput
                                placeholder={0}
                                onChange={this._changeLeft}
                                value={image.left}
                                useArrowKeys={true}
                            />
                        </label>
                    </div>
                )}
                <div>
                    Containing area [width, height]:{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'RangeInput' cannot be used as a JSX component. */}
                    <RangeInput
// @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 1.
                        onChange={this.change("box")}
                        value={this.props.box}
                        useArrowKeys={true}
                    />
                </div>
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        <PropCheckBox
                            label="Show ruler"
                            showRuler={this.props.showRuler}
                            onChange={this.props.onChange}
                        />
                    </div>
                    <div className="perseus-widget-right-col">
                        <PropCheckBox
                            label="Show protractor"
                            showProtractor={this.props.showProtractor}
                            onChange={this.props.onChange}
                        />
                    </div>
                </div>
                {this.props.showRuler && (
                    <div>
                        <div>
                            <label>
                                {" "}
                                Ruler label:{" "}
                                <select
                                    onChange={(e) =>
// @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 2.
                                        this.change(
                                            "rulerLabel",
                                            e.target.value,
                                        )
                                    }
                                    value={this.props.rulerLabel}
                                >
                                    <option value="">None</option>
                                    <optgroup label="Metric">
                                        {this.renderLabelChoices([
                                            ["milimeters", "mm"],
                                            ["centimeters", "cm"],
                                            ["meters", "m"],
                                            ["kilometers", "km"],
                                        ])}
                                    </optgroup>
                                    <optgroup label="Imperial">
                                        {this.renderLabelChoices([
                                            ["inches", "in"],
                                            ["feet", "ft"],
                                            ["yards", "yd"],
                                            ["miles", "mi"],
                                        ])}
                                    </optgroup>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                {" "}
                                Ruler ticks:{" "}
                                <select
                                    onChange={(e) =>
// @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 2.
                                        this.change(
                                            "rulerTicks",
                                            +e.target.value,
                                        )
                                    }
                                    value={this.props.rulerTicks}
                                >
                                    {_.map([1, 2, 4, 8, 10, 16], function (n) {
                                        return (
                                            <option key={n} value={n}>
                                                {n}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                Ruler pixels per unit:{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'NumberInput' cannot be used as a JSX component. */}
                                <NumberInput
                                    placeholder={40}
// @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 1.
                                    onChange={this.change("rulerPixels")}
                                    value={this.props.rulerPixels}
                                    useArrowKeys={true}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Ruler length in units:{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'NumberInput' cannot be used as a JSX component. */}
                                <NumberInput
                                    placeholder={10}
// @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 1.
                                    onChange={this.change("rulerLength")}
                                    value={this.props.rulerLength}
                                    useArrowKeys={true}
                                />
                            </label>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    _changeUrl: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        this._changeImage("url", e.target.value);
    };

    _changeTop: (arg1: any) => void = (newTop) => {
        this._changeImage("top", newTop);
    };

    _changeLeft: (arg1: any) => void = (newLeft) => {
        this._changeImage("left", newLeft);
    };

    _changeImage: (arg1: string, arg2: any) => void = (subProp, newValue) => {
        const image = _.clone(this.props.image);
        image[subProp] = newValue;
// @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 2.
        this.change("image", image);
    };

    renderLabelChoices: (arg1: ReadonlyArray<[string, string]>) => ReadonlyArray<React.ReactElement<React.ComponentProps<'option'>>> = (choices) => {
        return _.map(choices, function (nameAndValue) {
            const [name, value] = nameAndValue;
            return (
                <option key={value} value={value}>
                    {name}
                </option>
            );
        });
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };
}

export default MeasurerEditor;
