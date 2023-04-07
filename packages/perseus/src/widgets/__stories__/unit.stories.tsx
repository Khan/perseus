import * as React from "react";

import {ApiOptions} from "../../perseus-api";
import {OldUnitInput} from "../unit";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Widgets/Unit",
} as Story;

export const NonStaticRender = (args: StoryArgs): React.ReactElement => {
    return (
        <OldUnitInput
            apiOptions={{
                ...ApiOptions.defaults,
            }}
            value="2 tbsp"
            onFocus={() => {}}
            onBlur={() => {}}
            onChange={({value}) => {}}
        />
    );
};
