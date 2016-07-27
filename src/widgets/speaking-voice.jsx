/** @jsx React.DOM */

var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");
var ResponsiveVoice = require('../../lib/responsivevoice.js');
/**
 * This is the widget's renderer. It shows up in the right column
 * in test.html, and is what is visible to users, and where
 * users enter their answers.
 */
var SpeakingVoice = React.createClass({
    // propTypes: {
    //     value: React.PropTypes.string
    // },
    //
    componentDidMount: function() {
        this.responsiveVoice = new ResponsiveVoice;
        this.responsiveVoice.init();
        console.log(this.responsiveVoice);
    },

    speak: function() {
        this.responsiveVoice.speak(
            this.props.voiceText,
            this.props.lang,
            {
                pitch: parseFloat(this.props.pitch),
                rate: parseFloat(this.props.rate),
                volume: this.props.volume
            }
        );
    },

    // getDefaultProps: function() {
    //     return {value: ""};
    // },

    // getInitialState: function() {
    //     return {r: null}
    // },
    //
    // setValue: function(val) {
    //     this.setState({value: val});
    //     this.change("value")(val);
    // },

    mixins: [
        Changeable, JsonifyProps
    ],

    render: function() {
        return (
            <div>
                <button className="simple-button green" onClick={this.speak}>發聲</button>
            </div>
        );
    },

    /**
     * Widgets that are focusable should add a focus method that returns
     * true if focusing succeeded. The first such widget found will be
     * focused on page load.
     */
    focus: function() {
        this.refs.input.focus();
        return true;
    },

    /**
     * simpleValidate is called for grading. Rubric is the result of calling
     * toJSON() on the editor that created this widget.
     *
     * Should return an object representing the grading result, such as
     * {
     *     type: "points",
     *     earned: 1,
     *     total: 1,
     *     message: null
     * }
     */
    simpleValidate: function(rubric) {
        return {
             type: "points",
             earned: 1,
             total: 1,
             message: null
         };
    },

    statics: {
        displayMode: "inline-block"
    }
});

/**
 * This is the widget's grading function
 */
_.extend(SpeakingVoice, {
    /**
     * simpleValidate generally defers to this function
     *
     * state is usually the result of toJSON on the widget
     * rubric is the result of calling toJSON() on the editor
     */

});

/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in test.html. Only the question writer sees this.
 */
var SpeakingVoiceEditor = React.createClass({
    mixins: [
        Changeable, JsonifyProps
    ],

    getDefaultProps: function() {
        return {
                voiceText: "",
                pitch: "1.0",
                rate: "1.0",
                volume: "1.0",
                lang: "US English Female"
            }
    },

    getInitialState: function() {
        return {
                voiceText: this.props.voiceText,
                pitch: this.props.pitch,
                rate: this.props.rate,
                volume: this.props.volume,
                lang: this.props.lang
            }
    },

    pitchChange: function(event) {
        this.change({pitch: event.target.value});
        this.setState({pitch: event.target.value});
    },

    voiceTextChange: function(event) {
        this.change({voiceText: event.target.value});
        this.setState({voiceText: event.target.value});
    },

    rateChange: function(event) {
        this.change({rate: event.target.value});
        this.setState({rate: event.target.value});
    },

    langChange: function(event) {
        this.change({lang: event.target.value});
        this.setState({lang: event.target.value});
    },

    render: function() {
        return <div>
            <div>
                <label>
                    內容:
                    <input value={this.state.voiceText} onChange={this.voiceTextChange} defaultValue={this.state.voiceText} ref="input"/>
                </label>
            </div>
            <div>
                <label>
                    速度:
                    <select value={this.state.rate} defaultValue={this.state.rate} onChange={this.rateChange}>
                        <option value="0.1">0.1</option>
                        <option value="0.3">0.3</option>
                        <option value="0.5">0.5</option>
                        <option value="0.7">0.7</option>
                        <option value="1.0">1.0</option>
                        <option value="1.3">1.3</option>
                        <option value="1.5">1.5</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    音調:
                    <select value={this.state.pitch} defaultValue={this.state.pitch} onChange={this.pitchChange}>
                        <option value="0">0</option>
                        <option value="0.5">0.5</option>
                        <option value="1.0" >1.0</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    語言:
                    <select value={this.state.lang} defaultValue={this.state.lang} onChange={this.langChange}>
                        <option value="UK English Female">UK English Female</option>
                        <option value="UK English Male">UK English Male</option>
                        <option value="US English Female">US English Female</option>
                    </select>
                </label>
            </div>
        </div>;
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    }
});

module.exports = {
    name: "speaking-voice",
    displayName: "Speaking Voice",
    widget: SpeakingVoice,
    // Let's not expose it to all content creators yet
    hidden: false,
    editor: SpeakingVoiceEditor
};
