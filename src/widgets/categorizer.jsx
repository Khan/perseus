/** @jsx React.DOM */

var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var Renderer = require("../renderer.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");

var Categorizer = React.createClass({
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
                        return <td className="category"><label>
                            <input
                                type="radio"
                                name={uniqueId}
                                checked={self.props.values[itemNum] === catNum}
                                onChange={
                                    this.onChange.bind(this, itemNum, catNum)}
                                />
                            <span></span>
                        </label></td>;
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
            Categories:
            <TextListEditor
                options={this.props.categories}
                onChange={(cat) => {this.change("categories", cat);}}
                layout="horizontal" />

            Items:
            <TextListEditor
                options={this.props.items}
                onChange={(items) => {this.change("items", items);}}
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
    hidden: true,
    widget: Categorizer,
    editor: CategorizerEditor,
    transform: (editorProps) => {
        return _.pick(editorProps, "items", "categories");
    }
};

