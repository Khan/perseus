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
        e.preventDefault();
        return false;
    },

    keypressValue: function(e) {
        e.preventDefault();
        return false;
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    changeValue: function(e) {
        // Chrome Speech API
        if(e.target.value){
            console.log(e.target.value);
            this.props.setValue(e.target.value);
        }
        // iOS Siri Input
        else{
            console.log(this.refs.input.value);
            this.props.setValue(this.refs.input.value);
        }
    },

    statics: {
        displayMode: "inline-block"
    }
});

var StatusSpan = React.createClass({
    render : function() {
        return (
            <span>{this.props.text}</span>
        )
    }
});

var SpeakingBtn = React.createClass({
    render: function() {
        return (
            <div>
                {this.state.recognition ?
                    <button ref="btn_speaking"
                        onClick={this.startRecognize}
                        className="simple-button orange">辨識
                        </button>
                    : false}

                <StatusSpan text={this.state.status}></StatusSpan>
            </div>
        );
    },
    getInitialState: function() {
        return {
            recognition: null,
            recognizing: false,
            status: "",
        }
    },

    startRecognize: function() {
        if(this.state.recognizing==false){
            this.state.recognition.start();
        }
    },

    componentDidMount: function() {
        var self = this;
        var os = self.getMobileOperatingSystem();
        if(self.hasSpeechRecognition()){
            var recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.maxAlternatives = 20;
            self.setState({recognizing: false});
            self.setState({status: "請按開始"});
            recognition.onstart = function() {
                self.setState({recognizing: true});
                self.setState({status: "辨識中"});
                self.props.setValue('');
                console.log('recognition start');
            };
            recognition.onend = function() {
                self.setState({recognizing: false});
                self.setState({status: "辨識完成"});
                console.log('recognition end');
            };
            recognition.onresult = function(event) {
                self.setState({recognizing: false});
                console.log('recognition result');
                console.log(event);
                var res = '';
                for (var i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        for (var j = 0; j < event.results[i].length; j++) {
                            if(j!=0){
                                res = res + '/';
                            }
                            res = res + event.results[i][j].transcript;
                            self.props.setValue(res);
                        }
                    }
                }
            }
            self.setState({recognition: recognition});
        }
        else{
            if(os=='iOS'){
                self.setState({status: "請用 Siri 語音輸入"});
            }
            else if (os=='Android') {
                self.setState({status: "請用 Google 語音輸入"});
            }
            else{
                self.setState({status: "請用 Chrome 瀏覽器"});
            }
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
        console.log(state);
        var correntAns = SpeakingTextInput.parseAnswer(rubric.correct);
        var userAnsList = state.value.split("/");
        var correntIdx = -1;
        for (var i = 0, len = userAnsList.length; i < len; i++) {
            if(SpeakingTextInput.arrIsEqual(SpeakingTextInput.parseAnswer(userAnsList[i]), correntAns)){
                correntIdx = i;
                break;
            }
        }
        console.log(userAnsList);
        console.log(correntIdx);
        if (state.value == '') {
            return {type: 'invalid', message: '看來你什麼都沒念！請重新再唸一次！'};
        } else if (correntIdx == -1) {
            return {type: 'points', earned: 0, total: 1, message: null};
        } else if (correntIdx < state.correctIdxLessThen) {
            return {type: 'points', earned: 1, total: 1, message: null};
        } else {
            return {type: 'points', earned: 0, total: 1, message: null};
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
        return {correct: "",
                correctIdxLessThen: 5};
    },

    handleAnswerChange: function(event) {
        this.change({correct: event.target.value});
    },

    handleCorrectIdxChange: function(event) {
        this.change({correctIdxLessThen: parseInt(event.target.value)});
    },

    render: function() {
        return <div>
            <div>
                <label>
                    正確答案:
                    <input value={this.props.correct} onChange={this.handleAnswerChange} ref="input"/>
                </label>
            </div>
            <div>
                <label>
                    精準度 (1-20):
                    <input value={this.props.correctIdxLessThen} onChange={this.handleCorrectIdxChange} type="integer" ref="input"/>
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
    name: "speaking-text-input",
    displayName: "英文口說文字框",
    widget: SpeakingTextInput,
    editor: SpeakingTextInputEditor,
    // transform: propTransform
};
