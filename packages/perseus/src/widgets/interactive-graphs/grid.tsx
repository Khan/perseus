import {Coordinates} from "mafs";
import * as React from "react";

import type {PerseusImageBackground} from "../../perseus-types";
import type {SizeClass} from "../../util/sizing-utils";

// const maybeAddBackgroundImage = (props: {
//     backgroundImage?: PerseusImageBackground;
//     containerSizeClass: SizeClass;
// }): [JSX.Element | null, boolean] => {
//     let renderCoords = true;
//     let url = props.backgroundImage?.url;
//     if (!url) {
//         return [null, renderCoords];
//     }
//     const width =
//         props.backgroundImage?.width ?? interactiveSizes.defaultBoxSize;
//     const height =
//         props.backgroundImage?.height ?? interactiveSizes.defaultBoxSize;

//     // replace protocol with https
//     if (url.startsWith("web+graphie")) {
//         url = url.replace(/web\+graphie/, "https") + ".svg";
//     } else {
//         renderCoords = false;
//     }

//     const box = getInteractiveBoxFromSizeClass(props.containerSizeClass);
//     const scale = box[0] / interactiveSizes.defaultBoxSize;
//     return [
//         <image
//             href={url}
//             width={width}
//             height={height}
//             scale={scale}
//             style={{
//                 filter: "invert(1)",
//             }}
//             x={-200}
//             y={-Math.abs(height - 200)}
//         />,
//         renderCoords,
//     ];
// };

const renderLabel = (n: number, [min, max]: [number, number]) =>
    n !== -1 && n !== min && n !== max;

export const Grid = (props: {
    step: number[];
    gridStep: number[];
    range: [[number, number], [number, number]];
    backgroundImage?: PerseusImageBackground;
    containerSizeClass: SizeClass;
}) => {
    // const [backgroundImage, renderCoords] = maybeAddBackgroundImage(props);
    return (
        <>
            {/* {backgroundImage} */}

            <Coordinates.Cartesian
                xAxis={{
                    lines: props.step[0],
                    subdivisions: props.step[0] / props.gridStep[0],
                    labels: (n) => (renderLabel(n, props.range[0]) ? n : ""),
                }}
                yAxis={{
                    lines: props.step[1],
                    subdivisions: props.step[1] / props.gridStep[1],
                    labels: (n) => (renderLabel(n, props.range[1]) ? n : ""),
                }}
            />
        </>
    );
};
