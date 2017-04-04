/**
 * A side by side diff view for Perseus articles.
 */

const React = require("react");
const _ = require("underscore");

const RendererDiff = require("./renderer-diff.jsx");

const rendererProps = React.PropTypes.shape({
    content: React.PropTypes.string,
    images: React.PropTypes.object,
    widgets: React.PropTypes.object,
});


const ArticleDiff = React.createClass({
    propTypes: {
        // TODO(alex): Check whether we still have any Perseus articles whose
        // top-level json is an object, not an array. If not, simplify here.
        after: React.PropTypes.oneOfType([
            rendererProps,
            React.PropTypes.arrayOf(rendererProps),
        ]).isRequired,
        before: React.PropTypes.oneOfType([
            rendererProps,
            React.PropTypes.arrayOf(rendererProps),
        ]).isRequired,
    },

    getInitialState: function() {
        return this._stateFromProps(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState(this._stateFromProps(nextProps));
    },

    _stateFromProps: function(props) {
        const {before, after} = props;
        return {
            before: Array.isArray(before) ? before : [before],
            after: Array.isArray(after) ? after : [after],
        };
    },

    render: function() {
        const {before, after} = this.state;

        const sectionCount = Math.max(before.length, after.length);

        const sections = _.times(sectionCount, n =>
            <RendererDiff
                before={n < before.length ? before[n] : undefined}
                after={n < after.length ? after[n] : undefined}
                title={`Section ${n + 1}`}
                showAlignmentOptions={true}
                showSeparator={n < sectionCount - 1}
                key={n}
            />
        );

        return <div className="framework-perseus">{sections}</div>;
    },
});

module.exports = ArticleDiff;
