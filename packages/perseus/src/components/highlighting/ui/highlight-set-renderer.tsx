/* eslint-disable react/no-unsafe */
/**
 * Render a set of highlights. See HighlightRenderer for more details about how
 * each highlight is rendered.
 *
 * This component manages the state of the "Remove highlight" tooltip. To
 * determine the currently-hovered highlight, it calls the `isHovered` method
 * on each HighlightRenderer.
 */
import * as React from "react";

import {PerseusI18nContext} from "../../i18n-context";

import HighlightRenderer from "./highlight-renderer";
import HighlightTooltip from "./highlight-tooltip";

import type {DOMHighlightSet, Position, ZIndexes} from "./types";

type Props = {
    // Whether the highlights are user-editable. If false, highlights are
    // read-only.
    editable: boolean;
    // A set of highlights to render.
    highlights: DOMHighlightSet;
    // This component's `offsetParent` element, which is the nearest ancestor
    // with `position: relative`. This will enable us to choose the correct
    // CSS coordinates to align highlights and tooltips with the target
    // content.
    offsetParent: Element;
    // A callback indicating that the user would like to remove the highlight
    // with the given key.
    onRemoveHighlight: (highlightKey: string) => unknown;
    // The z-indexes to use when rendering tooltips above content, and
    // highlights below content.
    zIndexes: ZIndexes;
};
type State = {
    // If the user is currently hovering over a highlight, this field contains
    // its key.
    hoveredHighlightKey: string | null | undefined;
    // If the user is currently hovering over the "Remove highlight" tooltip,
    // this field contains the key of the corresponding highlight.
    hoveringTooltipFor: string | null | undefined;
};

class HighlightSetRenderer extends React.PureComponent<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    state: State = {
        hoveredHighlightKey: null,
        hoveringTooltipFor: null,
    };

    _highlightRenderers: {
        [highlightKey: string]: HighlightRenderer;
    } = {};

    componentDidMount() {
        this._updateEditListeners(false, this.props.editable);
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        this._updateEditListeners(this.props.editable, nextProps.editable);

        // If we were previously hovering over a highlight that has been
        // removed, reset the hover state accordingly.
        if (
            this.state.hoveredHighlightKey != null &&
            !(this.state.hoveredHighlightKey in nextProps.highlights)
        ) {
            this.setState({hoveredHighlightKey: null});
        }

        // Similarly, if we were previously hovering over the tooltip for a
        // highlight that has been removed, reset the hover state accordingly.
        if (
            this.state.hoveringTooltipFor != null &&
            !(this.state.hoveringTooltipFor in nextProps.highlights)
        ) {
            this.setState({hoveringTooltipFor: null});
        }
    }

    componentWillUnmount() {
        this._updateEditListeners(this.props.editable, false);
    }

    /**
     * Given whether we were previously listening to mousemove events, and
     * whether we will now listen to mousemove events, add or remove the
     * listener accordingly.
     */
    _updateEditListeners(wasListening: boolean, willListen: boolean) {
        if (!wasListening && willListen) {
            window.addEventListener("mousemove", this._handleMouseMove);
        } else if (wasListening && !willListen) {
            window.removeEventListener("mousemove", this._handleMouseMove);

            // Additionally, reset the hover state, to ensure that we don't
            // keep old hover state around.
            this.setState({
                hoveredHighlightKey: null,
                hoveringTooltipFor: null,
            });
        }
    }

    _handleMouseMove: (e: MouseEvent) => void = (e: MouseEvent) => {
        const mouseClientPosition = {left: e.clientX, top: e.clientY} as const;
        const hoveredHighlightKey =
            this._getHoveredHighlightKey(mouseClientPosition);
        this.setState({hoveredHighlightKey});
    };

    _getHoveredHighlightKey(
        mouseClientPosition: Position,
    ): string | null | undefined {
        // If we're hovering over the tooltip, the hovered highlight is the
        // highlight that the tooltip is pointing to.
        const {hoveringTooltipFor} = this.state;
        if (typeof hoveringTooltipFor === "string") {
            return hoveringTooltipFor;
        }

        // Otherwise, check each highlight renderer to see whether the current
        // mouse position intersects any of the highlight rectangles.
        const highlightKeys = Object.keys(this.props.highlights);
        return highlightKeys.find((key) => {
            const highlightRenderer = this._highlightRenderers[key];
            return (
                highlightRenderer &&
                highlightRenderer.isHovered(mouseClientPosition)
            );
        });
    }

    _renderTooltip(): null | React.ReactNode {
        const {hoveredHighlightKey} = this.state;
        if (hoveredHighlightKey == null) {
            return null;
        }

        const hoveredHighlight = this.props.highlights[hoveredHighlightKey];

        return (
            <HighlightTooltip
                label={this.context.strings.removeHighlight}
                focusNode={hoveredHighlight.domRange.endContainer}
                focusOffset={hoveredHighlight.domRange.endOffset}
                offsetParent={this.props.offsetParent}
                onClick={() =>
                    this.props.onRemoveHighlight(hoveredHighlightKey)
                }
                onMouseEnter={() =>
                    this.setState({hoveringTooltipFor: hoveredHighlightKey})
                }
                onMouseLeave={() => this.setState({hoveringTooltipFor: null})}
            />
        );
    }

    render(): React.ReactNode {
        return (
            <div>
                {Object.keys(this.props.highlights).map((key) => (
                    <HighlightRenderer
                        ref={(r) => {
                            if (r) {
                                this._highlightRenderers[key] = r;
                            } else {
                                delete this._highlightRenderers[key];
                            }
                        }}
                        key={key}
                        highlight={this.props.highlights[key]}
                        highlightKey={key}
                        offsetParent={this.props.offsetParent}
                        zIndexes={this.props.zIndexes}
                    />
                ))}
                {this.props.editable && this._renderTooltip()}
            </div>
        );
    }
}

export default HighlightSetRenderer;
