import * as React from "react";

import {X, Y} from "../../math";

import type {vec} from "mafs";
import type {SVGProps} from "react";

type Props = {
    start: vec.Vector2;
    end: vec.Vector2;
    style?: SVGProps<SVGLineElement>["style"];
    className?: string;
    testId?: string;
};

export function SVGLine(props: Props) {
    const {start, end, style, className, testId} = props;
    return (
        <line
            // Use aria-hidden to hide the line from screen readers
            // so it doesn't read as "image" with no context.
            // The elements using this should have their own aria-labels,
            // so this is okay.
            aria-hidden={true}
            x1={start[X]}
            y1={start[Y]}
            x2={end[X]}
            y2={end[Y]}
            style={style}
            className={className}
            data-testid={testId}
        />
    );
}
