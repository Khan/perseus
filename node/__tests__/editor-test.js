// This file is for testing that the main perseus bundle (which doesn't include
// editors) still works, and that the editor bundle contains editors and works.
const assert = require("assert");
const React = require("react");
const ReactDOM = require("react-dom");

const EditorPerseus = require("../../build/editor-perseus.js");
const Perseus = require("../../build/perseus.js");

describe("No-editor-perseus", function() {
    it("exposes renderers, versions, and init", function() {
        assert.ok(Perseus.Renderer);
        assert.ok(Perseus.ArticleRenderer);
        assert.ok(Perseus.ItemRenderer);
        assert.ok(Perseus.ServerItemRenderer);
        assert.ok(Perseus.HintsRenderer);
        assert.ok(Perseus.apiVersion);
        assert.ok(Perseus.itemDataVersion);
        assert.ok(Perseus.init);
    });

    it("doesn't expose editors and extra bits", function() {
        assert(!("Editor" in Perseus));
        assert(!("RevisionDiff" in Perseus));
        assert(!("i18n" in Perseus));
        assert(!("accessibility" in Perseus));
        assert(!("ViewportResizer" in Perseus));
    });

    it("renders with react", function() {
        const elem = document.createElement("div");

        ReactDOM.render(
            React.createElement(Perseus.Renderer, {
                content: "hello world! [[\u2603 numeric-input 1]]",
                widgets: {
                    "numeric-input 1": {
                        options: {
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
                        "type": "numeric-input",
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
        assert.ok(EditorPerseus.apiVersion);
        assert.ok(EditorPerseus.itemDataVersion);
        assert.ok(EditorPerseus.init);

        assert.ok(EditorPerseus.Editor);
        assert.ok(EditorPerseus.RevisionDiff);
        assert.ok(EditorPerseus.i18n);
        assert.ok(EditorPerseus.accessibility);
        assert.ok(EditorPerseus.ViewportResizer);
    });
});
