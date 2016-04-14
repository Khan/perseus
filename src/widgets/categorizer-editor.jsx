/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, comma-dangle, indent, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var _ = require("underscore");

var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");

var Categorizer = require("./categorizer.jsx").widget;

var CategorizerEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.string),
        categories: React.PropTypes.arrayOf(React.PropTypes.string),
        values: React.PropTypes.arrayOf(React.PropTypes.number),
        randomizeItems: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            items: [],
            categories: [],
            values: [],
            randomizeItems: false
        };
    },

    render: function() {
        return <div>
            <div className="perseus-widget-row">
                <PropCheckBox
                    label="Randomize item order"
                    labelAlignment="right"
                    randomizeItems={this.props.randomizeItems}
                    onChange={this.props.onChange} />
            </div>

            Categories:
            <TextListEditor
                options={this.props.categories}
                onChange={(cat) => {this.change("categories", cat);}}
                layout="horizontal" />

            Items:
            <TextListEditor
                options={this.props.items}
                onChange={(items) => {this.change({
                        items: items,
                        // TODO(eater): This truncates props.values so there
                        // are never more correct answers than items, ensuring
                        // the widget is possible to answer correctly.
                        // It doesn't necessarly keep each answer with
                        // its corresponding item if an item is deleted from
                        // the middle. Inconvenient, but it's at least possible
                        // for content creators to catch and fix.
                        values: _.first(this.props.values, items.length)
                    });}}
                layout="vertical" />

            <Categorizer
                items={this.props.items}
                categories={this.props.categories}
                values={this.props.values}
                onChange={(newProps) => {this.props.onChange(newProps);}}
                trackInteraction={function() {}}
                />
        </div>;
    },
});

module.exports = CategorizerEditor;
