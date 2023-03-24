import * as React from "react";

import TexButtons from "../tex-buttons";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/Tex Buttons",
} as Story;

export const ButtonSetBasic: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <TexButtons sets={["basic"]} onInsert={() => {}} />;
};

export const ButtonSetBasicDiv: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <TexButtons sets={["basic+div"]} onInsert={() => {}} />;
};

export const ButtonSetTrig: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <TexButtons sets={["trig"]} onInsert={() => {}} />;
};

export const ButtonSetPrealgebra: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <TexButtons sets={["prealgebra"]} onInsert={() => {}} />;
};

export const ButtonSetLogarithms: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <TexButtons sets={["logarithms"]} onInsert={() => {}} />;
};

export const ButtonSetBasicRelations: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <TexButtons sets={["basic relations"]} onInsert={() => {}} />;
};

export const ButtonSetAdvancedRelations: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <TexButtons sets={["advanced relations"]} onInsert={() => {}} />;
};

export const ButtonSetMultiple: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return (
        <TexButtons
            sets={["basic", "trig", "advanced relations"]}
            onInsert={() => {}}
        />
    );
};
