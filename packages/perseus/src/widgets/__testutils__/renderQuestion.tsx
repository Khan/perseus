import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render} from "@testing-library/react";
import * as React from "react";

import {
    testDependenciesV2,
    testDependencies,
    // eslint-disable-next-line import/no-relative-packages
} from "../../../../../testing/test-dependencies";
import {
    DependenciesContext,
    useDependencies,
    setDependencies,
} from "../../dependencies";
import * as Perseus from "../../index";
import {mockStrings} from "../../strings";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";

import type {APIOptions} from "../../types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type RenderResult = ReturnType<typeof render>;

type ExtraProps = Omit<PropsFor<typeof Perseus.Renderer>, "strings">;

export const renderQuestion = (
    question: PerseusRenderer,
    apiOptions: APIOptions = Object.freeze({}),
    extraProps?: ExtraProps,
): {
    container: HTMLElement;
    renderer: Perseus.Renderer;
    rerender: (question: PerseusRenderer, extraProps?: ExtraProps) => void;
    unmount: RenderResult["unmount"];
} => {
    setDependencies(testDependencies);
    registerAllWidgetsForTesting();

    let renderer: Perseus.Renderer | null = null;
    const {container, rerender, unmount} = render(
        <RenderStateRoot>
            <DependenciesContext.Provider value={testDependenciesV2}>
                <Renderer
                    ref={(node) => (renderer = node)}
                    question={question as any}
                    apiOptions={apiOptions}
                    extraProps={{
                        ...extraProps,
                        strings: mockStrings,
                    }}
                />
            </DependenciesContext.Provider>
        </RenderStateRoot>,
    );
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!renderer) {
        throw new Error(`Failed to render!`);
    }
    const renderAgain = (
        question: PerseusRenderer,
        extraProps?: ExtraProps,
    ) => {
        rerender(
            <RenderStateRoot>
                <DependenciesContext.Provider value={testDependenciesV2}>
                    <Renderer
                        ref={(node) => (renderer = node)}
                        question={question}
                        apiOptions={apiOptions}
                        extraProps={{
                            ...extraProps,
                            strings: mockStrings,
                        }}
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

const Renderer = React.forwardRef<
    Perseus.Renderer,
    {
        question: PerseusRenderer;
        apiOptions: APIOptions;
        extraProps?: PropsFor<typeof Perseus.Renderer>;
    }
>((props, ref) => {
    const dependencies = useDependencies();
    return (
        <Perseus.Renderer
            ref={ref}
            content={props.question.content}
            images={props.question.images}
            widgets={props.question.widgets}
            problemNum={0}
            apiOptions={props.apiOptions}
            strings={mockStrings}
            {...props.extraProps}
            {...dependencies}
        />
    );
});
