import {setRenderMarkers} from "./render-markers";

describe("setRenderMarkers", () => {
    it("marks the render done", () => {
        // Arrange
        const element = document.createElement("body");

        // Act
        setRenderMarkers(element, {status: "done"});

        // Assert
        expect({...element.dataset}).toEqual({renderDone: "true"});
    });

    it("marks the render error with its message", () => {
        // Arrange
        const element = document.createElement("body");

        // Act
        setRenderMarkers(element, {status: "error", message: "Boom"});

        // Assert
        expect({...element.dataset}).toEqual({renderError: "Boom"});
    });

    it("clears the markers while new content renders", () => {
        // Arrange
        const element = document.createElement("body");
        setRenderMarkers(element, {status: "done"});

        // Act
        setRenderMarkers(element, {status: "rendering"});

        // Assert
        expect({...element.dataset}).toEqual({});
    });
});
