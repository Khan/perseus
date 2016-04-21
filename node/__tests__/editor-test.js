// This file is for testing that the main perseus bundle (which doesn't include
// editors) still works, and that the editor bundle contains editors and works.
const assert = require("assert");
const React = require("react");
const ReactDOM = require("react-dom");

const EditorPerseus = require("../../build/editor-perseus.js");
const Perseus = require("../../build/perseus-6.js");

describe("No-editor-perseus", function() {
    it("exposes renderers and init", function() {
        assert.ok(Perseus.Renderer);
        assert.ok(Perseus.ArticleRenderer);
        assert.ok(Perseus.ItemRenderer);
        assert.ok(Perseus.ServerItemRenderer);
        assert.ok(Perseus.HintsRenderer);
        assert.ok(Perseus.init);
    });

    it("doesn't expose editors and extra bits", function() {
        assert(!("Editor" in Perseus));
        assert(!("apiVersion" in Perseus));
        assert(!("i18n" in Perseus));
    });

    it("renders with react", function() {
        const elem = document.createElement("div");

        ReactDOM.render(
            React.createElement(Perseus.Renderer, {
                content: "hello world! [[\u2603 numeric-input 1]]",
                widgets: {
                    "numeric-input 1": {
                        answers: [{
                            value: 2,
                            status: "correct",
                            message: "",
                            simplify: "required",
                            answerForms: [],
                            strict: false,
                            maxError: null,
                        }],
                        size: "normal",
                        coefficient: false,
                        labelText: "",
                    },
                },
            }),
            elem);

        assert.ok(elem.querySelector("input"));
        assert(elem.innerHTML.indexOf("hello world!") > -1);
    });
});

describe("Editor-perseus", function() {
    it("exposes renderers and editors", function() {
        assert.ok(EditorPerseus.Renderer);
        assert.ok(EditorPerseus.ArticleRenderer);
        assert.ok(EditorPerseus.ItemRenderer);
        assert.ok(EditorPerseus.ServerItemRenderer);
        assert.ok(EditorPerseus.HintsRenderer);
        assert.ok(EditorPerseus.init);

        assert.ok(EditorPerseus.Editor);
        assert.ok(EditorPerseus.apiVersion);
        assert.ok(EditorPerseus.i18n);
    });
});
