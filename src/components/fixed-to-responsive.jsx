/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-trailing-spaces, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * A wrapper for a component that would otherwise have a fixed width and
 * height, that magically makes it reponsive while preserving its aspect ratio.
 * Specifically, the component will shrink dynamically when it needs to but
 * won't ever grow past its original dimensions.
 *
 * Can wrap multiple components with the same dimensions at the same time;
 * these will be overlaid on top of each other.
 * 
 * Usage:
 * <FixedToResponsive width={400} height={400}>
 *     <img src="bottom-layer.png" />
 *     <img src="top-layer.png" />
 * </FixedToResponsive>
 */
var classNames = require("classnames");
var React = require("react");

var FixedToResponsive = React.createClass({

    propTypes: {
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        className: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            className: "",
        };
    },

    render: function() {
        // The ideal behavior for responsified, fixed size child components is
        // that they shrink when they need to (while preserving aspect ratio)
        // but never grow larger than their original dimensions. We accomplish
        // this by absolutely positioning the children and telling them to fill
        // up all of a space that has the correct aspect ratio.
        var aspectRatio = this.props.width / this.props.height;

        // This works because padding percentages are interpreted in terms of
        // the width of the containing block, so:
        //     (fixed height / fixed width) * display width = display height
        // Based on http://refills.bourbon.io/components/#video && medium.com
        var spacer = <div style={{
            paddingBottom: (1 / aspectRatio).toFixed(4) * 100 + '%'
        }} />;

        // Prevent child components from growing (aka "the Peter Pan effect")
        var style = {
            maxWidth: this.props.width,
            maxHeight: this.props.height,
        };

        var className = classNames(
            "fixed-to-responsive",
            this.props.className
        );

        return <div className={className} style={style}>
            {spacer}
            {this.props.children}
        </div>;
    }
});

module.exports = FixedToResponsive;
