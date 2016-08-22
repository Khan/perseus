/* eslint-disable react/forbid-prop-types */
const React = require("react");
const _ = require("underscore");

const ApiOptions = require("../perseus-api.jsx").Options;
const Changeable = require("../mixins/changeable.jsx");
const GradedGroupEditor = require("./graded-group-editor.jsx");

const GradedGroupSetEditor = React.createClass({
    propTypes: {
        apiOptions: ApiOptions.propTypes,
        gradedGroups: React.PropTypes.array,
        onChange: React.PropTypes.func.isRequired,
    },

    mixins: [Changeable],

    getDefaultProps() {
        return {
            gradedGroups: [],
        };
    },

    componentWillMount() {
        this._editors = [];
    },

    getSaveWarnings() {
        return [].concat(...this._editors.map(
            editor => editor.getSaveWarnings()));
    },

    serialize() {
        return {
            gradedGroups: this.props.gradedGroups,
        };
    },

    renderGroups() {
        if (!this.props.gradedGroups) {
            return null;
        }
        return this.props.gradedGroups.map((group, i) => (
            <GradedGroupEditor
                key={i}
                ref={el => this._editors[i] = el}
                {...group}
                apiOptions={this.props.apiOptions}
                widgetEnabled={true}
                immutableWidgets={false}
                onChange={data => this.change(
                    "gradedGroups",
                    setArrayItem(this.props.gradedGroups, i, {
                        ...this.props.gradedGroups[i],
                        ...data,
                    })
                )}
            />
        ));
    },

    addGroup() {
        const groups = this.props.gradedGroups || [];
        this.change("gradedGroups", groups.concat([
            GradedGroupEditor.getDefaultProps()]));
    },

    render() {
        return <div className="perseus-group-editor">
            {this.renderGroups()}
            <button onClick={this.addGroup}>
                Add group
            </button>
        </div>;
    },
});

const setArrayItem = (list, i, value) => (
    [...list.slice(0, i), value, ...list.slice(i + 1)]
);

module.exports = GradedGroupSetEditor;
