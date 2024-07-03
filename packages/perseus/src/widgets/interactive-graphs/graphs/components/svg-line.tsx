import * as React from "react";

import type {vec} from "mafs";
import type {SVGProps} from "react";
import {X, Y} from "../../math";

export type Props = {
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
