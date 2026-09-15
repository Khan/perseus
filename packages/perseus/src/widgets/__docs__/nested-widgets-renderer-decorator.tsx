import * as React from "react";

import ArticleRenderer from "../../article-renderer";
import {storybookDependenciesV2} from "../../testing/test-dependencies-data";
import {registerWidgets} from "../../widgets";
import {definitionRegistration} from "../definition";
import {explanationRegistration} from "../explanation";
import {gradedGroupRegistration} from "../graded-group";
import {imageRegistration} from "../image";
import {interactiveGraphRegistration} from "../interactive-graphs";
import {numericInputRegistration} from "../numeric-input";
import {radioRegistration} from "../radio";
import {videoRegistration} from "../video";

import type {PerseusArticle} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const articleRendererDecorator: Decorator = (
    _,
    {parameters}: {parameters: {question?: PerseusArticle}},
) => {
    registerWidgets([
        definitionRegistration,
        explanationRegistration,
        gradedGroupRegistration,
        imageRegistration,
        interactiveGraphRegistration,
        numericInputRegistration,
        radioRegistration,
        videoRegistration,
    ]);

    return (
        <ArticleRenderer
            json={parameters.question!}
            seed={0}
            dependencies={storybookDependenciesV2}
        />
    );
};
