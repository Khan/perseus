/**
 *  A widget that creates blank dropzones for "Drag And Drop" widgets to drop answer tiles into.
 */

import * as React from "react";

import type {BlankProps} from "./blank.class";

export const BlankComponent = (props: BlankProps) => {
    const {displayType} = props;
    return <span>Blank Widget Stub, displayType is: {displayType}</span>;
};
