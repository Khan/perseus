import {MathJaxRenderer} from "@khanacademy/mathjax-renderer";
import {Transform} from "mafs";
import * as React from "react";

import type {vec} from "mafs";

export const StaticLabel = (props: {tex: string; coords: vec.Vector2}) => {
    const {renderSvg} = new MathJaxRenderer({
        fontURL: "",
        shouldFixUnicodeLayout: true,
    });

    const svg = renderSvg(props.tex);

    return (
        <Transform translate={props.coords}>
            <g
                style={{
                    color: "white",
                    transform: `var(--mafs-view-transform) var(--mafs-user-transform)`,
                }}
                className="mafs-shadow"
            >
                <MountInG svg={svg} />
            </g>
        </Transform>
    );
};

const MountInG = (props: {svg: SVGElement}) => {
    const ref = React.useRef<SVGGElement>(null);

    React.useLayoutEffect(() => {
        if (ref.current) {
            ref.current.appendChild(props.svg as any);
        }
    });

    // styles to normalize after mafs transforms
    return (
        <g
            ref={ref}
            style={{
                scale: "0.05 -0.05",
            }}
        />
    );
};
