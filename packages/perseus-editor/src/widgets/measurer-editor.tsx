import {components, EditorJsonify} from "@khanacademy/perseus";
import {measurerLogic} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import * as React from "react";
import _ from "underscore";

import type {
    MeasurerDefaultWidgetOptions,
    PerseusMeasurerWidgetOptions,
} from "@khanacademy/perseus-core";

const {InfoTip, NumberInput, RangeInput} = components;

const defaultImage = {
    url: null,
    top: 0,
    left: 0,
} as const;

type Props = {
    box: ReadonlyArray<number>;
    image?: {
        url?: string | null;
        top?: number;
        left?: number;
    };
    showProtractor?: boolean;
    showRuler?: boolean;
    rulerLabel?: string;
    rulerTicks?: number;
    rulerPixels?: number;
    rulerLength?: number;
    onChange: (partial: Partial<PerseusMeasurerWidgetOptions>) => void;
};

class MeasurerEditor extends React.Component<Props> {
    static widgetName = "measurer" as const;

    static defaultProps: MeasurerDefaultWidgetOptions =
        measurerLogic.defaultWidgetOptions;

    className = "perseus-widget-measurer";

    _changeUrl: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        this._changeImage("url", e.target.value);
    };

    _changeTop: (newTop: number | null) => void = (newTop) => {
        this._changeImage("top", newTop);
    };

    _changeLeft: (newLeft: number | null) => void = (newLeft) => {
        this._changeImage("left", newLeft);
    };

    _changeImage: (
        subProp: "url" | "top" | "left",
        newValue: string | number | null,
    ) => void = (subProp, newValue) => {
        this.props.onChange({image: {...this.props.image, [subProp]: newValue}});
    };

    renderLabelChoices: (
        arg1: ReadonlyArray<[string, string]>,
    ) => ReadonlyArray<React.ReactElement<React.ComponentProps<"option">>> = (
        choices,
    ) => {
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

    render(): React.ReactNode {
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
                    <InfoTip>
                        <p>
                            Create an image in graphie, or use the &quot;Add
                            image&quot; function to create a background.
                        </p>
                    </InfoTip>
                </div>
                {image.url && (
                    <div className="perseus-widget-row">
                        <label className="perseus-widget-left-col">
                            Pixels from top:{" "}
                            <NumberInput
                                placeholder={0}
                                onChange={this._changeTop}
                                value={image.top}
                                useArrowKeys={true}
                            />
                        </label>
                        <label className="perseus-widget-right-col">
                            Pixels from left:{" "}
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
                    <RangeInput
                        onChange={(value) =>
                            this.props.onChange({box: value as [number, number]})
                        }
                        value={this.props.box}
                        useArrowKeys={true}
                    />
                </div>
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        <Checkbox
                            label="Show ruler"
                            checked={this.props.showRuler}
                            onChange={(value) => {
                                this.props.onChange({showRuler: value});
                            }}
                        />
                    </div>
                    <div className="perseus-widget-right-col">
                        <Checkbox
                            label="Show protractor"
                            checked={this.props.showProtractor}
                            onChange={(value) => {
                                this.props.onChange({showProtractor: value});
                            }}
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
                                        this.props.onChange({
                                            rulerLabel: e.target.value,
                                        })
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
                                        this.props.onChange({
                                            rulerTicks: +e.target.value,
                                        })
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
                                <NumberInput
                                    placeholder={40}
                                    onChange={(value) => {
                                        if (value != null) {
                                            this.props.onChange({
                                                rulerPixels: value,
                                            });
                                        }
                                    }}
                                    value={this.props.rulerPixels}
                                    useArrowKeys={true}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Ruler length in units:{" "}
                                <NumberInput
                                    placeholder={10}
                                    onChange={(value) => {
                                        if (value != null) {
                                            this.props.onChange({
                                                rulerLength: value,
                                            });
                                        }
                                    }}
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
}

export default MeasurerEditor;
