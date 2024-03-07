import Color from "@khanacademy/wonder-blocks-color";
import {vec, useMovable, useTransformContext} from "mafs";
import * as React from "react";
import {useRef} from "react";

type Props = {
    point: vec.Vector2;
    onMove: (newPoint: vec.Vector2) => unknown;
};

export const MovablePoint = (props: Props) => {
    const hitboxRef = useRef<SVGCircleElement>(null);
    const {point, onMove} = props;

    useMovable({
        gestureTarget: hitboxRef,
        point,
        onMove,
        constrain: (p) => p,
    });

    const {viewTransform, userTransform} = useTransformContext();
    const transformToPx = vec.matrixMult(viewTransform, userTransform);
    const [x, y] = vec.transform(point, transformToPx);

    return (
        <g
            ref={hitboxRef}
            className="movable-point"
            tabIndex={0}
            style={
                {
                    cursor: "grab",
                    touchAction: "none",
                    outline: "none",
                    "--movable-point-color": Color.blue,
                } as any
            }
        >
            <circle className="movable-point-hitbox" r={30} cx={x} cy={y} />
            <circle className="movable-point-halo" r={11} cx={x} cy={y} />
            <circle className="movable-point-ring" r={8} cx={x} cy={y} />
            <circle
                className="movable-point-center"
                r={6}
                cx={x}
                cy={y}
                style={{fill: Color.blue}}
            />
        </g>
    );
};
