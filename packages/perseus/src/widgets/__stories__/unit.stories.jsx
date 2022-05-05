// @flow
import * as React from "react";

import {ApiOptions} from "../../perseus-api.jsx";
import {OldUnitInput} from "../unit.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Widgets/Unit",
}: Story);

export const StaticRender = (args: StoryArgs): React.Node => {
    return (
        <OldUnitInput
            apiOptions={{
                ...ApiOptions.defaults,
                staticRender: true,
            }}
            value="2 tbsp"
            onFocus={() => {}}
            onBlur={() => {}}
            onChange={({value}) => {}}
        />
    );
};

export const NonStaticRender = (args: StoryArgs): React.Node => {
    return (
        <OldUnitInput
            apiOptions={{
                ...ApiOptions.defaults,
                staticRender: false,
            }}
            value="2 tbsp"
            onFocus={() => {}}
            onBlur={() => {}}
            onChange={({value}) => {}}
        />
    );
};
