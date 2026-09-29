import {semanticColor, tokenValue} from "@khanacademy/wonder-blocks-tokens";

import {Movable} from "./interactive2/movable";
import MovableLine from "./interactive2/movable-line";
import {MovablePoint} from "./interactive2/movable-point";

const Interactive2 = {
    MovablePoint: MovablePoint,
    addMovablePoint: function (graphie: any, options: any): any {
        const movable = new Movable(graphie, {});
        return new MovablePoint(graphie, movable, options);
    },
    MovableLine: MovableLine,
    addMovableLine: function (graphie: any, options: any): any {
        const movable = new Movable(graphie, {});
        return new MovableLine(graphie, movable, options);
    },
    addMovablePointV2: function (widget: any, extraProps: any): any {
        const commonStyle = {
            stroke: tokenValue(semanticColor.core.border.knockout.default),
            "stroke-width": 3,
            fill: tokenValue(semanticColor.core.foreground.instructive.default),
        };

        const normalStyle = Object.assign(commonStyle, extraProps.normalStyle);

        const highlightStyle = Object.assign(
            {
                ...commonStyle,
                "stroke-width": 2,
                scale: 0.75,
            },
            extraProps.highlightStyle,
        );

        const props = Object.assign(
            {
                normalStyle: normalStyle,
                highlightStyle: highlightStyle,
                shadow: true,
                tooltip: widget.props.showTooltips,
                showHairlines: widget.showHairlines,
                hideHairlines: widget.hideHairlines,
            },
            {pointSize: 7},
        );

        return Interactive2.addMovablePoint(
            widget.graphie,
            Object.assign(extraProps, props),
        );
    },
} as const;

export default Interactive2;
