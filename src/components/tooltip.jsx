/** @jsx React.DOM */

/**
 * A generic tooltip library for React.js
 *
 * This should eventually end up in react-components
 *
 * Interface: ({a, b} means one of a or b)
 * var Tooltip = require("./tooltip.jsx");
 * <Tooltip
 *         className="class-for-tooltip-contents"
 *         horizontalPosition="left" // one of "left", "right"
 *         horizontalAlign="left" // one of "left", "right"
 *         verticalPosition="bottom" // one of "top", "bottom"
 *         arrowSize={10} // arrow size in pixels
 *         borderColor="#ccc" // color of the border for the tooltip
 *         show={true} // whether the tooltip should currently be visible
 *         >
 *     <TargetElementOfTheTooltip />
 *     <TooltipContents1 />
 *     <TooltipContents2 />
 * </Tooltip>
 *
 * To show/hide the tooltip, the parent component should call the
 * .show() and .hide() methods of the tooltip when appropriate.
 * (These are usually set up as handlers of events on the target element.)
 *
 * Notes:
 *     className should not specify a border; that is handled by borderColor
 *     so that the arrow and tooltip match
 */

//          __,,--``\\
//  _,,-''``         \\     ,
// '----------_.------'-.___|\__
//    _.--''``    `)__   )__   @\__
//   (  .. ''---/___,,E/__,E'------`
//    `-''`''
// Here be dragons.

var zIndex = 10;

var TooltipArrow = (() => {

    // Scoped to only be used by TooltipArrow
    var Triangle = React.createClass({
        propTypes: {
            color: React.PropTypes.string.isRequired,
            left: React.PropTypes.number.isRequired,
            "top": React.PropTypes.number.isRequired,
            width: React.PropTypes.number.isRequired,
            height: React.PropTypes.number.isRequired,
            horizontalDirection: React.PropTypes.oneOf(
                ["left", "right"]
            ).isRequired,
            verticalDirection: React.PropTypes.oneOf(
                ["top", "bottom"]
            ).isRequired,
        },

        render: function() {
            var borderLeft, borderRight, borderTop, borderBottom;
            if (this.props.horizontalDirection === "right") {
                borderLeft = this.props.width + "px solid transparent";
            } else {
                borderRight = this.props.width + "px solid transparent";
            }
            if (this.props.verticalDirection === "top") {
                borderTop = this.props.height + "px solid " +
                        this.props.color;
            } else {
                borderBottom = this.props.height + "px solid " +
                        this.props.color;
            }

            return <div style={{
                display: "block",
                height: 0,
                width: 0,
                position: "absolute",
                left: this.props.left,
                "top": this.props["top"],
                borderLeft: borderLeft,
                borderRight: borderRight,
                borderTop: borderTop,
                borderBottom: borderBottom
            }} />;
        }
    });

    return React.createClass({
        propTypes: {
            position: React.PropTypes.string,
            visibility: React.PropTypes.string,
            left: React.PropTypes.number,
            "top": React.PropTypes.number,
            color: React.PropTypes.string.isRequired,  // a css color
            border: React.PropTypes.string.isRequired,  // a css color
            width: React.PropTypes.number.isRequired,
            height: React.PropTypes.number.isRequired,
            horizontalDirection: React.PropTypes.oneOf(
                ["left", "right"]
            ).isRequired,
            verticalDirection: React.PropTypes.oneOf(
                ["top", "bottom"]
            ).isRequired
        },

        getDefaultProps: function() {
            return {
                position: "relative",
                visibility: "visible",
                left: 0,
                "top": 0
            };
        },

        // TODO(jack): Think about adding a box-shadow to the triangle here
        // See http://css-tricks.com/triangle-with-shadow/
        render: function() {
            var isRight = (this.props.horizontalDirection === "right");
            var isTop = (this.props.verticalDirection === "top");

            var frontTopOffset = isTop ? 0 : 1;
            var borderTopOffset = isTop ? 0 : -1;

            return <div style={{
                    display: "block",
                    position: this.props.position,
                    visibility: this.props.visibility,
                    left: this.props.left,
                    "top": this.props["top"],
                    width: this.props.width + 2,
                    height: this.props.height + 1,
                    marginTop: -1,
                    marginBottom: -2,
                    zIndex: zIndex
                }}>
                {/* The background triangle used to create the effect of a
                    border around the foreground triangle*/}
                <Triangle
                    horizontalDirection={this.props.horizontalDirection}
                    verticalDirection={this.props.verticalDirection}
                    color={this.props.border}
                    left={0}
                    top={borderTopOffset}
                    width={this.props.width + 2}  // one extra for the diagonal
                    height={this.props.height + 2} />
                {/* The foreground triangle covers all but the left/right edges
                    of the background triangle */}
                <Triangle
                    horizontalDirection={this.props.horizontalDirection}
                    verticalDirection={this.props.verticalDirection}
                    color={this.props.color}
                    left={1}
                    top={frontTopOffset}
                    width={this.props.width}
                    height={this.props.height} />
            </div>;
        }
    });
})();


var VERTICAL_CORNERS = {
    "top": {
        "top": "-100%"
    },
    bottom: {
        "top": 0
    }
};

var HORIZONTAL_CORNERS = {
    left: {
        targetLeft: 0,
    },

    right: {
        targetLeft: "100%",
    }
};

