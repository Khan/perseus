import * as React from "react";

import {ApiOptions} from '../../perseus-api';
import {OldUnitInput} from '../unit';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

export default {
    title: "Perseus/Widgets/Unit",
} as Story;

export const NonStaticRender: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
// @ts-expect-error [FEI-5003] - TS2786 - 'OldUnitInput' cannot be used as a JSX component.
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
