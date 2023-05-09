import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
// eslint-disable-next-line import/no-extraneous-dependencies
import {render} from "@testing-library/react";
import * as React from "react";

import * as Perseus from "../../index";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";

import type {PerseusRenderer} from "../../perseus-types";
import type {APIOptions} from "../../types";

type RenderResult = ReturnType<typeof render>;

export const renderQuestion = (
    question: PerseusRenderer,
    apiOptions: APIOptions = Object.freeze({}),
    extraProps?: React.ElementConfig<typeof Perseus.Renderer>,
): {
    container: HTMLElement;
    renderer: Perseus.Renderer;
    rerender: (
        question: PerseusRenderer,
        extraProps?: React.ElementConfig<typeof Perseus.Renderer>,
    ) => void;
    unmount: RenderResult["unmount"];
} => {
    registerAllWidgetsForTesting();
    let renderer: Perseus.Renderer | null = null;
    const {container, rerender, unmount} = render(
        <RenderStateRoot>
            <Perseus.Renderer
                ref={(node) => (renderer = node)}
                content={question.content}
                images={question.images}
                widgets={question.widgets}
                problemNum={0}
                apiOptions={apiOptions}
                {...extraProps}
            />
        </RenderStateRoot>,
    );
    if (!renderer) {
        throw new Error(`Failed to render!`);
    }
    const renderAgain = (
        question: PerseusRenderer,
        // @ts-expect-error [FEI-5003] - TS2344 - Type 'typeof Renderer' does not satisfy the constraint 'keyof IntrinsicElements | JSXElementConstructor<any>'.
        extraProps: undefined | React.ComponentProps<typeof Perseus.Renderer>,
    ) => {
        rerender(
            <RenderStateRoot>
                <Perseus.Renderer
                    ref={(node) => (renderer = node)}
                    content={question.content}
                    images={question.images}
                    widgets={question.widgets}
                    problemNum={0}
                    apiOptions={apiOptions}
                    {...extraProps}
                />
            </RenderStateRoot>,
        );
        if (!renderer) {
            throw new Error(`Failed to rerender!`);
        }
    };

    return {container, renderer, rerender: renderAgain, unmount};
};
