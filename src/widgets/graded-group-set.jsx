/* eslint-disable react/forbid-prop-types */
const React = require("react");
const _ = require("underscore");
const {StyleSheet, css} = require("aphrodite");

const ApiOptions = require("../perseus-api.jsx").Options;
const Changeable   = require("../mixins/changeable.jsx");
const GradedGroup = require("./graded-group.jsx").widget;
const {grayLight, gray76, tableBackgroundAccent, kaGreen, phoneMargin, negativePhoneMargin} = require("../styles/constants.js");

const Indicators = React.createClass({
    propTypes: {
        currentGroup: React.PropTypes.number.isRequired,
        numGroups: React.PropTypes.number.isRequired,
        onChangeCurrentGroup: React.PropTypes.func.isRequired,
    },
    render() {
        const items = [];
        for (let i = 0; i < this.props.numGroups; i++) {
            items.push(
                <div
                    key={i}
                    className={css(
                        styles.indicator,
                        i === this.props.currentGroup &&
                            styles.selectedIndicator
                    )}
                    onClick={() => this.props.onChangeCurrentGroup(i)}
                />
            );
        }
        return (
            <div className={css(styles.indicatorContainer)}>
                {items}
            </div>
        );
    },
});

// TODO(jared): find a better name for this :) and for GradedGroup; the names
// are currently a little confusing.
const GradedGroupSet = React.createClass({
    propTypes: {
        apiOptions: ApiOptions.propTypes,
        gradedGroups: React.PropTypes.array,
        trackInteraction: React.PropTypes.func.isRequired,
    },

    mixins: [Changeable],

    getDefaultProps() {
        return {
            gradedGroups: [],
        };
    },

    getInitialState() {
        return {
            currentGroup: 0,
        };
    },

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    },

    // Mobile API
    getInputPaths() {
        return this._childGroup.getInputPaths();
    },

    setInputValue(path, newValue, cb) {
        return this._childGroup.setInputValue(path, newValue, cb);
    },

    getAcceptableFormatsForInputPath(path) {
        return this._childGroup.getAcceptableFormatsForInputPath(path);
    },

    focus() {
        return this._childGroup.focus();
    },

    focusInputPath(path) {
        this._childGroup.focusInputPath(path);
    },

    blurInputPath(path) {
        this._childGroup.blurInputPath(path);
    },

    render() {
        const currentGroup = this.props.gradedGroups[this.state.currentGroup];
        if (!currentGroup) {
            return <span>No current group...</span>;
        }
        return <div className={css(styles.container)}>
            <div className={css(styles.top)}>
                <div className={css(styles.title)}>
                    {currentGroup.title}
                </div>
                <div className={css(styles.spacer)} />
                <Indicators
                    numGroups={this.props.gradedGroups.length}
                    currentGroup={this.state.currentGroup}
                    onChangeCurrentGroup={
                        currentGroup => this.setState({currentGroup})}
                />
            </div>
            <GradedGroup
                ref={comp => this._childGroup = comp}
                {...this.props}
                {...currentGroup}
                transparentBackground={true}
                title={null}
            />
        </div>;
    },
});

const traverseChildWidgets = function(props, traverseRenderer) {
    // NOTE(jared): I have no idea how this works
    return {
        groups: props.gradedGroups.map(traverseRenderer),
    };
};

module.exports = {
    name: "graded-group-set",
    displayName: "Graded Group Set",
    widget: GradedGroupSet,
    traverseChildWidgets: traverseChildWidgets,
    hidden: false,
    tracking: "all",
};

const styles = StyleSheet.create({
    top: {
        display: 'flex',
        flexDirection: 'row',
    },
    spacer: {
        flex: 1,
    },

    title: {
        fontSize: 12,
        color: gray76,
        textTransform: 'uppercase',
        marginBottom: 11,
        letterSpacing: .8,
    },

    indicatorContainer: {
        display: 'flex',
        flexDirection: 'row',
    },

    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: grayLight,
        marginLeft: 5,
        cursor: 'pointer',
    },

    selectedIndicator: {
        backgroundColor: kaGreen,
    },

    container: {
        borderTop: `1px solid ${gray76}`,
        borderBottom: `1px solid ${gray76}`,
        backgroundColor: tableBackgroundAccent,
        marginLeft: negativePhoneMargin,
        marginRight: negativePhoneMargin,
        paddingBottom: phoneMargin,
        paddingLeft: phoneMargin,
        paddingRight: phoneMargin,
        paddingTop: 10,
        width: 'auto',
    },
});
