// @flow

import MovableLine from "./interactive2/movable-line.js";
import MovablePoint from "./interactive2/movable-point.jsx";
import MovablePolygon from "./interactive2/movable-polygon.js";
import Movable from "./interactive2/movable.js";
import KhanColors from "./util/colors.js";

const Interactive2 = {
    MovablePoint: MovablePoint,
    addMovablePoint: function (
        graphie: $FlowFixMe,
        options: $FlowFixMe,
    ): $FlowFixMe {
        // $FlowFixMe[invalid-constructor]
        const movable = new Movable(graphie, {});
        // $FlowFixMe[invalid-constructor]
        return new MovablePoint(graphie, movable, options);
    },
    MovableLine: MovableLine,
    addMovableLine: function (
        graphie: $FlowFixMe,
        options: $FlowFixMe,
    ): $FlowFixMe {
        // $FlowFixMe[invalid-constructor]
        const movable = new Movable(graphie, {});
        // $FlowFixMe[invalid-constructor]
        return new MovableLine(graphie, movable, options);
    },
    MovablePolygon: MovablePolygon,
    addMovablePolygon: function (
        graphie: $FlowFixMe,
        options: $FlowFixMe,
    ): $FlowFixMe {
        // $FlowFixMe[invalid-constructor]
        const movable = new Movable(graphie, {});
        // $FlowFixMe[invalid-constructor]
        return new MovablePolygon(graphie, movable, options);
    },

    addMaybeMobileMovablePoint: function (
        widget: $FlowFixMe,
        extraProps: $FlowFixMe,
    ): $FlowFixMe {
        const isMobile = widget.props.apiOptions.isMobile;

        const commonStyle = isMobile
            ? {
                  stroke: "#ffffff",
                  "stroke-width": 3,
                  fill: KhanColors.INTERACTIVE,
              }
            : {
                  stroke: KhanColors.INTERACTIVE,
                  fill: KhanColors.INTERACTIVE,
              };

        const normalStyle = Object.assign(commonStyle, extraProps.normalStyle);

        const highlightStyle = Object.assign(
            isMobile
                ? {
                      ...commonStyle,
                      "stroke-width": 0,
                      scale: 0.75,
                  }
                : {},
            extraProps.highlightStyle,
        );

        // $FlowFixMe[prop-missing]
        const props = Object.assign(
            {
                normalStyle: normalStyle,
                highlightStyle: highlightStyle,
                shadow: isMobile,
                tooltip: isMobile && widget.props.showTooltips,
                showHairlines: widget.showHairlines,
                hideHairlines: widget.hideHairlines,
            },
            isMobile ? {pointSize: 7} : {},
        );

        return Interactive2.addMovablePoint(
            widget.graphie,
            Object.assign(extraProps, props),
        );
    },
};

export default Interactive2;
