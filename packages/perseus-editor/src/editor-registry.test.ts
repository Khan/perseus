import {setStrictRegistration} from "@khanacademy/perseus-core";

import {
    getEditor,
    isEditorRegistered,
    registerEditors,
    replaceDeprecatedEditors,
    replaceEditor,
    resetEditorRegistry,
} from "./editor-registry";

const standinEditor = {displayName: "Deprecated standin"};
const radioEditor = {displayName: "Radio"};

describe("editor registry", () => {
    afterEach(() => {
        resetEditorRegistry();
        setStrictRegistration(false);
    });

    it("returns the editor registered under a widget name", () => {
        // Arrange, Act
        registerEditors({radio: radioEditor});

        expect(getEditor("radio")).toBe(radioEditor);
    });

    it("throws under strict registration for an unregistered type", () => {
        // Arrange
        registerEditors({radio: radioEditor});
        setStrictRegistration(true);

        // Act, Assert
        expect(() => getEditor("plotter")).toThrowErrorMatchingInlineSnapshot(
            `"Widget "plotter" is not registered. Register it first: registerEditors({plotter: ...}) with the plotter editor module."`,
        );
    });

    it("resolves a deprecated alias to the standin editor", () => {
        // Arrange
        registerEditors({"deprecated-standin": standinEditor});

        // Act
        replaceDeprecatedEditors();

        expect(getEditor("transformer")).toBe(standinEditor);
    });

    it("throws when the replacement editor isn't registered", () => {
        // Arrange
        registerEditors({radio: radioEditor});

        // Act, Assert
        expect(() =>
            replaceEditor("transformer", "deprecated-standin"),
        ).toThrowErrorMatchingInlineSnapshot(
            `"Failed to replace editor transformer with deprecated-standin"`,
        );
    });

    it("reports an unregistered type as unregistered under strict registration", () => {
        // Arrange
        registerEditors({radio: radioEditor});
        setStrictRegistration(true);

        // Act, Assert
        expect(isEditorRegistered("plotter")).toBe(false);
        expect(isEditorRegistered("radio")).toBe(true);
    });

    it("throws on a read after reset, as before any registration", () => {
        // Arrange
        registerEditors({radio: radioEditor});

        // Act
        resetEditorRegistry();

        expect(() => getEditor("radio")).toThrowErrorMatchingInlineSnapshot(
            `"Perseus widget editor registry accessed before initialization!"`,
        );
    });
});
