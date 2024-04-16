import * as React from "react";
import {SVGProps} from "react";
import {vec} from "mafs";

export type Props = {
    start: vec.Vector2;
    end: vec.Vector2;
    style?: SVGProps<SVGLineElement>["style"];
    className?: string;
    testId?: string;
}

export function SVGLine(props: Props) {
    const {start, end, style, className, testId} = props;
    return (
        <line
            x1={start[0]}
            y1={start[1]}
            x2={end[0]}
            y2={end[1]}
            style={style}
            className={`${className}`}
            data-test-id={testId}
        />
    );
}
