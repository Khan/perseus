var assert = require("assert");
var StatefulEditorPage = require("../stateful-editor-page.jsx");
var EditorPage = require("../editor-page.jsx");
var ArticleEditor = require("../article-editor.jsx");
var TestUtils = React.addons.TestUtils;

describe("Search and Replace", function() {

    describe("EditorPage", function() {
        var editor;
        var searchInput, replaceInput;
        var previousButton, nextButton, replaceButton, replaceAllButton;

        // Note: the example question initially was using expression widgets but
        // this caused lots of issues because this widget type uses MathJax which
        // isn't loaded in the testing environment.
        beforeEach(function() {
            var question = {
                "question": {
                    "content": "[[☃ categorizer 1]]\n\ncategorizer\n\n[[☃ categorizer 2]]\n\ncategorizer",
                    "images": {},
                    "widgets": {
                        "categorizer 1": {
                            "type": "categorizer",
                            "graded": true,
                            "options": {
                                "items": [],
                                "categories": [],
                                "values": [],
                                "randomizeItems": false
                            },
                            "version": {
                                "major": 0,
                                "minor": 0
                            }
                        },
                        "categorizer 2": {
                            "type": "categorizer",
                            "graded": true,
                            "options": {
                                "items": [],
                                "categories": [],
                                "values": [],
                                "randomizeItems": false
                            },
                            "version": {
                                "major": 0,
                                "minor": 0
                            }
                        },
                        "expression 1": {
                            "type": "expression",
                            "graded": true,
                            "options": {
                                "answerForms": [],
                                "buttonSets": [
                                    "basic"
                                ],
                                "functions": [
                                    "f",
                                    "g",
                                    "h"
                                ],
                                "times": false
                            },
                            "version": {
                                "major": 1,
                                "minor": 0
                            }
                        },
                        "expression 2": {
                            "type": "expression",
                            "graded": true,
                            "options": {
                                "answerForms": [],
                                "buttonSets": [
                                    "basic"
                                ],
                                "functions": [
                                    "f",
                                    "g",
                                    "h"
                                ],
                                "times": false
                            },
                            "version": {
                                "major": 1,
                                "minor": 0
                            }
                        }
                    }
                },
                "answerArea": {
                    "type": "multiple",
                    "options": {
                        "content": "",
                        "images": {},
                        "widgets": {}
                    },
                    "calculator": false
                },
                "itemDataVersion": {
                    "major": 0,
                    "minor": 1
                },
                "hints": [
                    {
                        "content": "[[☃ categorizer 1]]\n\ncategorizer",
                        "images": {},
                        "widgets": {
                            "categorizer 1": {
                                "type": "categorizer",
                                "graded": true,
                                "options": {
                                    "items": [],
                                    "categories": [],
                                    "values": [],
                                    "randomizeItems": false
                                },
                                "version": {
                                    "major": 0,
                                    "minor": 0
                                }
                            },
                            "expression 1": {
                                "type": "expression",
                                "graded": true,
                                "options": {
                                    "answerForms": [],
                                    "buttonSets": [
                                        "basic"
                                    ],
                                    "functions": [
                                        "f",
                                        "g",
                                        "h"
                                    ],
                                    "times": false
                                },
                                "version": {
                                    "major": 1,
                                    "minor": 0
                                }
                            }
                        }
                    }
                ]
            };

            var problemNum = Math.floor(Math.random() * 100);
            var enabledFeatures = {
                highlight: true,
                toolTipFormats: true,
                useMathQuill: true
            };

            var editorProps = _.extend(question, {
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
                },
                componentClass: EditorPage
            });

            var StatefulEditorPageFactory = React.createFactory(StatefulEditorPage);
            editor = React.render(
                StatefulEditorPageFactory(editorProps, null),
                document.body
            );

            //console.log("before editor.refs");
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
            setTimeout(done, 50);
        });

        it("should replace all instances of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(replaceAllButton);

            assert.equal(editor.state.question.content, '[[☃ categorizer 1]]\n\nequation\n\n[[☃ categorizer 2]]\n\nequation');
            assert.equal(editor.state.hints[0].content, '[[☃ categorizer 1]]\n\nequation');
        });

        it("should replace the first instance of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(replaceButton);

            assert.equal(editor.state.question.content, '[[☃ categorizer 1]]\n\nequation\n\n[[☃ categorizer 2]]\n\ncategorizer');
            assert.equal(editor.state.hints[0].content, '[[☃ categorizer 1]]\n\ncategorizer');
        });

        it("should replace the second instance of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(nextButton);
            React.addons.TestUtils.Simulate.click(replaceButton);

            assert.equal(editor.state.question.content, '[[☃ categorizer 1]]\n\ncategorizer\n\n[[☃ categorizer 2]]\n\nequation');
            assert.equal(editor.state.hints[0].content, '[[☃ categorizer 1]]\n\ncategorizer');
        });

        it("should replace the last two instances of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(nextButton);
            React.addons.TestUtils.Simulate.click(nextButton);
            React.addons.TestUtils.Simulate.click(replaceButton);
            React.addons.TestUtils.Simulate.click(replaceButton);

            assert.equal(editor.state.question.content, '[[☃ categorizer 1]]\n\ncategorizer\n\n[[☃ categorizer 2]]\n\nequation');
            assert.equal(editor.state.hints[0].content, '[[☃ categorizer 1]]\n\nequation');
        });
    });

    describe("ArticleEditor", function() {
        var editor;
        var searchInput, replaceInput;
        var previousButton, nextButton, replaceButton, replaceAllButton;

        // Note: the example question initially was using expression widgets but
        // this caused lots of issues because this widget type uses MathJax which
        // isn't loaded in the testing environment.
        beforeEach(function() {
            var particle = {
                "json": [
                    {
                        "content": "[[☃ categorizer 1]]\n\ncategorizer\n\n[[☃ categorizer 2]]\n\ncategorizer",
                        "images": {
                            "https://ka-perseus-graphie.s3.amazonaws.com/da8df81c78b22f5c69d477d8eabfb583968eaf84.png": {
                                "width": 400,
                                "height": 70
                            },
                            "https://ka-perseus-graphie.s3.amazonaws.com/b59fc02ca1aae800977b8793ed22f647a1aa75ee.png": {
                                "width": 425,
                                "height": 150
                            }
                        },
                        "widgets": {
                            "categorizer 1": {
                                "type": "categorizer",
                                "graded": true,
                                "options": {
                                    "items": [],
                                    "categories": [],
                                    "values": [],
                                    "randomizeItems": false
                                },
                                "version": {
                                    "major": 0,
                                    "minor": 0
                                }
                            },
                            "categorizer 2": {
                                "type": "categorizer",
                                "graded": true,
                                "options": {
                                    "items": [],
                                    "categories": [],
                                    "values": [],
                                    "randomizeItems": false
                                },
                                "version": {
                                    "major": 0,
                                    "minor": 0
                                }
                            }
                        }
                    },
                    {
                        "content": "[[☃ categorizer 1]]\n\ncategorizer",
                        "images": {},
                        "widgets": {
                            "categorizer 1": {
                                "type": "categorizer",
                                "graded": true,
                                "options": {
                                    "items": [],
                                    "categories": [],
                                    "values": [],
                                    "randomizeItems": false
                                },
                                "version": {
                                    "major": 0,
                                    "minor": 0
                                }
                            }
                        }
                    }
                ]
            };

            var problemNum = Math.floor(Math.random() * 100);
            var enabledFeatures = {
                highlight: true,
                toolTipFormats: true,
                useMathQuill: true
            };

            var editorProps = _.extend(particle, {
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
                },
                componentClass: ArticleEditor
            });

            var StatefulEditorPageFactory = React.createFactory(StatefulEditorPage);
            editor = React.render(
                StatefulEditorPageFactory(editorProps, null),
                document.body
            );

            //console.log("before editor.refs");
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
            setTimeout(done, 50);
        });

        it("should replace all instances of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(replaceAllButton);

            assert.equal(editor.state.json[0].content, '[[☃ categorizer 1]]\n\nequation\n\n[[☃ categorizer 2]]\n\nequation');
            assert.equal(editor.state.json[1].content, '[[☃ categorizer 1]]\n\nequation');
        });

        it("should replace the first instance of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(replaceButton);

            assert.equal(editor.state.json[0].content, '[[☃ categorizer 1]]\n\nequation\n\n[[☃ categorizer 2]]\n\ncategorizer');
            assert.equal(editor.state.json[1].content, '[[☃ categorizer 1]]\n\ncategorizer');
        });

        it("should replace the second instance of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(nextButton);
            React.addons.TestUtils.Simulate.click(replaceButton);

            assert.equal(editor.state.json[0].content, '[[☃ categorizer 1]]\n\ncategorizer\n\n[[☃ categorizer 2]]\n\nequation');
            assert.equal(editor.state.json[1].content, '[[☃ categorizer 1]]\n\ncategorizer');
        });

        it("should replace the last two instances of the searchString not inside a widget reference", function() {
            React.addons.TestUtils.Simulate.change(searchInput, {target: {value: "categorizer"}});
            React.addons.TestUtils.Simulate.change(replaceInput, {target: {value: "equation"}});
            React.addons.TestUtils.Simulate.click(nextButton);
            React.addons.TestUtils.Simulate.click(nextButton);
            React.addons.TestUtils.Simulate.click(replaceButton);
            React.addons.TestUtils.Simulate.click(replaceButton);

            assert.equal(editor.state.json[0].content, '[[☃ categorizer 1]]\n\ncategorizer\n\n[[☃ categorizer 2]]\n\nequation');
            assert.equal(editor.state.json[1].content, '[[☃ categorizer 1]]\n\nequation');
        });
    });

});