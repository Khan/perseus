import {KeypadType} from "../../../enums";

import {configureKeypad, setPageSize} from "./actions";
import layoutReducer from "./layout-reducer";

function initState() {
    // @ts-expect-error TS2345
    let state = layoutReducer(undefined, {type: "@redux-init"});
    state = layoutReducer(
        state,
        configureKeypad({keypadType: KeypadType.EXPRESSION}),
    );
    return state;
}

describe("layout reducer", () => {
    it("enables pagination on small screens portrait (iPhone)", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(375, 812, 375, 812));

        // Assert
        expect(state.paginationEnabled).toBe(true);
    });

    it("does not enable navigation pad on small screens portrait (iPhone)", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(375, 812, 375, 812));

        // Assert
        expect(state.navigationPadEnabled).toBe(false);
    });

    it("does not enable pagination on medium screens portrait (iPad Mini)", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(768, 1024, 768, 1024));

        // Assert
        expect(state.paginationEnabled).toBe(false);
    });

    it("does not enable navigation pad on medium screens portrait (iPad Mini)", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(768, 1024, 768, 1024));

        // Assert
        expect(state.navigationPadEnabled).toBe(false);
    });

    it("does not enable pagination on large screens portrait (iPad)", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(810, 1080, 810, 1080));

        // Assert
        expect(state.paginationEnabled).toBe(false);
    });

    it("does enable navigation pad on large screens portrait (iPad)", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(810, 1080, 810, 1080));

        // Assert
        expect(state.navigationPadEnabled).toBe(true);
    });

    it("does not enable pagination on small screens landscape (iPhone)", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(812, 375, 812, 375));

        // Assert
        expect(state.paginationEnabled).toBe(false);
    });

    it("does enable navigation pad on small screens landscape (iPhone)", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(812, 375, 812, 375));

        // Assert
        expect(state.navigationPadEnabled).toBe(true);
    });

    it("does not enable pagination on medium screens landscape (iPad Mini)", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(1024, 768, 1024, 768));

        // Assert
        expect(state.paginationEnabled).toBe(false);
    });

    it("does enable navigation pad on medium screens landscape (iPad Mini)", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(1024, 768, 1024, 768));

        // Assert
        expect(state.navigationPadEnabled).toBe(true);
    });

    it("does not enable pagination on large screens landscape (iPad)", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(1080, 810, 1080, 810));

        // Assert
        expect(state.paginationEnabled).toBe(false);
    });

    it("does enable navigation pad on large screens landscape (iPad)", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(1080, 810, 1080, 810));

        // Assert
        expect(state.navigationPadEnabled).toBe(true);
    });

    it("does enable pagination in small containers on big screens", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(2000, 2000, 300, 300));

        // Assert
        expect(state.paginationEnabled).toBe(true);
    });

    it("does not enable navigation in small containers on big screens", () => {
        // Arrange
        let state = initState();

        // Act
        state = layoutReducer(state, setPageSize(2000, 2000, 300, 300));

        // Assert
        expect(state.navigationPadEnabled).toBe(false);
    });
});
