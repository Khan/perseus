import * as React from "react";

import LockedPointSettings from "./locked-point-settings";

import type {Props as LockedPointProps} from "./locked-point-settings";

// Union this type with other locked figure types when they are added.
type Props = LockedPointProps;

const LockedFigureSettings = (props: Props) => {
    if (props.type === "point") {
        return <LockedPointSettings {...props} />;
    }
    return null;
};

export default LockedFigureSettings;
