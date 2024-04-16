import {MathJaxRenderer} from "@khanacademy/mathjax-renderer";
import React from "react";

import {useTransform} from "./graphs/use-transform";
import useGraphState from "./reducer/use-graph-state";

import type {vec} from "mafs";
import "@khanacademy/mathjax-renderer/src/css/mathjax.css";
import "@khanacademy/mathjax-renderer/src/css/safari-hacks.css";
import "@khanacademy/mathjax-renderer/src/css/selectable.css";

export default function AxisLabels(props) {
    const {state, graphOptions} = useGraphState();

    const yAxisLabelLocation: vec.Vector2 = [0, state.range[1][1]];
    const xAxisLabelLocation: vec.Vector2 = [state.range[0][1], 0];
    const [xAxisLabelText, yAxisLabelText] = graphOptions.labels;
    // console.log(graphOptions.labels);

    const [[x1, y1]] = useTransform(xAxisLabelLocation);
    const [[x2, y2]] = useTransform(yAxisLabelLocation);

    const renderer = new MathJaxRenderer({
        // shouldFixUnicodeLayout ensures that non-ASCII text is correctly
        // measured and positioned in e.g. \overbrace and \underbrace expressions.
        // Set shouldFixUnicodeLayout to false if you're rendering in an
        // environment without a layout engine, e.g. jsdom.
        shouldFixUnicodeLayout: true,
        fontURL: "https://cdn.kastatic.org/fonts/mathjax",
    });

    // const {domElement} = renderer.render(xAxisLabelText);
    // console.log(domElement);

    type Props = {
        children: string;
        onRender?: (root?: any) => unknown;
    };

    function useMathjax({children: tex, onRender}: Props) {
        const {domElement} = renderer.render(tex);

        React.useEffect(() => {
            renderer.updateStyles();
            onRender?.();
        }, [tex, onRender]);
        return (
            <span dangerouslySetInnerHTML={{__html: domElement.outerHTML}} />
        );
    }

    return (
        // Find the length of the label, divide in half, then move the x and y over by that much!
        // can do this with CSS with transform by moving it left 50%
        // Need to add some padding left of x axis label and bottom of y axis label
        <>
            {/*{domElement}*/}
            {/*{useMathjax(xAxisLabelText)}*/}
            <text id="xAxisLabel" x={x1} y={y1}>
                {xAxisLabelText}
            </text>
            <text id="yAxisLabel" x={x2} y={y2}>
                {yAxisLabelText}
            </text>
        </>
    );
}
