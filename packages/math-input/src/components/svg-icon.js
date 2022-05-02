/**
 * A component that renders a single SVG icon.
 */

import PropTypes from "prop-types";
import React from "react";

const Iconography = require("./iconography/index.js");

class SvgIcon extends React.Component {
    static propTypes = {
        color: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    };

    render() {
        const {color, name} = this.props;

        const SvgForName = Iconography[name];
        return <SvgForName color={color} />;
    }
}

module.exports = SvgIcon;
