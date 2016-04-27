/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp */
/* global i18n */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const _ = require("underscore");

const Changeable = require("../../mixins/changeable.jsx");
const Editor = require("../../editor.jsx");
const PropCheckBox = require("../../components/prop-check-box.jsx");

const InfoTip = require("../../components/info-tip.jsx");
const BaseRadio = require("./base-radio.jsx");


const ChoiceEditor = React.createClass({
    propTypes: {
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        choice: React.PropTypes.any,
        showDelete: React.PropTypes.bool,
        onClueChange: React.PropTypes.func,
        onContentChange: React.PropTypes.func,
        onDelete: React.PropTypes.func,
    },

    render: function() {
        const checkedClass = this.props.choice.correct ?
            "correct" : "incorrect";
        let placeholder = "Type a choice here...";

        if (this.props.choice.isNoneOfTheAbove) {
            placeholder = this.props.choice.correct ?
                "Type the answer to reveal to the user..." :
                "None of the above";
        }

        const editor = <Editor
            ref={"content-editor"}
            content={this.props.choice.content || ""}
            widgetEnabled={false}
            placeholder={placeholder}
            disabled={this.props.choice.isNoneOfTheAbove &&
                !this.props.choice.correct}
            onChange={this.props.onContentChange} />;

        const clueEditor = <Editor
            ref={"clue-editor"}
            content={this.props.choice.clue || ""}
            widgetEnabled={false}
            placeholder={i18n._(`Why is this choice ${checkedClass}?`)}
            onChange={this.props.onClueChange} />;

        const deleteLink = <a href="#"
                className="simple-button orange delete-choice"
                title="Remove this choice"
                onClick={this.props.onDelete}>
            <span className="icon-trash" />
        </a>;

        return <div className="choice-clue-editors">
            <div className={`choice-editor ${checkedClass}`}>
                {editor}
            </div>
            <div className="clue-editor">
                {clueEditor}
            </div>
            {this.props.showDelete && deleteLink}
        </div>;
    },
});


