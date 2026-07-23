import {type PerseusMeasurerWidgetOptions} from "@khanacademy/perseus-core";
import $ from "jquery";
import * as React from "react";
import ReactDOM from "react-dom";

import SvgImage from "../../components/svg-image";
import GraphUtils from "../../util/graph-utils";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/measurer/measurer-ai-utils";

import type {Coord} from "../../interactive2/types";
import type {Widget, WidgetExports, WidgetPropsV2} from "../../types";
import type {Interval} from "../../util/interval";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";

type Props = WidgetPropsV2<PerseusMeasurerWidgetOptions>;

class Measurer extends React.Component<Props> implements Widget {
    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    ruler;
    protractor;

    componentDidMount() {
        this.setupGraphie();
    }

    componentDidUpdate(prevProps: Props) {
        const propsAffectingGraphie = [
            "box",
            "showProtractor",
            "showRuler",
            "rulerLabel",
            "rulerTicks",
            "rulerPixels",
            "rulerLength",
        ] satisfies Array<keyof PerseusMeasurerWidgetOptions>;

        const shouldSetupGraphie = propsAffectingGraphie.some(
            (prop) => prevProps.options[prop] !== this.props.options[prop],
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
            [0, this.props.options.box[0] / scale[0]],
            [0, this.props.options.box[1] / scale[1]],
        ];
        graphie.init({
            range: range,
            scale: scale,
        });
        graphie.addMouseLayer({
            allowScratchpad: true,
        });

        if (this.protractor) {
            this.protractor.remove();
        }

        if (this.props.options.showProtractor) {
            // @ts-expect-error - Property 'protractor' does not exist on type 'Graphie'.
            this.protractor = graphie.protractor([]);
        }

        if (this.ruler) {
            this.ruler.remove();
        }

        if (this.props.options.showRuler) {
            // @ts-expect-error - Property 'ruler' does not exist on type 'Graphie'.
            this.ruler = graphie.ruler({
                center: [
                    (range[0][0] + range[0][1]) / 2,
                    (range[1][0] + range[1][1]) / 2,
                ],
                label: this.props.options.rulerLabel,
                pixelsPerUnit: this.props.options.rulerPixels,
                ticksPerUnit: this.props.options.rulerTicks,
                units: this.props.options.rulerLength,
            });
        }
    }

    getPromptJSON(): UnsupportedWidgetPromptJSON {
        return _getPromptJSON();
    }

    render() {
        const {image} = this.props.options;

        return (
            <div
                className={
                    "perseus-widget perseus-widget-measurer " +
                    "graphie-container blank-background"
                }
                style={{
                    width: this.props.options.box[0],
                    height: this.props.options.box[1],
                }}
            >
                {image.url && (
                    <div
                        style={{
                            position: "relative",
                            top: image.top ?? 0,
                            left: image.left ?? 0,
                        }}
                    >
                        {/* @ts-expect-error - TS2741 - Property 'alt' is missing in type '{ src: any; }' but required in type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "children" | "height" | "width" | "title" | "alt" | "trackInteraction" | "preloader" | "allowFullBleed" | "extraGraphie" | "overrideAriaHidden">'. */}
                        <SvgImage
                            src={image.url}
                            // Don't allow zooming on an image that's being
                            // used as a measurer background.
                            allowZoom={false}
                        />
                    </div>
                )}
                {/* eslint-disable-next-line react/no-string-refs */}
                <div className="graphie" ref="graphieDiv" />
            </div>
        );
    }
}

export default {
    name: "measurer",
    displayName: "Measurer",
    hidden: true,
    widget: Measurer,
} satisfies WidgetExports<typeof Measurer>;
