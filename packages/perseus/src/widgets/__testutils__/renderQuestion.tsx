// TODO(LEMS-4304): feature flag cleanup - remove this file.
import {withStrictRegistration} from "@khanacademy/perseus-core";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render} from "@testing-library/react";
import * as React from "react";

import {PerseusI18nContextProvider} from "../../components/i18n-context";
import {
    DependenciesContext,
    useDependencies,
    setDependencies,
} from "../../dependencies";
import Renderer from "../../renderer";
import {mockStrings} from "../../strings";
import {
    testDependenciesV2,
    testDependencies,
} from "../../testing/test-dependencies-data";
import UserInputManager from "../../user-input-manager";

import type {APIOptions, PerseusDependenciesV2} from "../../types";
import type {PerseusRenderer, UserInputMap} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type RenderResult = ReturnType<typeof render>;

type ExtraProps = Omit<PropsFor<typeof Renderer>, "strings">;

type RenderQuestionOptions = {
    apiOptions?: APIOptions;
    extraProps?: ExtraProps;
    initialUserInput?: UserInputMap;
    dependencies?: Partial<PerseusDependenciesV2>;
    locale?: string;
    // Tests that intentionally render an unknown widget can pass `true`. The
    // option renders the empty-widget fallback and leaves strict registration
    // unchanged afterward.
    allowUnregisteredWidgets?: boolean;
};

export const renderQuestion = (
    question: PerseusRenderer,
    options: RenderQuestionOptions = {},
): {
    container: HTMLElement;
    renderer: Renderer;
    rerender: (question: PerseusRenderer, extraProps?: ExtraProps) => void;
    unmount: RenderResult["unmount"];
} => {
    const {
        apiOptions = Object.freeze({}),
        extraProps,
        initialUserInput,
        dependencies = testDependenciesV2,
        locale = "en",
        allowUnregisteredWidgets = false,
    } = options;

    // Provide default dependencies and then let the parameter override
    const depsV2 = {
        ...testDependenciesV2,
        ...dependencies,
    };

    const runWithRegistration = <T,>(fn: () => T): T =>
        allowUnregisteredWidgets ? withStrictRegistration(false, fn) : fn();

    setDependencies(testDependencies);

    let renderer: Renderer | null = null;
    const {container, rerender, unmount} = runWithRegistration(() =>
        render(
            <RenderStateRoot>
                <PerseusI18nContextProvider
                    strings={mockStrings}
                    locale={locale}
                >
                    <DependenciesContext.Provider value={depsV2}>
                        <RendererWrapper
                            ref={(node) => (renderer = node)}
                            question={question}
                            apiOptions={apiOptions}
                            initialUserInput={initialUserInput}
                            extraProps={{
                                ...extraProps,
                                strings: mockStrings,
                            }}
                        />
                    </DependenciesContext.Provider>
                </PerseusI18nContextProvider>
            </RenderStateRoot>,
        ),
    );
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!renderer) {
        throw new Error(`Failed to render!`);
    }
    const renderAgain = (
        question: PerseusRenderer,
        extraProps?: ExtraProps,
    ) => {
        runWithRegistration(() =>
            rerender(
                <RenderStateRoot>
                    <DependenciesContext.Provider value={depsV2}>
                        <RendererWrapper
                            ref={(node) => (renderer = node)}
                            question={question}
                            apiOptions={apiOptions}
                            initialUserInput={initialUserInput}
                            extraProps={{
                                ...extraProps,
                                strings: mockStrings,
                            }}
                        />
                    </DependenciesContext.Provider>
                </RenderStateRoot>,
            ),
        );
        if (!renderer) {
            throw new Error(`Failed to rerender!`);
        }
    };

    return {container, renderer, rerender: renderAgain, unmount};
};

const RendererWrapper = React.forwardRef<
    Renderer,
    {
        question: PerseusRenderer;
        apiOptions: APIOptions;
        extraProps?: PropsFor<typeof Renderer>;
        initialUserInput?: UserInputMap;
    }
>(function RendererWithDependencies(props, ref) {
    const dependencies = useDependencies();
    if (props.extraProps?.userInput) {
        throw new Error("HERE");
    }
    return (
        <UserInputManager
            widgets={props.question.widgets}
            problemNum={0}
            initialUserInput={props.initialUserInput}
        >
            {({userInput, handleUserInput, initializeUserInput}) => {
                return (
                    <Renderer
                        ref={ref}
                        userInput={userInput}
                        handleUserInput={handleUserInput}
                        initializeUserInput={initializeUserInput}
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
            }}
        </UserInputManager>
    );
});
