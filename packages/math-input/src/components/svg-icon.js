/**
 * A component that renders a single SVG icon.
 */

const React = require("react");
const PropTypes = require("prop-types");

const Iconography = require("./iconography");

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
