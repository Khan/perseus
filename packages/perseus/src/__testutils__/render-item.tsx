import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render} from "@testing-library/react";
import * as React from "react";

import {setDependencies} from "../dependencies";
import ServerItemRenderer from "../server-item-renderer";
import {
    testDependencies,
    testDependenciesV2,
} from "../testing/test-dependencies";

import type {ServerItemRendererHandle} from "../server-item-renderer";
import type {APIOptions} from "../types";
import type {PerseusItem} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

/**
 * Renders a whole `PerseusItem` (question, hints, answer area) with the
 * ServerItemRenderer. Widget tests use `renderQuestion` instead.
 */
export const renderItem = (
    question: PerseusItem,
    apiOptions: APIOptions = Object.freeze({}),
    optionalProps: Partial<PropsFor<typeof ServerItemRenderer>> = Object.freeze(
        {},
    ),
): {
    container: HTMLElement;
    renderer: ServerItemRendererHandle;
    rerender: any;
    unmount: () => void;
} => {
    setDependencies(testDependencies);

    let renderer: ServerItemRendererHandle | null = null;
    const {container, rerender, unmount} = render(
        <RenderStateRoot>
            <ServerItemRenderer
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
            PropsFor<typeof ServerItemRenderer>
        > = Object.freeze({}),
    ) => {
        rerender(
            <RenderStateRoot>
                <ServerItemRenderer
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

    return {container, renderer, rerender: renderAgain, unmount};
};
