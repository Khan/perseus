/**
 * A component that renders a single SVG icon.
 */

import * as React from "react";

import * as Iconography from "../iconography/index";

type Props = {
    color: string;
    name: string;
};

class SvgIcon extends React.Component<Props> {
    render() {
        const {color, name} = this.props;

        // eslint-disable-next-line import/namespace
        const SvgForName = Iconography[name];
        return <SvgForName color={color} />;
    }
}

export default SvgIcon;
