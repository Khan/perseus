/** @jsx React.DOM */

/**
 * A <select> component rendered with classes instead of natively,
 * so that the classes may be styled/animated/magics
 *
 * Usage:
 * <FancySelect value={1}>
 *     <FancySelect.Option value={0}>text0</FancySelect.Option>
 *     <FancySelect.Option value={1}>text1</FancySelect.Option>
 *     <FancySelect.Option value={2}>text2</FancySelect.Option>
 * </FancySelect>
 *
 * Here be dragons.
 */

var React = require("react");

// Hack to get around react descriptors not being renderable
// in a new component after the first render. This is being
// fixed in react 0.11 with the separation of descriptors,
// so we can probably remove these tricks then.
// TODO(jack): Remove these once we upgrade to React 0.11
var cloneWithProps = React.addons.cloneWithProps;

var cloneSingle = (comp) => {
    if (React.isValidComponent(comp)) {
        return cloneWithProps(comp);
    } else {
        return comp;
    }
};

var cloneRenderables = (children) => {
    if (!children) {
        return children;
    } else if (_.isArray(children)) {
        return _.map(children, cloneSingle);
    } else {
        return cloneSingle(children);
    }
};
// END TODO

var FancyOption = (props /*, children... */) => {
    var children = _.rest(arguments);
    return _.extend(props, {
        children: children
    });
};

var FancySelect = React.createClass({

    propTypes: {
        value: React.PropTypes.any.isRequired,
        className: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            onChange: () => { }
        };
    },

    getInitialState: function() {
        return {
            active: false,
            // Keep track of whether we've closed this select
            // from open so that we can only run CSS animations
            // when closing/opening, and not on page load
            // If we just use active, we get a closing animation
            // when the element loads :(.
            closed: false
        };
    },

    render: function() {
        var children = _.flatten([this.props.children || []]);

        // Some css-box magic:
        // We render all of the options on top of each other in a hidden,
        // floated span. This span then forces the <FancySelect>'s
        // width to be large enough to fit the largest option when
        // selected, so that the page doesn't have to re-flow when changing
        // select items.
        var optionSizer = <span style={{
                    display: "inline-block",
                    float: "left",
                    visibility: "hidden",
                    height: 0
                }}>
            {_.map(children, (option) => {
                return <div className="fancy-select-value-hidden"
                            style={{height: 0}}>
                    {cloneRenderables(option.children)}
                </div>;
            })}
        </span>;

        var selectedOption = _.findWhere(children, {
            value: this.props.value
        });

        var selectBoxClassName = React.addons.classSet({
            "fancy-select": true,
            active: this.state.active,
            closed: this.state.closed
        });

        var selectBox = <div className={selectBoxClassName}
                onClick={this._swapActive}>
                {optionSizer}
                {/* position this absolutely so it goes on top
                    of the optionSizer, not next to it */}
                <span
                        className="fancy-select-value"
                        style={{position: "absolute"}}>
                    {cloneRenderables(selectedOption.children)}
                </span>
        </div>;

        var options = _.map(children, (option, i) => {
            // options can specify visible={true|false|null/undefined} to
            // control whether they are displayed always, never, or when
            // active (the default). `true` is useful if you want to manage
            // visibility manually via css.
            var visible = option.visible != null ?
                    option.visible :
                    this.state.active;
            if (!visible) {
                return null;
            }

            var className = React.addons.classSet({
                "fancy-option": true,
                active: this.state.active,
                closed: this.state.closed,
                selected: option.value === this.props.value
            });
            if (option.className) {
                className += " " + option.className;
            }

            return <li
                    className={className}
                    key={i}
                    style={option.style}
                    onClick={() => {
                        this.props.onChange(option.value, option);
                        this.setState({
                            active: false,
                            closed: true
                        });
                    }}>
                {cloneRenderables(option.children)}
            </li>;
        });

        var optionsBoxClassName = React.addons.classSet({
            "fancy-select-options": true,
            active: this.state.active,
            closed: this.state.closed
        });

        return <div className={this.props.className}>
            {selectBox}
            {<ul className={optionsBoxClassName}>
                {options}
            </ul>}
        </div>;
    },

    _swapActive: function() {
        var active = !this.state.active;
        var closed = !active;
        this.setState({
            active: active,
            closed: closed
        });
    }
});

FancySelect.Option = FancyOption;

module.exports = FancySelect;
