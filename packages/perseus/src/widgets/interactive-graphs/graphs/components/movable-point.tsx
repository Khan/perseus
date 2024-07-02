import {color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";
import {useRef} from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {snap} from "../../math";
import {useDraggable} from "../use-draggable";

import {MovablePointView} from "./movable-point-view";

import type {CSSCursor} from "./css-cursor";
import type {vec} from "mafs";

type Props = {
    point: vec.Vector2;
    onMove: (newPoint: vec.Vector2) => unknown;
    color?: string;
    cursor?: CSSCursor | undefined;
    snapTo?: "grid" | "angles" | "sides";
};

export const StyledMovablePoint = (props: Props) => {
    const {snapStep} = useGraphConfig();
    const elementRef = useRef<SVGGElement>(null);
    const {point, onMove, cursor, color = WBColor.blue, snapTo} = props;
    const snapToValue = snapTo ?? "grid";
    const {dragging} = useDraggable({
        gestureTarget: elementRef,
        point,
        onMove,
        constrain: (p) =>
            ["angles", "sides"].includes(snapToValue) ? p : snap(snapStep, p),
    });

    return (
        <MovablePointView
            ref={elementRef}
            point={point}
            color={color}
            dragging={dragging}
            focusBehavior={{type: "uncontrolled", tabIndex: 0}}
            cursor={cursor}
        />
    );
};
