/* eslint-disable @babel/no-invalid-this */
import $ from "jquery";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import SvgImage from "../../components/svg-image";
import {ApiOptions} from "../../perseus-api";
import GraphUtils from "../../util/graph-utils";
import noopValidator from "../__shared__/noop-validator";

import type {Coord} from "../../interactive2/types";
import type {WidgetExports, WidgetProps} from "../../types";
import type {Interval} from "../../util/interval";
import {PerseusMeasurerWidgetOptions} from "../../perseus-types";

const defaultImage = {
    url: null,
    top: 0,
    left: 0,
} as const;

type RenderProps = PerseusMeasurerWidgetOptions; // there is no transform as part of exports
type Rubric = {};

type ExternalProps = WidgetProps<RenderProps, Rubric>;

type Props = ExternalProps & {
    apiOptions: NonNullable<ExternalProps["apiOptions"]>;
    box: NonNullable<ExternalProps["box"]>;
    image: ExternalProps["image"];
    showProtractor: NonNullable<ExternalProps["showProtractor"]>;
    showRuler: NonNullable<ExternalProps["showRuler"]>;
    rulerLabel: NonNullable<ExternalProps["rulerLabel"]>;
    rulerTicks: NonNullable<ExternalProps["rulerTicks"]>;
    rulerPixels: NonNullable<ExternalProps["rulerPixels"]>;
    rulerLength: NonNullable<ExternalProps["rulerLength"]>;
};

type DefaultProps = {
    apiOptions: Props["apiOptions"];
    box: Props["box"];
    image: Props["image"];
    showProtractor: Props["showProtractor"];
    showRuler: Props["showRuler"];
    rulerLabel: Props["rulerLabel"];
    rulerTicks: Props["rulerTicks"];
    rulerPixels: Props["rulerPixels"];
    rulerLength: Props["rulerLength"];
};

export class Measurer extends React.Component<Props> {
    displayName: string = "Measurer";
    protractorX: number = 7.5;
    protractorY: number = 0.5;

    static defaultProps: DefaultProps = {
        apiOptions: ApiOptions.defaults,
        box: [480, 480],
        image: {
            url: null,
        },
        showProtractor: true,
        showRuler: false,
        rulerLabel: "",
        rulerTicks: 10,
        rulerPixels: 40,
        rulerLength: 10,
    };

    focus = $.noop;
    protractor: any;
    ruler: any;

    getInitialState() {
        return {};
    }

    componentDidMount() {
        this.setupGraphie();
    }

    componentDidUpdate(prevProps) {
        const shouldSetupGraphie = _.any(
            [
                "box",
                "showProtractor",
                "showRuler",
                "rulerLabel",
                "rulerTicks",
                "rulerPixels",
                "rulerLength",
            ],
            function (prop) {
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                return prevProps[prop] !== this.props[prop];
            },
            this,
        );

        if (shouldSetupGraphie) {
            this.setupGraphie();
        }
    }

    setupGraphie() {
        // eslint-disable-next-line react/no-string-refs
        const graphieDiv = ReactDOM.findDOMNode(this.refs.graphieDiv);
        // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'empty' does not exist on type 'JQueryStatic'.
        $(graphieDiv).empty();
        // @ts-expect-error - Argument of type 'Element | Text | null' is not assignable to parameter of type 'HTMLElement'.
        const graphie = (this.graphie = GraphUtils.createGraphie(graphieDiv));

        const scale: Coord = [40, 40];
        const range: [Interval, Interval] = [
            [0, this.props.box[0] / scale[0]],
            [0, this.props.box[1] / scale[1]],
        ];
        graphie.init({
            range: range,
            scale: scale,
        });
        graphie.addMouseLayer({
            allowScratchpad: true,
            setDrawingAreaAvailable:
                this.props.apiOptions.setDrawingAreaAvailable,
        });

        if (this.protractor) {
            this.protractor.remove();
        }

        if (this.props.showProtractor) {
            // @ts-expect-error - Property 'protractor' does not exist on type 'Graphie'.
            this.protractor = graphie.protractor([
                this.protractorX,
                this.protractorY,
            ]);
        }

        if (this.ruler) {
            this.ruler.remove();
        }

        if (this.props.showRuler) {
            // @ts-expect-error - Property 'ruler' does not exist on type 'Graphie'.
            this._ruler = graphie.ruler({
                center: [
                    (range[0][0] + range[0][1]) / 2,
                    (range[1][0] + range[1][1]) / 2,
                ],
                label: this.props.rulerLabel,
                pixelsPerUnit: this.props.rulerPixels,
                ticksPerUnit: this.props.rulerTicks,
                units: this.props.rulerLength,
            });
        }
    }

    getUserInput() {
        return {};
    }

    validate(
        state: {
            currentValue: string;
        },
        rubric: Rubric,
    ) {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        };
    }

    simpleValidate() {
        return noopValidator(1);
    }

    render() {
        const image = _.extend({}, defaultImage, this.props.image);

        // TODO(scottgrant): This isn't a11y-friendly! We should insist on
        // finding some valid alt text when this widget is used.
        return (
            <div
                className={
                    "perseus-widget perseus-widget-measurer " +
                    "graphie-container above-scratchpad"
                }
                style={{width: this.props.box[0], height: this.props.box[1]}}
            >
                {image.url && (
                    <div
                        style={{
                            position: "relative",
                            top: image.top,
                            left: image.left,
                        }}
                    >
                        {/* @ts-expect-error - TS2741 - Property 'alt' is missing in type '{ src: any; }' but required in type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "children" | "height" | "width" | "title" | "alt" | "trackInteraction" | "preloader" | "allowFullBleed" | "extraGraphie" | "overrideAriaHidden">'. */}
                        <SvgImage src={image.url} />
                    </div>
                )}
                {/* eslint-disable-next-line react/no-string-refs */}
                <div className="graphie" ref="graphieDiv" />
            </div>
        );
    }
}

_.extend(Measurer, {
    validate: noopValidator(1),
});

const propUpgrades = {
    "1": (v0props: any): any => {
        const v1props = _(v0props)
            .chain()
            .omit("imageUrl", "imageTop", "imageLeft")
            .extend({
                image: {
                    url: v0props.imageUrl,
                    top: v0props.imageTop,
                    left: v0props.imageLeft,
                },
            })
            .value();
        return v1props;
    },
} as const;

export default {
    name: "measurer",
    displayName: "Measurer",
    hidden: true,
    widget: Measurer,
    version: {major: 1, minor: 0},
    propUpgrades: propUpgrades,
} as WidgetExports<typeof Measurer>;

function getUserInput() {
    throw new Error("Function not implemented.");
}

function simpleValidate(rubric: any) {
    throw new Error("Function not implemented.");
}
