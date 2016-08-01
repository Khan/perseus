/** @jsx React.DOM */

var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var TextInput = React.createClass({
    render: function() {
        return <input ref="input" value={this.props.value || ""} onChange={this.changeValue} onPaste={this.pasteValue} onKeyPress={this.keypressValue}/>;
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
        if (e.target.value) {
            this.props.setValue(e.target.value);
        // iOS Siri Input
        } else {
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
            <div>
                {this.state.recognition
                    ? <button ref="btn_speaking" onClick={this.startRecognizeOnClick} className="simple-button orange">{this.state.status}
                        </button>
                    : <button ref="btn_speaking" onClick={this.ignoreOnClick} className="simple-button orange">{this.state.status}
                        </button>}
            </div>
        );
    },
    getInitialState: function() {
        return {recognition: null, recognizing: false, status: ""}
    },

    startRecognize: function() {
        if (this.state.recognizing == false) {
            this.state.recognition.start();
        }
    },

    // prevent trigger checking answer when clicking button
    startRecognizeOnClick: function(e) {
        this.startRecognize();
        e.preventDefault();
        return false;
    },

    // ignore clicking event
    ignoreOnClick: function(e) {
        e.preventDefault();
        return false;
    },

    componentDidMount: function() {
        var self = this;
        var os = self.getMobileOperatingSystem();
        if (self.hasSpeechRecognition()) {
            var recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.maxAlternatives = 20;
            self.setState({recognizing: false});
            self.setState({status: "辨識"});
            recognition.onstart = function() {
                self.setState({recognizing: true});
                self.setState({status: "辨識中"});
                self.props.setValue('');
            };
            recognition.onend = function() {
                self.setState({recognizing: false});
                self.setState({status: "辨識完成"});
            };
            recognition.onresult = function(event) {
                self.setState({recognizing: false});
                var res = '';
                for (var i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        for (var j = 0; j < event.results[i].length; j++) {
                            if (j != 0) {
                                res = res + '/';
                            }
                            res = res + event.results[i][j].transcript;
                            self.props.setValue(res);
                        }
                    }
                }
            }
            self.setState({recognition: recognition});
        } else {
            if (os == 'iOS') {
                self.setState({status: "點選上面的框框 用Siri語音輸入"});
            } else if (os == 'Android') {
                self.setState({status: "點選上面的框框 用Google語音輸入"});
            } else {
                self.setState({status: "請切換至Chrome瀏覽器"});
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

    // compare answer when setting value to prevent generate long atempt dict
    setValue: function(val) {
        var correntAns = SpeakingTextInput.parseAnswer(this.props.correct);
        var userAnsList = val.split("/");
        var correntIdx = -1;
        for (var i = 0, len = userAnsList.length; i < len; i++) {
            if (SpeakingTextInput.arrIsEqual(SpeakingTextInput.parseAnswer(userAnsList[i]), correntAns)) {
                correntIdx = i;
                break;
            }
        }
        // if the answer is wrong, set value to the first answer
        if(correntIdx == -1 || correntIdx >= this.props.correctIdxLessThen){
            this.setState({value: userAnsList[0]});
            this.change("value")(userAnsList[0]);
        }
        // else set value to the correct answer
        else{
            this.setState({value: this.props.correct});
            this.change("value")(this.props.correct);
        }
    },

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

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    simpleValidate: function(rubric) {
        return SpeakingTextInput.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "inline-block"
    }
});

_.extend(SpeakingTextInput, {
    parseAnswer: function(s) {
        var arr = s.split(" ");
        var parsedArr = [];
        for (var i = 0; i < arr.length; i++) {
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
        var correct = SpeakingTextInput.arrIsEqual(
            SpeakingTextInput.parseAnswer(rubric.correct),
            SpeakingTextInput.parseAnswer(state.value)
        );
        if (state.value == '') {
            return {type: 'invalid', message: '請重新再唸一次！'};
        } else if (correct) {
            return {type: 'points', earned: 1, total: 1, message: null};
        } else {
            return {type: 'points', earned: 0, total: 1, message: null};
        }}
    });

    var SpeakingTextInputEditor = React.createClass({
        mixins: [
            Changeable, JsonifyProps
        ],

        getDefaultProps: function() {
            return {correct: "", correctIdxLessThen: 5};
        },

        handleAnswerChange: function(event) {
            this.change({correct: event.target.value});
        },

        handleCorrectIdxChange: function(event) {
            this.change({
                correctIdxLessThen: parseInt(event.target.value)
            });
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
        displayName: "English Speech Recognition/英文口說辨識",
        widget: SpeakingTextInput,
        editor: SpeakingTextInputEditor
    };
