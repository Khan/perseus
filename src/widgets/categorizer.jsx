/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-undef, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var classNames = require("classnames");
var Changeable = require("../mixins/changeable.jsx");
var WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");
var _ = require("underscore");

var ApiClassNames = require("../perseus-api.jsx").ClassNames;
var Renderer = require("../renderer.jsx");
var Util = require("../util.js");

var Categorizer = React.createClass({
    mixins: [WidgetJsonifyDeprecated, Changeable],

    propTypes: {
        // List of categories (across the top)
        categories: React.PropTypes.arrayOf(React.PropTypes.string),
        // List of items that are being categorized (along the left side)
        items: React.PropTypes.arrayOf(React.PropTypes.string),
        trackInteraction: React.PropTypes.func.isRequired,
        // Ordered list of correct answers, mapping items to categories thusly:
        //   values[<items_index>] == <categories_index>
        values: React.PropTypes.arrayOf(React.PropTypes.number),
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

        var className = classNames({
            "categorizer-container": true,
            "clearfix": true,
            "static-mode": this.props.static,
        });

        return <div className={className}><table>
            <thead><tr>
                <th>&nbsp;</th>
                {_.map(this.props.categories, (category, i) => {
                    // Array index is the correct key here, as that's how
                    // category grading actually works -- no way to add or
                    // remove categories or items in the middle. (If we later
                    // add that, this should be fixed.)
                    return <th className="category" key={i}>
                        <Renderer content={category}/>
                    </th>;
                })}
            </tr></thead>
            <tbody>{_.map(indexedItems, (indexedItem) => {
                var item = indexedItem[0];
                var itemNum = indexedItem[1];
                var uniqueId = self.state.uniqueId + "_" + itemNum;
                return <tr key={itemNum}>
                    <td><Renderer content={item}/></td>
                    {_.range(self.props.categories.length).map(catNum => {
                        return <td className="category" key={catNum}>
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
        this.props.trackInteraction();
    },

    simpleValidate: function(rubric) {
        return Categorizer.validate(this.getUserInput(), rubric);
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
                message: i18n._("Make sure you select something for every row.")
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

module.exports = {
    name: "categorizer",
    displayName: "Categorizer",
    widget: Categorizer,
    transform: (editorProps) => {
        return _.pick(editorProps, "items", "categories", "randomizeItems");
    },
    staticTransform: (editorProps) => {
        return _.pick(editorProps,
            "items", "categories", "values", "randomizeItems");
    },
};

