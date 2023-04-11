import * as React from "react";

import TexButtons from "../tex-buttons";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/Tex Buttons",
} as Story;

export const ButtonSetBasic = (args: StoryArgs): React.ReactElement => {
    return <TexButtons sets={["basic"]} onInsert={() => {}} />;
};

export const ButtonSetBasicDiv = (args: StoryArgs): React.ReactElement => {
    return <TexButtons sets={["basic+div"]} onInsert={() => {}} />;
};

export const ButtonSetTrig = (args: StoryArgs): React.ReactElement => {
    return <TexButtons sets={["trig"]} onInsert={() => {}} />;
};

export const ButtonSetPrealgebra = (args: StoryArgs): React.ReactElement => {
    return <TexButtons sets={["prealgebra"]} onInsert={() => {}} />;
};

export const ButtonSetLogarithms = (args: StoryArgs): React.ReactElement => {
    return <TexButtons sets={["logarithms"]} onInsert={() => {}} />;
};

export const ButtonSetBasicRelations = (
    args: StoryArgs,
): React.ReactElement => {
    return <TexButtons sets={["basic relations"]} onInsert={() => {}} />;
};

export const ButtonSetAdvancedRelations = (
    args: StoryArgs,
): React.ReactElement => {
    return <TexButtons sets={["advanced relations"]} onInsert={() => {}} />;
};

export const ButtonSetMultiple = (args: StoryArgs): React.ReactElement => {
    return (
        <TexButtons
            sets={["basic", "trig", "advanced relations"]}
            onInsert={() => {}}
        />
    );
};
