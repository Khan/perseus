import * as React from "react";

import {usePerseusI18n} from "../components/i18n-context";
import HintsRenderer from "../hints-renderer";
import {useStorybookApiOptions} from "../testing/use-storybook-api-options";

import type {APIOptions, PerseusDependenciesV2} from "../types";
import type {Hint} from "@khanacademy/perseus-core";

interface Props {
    hints: Hint[];
    hintsVisible: number;
    dependencies: PerseusDependenciesV2;
    apiOptions?: APIOptions;
}

export function HintsRendererForStories(props: Props) {
    const mergedApiOptions = useStorybookApiOptions(props.apiOptions);
    const {strings} = usePerseusI18n();
    return (
        <HintsRenderer
            {...props}
            apiOptions={mergedApiOptions}
            strings={strings}
        />
    );
}
