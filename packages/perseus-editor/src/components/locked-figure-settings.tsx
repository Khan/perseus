/**
 * LockedFigureSettings takes in a figure and renders the
 * respective settings for that figure type.
 *
 * Used in the interactive graph editor's locked figures section.
 */

import * as React from "react";

import LockedEllipseSettings from "./locked-ellipse-settings";
import LockedLineSettings from "./locked-line-settings";
import LockedPointSettings from "./locked-point-settings";
import LockedVectorSettings from "./locked-vector-settings";

import type {Props as LockedEllipseProps} from "./locked-ellipse-settings";
import type {Props as LockedLineProps} from "./locked-line-settings";
import type {Props as LockedPointProps} from "./locked-point-settings";
import type {Props as LockedVectorProps} from "./locked-vector-settings";
import type {LockedFigure} from "@khanacademy/perseus";
import type {Interval} from "mafs";

export type LockedFigureSettingsCommonProps = {
    // Whether to show the M2 features in the locked figure settings.
    // TODO(LEMS-2016): Remove this prop once the M2 flag is fully rolled out.
    showM2Features?: boolean;
    range: [Interval, Interval];
    /**
     * Called when the delete button is pressed.
     */
    onRemove: () => void;
    /**
     * Called when the props (points, color, etc.) are updated.
     */
    onChangeProps: (newProps: Partial<LockedFigure>) => void;
    /**
     * Whether this accordion is expanded.
     */
    expanded?: boolean;
    /**
     * Called when the accordion is expanded or collapsed.
     */
    onToggle?: (expanded: boolean) => void;
};

// Union this type with other locked figure types when they are added.
type Props = LockedFigureSettingsCommonProps &
    (
        | LockedPointProps
        | LockedLineProps
        | LockedEllipseProps
        | LockedVectorProps
    );

const LockedFigureSettings = (props: Props) => {
    switch (props.type) {
        case "point":
            return <LockedPointSettings {...props} />;
        case "line":
            return <LockedLineSettings {...props} />;
        case "ellipse":
            if (props.showM2Features) {
                return <LockedEllipseSettings {...props} />;
            }
            break;
        case "vector":
            if (props.showM2Features) {
                return <LockedVectorSettings {...props} />;
            }
            break;
    }

    return null;
};

export default LockedFigureSettings;
