import * as React from "react";

import ZoomableTex from "../zoomable-tex";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/Zoomable Tex",
} as Story;

type Props = {
    children: React.ReactNode;
};

const ForceZoomWrapper = ({children}: Props): React.ReactElement => (
    <>
        <h1>Click on equation to zoom/unzoom</h1>
        <div style={{width: "50px"}}>{children}</div>
    </>
);

export const Tex = (args: StoryArgs): React.ReactElement => {
    return (
        <ForceZoomWrapper>
            <ZoomableTex children="\sum_{i=1}^\infty\frac{1}{n^2} =\frac{\pi^2}{6}" />
        </ForceZoomWrapper>
    );
};

export const ComplexTex = (args: StoryArgs): React.ReactElement => {
    return (
        <ForceZoomWrapper>
            {" "}
            <ZoomableTex children="\begin{aligned}h\blueE{v_1} \left(\dfrac{\partial f}{\partial x}(x_0, y_0) \right) + h\greenE{v_2}\left( \dfrac{\partial f}{\partial y}(x_0 \redD{+ h\blueE{v_1}}, y_0)\right)\end{aligned}" />
        </ForceZoomWrapper>
    );
};
