import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render} from "@testing-library/react";
import {testDependenciesV2} from "perseus/testing/test-dependencies";
import * as React from "react";

import WrappedServerItemRenderer from "../server-item-renderer";

import type {ServerItemRenderer} from "../server-item-renderer";
import type {APIOptions} from "../types";
import type {PerseusItem} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

// This looks alot like `widgets/__tests__/renderQuestion.jsx', except we use
// the ServerItemRenderer instead of Renderer
export const renderQuestion = (
    question: PerseusItem,
    apiOptions: APIOptions = Object.freeze({}),
    optionalProps: Partial<
        PropsFor<typeof WrappedServerItemRenderer>
    > = Object.freeze({}),
): {
    container: HTMLElement;
    renderer: ServerItemRenderer;
} => {
    let renderer: ServerItemRenderer | null = null;

    const {container} = render(
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
    return {container, renderer};
};
