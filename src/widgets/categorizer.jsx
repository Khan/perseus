var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");
var _ = require("underscore");

var ApiClassNames = require("../perseus-api.jsx").ClassNames;
var InfoTip = require("react-components/info-tip.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var Renderer = require("../renderer.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");
var Util = require("../util.js");

var Categorizer = React.createClass({
    mixins: [WidgetJsonifyDeprecated, Changeable],

    propTypes: {
        // List of items that are being categorized (along the left side)
        items: React.PropTypes.arrayOf(React.PropTypes.string),
        // List of categories (across the top)
        categories: React.PropTypes.arrayOf(React.PropTypes.string),
        // Ordered list of correct answers, mapping items to categories thusly:
        //   values[<items_index>] == <categories_index>
        values: React.PropTypes.arrayOf(React.PropTypes.number)
    },

    getDefaultProps: function() {
        return {
            items: [],
            categories: [],
            values: []
        };
    },

    getInitialState: function() {
        return {
            uniqueId: _.uniqueId("perseus_radio_")
        };
    },

    render: function() {
        var self = this;

        var indexedItems = _.map(this.props.items, (item, n) => [item, n]);
        if (this.props.randomizeItems) {
            indexedItems = Util.shuffle(indexedItems, this.props.problemNum);
        }

        return <div className="categorizer-container clearfix"><table>
            <thead><tr>
                <th>&nbsp;</th>
                {_.map(this.props.categories, (category) => {
                    return <th className="category">
                        <Renderer content={category}/>
                    </th>;
                })}
            </tr></thead>
            <tbody>{_.map(indexedItems, (indexedItem) => {
                var item = indexedItem[0];
                var itemNum = indexedItem[1];
                var uniqueId = self.state.uniqueId + "_" + itemNum;
                return <tr>
                    <td><Renderer content={item}/></td>
                    {_.range(self.props.categories.length).map(catNum => {
                        return <td className="category">
                            {/* a pseudo-label: toggle the value of the
                                checkbox when this div or the checkbox is
                                clicked */}
                            <div className={ApiClassNames.INTERACTIVE}
                                    onClick={this.onChange.bind(
                                        this,
                                        itemNum,
                                        catNum
                                    )}>
                                <input
                                    type="radio"
                                    name={uniqueId}
                                    checked={
                                        self.props.values[itemNum] === catNum
                                    }
                                    onChange={this.onChange.bind(
                                        this,
                                        itemNum,
                                        catNum
                                    )}
                                    onClick={(e) => e.stopPropagation()}
                                    />
                                <span></span>
                            </div>
                        </td>;
                    })}
                </tr>;
            })}</tbody>
        </table></div>;
    },

    onChange: function(itemNum, catNum) {
        var values = _.clone(this.props.values);
        values[itemNum] = catNum;
        this.change("values", values);
    },

    simpleValidate: function(rubric) {
        return Categorizer.validate(this.getUserInput(), rubric);
    },

    statics: {
        displayMode: "block"
    }
});


_.extend(Categorizer, {
    validate: function(state, rubric) {
        var completed = true;
        var allCorrect = true;
        _.each(rubric.values, function(value, i) {
            if (state.values[i] == null) {
                completed = false;
            }
            if (state.values[i] !== value) {
                allCorrect = false;
            }
        });
        if (!completed) {
            return {
                type: "invalid",
                // XXX(joel) - i18n
                message: "Make sure you select something for every row."
            };
        }
        return {
            type: "points",
            earned: allCorrect ? 1 : 0,
            total: 1,
            message: null
        };
    }
});


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
                />
        </div>;
    },
});

module.exports = {
    name: "categorizer",
    displayName: "Categorizer",
    widget: Categorizer,
    editor: CategorizerEditor,
    transform: (editorProps) => {
        return _.pick(editorProps, "items", "categories", "randomizeItems");
    }
};

