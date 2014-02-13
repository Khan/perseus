/** @jsx React.DOM */
/**
 * For math rendered using MathJax. Use me like <TeX>2x + 3</TeX>.
 */

require("./core.js");

// TODO(jack): Remove this closure now that this is in it's own file
var TeX = (function() {
    var pendingScripts = [];
    var needsProcess = false;
    var timeout = null;

    function process(script, callback) {
        pendingScripts.push(script);
        if (!needsProcess) {
            needsProcess = true;
            timeout = setTimeout(doProcess, 0, callback);
        }
    }

    function doProcess(callback) {
        MathJax.Hub.Queue(function() {
            var oldElementScripts = MathJax.Hub.elementScripts;
            MathJax.Hub.elementScripts = function(element) {
                var scripts = pendingScripts;
                pendingScripts = [];
                needsProcess = false;
                return scripts;
            };

            try {
                return MathJax.Hub.Process(null, callback);
            } catch (e) {
                // IE8 requires `catch` in order to use `finally`
                throw e;
            } finally {
                MathJax.Hub.elementScripts = oldElementScripts;
            }
        });
    }

    return React.createClass({
        getDefaultProps: function() {
            return {
                // Called after math is rendered or re-rendered
                onRender: function() {}
            };
        },

        render: function() {
            return <span>
                <span ref="mathjax" />
                <span ref="katex" />
            </span>;
        },

        componentDidMount: function() {
            var text = this.props.children;
            var onRender = this.props.onRender;

            if (typeof Exercises === "undefined" || Exercises.useKatex) {
                try {
                    var katexHolder = this.refs.katex.getDOMNode();
                    katex.process(text, katexHolder);
                    onRender();
                    return;
                } catch (e) {
                    /* jshint -W103 */
                    if (e.__proto__ !== katex.ParseError.prototype) {
                    /* jshint +W103 */
                        throw e;
                    }
                }
            }

            this.setScriptText(text);
            process(this.script, onRender);
        },

        componentDidUpdate: function(prevProps, prevState) {
            var oldText = prevProps.children;
            var newText = this.props.children;
            var onRender = this.props.onRender;

            if (oldText !== newText) {
                if (typeof Exercises === "undefined" || Exercises.useKatex) {
                    try {
                        var katexHolder = this.refs.katex.getDOMNode();
                        katex.process(newText, katexHolder);
                        if (this.script) {
                            var jax = MathJax.Hub.getJaxFor(this.script);
                            if (jax) {
                                jax.Remove();
                            }
                        }
                        onRender();
                        return;
                    } catch (e) {
                        /* jshint -W103 */
                        if (e.__proto__ !== katex.ParseError.prototype) {
                        /* jshint +W103 */
                            throw e;
                        }
                    }
                }

                $(this.refs.katex.getDOMNode()).empty();

                if (this.script) {
                    var component = this;
                    MathJax.Hub.Queue(function() {
                        var jax = MathJax.Hub.getJaxFor(component.script);
                        if (jax) {
                            return jax.Text(newText, onRender);
                        } else {
                            component.setScriptText(newText);
                            process(component.script, onRender);
                        }
                    });
                } else {
                    this.setScriptText(newText);
                    process(this.script, onRender);
                }
            }
        },

        setScriptText: function(text) {
            if (!this.script) {
                this.script = document.createElement("script");
                this.script.type = "math/tex";
                this.refs.mathjax.getDOMNode().appendChild(this.script);
            }
            if ("text" in this.script) {
                // IE8, etc
                this.script.text = text;
            } else {
                this.script.textContent = text;
            }
        },

        componentWillUnmount: function() {
            if (this.script) {
                var jax = MathJax.Hub.getJaxFor(this.script);
                if (jax) {
                    jax.Remove();
                }
            }
        }
    });
})();

module.exports = TeX;

