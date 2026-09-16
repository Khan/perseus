import {Widgets} from "@khanacademy/perseus";
import {
    CoreWidgetRegistry,
    Registry,
    setStrictRegistration,
} from "@khanacademy/perseus-core";
import {
    enterWidgetManifestContext,
    getWidgetManifest,
    resetWidgetManifests,
} from "@khanacademy/perseus-core/registry";

import {
    getEditor,
    isEditorRegistered,
    registerEditors,
    replaceDeprecatedEditors,
    replaceEditor,
    resetEditorRegistry,
} from "./editor-registry";

import type {EditorRegistration} from "./editor-registration";
import type {WidgetRegistration} from "@khanacademy/perseus";

const standinEditor = {displayName: "Deprecated standin"};
const radioEditor = {displayName: "Radio"};
const radioWidgetRegistration = {
    widget: {
        name: "radio",
        displayName: "Radio",
        widget: () => null,
    },
    logic: {name: "radio", version: {major: 1, minor: 0}},
} satisfies WidgetRegistration<"radio">;
const radioEditorRegistration = {
    widgetRegistration: radioWidgetRegistration,
    editor: radioEditor,
} satisfies EditorRegistration<"radio">;

describe("editor registry", () => {
    afterEach(() => {
        resetEditorRegistry();
        resetWidgetManifests("editor.test.tsx");
        setStrictRegistration(false);
    });

    it("records editor lookups against the active file", () => {
        const restore = enterWidgetManifestContext("editor.test.tsx");
        registerEditors({radio: radioEditor});

        getEditor("radio");
        restore();

        expect(getWidgetManifest("editor.test.tsx").editors).toEqual(["radio"]);
    });

    it("returns the editor registered under a widget name", () => {
        // Arrange, Act
        registerEditors({radio: radioEditor});

        expect(getEditor("radio")).toBe(radioEditor);
    });

    it("registers an editor descriptor's widget before its editor", () => {
        const set = jest.spyOn(Registry.prototype, "set");

        registerEditors([radioEditorRegistration]);

        const widgetSet = set.mock.results.find(
            (_, index) =>
                set.mock.calls[index][1] === radioWidgetRegistration.widget,
        );
        const editorSet = set.mock.results.find(
            (_, index) => set.mock.calls[index][1] === radioEditor,
        );

        expect(getEditor("radio")).toBe(radioEditor);
        expect(Widgets.getWidgetExport("radio")).toBe(
            radioWidgetRegistration.widget,
        );
        expect(CoreWidgetRegistry.getCurrentVersion("radio")).toEqual({
            major: 1,
            minor: 0,
        });
        expect(widgetSet).toBeDefined();
        expect(editorSet).toBeDefined();
        expect(
            set.mock.invocationCallOrder[set.mock.results.indexOf(widgetSet!)],
        ).toBeLessThan(
            set.mock.invocationCallOrder[set.mock.results.indexOf(editorSet!)],
        );
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
