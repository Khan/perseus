// @flow
import * as React from "react";

import TexButtons from "../tex-buttons.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Tex Buttons",
}: Story);

export const ButtonSetBasic = (args: StoryArgs): React.Node => {
    return <TexButtons sets={["basic"]} onInsert={() => {}} />;
};

export const ButtonSetBasicDiv = (args: StoryArgs): React.Node => {
    return <TexButtons sets={["basic+div"]} onInsert={() => {}} />;
};

export const ButtonSetTrig = (args: StoryArgs): React.Node => {
    return <TexButtons sets={["trig"]} onInsert={() => {}} />;
};

export const ButtonSetPrealgebra = (args: StoryArgs): React.Node => {
    return <TexButtons sets={["prealgebra"]} onInsert={() => {}} />;
};

export const ButtonSetLogarithms = (args: StoryArgs): React.Node => {
    return <TexButtons sets={["logarithms"]} onInsert={() => {}} />;
};

export const ButtonSetBasicRelations = (args: StoryArgs): React.Node => {
    return <TexButtons sets={["basic relations"]} onInsert={() => {}} />;
};

export const ButtonSetAdvancedRelations = (args: StoryArgs): React.Node => {
    return <TexButtons sets={["advanced relations"]} onInsert={() => {}} />;
};

export const ButtonSetMultiple = (args: StoryArgs): React.Node => {
    return (
        <TexButtons
            sets={["basic", "trig", "advanced relations"]}
            onInsert={() => {}}
        />
    );
};
