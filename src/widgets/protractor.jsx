/** @jsx React.DOM */
(function(Perseus) {

var Protractor = React.createClass({
    getDefaultProps: function() {
        return {
            width: 480,
            height: 480,
            imageUrl: null,
            imageTop: 0,
            imageLeft: 0,
            protractorX: 7.5,
            protractorY: 0.5
        };
    },

    getInitialState: function() {
        return {};
    },

    render: function() {
        return <div className={"perseus-widget perseus-widget-protractor"}
                style={{width: this.props.width, height: this.props.height}}>
                    {this.props.imageUrl && <img src={this.props.imageUrl}
                        style={{top: this.props.imageTop + "px",
                        left: this.props.imageLeft + "px"}} />}
                    <div className="graphie" ref="graphieDiv" />
                </div>;
    },

    componentDidMount: function() {
        this.setupGraphie();
    },

    setupGraphie: function() {
        var graphieDiv = this.refs.graphieDiv.getDOMNode();
        $(graphieDiv).empty();
        var graphie = this.graphie = KhanUtil.createGraphie(graphieDiv);

        graphie.init({
            range: [[0, this.props.width / 40], [0, this.props.height / 40]]
        });
        graphie.addMouseLayer();
        this.state.protractor = graphie.protractor([
                this.props.protractorX,
                this.props.protractorY]);
    },

    toJSON: function() {
        return {
            center: this.state.protractor.centerPoint.coord,
            angle: this.state.protractor.rotation
        };
    },

    simpleValidate: function(rubric) {
        return Protractor.validate(this.toJSON(), rubric);
    },

    focus: $.noop
});


_.extend(Protractor, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: null
        };
    }
});


var ProtractorEditor = React.createClass({
    className: "perseus-widget-protractor",

    getDefaultProps: function() {
        return {
            imageUrl: null,
            imageTop: 0,
            imageLeft: 0
        };
    },

    render: function() {
        return <div className="perseus-widget-protractor">
            <div>Image displayed under protractor:</div>
            <div>URL:
                <input type="text"
                        className="perseus-widget-protractor-url"
                        ref="image-url"
                        defaultValue={this.props.imageUrl}
                        onKeyPress={this.changeImageUrl}
                        onBlur={this.changeImageUrl} />
            </div>
            {this.props.imageUrl && <div>
                <div>Pixels from top:
                    <input type="text"
                            value={this.props.imageTop}
                            onInput={
                    _.partial(this.changeSetting, "imageTop")} />
                </div>
                <div>Pixels from left:
                    <input type="text"
                            value={this.props.imageLeft}
                            onInput={
                    _.partial(this.changeSetting, "imageLeft")} />
                </div>
            </div>}
        </div>;
    },

    changeImageUrl: function(e) {
        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.keyCode !== 13) {
            return;
        }

        this.props.onChange({
            imageUrl: this.refs["image-url"].getDOMNode().value
        });
    },

    changeSetting: function(type, e) {
        var newProps = {};
        newProps[type] = e.target.value;
        this.props.onChange(newProps);
    },

    toJSON: function() {
        var json = {
            imageUrl: this.props.imageUrl,
            imageTop: this.props.imageTop,
            imageLeft: this.props.imageLeft
        };
        return json;
    }
});

Perseus.Widgets.register("protractor", Protractor);
Perseus.Widgets.register("protractor-editor", ProtractorEditor);

})(Perseus);
