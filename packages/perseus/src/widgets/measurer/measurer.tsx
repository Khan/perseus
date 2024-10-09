import $ from "jquery";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import SvgImage from "../../components/svg-image";
import GraphUtils from "../../util/graph-utils";
import noopValidator from "../__shared__/noop-validator";

import type {Coord} from "../../interactive2/types";
import type {APIOptions, Widget, WidgetExports} from "../../types";
import type {Interval} from "../../util/interval";

const defaultImage = {
    url: null,
    top: 0,
    left: 0,
} as const;

type Props = {
    apiOptions: APIOptions;
    box: [number, number];
    image: {
        url?: string;
        top?: number;
        left?: number;
    };
    showProtractor: boolean;
    protractorX: number;
    protractorY: number;
    showRuler: boolean;
    rulerLabel: string;
    rulerTicks: number;
    rulerPixels: number;
    rulerLength: number;
};

type DefaultProps = {
    box: Props["box"];
    image: Props["image"];
    showProtractor: Props["showProtractor"];
    protractorX: Props["protractorX"];
    protractorY: Props["protractorY"];
    showRuler: Props["showRuler"];
    rulerLabel: Props["rulerLabel"];
    rulerTicks: Props["rulerTicks"];
    rulerPixels: Props["rulerPixels"];
    rulerLength: Props["rulerLength"];
};

class Measurer extends React.Component<Props> implements Widget {
    static defaultProps: DefaultProps = {
        box: [480, 480],
        image: {},
        showProtractor: true,
        protractorX: 7.5,
        protractorY: 0.5,
        showRuler: false,
        rulerLabel: "",
        rulerTicks: 10,
        rulerPixels: 40,
        rulerLength: 10,
    };

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    state = {};
    ruler;
    protractor;

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
            (prop) => {
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
                this.props.protractorX,
                this.props.protractorY,
            ]);
        }

        if (this.ruler) {
            this.ruler.remove();
        }

        if (this.props.showRuler) {
            // @ts-expect-error - Property 'ruler' does not exist on type 'Graphie'.
            this.ruler = graphie.ruler({
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
    // TODO: things that aren't interactive shouldn't need validators
    validator: () => noopValidator(1),
} as WidgetExports<typeof Measurer>;
