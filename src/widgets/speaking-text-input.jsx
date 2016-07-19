/** @jsx React.DOM */

var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var TextInput = React.createClass({
    render: function() {
        return <input ref="input" value={this.props.value || ""}
        onChange={this.changeValue}
        onPaste={this.pasteValue}
        onKeyPress={this.keypressValue}/>;
    },

    pasteValue: function(e) {
        console.log("paste");
        e.preventDefault();
        return false;
    },

    keypressValue: function(e) {
        console.log("keypress");
        e.preventDefault();
        return false;
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    changeValue: function(e) {
    //     // Translating from the js event e to the value
    //     // of the textbox to send to onChange
        if(e.target.value){
            console.log(e.target.value);
            this.props.setValue(e.target.value);
        }
        else{
            console.log(this.refs.input.value);
            this.props.setValue(this.refs.input.value);
        }
    },

    statics: {
        displayMode: "inline-block"
    }
});

var SpeakingBtn = React.createClass({
    render: function() {
        return (
            <button ref="btn_speaking" onClick={this.startRecognize}>辨識</button>
        );
    },
    getInitialState: function() {
        return {
            recognition: null,
            recognizing: false
        }
    },

    startRecognize: function() {
        console.log(this.state.recognizing);
        if(this.state.recognizing==false){
            this.state.recognition.start();
        }
    },

    componentDidMount: function() {
        var self = this;
        var os = self.getMobileOperatingSystem();
        console.log(self.hasSpeechRecognition());

        if(self.hasSpeechRecognition()){
            var recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = true;
            self.setState({recognizing: false});
            recognition.onstart = function() {
                self.setState({recognizing: true});
                console.log('recognition start');
            };
            recognition.onend = function() {
                self.setState({recognizing: false});
                console.log('recognition end');
            };
            recognition.onresult = function(event) {
                self.setState({recognizing: false});
                console.log('recognition result');
                console.log(event);
                for (var i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        self.props.setValue(event.results[i][0].transcript);
                    }
                }
            }
            self.setState({recognition: recognition});
        }
    },

    getMobileOperatingSystem: function() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
            return 'iOS';
        } else if (userAgent.match(/Android/i)) {
            return 'Android';
        } else {
            return userAgent;
        }
    },

    hasSpeechRecognition: function() {
        return ('webkitSpeechRecognition' in window);
    },

    statics: {
        displayMode: "inline-block"
    }
});

/**
 * This is the widget's renderer. It shows up in the right column
 * in test.html, and is what is visible to users, and where
 * users enter their answers.
 */
var SpeakingTextInput = React.createClass({
    propTypes: {
        value: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {value: ""};
    },

    getInitialState: function() {
        return {value: this.props.value}
    },

    setValue: function(val) {
        this.setState({value: val});
        this.change("value")(val);
    },

    /**
     * Changeling creates this.change() to tell our parent to update our props
     *
     * JsonifyProps creates this.toJSON() which returns the state of the widget
     * for checking the answer in simpleValidate
     */
    mixins: [
        Changeable, JsonifyProps
    ],

    render: function() {
        return (
            <div>
                <TextInput ref="input" value={this.state.value} setValue={this.setValue}/>
                <SpeakingBtn ref="btn_speaking" setValue={this.setValue}/>
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
        return SpeakingTextInput.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "inline-block"
    }
});

/**
 * This is the widget's grading function
 */
_.extend(SpeakingTextInput, {
    /**
     * simpleValidate generally defers to this function
     *
     * state is usually the result of toJSON on the widget
     * rubric is the result of calling toJSON() on the editor
     */
    parseAnswer: function(s) {
        var arr = s.split(" ");
        var parsedArr = [];
        for (var i=0; i<arr.length; i++) {
            if (arr[i].length > 0) {
                parsedArr.push(arr[i].toLowerCase());
            }
        }
        return parsedArr;
    },

    arrIsEqual: function(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for (var i = 0, len = arr1.length; i < len; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    },

    validate: function(state, rubric) {
        var userAns = SpeakingTextInput.parseAnswer(state.value);
        var correntAns = SpeakingTextInput.parseAnswer(rubric.correct);
        console.log("user");
        console.log(userAns);
        console.log("corrent");
        console.log(correntAns);
        if (userAns.length == 0) {
            return {type: "invalid", message: "看來你什麼都沒念！請重新再唸一次！"};
        } else if (SpeakingTextInput.arrIsEqual(userAns, correntAns)) {
            return {type: "points", earned: 1, total: 1, message: null};
        } else {
            return {type: "points", earned: 0, total: 1, message: null};
        }
    }
});

/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in test.html. Only the question writer sees this.
 */
var SpeakingTextInputEditor = React.createClass({
    mixins: [
        Changeable, JsonifyProps
    ],

    getDefaultProps: function() {
        return {correct: ""};
    },

    handleAnswerChange: function(event) {
        this.change({correct: event.target.value});
    },

    render: function() {
        return <div>
            <label>
                正確答案:
                <input value={this.props.correct} onChange={this.handleAnswerChange} ref="input"/>
            </label>
        </div>;
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    }
});

module.exports = {
    name: "speaking-text-input",
    displayName: "英文口說文字框",
    widget: SpeakingTextInput,
    editor: SpeakingTextInputEditor,
    // transform: propTransform
};
