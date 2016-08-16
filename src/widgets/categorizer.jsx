/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-undef, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */


const { StyleSheet, css } = require("aphrodite");
const React = require('react');
const classNames = require("classnames");
const Changeable = require("../mixins/changeable.jsx");
const WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");
const _ = require("underscore");

const ApiClassNames = require("../perseus-api.jsx").ClassNames;
const ApiOptions = require("../perseus-api.jsx").Options;
const {iconCircle, iconCircleThin} = require("../icon-paths.js");
const InlineIcon = require("../components/inline-icon.jsx");
const Renderer = require("../renderer.jsx");
const Util = require("../util.js");
const mediaQueries = require("../styles/media-queries.js");
const sharedStyles = require("../styles/shared.js");

const Categorizer = React.createClass({
    mixins: [WidgetJsonifyDeprecated, Changeable],

    propTypes: {
        apiOptions: ApiOptions.propTypes,

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
        const self = this;

        // In this context, isMobile is used to differentiate mobile from
        // desktop.
        const isMobile = this.props.apiOptions.isMobile;
        let indexedItems = this.props.items.map((item, n) => [item, n]);
        if (this.props.randomizeItems) {
            indexedItems = Util.shuffle(indexedItems, this.props.problemNum);
        }

        const table = <table className="categorizer-table">
            <thead><tr>
                <th>&nbsp;</th>
                {this.props.categories.map((category, i) => {
                    // Array index is the correct key here, as that's how
                    // category grading actually works -- no way to add or
                    // remove categories or items in the middle. (If we later
                    // add that, this should be fixed.)
                    return <th className={css(styles.header)} key={i}>
                        <Renderer content={category}/>
                    </th>;
                })}
            </tr></thead>
            <tbody>{indexedItems.map((indexedItem) => {
                var item = indexedItem[0];
                var itemNum = indexedItem[1];
                var uniqueId = self.state.uniqueId + "_" + itemNum;
                return <tr key={itemNum}>
                    <td><Renderer content={item}/></td>
                    {_.range(self.props.categories.length).map(catNum => {
                        const selected = self.props.values[itemNum] === catNum;
                        return <td
                            className={"category " + css(
                                styles.cell,
                                styles.responsiveCell
                            )}
                            key={catNum}
                        >
                            {/* a pseudo-label: toggle the value of the
                                checkbox when this div or the checkbox is
                                clicked */}
                            <div className={ApiClassNames.INTERACTIVE}
                                    onClick={this.onChange.bind(
                                        this,
                                        itemNum,
                                        catNum
                                    )}>
                                {isMobile && <input
                                    type="radio"
                                    name={uniqueId}
                                    className={css(
                                        sharedStyles.responsiveInput,
                                        sharedStyles.responsiveRadioInput
                                    )}
                                    checked={selected}
                                    onChange={this.onChange.bind(
                                        this,
                                        itemNum,
                                        catNum
                                    )}
                                    onClick={(e) => e.stopPropagation()}
                                    />}
                                {!isMobile && <span
                                    className={css(
                                        styles.responsiveSpan,
                                        styles.radioSpan,
                                        selected && styles.checkedRadioSpan,
                                        this.props.static && selected
                                            && styles.staticCheckedRadioSpan
                                    )}
                                >
                                    {selected
                                        ? <InlineIcon {...iconCircle} />
                                        : <InlineIcon {...iconCircleThin} />
                                    }
                                </span>}
                            </div>
                        </td>;
                    })}
                </tr>;
            })}</tbody>
        </table>;

        // TODO(benkomalo): kill CSS-based styling and move everything to
        // aphrodite.
        const extraClassNames = classNames({
            "categorizer-container": true,
            "static-mode": this.props.static,
        });
        const inlineStyles = this.props.apiOptions.isMobile
            ? [styles.fullBleedContainer] : [];

        return <div className={extraClassNames + ' ' + css(...inlineStyles)}>
            {table}
        </div>;
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

// TODO(benkomalo): inject page-margin into Perseus instead of hardcoding.
const pageMargin = 16;
const styles = StyleSheet.create({
    fullBleedContainer: {
        [mediaQueries.mdOrSmaller]: {
            marginLeft: -pageMargin,
            marginRight: -pageMargin,
            overflowX: 'auto',
        },
    },

    header: {
        textAlign: 'center',
        verticalAlign: 'bottom',
    },

    cell: {
        textAlign: 'center',
        padding: 0,
        color: '#ccc',
        verticalAlign: 'middle',
    },

    radioSpan: {
        fontSize: 30,
        paddingRight: 3,

        ':hover': {
            color: '#999',
        },
    },

    checkedRadioSpan: {
        color: '#333',
    },

    // .static-mode is applied by the Categorizer when the rendered
    // widget is static; in this case we gray out the choices to show
    // the user that the widget can't be interacted with.
    staticCheckedRadioSpan: {
        color: '#888',
    },
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
