import {render} from "@testing-library/react";
import * as React from "react";

import {KeypadContext, StatefulKeypadContextProvider} from "./keypad-context";

import type {KeypadContextType} from "./types";

describe("StatefulKeypadContextProvider", () => {
    /**
     * Renders a consumer under the provider and hands back the context value it
     * saw, plus how many times it rendered.
     */
    function renderConsumer() {
        const contexts: KeypadContextType[] = [];

        function Consumer() {
            contexts.push(React.useContext(KeypadContext));
            return null;
        }

        const view = render(
            <StatefulKeypadContextProvider>
                <Consumer />
            </StatefulKeypadContextProvider>,
        );

        return {
            ...view,
            contexts,
            latest: () => contexts[contexts.length - 1],
            renderConsumerAgain: () =>
                view.rerender(
                    <StatefulKeypadContextProvider>
                        <Consumer />
                    </StatefulKeypadContextProvider>,
                ),
        };
    }

    it("blurs the renderer that was attached with setRenderer", () => {
        // Arrange
        const renderer = {blur: jest.fn()};
        const {latest} = renderConsumer();

        // Act
        // No act() needed: attaching writes to a ref, so nothing re-renders.
        latest().setRenderer(renderer);
        latest().blurRenderer();

        // Assert
        expect(renderer.blur).toHaveBeenCalledTimes(1);
    });

    it("blurs only the most recently attached renderer", () => {
        // Arrange
        const oldRenderer = {blur: jest.fn()};
        const newRenderer = {blur: jest.fn()};
        const {latest} = renderConsumer();

        // Act
        latest().setRenderer(oldRenderer);
        latest().setRenderer(newRenderer);
        latest().blurRenderer();

        // Assert
        expect(oldRenderer.blur).not.toHaveBeenCalled();
        expect(newRenderer.blur).toHaveBeenCalledTimes(1);
    });

    it("does nothing when blurring with no renderer attached", () => {
        // Arrange
        const {latest} = renderConsumer();

        // Act, Assert
        expect(() => latest().blurRenderer()).not.toThrow();
    });

    it("does not re-render consumers when a renderer is attached", () => {
        // Arrange
        // Callers attach the renderer from an inline callback ref, which React
        // re-invokes on every commit with a fresh handle. Attaching therefore
        // has to stay out of state: if it re-rendered consumers, each render
        // would attach again and the tree would never settle. The cap keeps a
        // regression failing this assertion rather than hanging the suite.
        const renderLimit = 10;
        let renderCount = 0;

        function Consumer() {
            const {setRenderer} = React.useContext(KeypadContext);
            renderCount++;

            React.useEffect(() => {
                if (renderCount < renderLimit) {
                    setRenderer({blur: jest.fn()});
                }
            });

            return null;
        }

        // Act
        render(
            <StatefulKeypadContextProvider>
                <Consumer />
            </StatefulKeypadContextProvider>,
        );

        // Assert
        expect(renderCount).toBe(1);
    });

    it("returns the same setRenderer and blurRenderer across renders", () => {
        // Arrange
        const {contexts, renderConsumerAgain} = renderConsumer();

        // Act
        renderConsumerAgain();

        // Assert
        // Both are documented as safe for dependency arrays, so their identity
        // has to survive a re-render.
        expect(contexts.length).toBe(2);
        expect(contexts[1].setRenderer).toBe(contexts[0].setRenderer);
        expect(contexts[1].blurRenderer).toBe(contexts[0].blurRenderer);
    });
});
