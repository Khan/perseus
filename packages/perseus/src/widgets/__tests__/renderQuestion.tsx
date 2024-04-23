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

import type {PerseusRenderer} from "../../perseus-types";
import type {APIOptions} from "../../types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type RenderResult = ReturnType<typeof render>;

export const renderQuestion = (
    question: PerseusRenderer,
    apiOptions: APIOptions = Object.freeze({}),
    extraProps?: Omit<PropsFor<typeof Perseus.Renderer>, "strings">,
): {
    container: HTMLElement;
    renderer: Perseus.Renderer;
    rerender: (
        question: PerseusRenderer,
        extraProps?: Omit<PropsFor<typeof Perseus.Renderer>, "strings">,
    ) => void;
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