const RadioEditor = React.createClass({
    mixins: [Changeable],

    propTypes: {
        // We don't use ApiOptions.propTypes here because it requires the props
        // and they're optional for this component.
        apiOptions: React.PropTypes.any,
        choices: React.PropTypes.arrayOf(React.PropTypes.shape({
            content: React.PropTypes.string,
            clue: React.PropTypes.string,
            correct: React.PropTypes.bool,
        })),
        displayCount: React.PropTypes.number,
        randomize: React.PropTypes.bool,
        hasNoneOfTheAbove: React.PropTypes.bool,
        multipleSelect: React.PropTypes.bool,
        onePerLine: React.PropTypes.bool,
        deselectEnabled: React.PropTypes.bool,
        static: React.PropTypes.bool,
        onChange: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            choices: [{}, {}],
            displayCount: null,
            randomize: false,
            hasNoneOfTheAbove: false,
            multipleSelect: false,
            onePerLine: true,
            deselectEnabled: false,
        };
    },

    render: function() {
        return <div>
            <div className="perseus-widget-row">

                <div className="perseus-widget-left-col">
                    <div>
                        <PropCheckBox label="One answer per line"
                                      labelAlignment="right"
                                      onePerLine={this.props.onePerLine}
                                      onChange={this.props.onChange} />
                        <InfoTip>
                            <p>
                                Use one answer per line unless your question
                                has images that might cause the answers to go
                                off the page.
                            </p>
                        </InfoTip>
                    </div>
                </div>

                <div className="perseus-widget-right-col">
                    <PropCheckBox label="Multiple selections"
                                  labelAlignment="right"
                                  multipleSelect={this.props.multipleSelect}
                                  onChange={this.onMultipleSelectChange} />
                </div>
                <div className="perseus-widget-left-col">
                    <PropCheckBox label="Randomize order"
                                  labelAlignment="right"
                                  randomize={this.props.randomize}
                                  onChange={this.props.onChange} />
                </div>
                {!this.props.static &&
                    <div className="perseus-widget-right-col">
                        <PropCheckBox
                            label="Radio deselect enabled"
                            labelAlignment="right"
                            deselectEnabled={this.props.deselectEnabled}
                            onChange={this.props.onChange} />
                    </div>}
            </div>

            <BaseRadio
                ref="baseRadio"
                multipleSelect={this.props.multipleSelect}
                onePerLine={true}
                labelWrap={false}
                apiOptions={this.props.apiOptions}
                choices={this.props.choices.map(function(choice, i) {
                    return {
                        content: <ChoiceEditor
                            ref={`choice-editor${i}`}
                            choice={choice}
                            onContentChange={(newProps) => {
                                if ("content" in newProps) {
                                    this.onContentChange(i, newProps.content);
                                }
                            }}
                            onClueChange={(newProps) => {
                                if ("content" in newProps) {
                                    this.onClueChange(i, newProps.content);
                                }
                            }}
                            onDelete={this.onDelete.bind(this, i)}
                            showDelete={this.props.choices.length >= 2} />,
                        isNoneOfTheAbove: choice.isNoneOfTheAbove,
                        checked: choice.correct,
                    };
                }, this)}
                onCheckedChange={this.onCheckedChange} />

            <div className="add-choice-container">
                <a href="#" className="simple-button orange"
                        onClick={this.addChoice.bind(this, false)}>
                    <span className="icon-plus" />
                    {' '}Add a choice{' '}
                </a>

                {!this.props.hasNoneOfTheAbove &&
                    <a href="#" className="simple-button"
                            onClick={this.addChoice.bind(this, true)}>
                        <span className="icon-plus" />
                        {' '}None of the above{' '}
                    </a>}
            </div>

        </div>;
    },

    onMultipleSelectChange: function(allowMultiple) {
        allowMultiple = allowMultiple.multipleSelect;

        const numSelected = _.reduce(this.props.choices, function(
            memo, choice) {

            return choice.correct ? memo + 1 : memo;
        }, 0);

        if (!allowMultiple && numSelected > 1) {
            const choices = _.map(this.props.choices, function(choice) {
                return _.defaults({
                    correct: false,
                }, choice);
            });
            this.props.onChange({
                multipleSelect: allowMultiple,
                choices: choices,
            });

        } else {
            this.props.onChange({
                multipleSelect: allowMultiple,
            });
        }
    },

    onCheckedChange: function(checked) {
        const choices = _.map(this.props.choices, (choice, i) => {
            return _.extend({}, choice, {
                correct: checked[i],
                content: choice.isNoneOfTheAbove && !checked[i] ?
                        '' : choice.content,
            });
        });
        this.props.onChange({choices: choices});
    },

    onContentChange: function(choiceIndex, newContent) {
        const choices = this.props.choices.slice();
        choices[choiceIndex] = _.extend({}, choices[choiceIndex], {
            content: newContent,
        });
        this.props.onChange({choices: choices});
    },

    onClueChange: function(choiceIndex, newClue) {
        const choices = this.props.choices.slice();
        choices[choiceIndex] = _.extend({}, choices[choiceIndex], {
            clue: newClue,
        });
        if (newClue === "") {
            delete choices[choiceIndex].clue;
        }
        this.props.onChange({choices: choices});
    },

    onDelete: function(choiceIndex, e) {
        e.preventDefault();

        const choices = this.props.choices.slice();
        const deleted = choices[choiceIndex];

        choices.splice(choiceIndex, 1);

        this.props.onChange({
            choices: choices,
            hasNoneOfTheAbove: this.props.hasNoneOfTheAbove &&
                !deleted.isNoneOfTheAbove,
        });
    },

    addChoice: function(noneOfTheAbove, e) {
        e.preventDefault();

        const choices = this.props.choices.slice();
        const newChoice = { isNoneOfTheAbove: noneOfTheAbove };
        const addIndex =
            choices.length - (this.props.hasNoneOfTheAbove ? 1 : 0);

        choices.splice(addIndex, 0, newChoice);

        this.props.onChange({
            choices: choices,
            hasNoneOfTheAbove: noneOfTheAbove || this.props.hasNoneOfTheAbove,
        }, () => {
            this.refs[`choice-editor${addIndex}`]
                .refs['content-editor'].focus();
        });
    },

    setDisplayCount: function(num) {
        this.props.onChange({displayCount: num});
    },

    focus: function() {
        this.refs['choice-editor0'].refs['content-editor'].focus();
        return true;
    },

    getSaveWarnings: function() {
        if (!_.some(_.pluck(this.props.choices, "correct"))) {
            return ["No choice is marked as correct."];
        }
        return [];
    },

    serialize: function() {
        return _.pick(this.props, "choices", "randomize", "multipleSelect",
            "displayCount", "hasNoneOfTheAbove", "onePerLine",
            "deselectEnabled");
    },
});

module.exports = RadioEditor;
