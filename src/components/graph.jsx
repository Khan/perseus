/** @jsx React.DOM */
(function(Perseus) {

var defaultBoxSize = 400;
var defaultBackgroundImage = {
    url: null,
    scale: 1,
    bottom: 0,
    left: 0,
};

function numSteps(range, step) {
    return Math.floor((range[1] - range[0]) / step);
}

var Graph = React.createClass({
    propTypes: {
        box: React.PropTypes.array.isRequired
    },

    getDefaultProps: function() {
        return {
            box: [defaultBoxSize, defaultBoxSize],
            range: [[-10, 10], [-10, 10]],
            step: [1, 1],
            markings: "graph",
            backgroundImage: defaultBackgroundImage,
            showProtractor: false,
            onNewGraphie: null,
            onClick: null
        };
    },

    render: function() {
        var image = this.props.backgroundImage;
        if (image.url) {
            var preScale = this.props.box[0] / defaultBoxSize;
            var scale = image.scale * preScale;
            var style = {
                bottom: (preScale * image.bottom) + "px",
                left: (preScale * image.left) + "px",
                width: (scale * image.width) + "px",
                height: (scale * image.height) + "px"
            };
            image = <img style={style} src={image.url} />;
        } else {
            image = null;
        }

        return <div className="graphie-container">
            {image}
            <div className="graphie" ref="graphieDiv" />
        </div>;
    },

    componentDidMount: function() {
        this._setupGraphie();
    },

    componentDidUpdate: function() {
        // Only setupGraphie once per componentDidUpdate().
        // See explanation in setupGraphie().
        this._hasSetupGraphieThisUpdate = false;
        if (this._shouldSetupGraphie) {
            this._setupGraphie();
            this._shouldSetupGraphie = false;
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if (!_.isEqual(this.props.range, nextProps.range)) {
            this._shouldSetupGraphie = true;
        }
        if (!_.isEqual(this.props.step, nextProps.step)) {
            this._shouldSetupGraphie = true;
        }
        if (!_.isEqual(this.props.markings, nextProps.markings)) {
            this._shouldSetupGraphie = true;
        }
        if (!_.isEqual(this.props.showProtractor, nextProps.showProtractor)) {
            this._shouldSetupGraphie = true;
        }
    },

    /* Reset the graphie canvas to its initial state
     *
     * Use when re-rendering the parent component and you need a blank
     * graphie.
     */
    reset: function() {
        this._setupGraphie();
    },

    graphie: function() {
        return this._graphie;
    },

    pointsFromNormalized: function(coordsList, noSnap) {
        var self = this;
        return _.map(coordsList, function(coords) {
            return _.map(coords, function(coord, i) {
                var range = self.props.range[i];
                if (noSnap) {
                    return range[0] + (range[1] - range[0]) * coord;
                } else {
                    var step = self.props.step[i];
                    var nSteps = numSteps(range, step);
                    var tick = Math.round(coord * nSteps);
                    return range[0] + step * tick;
                }
            });
        });
    },

    _setupGraphie: function() {
        // Only setupGraphie once per componentDidUpdate().
        // This prevents this component from rendering graphie
        // and then immediately re-render graphie because its
        // parent component asked it to. This will happen when
        // props on the parent and props on this component both
        // require graphie to be re-rendered.
        if (this._hasSetupGraphieThisUpdate) {
            return;
        }

        var graphieDiv = this.refs.graphieDiv.getDOMNode();
        $(graphieDiv).empty();
        var range = this.props.range;
        var graphie = this._graphie = KhanUtil.createGraphie(graphieDiv);

        var gridConfig = this._getGridConfig();
        graphie.snap = _.pluck(gridConfig, "snap");

        if (this.props.markings === "graph") {
            graphie.graphInit({
                range: range,
                scale: _.pluck(gridConfig, "scale"),
                axisArrows: "<->",
                labelFormat: function(s) { return "\\small{" + s + "}"; },
                gridStep: _.pluck(gridConfig, "gridStep"),
                tickStep: _.pluck(gridConfig, "tickStep"),
                labelStep: 1,
                unityLabels: _.pluck(gridConfig, "unityLabel")
            });
            graphie.label([0, range[1][1]], "y", "above");
            graphie.label([range[0][1], 0], "x", "right");
        } else if (this.props.markings === "grid") {
            graphie.graphInit({
                range: range,
                scale: _.pluck(gridConfig, "scale"),
                gridStep: _.pluck(gridConfig, "gridStep"),
                axes: false,
                ticks: false,
                labels: false
            });
        } else if (this.props.markings === "none") {
            graphie.init({
                range: range,
                scale: _.pluck(gridConfig, "scale")
            });
        }

        graphie.addMouseLayer({
            onClick: this.props.onClick
        });

        this._updateProtractor();

        // We set this flag before jumping into our callback
        // to avoid recursing if our callback calls reset() itself
        this._hasSetupGraphieThisUpdate = true;
        if (this.props.onNewGraphie) {
            this.props.onNewGraphie(graphie);
        }
    },

    _getGridConfig: function() {
        var self = this;
        return _.map(self.props.step, function(step, i) {
            return Perseus.Util.gridDimensionConfig(
                    step,
                    self.props.range[i],
                    self.props.box[i]);
        });
    },

    _updateProtractor: function() {
        if (this.protractor) {
            this.protractor.remove();
        }

        if (this.props.showProtractor) {
            var coord = this.pointsFromNormalized([[0.50, 0.05]])[0];
            this.protractor = this._graphie.protractor(coord);
        }
    },

    toJSON: function() {
        return _.pick(this.props, 'range', 'step', 'markings',
                'backgroundImage', 'showProtractor');
    }
});

Perseus.Components = Perseus.Components || {};
Perseus.Components.Graph= Graph;

})(Perseus);
