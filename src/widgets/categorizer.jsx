var React = require("react");

var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var Renderer = require("../renderer.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");

var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

var Categorizer = React.createClass({
    mixins: [JsonifyProps, Changeable],

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
    setAnswerFromJSON: function(answerData) {
        this.props.onChange(answerData);
    },
    getInitialState: function() {
        return {
            uniqueId: _.uniqueId("perseus_radio_")
        };
    },

    render: function() {
        var self = this;

        return <div className="categorizer-container clearfix"><table>
            <thead><tr>
                <th>&nbsp;</th>
                {_.map(this.props.categories, (category) => {
                    return <th className="category">
                        <Renderer content={category}/>
                    </th>;
                })}
            </tr></thead>
            <tbody>{_.map(this.props.items, (item, itemNum) => {
                var uniqueId = self.state.uniqueId + "_" + itemNum;
                return <tr>
                    <td><Renderer content={item}/></td>
                    {_.range(self.props.categories.length).map(catNum => {
                        return <td className="category">
                            <label onTouchStart={captureScratchpadTouchStart}>
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
                                    />
                                <span></span>
                            </label>
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
        return Categorizer.validate(this.toJSON(), rubric);
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
    mixins: [JsonifyProps, Changeable],

    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.string),
        categories: React.PropTypes.arrayOf(React.PropTypes.string),
        values: React.PropTypes.arrayOf(React.PropTypes.number)
    },

    getDefaultProps: function() {
        return {
            items: [],
            categories: [],
            values: []
        };
    },

    render: function() {
        return <div>
            類別:
            <TextListEditor
                options={this.props.categories}
                onChange={(cat) => {this.change("categories", cat);}}
                layout="horizontal" />

            項目:
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
    displayName: "Categorizer/分類器",
    widget: Categorizer,
    editor: CategorizerEditor,
    transform: (editorProps) => {
        return _.pick(editorProps, "items", "categories");
    },
    hidden: false
};
