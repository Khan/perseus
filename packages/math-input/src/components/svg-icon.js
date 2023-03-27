/**
 * A component that renders a single SVG icon.
 */

import PropTypes from "prop-types";
import * as React from "react";

import * as Iconography from "./iconography/index";

class SvgIcon extends React.Component {
    static propTypes = {
        color: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    };

    render() {
        const {color, name} = this.props;

        // eslint-disable-next-line import/namespace
        const SvgForName = Iconography[name];
        return <SvgForName color={color} />;
    }
}

export default SvgIcon;
