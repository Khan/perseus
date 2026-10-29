import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
// eslint-disable-next-line import/no-extraneous-dependencies
import {render} from "@testing-library/react";
import * as React from "react";

import {setDependencies} from "../dependencies";
import WrappedServerItemRenderer from "../server-item-renderer";
import {
    testDependencies,
    testDependenciesV2,
} from "../testing/test-dependencies";

import type {ServerItemRenderer} from "../server-item-renderer";
import type {APIOptions} from "../types";
import type {PerseusItem} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

// Like `renderQuestion` in `widgets/__testutils__/render-question.tsx`, but
// renders a whole `PerseusItem` with the ServerItemRenderer.
export const renderItem = (
    question: PerseusItem,
    apiOptions: APIOptions = Object.freeze({}),
    optionalProps: Partial<
        PropsFor<typeof WrappedServerItemRenderer>
    > = Object.freeze({}),
): {
    container: HTMLElement;
    renderer: ServerItemRenderer;
    rerender: any;
} => {
    setDependencies(testDependencies);

    let renderer: ServerItemRenderer | null = null;
    const {container, rerender} = render(
        <RenderStateRoot>
            <WrappedServerItemRenderer
                ref={(node) => (renderer = node)}
                apiOptions={apiOptions}
                item={question}
                problemNum={0}
                reviewMode={false}
                dependencies={testDependenciesV2}
                {...optionalProps}
            />
        </RenderStateRoot>,
    );
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!renderer) {
        throw new Error(`Failed to render!`);
    }
    const renderAgain = (
        question: PerseusItem,
        apiOptions: APIOptions = Object.freeze({}),
        optionalProps: Partial<
            PropsFor<typeof WrappedServerItemRenderer>
        > = Object.freeze({}),
    ) => {
        rerender(
            <RenderStateRoot>
                <WrappedServerItemRenderer
                    ref={(node) => (renderer = node)}
                    apiOptions={apiOptions}
                    item={question}
                    problemNum={0}
                    reviewMode={false}
                    dependencies={testDependenciesV2}
                    {...optionalProps}
                />
            </RenderStateRoot>,
        );
        if (!renderer) {
            throw new Error(`Failed to rerender!`);
        }
    };

    return {container, renderer, rerender: renderAgain};
};
