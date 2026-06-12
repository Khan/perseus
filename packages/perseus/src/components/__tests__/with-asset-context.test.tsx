import {render, screen} from "@testing-library/react";
import * as React from "react";

import AssetContext from "../../asset-context";
import {withAssetContext} from "../with-asset-context";

// Minimal test-only component used to exercise withAssetContext. It accepts
// the props the HOC injects (`setAssetStatus` and `assetKey`) and surfaces
// them in two ways the tests can observe: as a `data-asset-key` attribute on
// the rendered button (for inspecting which key the HOC generated), and via
// a click handler that calls `setAssetStatus` (so tests can verify the
// injected function reaches the wrapped component and is callable).
type MockComponentProps = {
    label: string;
    setAssetStatus: (assetKey: string, loaded: boolean) => void;
    assetKey: string;
};

function MockComponent(props: MockComponentProps): React.ReactElement {
    return (
        <button
            onClick={() => props.setAssetStatus(props.assetKey, true)}
            data-asset-key={props.assetKey}
        >
            {props.label}
        </button>
    );
}

describe("withAssetContext", () => {
    it("injects setAssetStatus from AssetContext as a prop", () => {
        // Arrange
        const setAssetStatusSpy = jest.fn();
        const Wrapped = withAssetContext(MockComponent, "widget");

        // Act — clicking calls setAssetStatus via the injected prop, which
        // proves the function from the Provider reached MockComponent.
        render(
            <AssetContext.Provider
                value={{
                    assetStatuses: {},
                    setAssetStatus: setAssetStatusSpy,
                }}
            >
                <Wrapped label="hello" />
            </AssetContext.Provider>,
        );
        screen.getByRole("button", {name: "hello"}).click();

        // Assert
        expect(setAssetStatusSpy).toHaveBeenCalled();
    });

    it("injects an assetKey with the configured prefix", () => {
        // Arrange, Act
        const Wrapped = withAssetContext(MockComponent, "widget");
        render(<Wrapped label="hello" />);

        // Assert
        expect(
            screen.getByRole("button", {name: "hello"}).dataset.assetKey,
        ).toMatch(/^widget-/);
    });

    it("generates a unique assetKey per rendered instance", () => {
        // Arrange, Act
        const Wrapped = withAssetContext(MockComponent, "widget");
        render(
            <>
                <Wrapped label="first" />
                <Wrapped label="second" />
            </>,
        );

        // Assert
        const first = screen.getByRole("button", {name: "first"});
        const second = screen.getByRole("button", {name: "second"});
        expect(first.dataset.assetKey).not.toBe(second.dataset.assetKey);
    });

    it("uses the AssetContext default no-op when no Provider is above", () => {
        // Arrange, Act — render without an AssetContext.Provider.
        const Wrapped = withAssetContext(MockComponent, "widget");
        render(<Wrapped label="hello" />);

        // Assert — the HOC still generates an assetKey (useId works without
        // a Provider) and the default no-op setAssetStatus is callable (so
        // the click handler doesn't crash).
        const button = screen.getByRole("button", {name: "hello"});
        expect(button.dataset.assetKey).toMatch(/^widget-/);
        expect(() => button.click()).not.toThrow();
    });
});
