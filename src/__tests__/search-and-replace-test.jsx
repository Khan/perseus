var assert = require("assert");
var StatefulEditorPage = require("../stateful-editor-page.jsx");
var EditorPage = require("../editor-page.jsx");
var ArticleEditor = require("../article-editor.jsx");
var TestUtils = React.addons.TestUtils;

var itemJson = require("./test-items/search-and-replace-item.json");
var particleJson = require("./test-items/search-and-replace-particle.json");

describe("Search and Replace", function() {
    var editor, editorProps;
    var searchInput, replaceInput;
    var previousButton, nextButton, replaceButton, replaceAllButton;

    beforeEach(function () {
        var problemNum = Math.floor(Math.random() * 100);
        var enabledFeatures = {
            highlight: true,
            toolTipFormats: true,
            useMathQuill: true
        };

        editorProps = {
            problemNum: problemNum,
            enabledFeatures: enabledFeatures,
            developerMode: true,
            imageUploader: function(image, callback) {
                _.delay(callback, 1000, "http://fake.image.url");
            },
            apiOptions: {
                fancyDropdowns: true,
                __onInputError: function() {
                    var args = _.toArray(arguments);
                    console.log.apply(console, ["onInputError:"].concat(args));
                    return true;
                },
                __interceptInputFocus: function() {
                    var args = _.toArray(arguments);
                    console.log.apply(console, ["interceptInputFocus:"].concat(args));
                    return;
                },
                onFocusChange: function(newPath, oldPath) {
                    console.log("onFocusChange", newPath, oldPath);
                },
                __staticRender: true
            }
        };
    });

    describe("EditorPage", function() {
        beforeEach(function() {
            editorProps = $.extend(true, editorProps, itemJson);
            editorProps.componentClass = EditorPage;

            var StatefulEditorPageFactory = React.createFactory(StatefulEditorPage);
            editor = React.render(
                StatefulEditorPageFactory(editorProps, null),
                document.body
            );

            var dialog = editor.refs.searchAndReplace;

            searchInput = dialog.refs.searchInput.getDOMNode();
            replaceInput = dialog.refs.replaceInput.getDOMNode();
            replaceButton = dialog.refs.replaceButton.getDOMNode();
            replaceAllButton = dialog.refs.replaceAllButton.getDOMNode();
            previousButton = dialog.refs.previousButton.getDOMNode();
            nextButton = dialog.refs.nextButton.getDOMNode();
        });

        afterEach(function (done) {
            React.unmountComponentAtNode(document.body);
            document.body.innerHTML = "";
            setTimeout(done);
        });

        it("should replace all instances of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(replaceAllButton);

            assert.equal(editor.state.question.content, '[[☃ categorizer 1]] equation [[☃ categorizer 2]] equation');
            assert.equal(editor.state.hints[0].content, '[[☃ categorizer 1]] equation');
        });

        it("should replace the first instance of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(replaceButton);

            assert.equal(editor.state.question.content, '[[☃ categorizer 1]] equation [[☃ categorizer 2]] categorizer');
            assert.equal(editor.state.hints[0].content, '[[☃ categorizer 1]] categorizer');
        });

        it("should replace the second instance of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(nextButton);
            React.addons.TestUtils.Simulate.click(replaceButton);

            assert.equal(editor.state.question.content, '[[☃ categorizer 1]] categorizer [[☃ categorizer 2]] equation');
            assert.equal(editor.state.hints[0].content, '[[☃ categorizer 1]] categorizer');
        });

        it("should replace the last two instances of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(nextButton);
            React.addons.TestUtils.Simulate.click(nextButton);
            React.addons.TestUtils.Simulate.click(replaceButton);
            React.addons.TestUtils.Simulate.click(replaceButton);

            assert.equal(editor.state.question.content, '[[☃ categorizer 1]] categorizer [[☃ categorizer 2]] equation');
            assert.equal(editor.state.hints[0].content, '[[☃ categorizer 1]] equation');
        });
    });

    describe("ArticleEditor", function() {
        beforeEach(function() {
            editorProps = $.extend(true, editorProps, particleJson);
            editorProps.componentClass = ArticleEditor;

            var StatefulEditorPageFactory = React.createFactory(StatefulEditorPage);
            editor = React.render(
                StatefulEditorPageFactory(editorProps, null),
                document.body
            );

            var dialog = editor.refs.searchAndReplace;

            searchInput = dialog.refs.searchInput.getDOMNode();
            replaceInput = dialog.refs.replaceInput.getDOMNode();
            replaceButton = dialog.refs.replaceButton.getDOMNode();
            replaceAllButton = dialog.refs.replaceAllButton.getDOMNode();
            previousButton = dialog.refs.previousButton.getDOMNode();
            nextButton = dialog.refs.nextButton.getDOMNode();
        });

        afterEach(function (done) {
            React.unmountComponentAtNode(document.body);
            document.body.innerHTML = "";
            setTimeout(done);
        });

        it("should replace all instances of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(replaceAllButton);

            assert.equal(editor.state.json[0].content, '[[☃ categorizer 1]] equation [[☃ categorizer 2]] equation');
            assert.equal(editor.state.json[1].content, '[[☃ categorizer 1]] equation');
        });

        it("should replace the first instance of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(replaceButton);

            assert.equal(editor.state.json[0].content, '[[☃ categorizer 1]] equation [[☃ categorizer 2]] categorizer');
            assert.equal(editor.state.json[1].content, '[[☃ categorizer 1]] categorizer');
        });

        it("should replace the second instance of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(nextButton);
            React.addons.TestUtils.Simulate.click(replaceButton);

            assert.equal(editor.state.json[0].content, '[[☃ categorizer 1]] categorizer [[☃ categorizer 2]] equation');
            assert.equal(editor.state.json[1].content, '[[☃ categorizer 1]] categorizer');
        });

        it("should replace the last two instances of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(nextButton);
            React.addons.TestUtils.Simulate.click(nextButton);
            React.addons.TestUtils.Simulate.click(replaceButton);
            React.addons.TestUtils.Simulate.click(replaceButton);

            assert.equal(editor.state.json[0].content, '[[☃ categorizer 1]] categorizer [[☃ categorizer 2]] equation');
            assert.equal(editor.state.json[1].content, '[[☃ categorizer 1]] equation');
        });
    });
});
