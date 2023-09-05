import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render} from "@testing-library/react";
import * as React from "react";

// eslint-disable-next-line import/no-relative-packages
import {testDependenciesV2} from "../../../../../testing/test-dependencies";
import {DependenciesContext} from "../../dependencies";
import * as Perseus from "../../index";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";

import type {PerseusRenderer} from "../../perseus-types";
import type {APIOptions} from "../../types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type RenderResult = ReturnType<typeof render>;

export const renderQuestion = (
    question: PerseusRenderer,
    apiOptions: APIOptions = Object.freeze({}),
    extraProps?: PropsFor<typeof Perseus.Renderer>,
): {
    container: HTMLElement;
    renderer: Perseus.Renderer;
    rerender: (
        question: PerseusRenderer,
        extraProps?: PropsFor<typeof Perseus.Renderer>,
    ) => void;
    unmount: RenderResult["unmount"];
} => {
    registerAllWidgetsForTesting();

    let renderer: Perseus.Renderer | null = null;
    const {container, rerender, unmount} = render(
        <RenderStateRoot>
            <DependenciesContext.Provider value={testDependenciesV2}>
                <Perseus.Renderer
                    ref={(node) => (renderer = node)}
                    content={question.content}
                    images={question.images}
                    widgets={question.widgets}
                    problemNum={0}
                    apiOptions={apiOptions}
                    {...extraProps}
                />
            </DependenciesContext.Provider>
        </RenderStateRoot>,
    );
    if (!renderer) {
        throw new Error(`Failed to render!`);
    }
    const renderAgain = (
        question: PerseusRenderer,
        extraProps: undefined | React.ComponentProps<typeof Perseus.Renderer>,
    ) => {
        rerender(
            <RenderStateRoot>
                <DependenciesContext.Provider value={testDependenciesV2}>
                    <Perseus.Renderer
                        ref={(node) => (renderer = node)}
                        content={question.content}
                        images={question.images}
                        widgets={question.widgets}
                        problemNum={0}
                        apiOptions={apiOptions}
                        {...extraProps}
                    />
                </DependenciesContext.Provider>
            </RenderStateRoot>,
        );
        if (!renderer) {
            throw new Error(`Failed to rerender!`);
        }
    };

    return {container, renderer, rerender: renderAgain, unmount};
};