var HORIZONTAL_ALGINMNENTS = {
    left: {
        tooltipLeft: 0,
        arrowLeft: (arrowSize) => 0
    },
    right: {
        tooltipLeft: "-100%",
        arrowLeft: (arrowSize) => -arrowSize - 2
    }
};


var Tooltip = React.createClass({
    propTypes: {
        show: React.PropTypes.bool.isRequired,
        className: React.PropTypes.string,
        arrowSize: React.PropTypes.number,
        borderColor: React.PropTypes.string,
        verticalPosition: React.PropTypes.oneOf(
            _.keys(VERTICAL_CORNERS)
        ),
        horizontalPosition: React.PropTypes.oneOf(
            _.keys(HORIZONTAL_CORNERS)
        ),
        horizontalAlign: React.PropTypes.oneOf(
            _.keys(HORIZONTAL_ALGINMNENTS)
        ),
        children: React.PropTypes.arrayOf(
            React.PropTypes.component
        ).isRequired
    },

    getDefaultProps: function() {
        return {
            className: "",
            arrowSize: 10,
            borderColor: "#ccc",
            verticalPosition: "bottom",
            horizontalPosition: "left",
            horizontalAlign: "left"
        };
    },

    getInitialState: function() {
        return {
            height: null  // used for offsetting "top" positioned tooltips
        };
    },

    componentWillReceiveProps: function() {
        // If the contents have changed, reset our measure of the height
        this.setState({height: null});
    },

    render: function() {
        var isTooltipAbove = this.props.verticalPosition === "top";

        /* We wrap the entire output in a span so that it displays inline */
        return <span>
            {isTooltipAbove && this._renderToolTipDiv(isTooltipAbove)}

            {/* We wrap our input in a div so that we can put the tooltip in a
                div above/below it */}
            <div>
                {_.first(this.props.children)}
            </div>

            {!isTooltipAbove && this._renderToolTipDiv()}
        </span>;
    },

    _renderToolTipDiv: function(isTooltipAbove) {
        var settings = _.extend({},
            HORIZONTAL_CORNERS[this.props.horizontalPosition],
            HORIZONTAL_ALGINMNENTS[this.props.horizontalAlign],
            VERTICAL_CORNERS[this.props.verticalPosition]
        );

        var arrowAbove;
        var arrowBelow;

        if (isTooltipAbove) {
            // We put an absolutely positioned arrow in the correct place
            arrowAbove = <TooltipArrow
                verticalDirection="top"
                horizontalDirection={this.props.horizontalAlign}
                position="absolute"
                color="white"
                border={this.props.borderColor}
                left={settings.arrowLeft(this.props.arrowSize)}
                top={-this.props.arrowSize + 2}
                width={this.props.arrowSize}
                height={this.props.arrowSize}
                zIndex={zIndex} />;

            // And we use a visibility: hidden arrow below to shift up the
            // content by the correct amount
            arrowBelow = <TooltipArrow
                verticalDirection="top"
                horizontalDirection={this.props.horizontalAlign}
                visibility="hidden"
                color="white"
                border={this.props.borderColor}
                left={settings.arrowLeft(this.props.arrowSize)}
                top={-1}
                width={this.props.arrowSize}
                height={this.props.arrowSize}
                zIndex={zIndex} />;
        } else {
            arrowAbove = <TooltipArrow
                verticalDirection="bottom"
                horizontalDirection={this.props.horizontalAlign}
                color="white"
                border={this.props.borderColor}
                left={settings.arrowLeft(this.props.arrowSize)}
                top={-1}
                width={this.props.arrowSize}
                height={this.props.arrowSize}
                zIndex={zIndex} />;

            arrowBelow = null;
        }

        /* A positioned div below the input to be the parent for our
            tooltip */
        return <div style={{
                position: "relative",
                height: 0,
                display: (this.props.show ? "block" : "none"),
                }}>
            <div ref="tooltipContainer" className="tooltipContainer" style={{
                        position: "absolute",
                        // height must start out undefined, not null, so that
                        // we can measure the actual height with jquery.
                        // This is used to position the tooltip with top: -100%
                        // when in verticalPosition: "top" mode
                        height: this.state.height || undefined,
                        left: settings.targetLeft
                    }}>
                {arrowAbove}

                {/* The contents of the tooltip */}
                <div className={this.props.className}
                        ref="tooltipContent"
                        style={{
                            position: "relative",
                            "top": settings["top"],
                            "left": settings.tooltipLeft,
                            border: "1px solid " + this.props.borderColor,
                            "-webkit-box-shadow": "0 1px 3px " +
                                    this.props.borderColor,
                            "-moz-box-shadow": "0 1px 3px " +
                                    this.props.borderColor,
                            boxShadow: "0 1px 3px " +
                                    this.props.borderColor,
                            zIndex: zIndex - 1
                        }}>
                    {_.rest(this.props.children)}
                </div>

                {arrowBelow}
            </div>
        </div>;
    },

    componentDidMount: function() {
        this._updateHeight();
    },

    componentDidUpdate: function() {
        this._updateHeight();
    },

    _updateHeight: function() {
        var $container = $(this.refs.tooltipContainer.getDOMNode());
        var height = $container.outerHeight();
        if (height !== this.state.height) {
            this.setState({height: height});
        }
    }
});

// Sorry.  // Apology-Oriented-Programming
module.exports = Tooltip;

