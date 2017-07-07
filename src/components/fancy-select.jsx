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
var classNames = require("classnames");

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
                    {option.props.children}
                </div>;
            })}
        </span>;

        var selectedOption = _.findWhere(children, {
            value: this.props.value
        });

        var selectBoxClassName = classNames({
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
                    {selectedOption.props.children}
                </span>
        </div>;

        var options = _.map(children, (option, i) => {
            // options can specify visible={true|false|null/undefined} to
            // control whether they are displayed always, never, or when
            // active (the default). `true` is useful if you want to manage
            // visibility manually via css.
            var visible = option.props.visible != null ?
                    option.props.visible :
                    this.state.active;
            if (!visible) {
                return null;
            }

            var className = classNames({
                "fancy-option": true,
                active: this.state.active,
                closed: this.state.closed,
                selected: option.props.value === this.props.value
            });
            if (option.props.className) {
                className += " " + option.props.className;
            }

            return <li
                    className={className}
                    key={i}
                    style={option.props.style}
                    onClick={() => {
                        this.props.onChange(option.props.value, option);
                        this.setState({
                            active: false,
                            closed: true
                        });
                    }}>
                {option.props.children}
            </li>;
        });

        var optionsBoxClassName = classNames({
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
