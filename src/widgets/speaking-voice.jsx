/** @jsx React.DOM */

var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");
var ResponsiveVoice = require('../../lib/responsivevoice.js');

var SpeakingVoice = React.createClass({
    componentDidMount: function() {
        this.responsiveVoice = new ResponsiveVoice;
        this.responsiveVoice.init(); // must manually init
    },

    speak: function() {
        this.responsiveVoice.speak(this.props.voiceText, this.props.lang, {
            pitch: parseFloat(this.props.pitch),
            rate: parseFloat(this.props.rate),
            volume: this.props.volume
        });
    },

    // prevent trigger checking answer when clicking button
    speakOnClick: function(e) {
        this.speak();
        e.preventDefault();
        return false;
    },

    mixins: [
        Changeable, JsonifyProps
    ],

    render: function() {
        return (
            <div>
                <button className="simple-button green" onClick={this.speakOnClick}>發聲</button>
            </div>
        );
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    simpleValidate: function(rubric) {
        return {type: "points", earned: 1, total: 1, message: null};
    },

    statics: {
        displayMode: "inline-block"
    }
});

var SpeakingVoiceEditor = React.createClass({
    mixins: [
        Changeable, JsonifyProps
    ],

    getDefaultProps: function() {
        return {voiceText: "", pitch: "1.0", rate: "1.0", volume: "1.0", lang: "US English Female"}
    },

    getInitialState: function() {
        return {voiceText: this.props.voiceText, pitch: this.props.pitch, rate: this.props.rate, volume: this.props.volume, lang: this.props.lang}
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
                        <option value="0.2">0.2</option>
                        <option value="0.3">0.3</option>
                        <option value="0.4">0.4</option>
                        <option value="0.5">0.5</option>
                        <option value="0.6">0.6</option>
                        <option value="0.7">0.7</option>
                        <option value="0.8">0.8</option>
                        <option value="0.9">0.9</option>
                        <option value="1.0">1.0</option>
                        <option value="1.1">1.1</option>
                        <option value="1.2">1.2</option>
                        <option value="1.3">1.3</option>
                        <option value="1.4">1.4</option>
                        <option value="1.5">1.5</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    音調:
                    <select value={this.state.pitch} defaultValue={this.state.pitch} onChange={this.pitchChange}>
                        <option value="0">0</option>
                        <option value="0.1">0.1</option>
                        <option value="0.2">0.2</option>
                        <option value="0.3">0.3</option>
                        <option value="0.4">0.4</option>
                        <option value="0.5">0.5</option>
                        <option value="0.6">0.6</option>
                        <option value="0.7">0.7</option>
                        <option value="0.8">0.8</option>
                        <option value="0.9">0.9</option>
                        <option value="1.0">1.0</option>
                        <option value="1.1">1.1</option>
                        <option value="1.2">1.2</option>
                        <option value="1.3">1.3</option>
                        <option value="1.4">1.4</option>
                        <option value="1.5">1.5</option>
                        <option value="1.6">1.6</option>
                        <option value="1.7">1.7</option>
                        <option value="1.8">1.8</option>
                        <option value="1.9">1.9</option>
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
    hidden: false,
    editor: SpeakingVoiceEditor
};
