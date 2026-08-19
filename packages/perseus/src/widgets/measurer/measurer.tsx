import {type PerseusMeasurerWidgetOptions} from "@khanacademy/perseus-core";
import * as React from "react";

import SvgImage from "../../components/svg-image";
import GraphUtils from "../../util/graph-utils";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/measurer/measurer-ai-utils";

import type {Coord} from "../../interactive2/types";
import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {Interval} from "../../util/interval";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";

type Props = WidgetProps<PerseusMeasurerWidgetOptions>;

class Measurer extends React.Component<Props> implements Widget {
    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;
    graphieDivRef = React.createRef<HTMLDivElement>();
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
        const graphieDiv = this.graphieDivRef.current;
        if (graphieDiv == null) {
            throw new Error("No graphie container div found");
        }
        graphieDiv.innerHTML = "";
        const graphie = GraphUtils.createGraphie(graphieDiv);

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
            this.protractor = graphie.protractor([7.5, 0.5]);
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
                            // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: authored LTR coordinate (math/graph/image); content doesn't flip with page direction, so converting to logical insets would misplace/misalign it in RTL
                            top: image.top ?? 0,
                            // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: authored LTR coordinate (math/graph/image); content doesn't flip with page direction, so converting to logical insets would misplace/misalign it in RTL
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
                <div className="graphie" ref={this.graphieDivRef} />
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
