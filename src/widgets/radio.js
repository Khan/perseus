(function(Perseus) {

var Radio = Perseus.Widget.extend({
    className: "perseus-widget-radio",
    labelTagName: "label",

    options: {
        choices: [{
            content: "",
            correct: true
        }],
        randomize: false,
        multipleSelect: false
    },

    state: {
        problemNum: 0
    },

    initialize: function() {
        this.$radios = $();
    },

    setState: function(state) {
        this.state = state;
    },

    render: function() {
        var widget = this;
        var radios = [];
        var labeledElements = [];
        var $widgetUl = $("<ul>").appendTo(this.$el.empty());

        var radioGroupName = _.uniqueId("perseus_radio_");
        var renderers = this.renderers = [];

        _.each(this.options.choices, function(choice, i) {
            var $label = $("<" + widget.labelTagName + ">");

            var type = widget.options.multipleSelect ? "checkbox" : "radio";

            var $input = $("<input type='" + type + "' name='" +
                    _.escape(radioGroupName) + "' value='" + i + "'>");
            radios.push($input[0]);

            var renderer = widget.choiceRenderer(choice);
            renderers.push(renderer);

            $label.append($input, renderer.$el);
            labeledElements.push($label);
        });

        // optionally randomize presentation of choices
        // radios must be randomized as well to preserve focus() behavior
        radios = this.randomize(radios);
        labeledElements = this.randomize(labeledElements);

        _.each(labeledElements, function($label) {
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

    toJSON: function(skipValidation) {
        // Retrieve which choices are selected
        var isSelected = _.chain(this.$radios)
            // This de-randomizes the values so that the radios are checked in
            // the correct order even when randomized
            .sortBy(function(e) { return $(e).val(); })
            .map(function(e) { return $(e).is(":checked"); })
            .value();

        return {
            // This used to be 'value', but now it holds multiple values
            values: isSelected
        };
    },

    set: function(options) {
        var val = +options.value;
        this.$radios.filter("[value=" + val + "]").prop("checked", true);
    },

    simpleValidate: function(rubric) {
        return Radio.validate(this.toJSON(), rubric);
    },

    randomize: function(array) {
        if (!this.options.randomize || !this.state.problemNum) {
            return array;
        }
        return Perseus.Util.shuffle(array, this.state.problemNum);
    }
});

_.extend(Radio, {
    validate: function(state, rubric) {
        if (!_.any(state.values)) {
            return {
                type: "invalid",
                message: null
            };
        } else {
            var correct = _.all(state.values, function(selected, idx) {
                return rubric.choices[idx].correct === selected;
            });

            if (correct) {
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

            _.each(editor.options.choices, function(choice, i) {
                choice.correct = i === idx;
            });
        });

        var $addChoiceDiv = $("<div class='add-choice-container'>");
        var $addChoice = $("<a href='#' class='simple-button orange " +
                "icon-plus add-choice-button'>")
            // Leading space because of FontAwesome icon.
            .text(" Add a choice")
            .on("click", function() {
                // TODO(alpert): Grumble, grumble. This is really silly.
                editor.set(editor.toJSON(true));

                editor.options.choices.push({
                    content: "",
                    correct: false
                });
                editor.render();
                return false;
            });
        $addChoiceDiv.append($addChoice);

        this.$el.append($addChoiceDiv);

        var $randomize = this.$randomize = $("<input type='checkbox'>")
            .prop("checked", this.options.randomize)
            .on("change", function() {
                editor.options.randomize = $(this).prop("checked");
            });

        this.$el.append(
            $("<label> Randomize answer order</label>").prepend($randomize));

        this.$el.append("<br>");

        var $multipleSelect = this.$multipleSelect = $("<input type='checkbox'>")
            .prop("checked", this.options.multipleSelect)
            .on("change", function() {
                editor.options.multipleSelect = $(this).prop("checked");
                editor.trigger("change");
                editor.render();
            });

        this.$el.append(
            $("<label> Allow multiple selections</label>").prepend($multipleSelect));

        return promise;
    },

    choiceRenderer: function(choice) {
        var radioEditor = this;
        var editor = new Perseus.SingleEditor({
            content: choice.content,

            // TODO(alpert): False now, though maybe enabled in the future?
            widgetEnabled: false
        });
        this.listenTo(editor, "change", function() {
            // TODO(alpert): A little ick, some code duplication too
            choice.content = editor.options.content;
            radioEditor.change();
        });
        return editor;
    },

    focus: function() {
        if (this.renderers.length) {
            this.renderers[0].focus();
        }
    },

    toJSON: function(skipValidation) {
        // TODO(alpert): Make this so it just returns this.options (maybe after
        // a little validation)
        var selected = this.$radios.filter(":checked");

        if (!skipValidation && !selected.length) {
            // TODO(alpert): Better errors
            alert("Warning: No choice is selected -- students will be " +
                    "unable to answer");
        }

        var isCorrect = _.map(
            this.$radios,
            function(e) { return $(e).is(":checked"); }
        );

        return {
            choices: _.map(this.renderers, function(editor, i) {
                return {
                    content: editor.toJSON(skipValidation).content,
                    correct: isCorrect[i]
                };
            }),
            randomize: this.options.randomize,
            multipleSelect: this.options.multipleSelect
        };
    },

    set: function(options) {
        _.extend(this.options, options);
        return this.render();
    },

    simpleValidate: function(rubric) {
        return true;
    },

    change: function(args) {
        this.trigger("change");
    }
});

Perseus.Widgets.register("radio", Radio);
Perseus.Widgets.register("radio-editor", RadioEditor);

})(Perseus);
