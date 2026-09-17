import {act, render, waitFor} from "@testing-library/react";
import * as React from "react";

import {TestMathjax} from "./test-mathjax";

// Hands out a `document.fonts` whose `ready` resolves only when the returned
// function is called, so tests control when "fonts have loaded".
function mockFontsLoading(): () => void {
    let resolveReady: () => void = () => {};
    const ready = new Promise<void>((resolve) => {
        resolveReady = resolve;
    });
    // The component only reads `ready`, so a partial stub is enough.
    // eslint-disable-next-line no-restricted-syntax
    const fonts = {status: "loading", ready} as unknown as FontFaceSet;
    jest.spyOn(document, "fonts", "get").mockReturnValue(fonts);
    return resolveReady;
}

// Lets any already-resolved `fonts.ready` callbacks run. Timers are faked
// in tests, so this can't lean on setTimeout.
async function flushMicrotasks(): Promise<void> {
    await Promise.resolve();
    await Promise.resolve();
}

describe("TestMathjax", () => {
    it("calls onRender only after document.fonts.ready resolves", async () => {
        // Arrange
        const finishLoadingFonts = mockFontsLoading();
        const onRender = jest.fn();

        // Act
        render(<TestMathjax onRender={onRender}>x^2</TestMathjax>);
        await flushMicrotasks();

        // Assert
        expect(onRender).not.toHaveBeenCalled();

        // Act
        await act(async () => {
            finishLoadingFonts();
        });

        // Assert
        expect(onRender).toHaveBeenCalledTimes(1);
    });

    it("does not call onRender when unmounted before fonts finish loading", async () => {
        // Arrange
        const finishLoadingFonts = mockFontsLoading();
        const onRender = jest.fn();
        const {unmount} = render(
            <TestMathjax onRender={onRender}>x^2</TestMathjax>,
        );

        // Act
        unmount();
        await act(async () => {
            finishLoadingFonts();
        });

        // Assert
        expect(onRender).not.toHaveBeenCalled();
    });

    it("calls onRender when fonts are already loaded", async () => {
        // Arrange
        // eslint-disable-next-line no-restricted-syntax
        const fonts = {ready: Promise.resolve()} as unknown as FontFaceSet;
        jest.spyOn(document, "fonts", "get").mockReturnValue(fonts);
        const onRender = jest.fn();

        // Act
        render(<TestMathjax onRender={onRender}>x^2</TestMathjax>);

        // Assert
        await waitFor(() => expect(onRender).toHaveBeenCalledTimes(1));
    });
});
