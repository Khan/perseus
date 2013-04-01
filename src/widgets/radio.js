(function(Perseus) {

var Radio = Perseus.Widget.extend({
    className: "perseus-widget-radio",
    labelTagName: "label",

    options: {
        choices: [{
            content: "",
            correct: true
        }]
    },

    initialize: function() {
        this.$radios = $();
    },

    render: function() {
        var widget = this;
        var radios = [];
        var $widgetUl = $("<ul>").appendTo(this.$el.empty());

        var radioGroupName = _.uniqueId("perseus_radio_");
        var renderers = this.renderers = [];

        _.each(this.options.choices, function(choice, i) {
            var $label = $("<" + widget.labelTagName + ">");
            var $input = $("<input type='radio' name='" +
                    _.escape(radioGroupName) + "' value='" + i + "'>");
            radios.push($input[0]);

            var renderer = widget.choiceRenderer(choice);
            renderers.push(renderer);

            $label.append($input, renderer.$el);
            $widgetUl.append($("<li>").append($label));
        });

        this.$radios = $(radios);

        return $.when.apply($, _.invoke(renderers, "render")).then(function() {
            return widget;
        });
    },

    choiceRenderer: function(choice) {
        return new Perseus.Renderer({
            content: choice.content
        });
    },

    focus: function() {
        this.$radios.eq(0).focus();
    },

    toJSON: function() {
        var selected = this.$radios.filter(":checked").val();
        return {
            // Convert undefined to null
            value: selected != null ? selected : null
        };
    },

    set: function(options) {
        var val = +options.value;
        this.$radios.filter("[value=" + val + "]").prop("checked", true);
    },

    simpleValidate: function(rubric) {
        return Radio.validate(this.toJSON(), rubric);
    }
});

_.extend(Radio, {
    validate: function(state, rubric) {
        if (state.value == null) {
            return {
                type: "invalid",
                message: null
            };
        } else {
            // Technically this cast doesn't end up doing anything...
            var idx = +state.value;

            if (rubric.choices[idx].correct) {
                return {
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null
                };
            } else {
                return {
                    type: "points",
                    earned: 0,
                    total: 1,
                    message: null
                };
            }
        }
    }
});

var RadioEditor = Radio.extend({
    labelTagName: "div",

    render: function() {
        var editor = this;
        var promise = Radio.prototype.render.call(this);

        _.chain(this.$radios).zip(this.options.choices).map(function(pair) {
            var radio = pair[0], choice = pair[1];
            if (choice.correct) {
                $(radio).prop("checked", true);
            }
        });

        this.$radios.on("change", function() {
            var $radio = $(this);
            var idx = +$radio.val();
            var checked = $radio.is(":checked");

            _.map(editor.options.choices, function(choice, i) {
                choice.correct = i === idx;
            });
        });

        this.$el.append(
                $("<a href='#'>Add a choice</a>").on("click", function() {
                    // TODO(alpert): Grumble, grumble. This is really silly.
                    editor.set(editor.toJSON());

                    editor.options.choices.push({
                        content: "",
                        correct: false
                    });
                    editor.render();
                    return false;
                })
            );

        return promise;
    },

    choiceRenderer: function(choice) {
        return new Perseus.SingleEditor({
            content: choice.content
        });
    },

    focus: function() {
        if (this.renderers.length) {
            this.renderers[0].focus();
        }
    },

    toJSON: function() {
        var selected = this.$radios.filter(":checked");

        if (!selected.length) {
            // TODO(alpert): Better errors
            alert("Warning: No choice is selected -- students will be " +
                    "unable to answer");
        }

        var selectedVal = +selected.val();

        return {
            choices: _.map(this.renderers, function(editor, i) {
                return {
                    content: editor.toJSON().content,
                    correct: i === selectedVal
                };
            })
        };
    },

    set: function(options) {
        _.extend(this.options, options);
        return this.render();
    },

    simpleValidate: function(rubric) {
        return true;
    }
});

Perseus.Widgets.register("radio", Radio);
Perseus.Widgets.register("radio-editor", RadioEditor);

})(Perseus);
