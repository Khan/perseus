/* eslint-disable react/no-unsafe */
// @flow
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import PropTypes from "prop-types";
import * as React from "react";

import draw from "./molecule/molecule-drawing.jsx";
import MoleculeLayout from "./molecule/molecule-layout.jsx";
import SmilesParser from "./molecule/smiles-parser.jsx";

import type {WidgetExports} from "../types.js";

const {layout} = MoleculeLayout;
const parse = SmilesParser.parse;
const ParseError = SmilesParser.ParseError;

const borderSize = 30;

export class Molecule extends React.Component<$FlowFixMe, $FlowFixMe> {
    static propTypes = {
        id: PropTypes.string.isRequired,
        rotationAngle: PropTypes.number,
        smiles: PropTypes.string,
    };

    state: $FlowFixMe = {parsedSmiles: null, error: null};

    // TODO(jangmi, CP-3288): Remove usage of `UNSAFE_componentWillMount`
    UNSAFE_componentWillMount() {
        this.stateFromSmiles(this.props.smiles);
    }

    componentDidMount() {
        this.canvasRender();
    }

    UNSAFE_componentWillReceiveProps(nextProps: $FlowFixMe) {
        this.stateFromSmiles(nextProps.smiles);
    }

    componentDidUpdate() {
        this.canvasRender();
    }

    stateFromSmiles: ($FlowFixMe) => void = (smiles) => {
        try {
            this.setState({
                parsedSmiles: parse(smiles),
                error: null,
            });
        } catch (e) {
            if (e instanceof ParseError) {
                this.setState({error: e.message});
            } else {
                throw e;
            }
        }
    };

    setCanvasBounds: ($FlowFixMe, $FlowFixMe) => $FlowFixMe = (
        canvas,
        items,
    ) => {
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
        // eslint-disable-next-line react/no-string-refs
        const canvas = this.refs.canvas;
        const translation = this.setCanvasBounds(canvas, items);
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(translation[0], translation[1]);
        draw(ctx, items);
        ctx.restore();
    };

    render(): React.Node {
        // TODO(colin): escape the punctuation in the SMILES alt text for
        // screen readers?
        let content = (
            <canvas
                className="molecule-canvas"
                id={this.props.id + "-molecule"}
                // eslint-disable-next-line react/no-string-refs
                ref="canvas"
            >
                {i18n.$_(
                    "A molecular structure drawing. SMILES notation: %(content)s",
                    {
                        content: this.props.smiles,
                    },
                )}
            </canvas>
        );
        if (this.state.error) {
            content = <div className="error">{this.state.error}</div>;
        }
        return <div className="molecule-canvas">{content}</div>;
    }
}

class MoleculeWidget extends React.Component<$FlowFixMe> {
    static propTypes = {
        rotationAngle: PropTypes.number,
        smiles: PropTypes.string,
        widgetId: PropTypes.string,
    };

    static defaultProps: $FlowFixMe = {rotationAngle: 0};

    simpleValidate: ($FlowFixMe) => $FlowFixMe = () => {
        return {type: "points", earned: 0, total: 0, message: null};
    };

    getUserInput: () => $ReadOnlyArray<$ReadOnlyArray<string>> = () => {
        return [];
    };

    validate: ($FlowFixMe, $FlowFixMe) => $FlowFixMe = (state, rubric) => {
        // TODO(colin): this is here as part of the interface for a component.
        // Figure out if there is something more appropriate that this should
        // return.
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    };

    render(): React.Node {
        return (
            <Molecule
                id={this.props.widgetId}
                smiles={this.props.smiles}
                rotationAngle={this.props.rotationAngle}
            />
        );
    }
}

export default ({
    name: "molecule-renderer",
    displayName: "Molecule renderer",
    hidden: true,
    widget: MoleculeWidget,
}: WidgetExports<typeof MoleculeWidget>);
