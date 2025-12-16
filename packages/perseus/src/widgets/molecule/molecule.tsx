/* eslint-disable react/no-unsafe */
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";

import draw from "./molecule-drawing";
import MoleculeLayout from "./molecule-layout";
import SmilesParser from "./smiles-parser";

import type {Widget, WidgetExports} from "../../types";
import type {PerseusMoleculeRendererWidgetOptions} from "@khanacademy/perseus-core";

const {layout} = MoleculeLayout;
const parse = SmilesParser.parse;
const ParseError = SmilesParser.ParseError;

const borderSize = 30;

type MoleculeState = {
    parsedSmiles: any;
    error: string | null;
};

type Props = {
    widgetId: PerseusMoleculeRendererWidgetOptions["widgetId"];
    smiles: PerseusMoleculeRendererWidgetOptions["smiles"];
    rotationAngle: PerseusMoleculeRendererWidgetOptions["rotationAngle"];
};

// TODO: Add documentation for the Molecule widget
class Molecule extends React.Component<Props, MoleculeState> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    state: MoleculeState = {parsedSmiles: null, error: null};

    canvasRef = React.createRef<HTMLCanvasElement>();

    // TODO(jangmi, CP-3288): Remove usage of `UNSAFE_componentWillMount`
    UNSAFE_componentWillMount() {
        this.stateFromSmiles(this.props.smiles);
    }

    componentDidMount() {
        this.canvasRender();
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        this.stateFromSmiles(nextProps.smiles);
    }

    componentDidUpdate() {
        this.canvasRender();
    }

    stateFromSmiles: (arg1: any) => void = (smiles) => {
        try {
            this.setState({
                // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
                parsedSmiles: parse(smiles),
                error: null,
            });
        } catch (e: any) {
            if (e instanceof ParseError) {
                // @ts-expect-error - TS2339 - Property 'message' does not exist on type '{}'.
                this.setState({error: e.message});
            } else {
                throw e;
            }
        }
    };

    setCanvasBounds: (arg1: any, arg2: any) => any = (canvas, items) => {
        const xmax = Math.max(
            ...items.map((item) => (item.pos ? item.pos[0] : -Infinity)),
        );
        const ymax = Math.max(
            ...items.map((item) => (item.pos ? item.pos[1] : -Infinity)),
        );
        const xmin = Math.min(
            ...items.map((item) => (item.pos ? item.pos[0] : Infinity)),
        );
        const ymin = Math.min(
            ...items.map((item) => (item.pos ? item.pos[1] : Infinity)),
        );
        const width = xmax - xmin + 2 * borderSize;
        const height = ymax - ymin + 2 * borderSize;
        canvas.width = width;
        canvas.height = height;
        return [borderSize - xmin, borderSize - ymin];
    };

    canvasRender: () => void = () => {
        // Since canvas drawing happens only through an imperative API, we sync
        // up the component with the canvas here, which happens when the
        // component mounts or updates.
        if (!!this.state.error || !this.state.parsedSmiles) {
            return;
        }
        const items = layout(this.state.parsedSmiles, this.props.rotationAngle);
        const canvas = this.canvasRef.current;
        if (!canvas) {
            return;
        }
        const translation = this.setCanvasBounds(canvas, items);
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(translation[0], translation[1]);
        draw(ctx, items);
        ctx.restore();
    };

    render(): React.ReactNode {
        // TODO(colin): escape the punctuation in the SMILES alt text for
        // screen readers?
        let content = (
            <canvas
                className="molecule-canvas"
                id={this.props.widgetId + "-molecule"}
                ref={this.canvasRef}
            >
                {this.context.strings.molecularDrawing({
                    content: this.props.smiles || "",
                })}
            </canvas>
        );
        if (this.state.error) {
            content = <div className="error">{this.state.error}</div>;
        }
        return <div className="molecule-canvas">{content}</div>;
    }
}

type DefaultProps = {
    rotationAngle: Props["rotationAngle"];
};

class MoleculeWidget extends React.Component<Props> implements Widget {
    static defaultProps: DefaultProps = {
        rotationAngle: 0,
    };

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    render(): React.ReactNode {
        return (
            <Molecule
                widgetId={this.props.widgetId}
                smiles={this.props.smiles}
                rotationAngle={this.props.rotationAngle}
            />
        );
    }
}

export default {
    name: "molecule-renderer",
    displayName: "Molecule renderer",
    hidden: true,
    widget: MoleculeWidget,
} satisfies WidgetExports<typeof MoleculeWidget>;
