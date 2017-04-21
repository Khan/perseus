var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");
var classNames = require('classnames');

var textInputStyle = {
    fontSize: "25px",
    marginRight: "5px",
    paddingTop: "15px",
    paddingBottom: "15px",
    marginTop: "15px",
    marginBottom: "15px",
};

var TextInput = React.createClass({
    render: function() {
        return (
            <input
                type="text"
                style={textInputStyle}
                ref="input"
                value={this.props.value || ""}
                onChange={this.changeValue}
                onPaste={this.pasteValue}
                onKeyPress={this.keypressValue}
            />
        );
    },

    pasteValue: function(e) {
        e.preventDefault();
        return false;
    },

    keypressValue: function(e) {
        e.preventDefault();
        return false;
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

var infoStyle = {
    background: "#3498DB !important",
    color: "#fff !important",
    textShadow: "0px 0px #fff !important",
    marginLeft: 10,
    border: '1px solid #ccc',
    borderBottom: '1px solid #bbb',
    borderRadius: '5px',
    backgroundRepeat: 'repeat-x',
    cursor: 'pointer !important',
    fontFamily: 'inherit',
    lineHeight: '22px',
    padding: '5px 10px',
    position: 'relative',
    textDecoration: 'none !important'
}

var iconButtonStyle = {
    width: "45px",
    lineHeight: 1.5,
}

var buttonStyle = {

}

var inlineStyle = {
    display: 'inline-block'
}

var SpeakingBtn = React.createClass({
    render: function() {
        var btnIconCLass = classNames({
            'fa fa-2x': true,
            'fa-microphone': !this.state.recognizing,
            'fa fa-spinner fa-spin fa-fw': this.state.recognizing
        });
        return (
            <div style={inlineStyle}>
                {!!this.state.recognition
                    ? <button style={buttonStyle} onClick={this.startRecognizeOnClick} className="simple-button orange">
                        <i style={iconButtonStyle} className={btnIconCLass}></i>
                        </button>
                    : <div>
                    <button style={buttonStyle} onClick={this.resetOnClick} className="simple-button orange">
                            <i style={iconButtonStyle} className="fa fa-refresh fa-2x"></i>
                    </button>
                    <span style={infoStyle}>{this.state.status}</span>
                    </div>
                    }
            </div>
        );
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.recognizing != nextState.recognizing
            || this.state.status != nextState.status
            || this.state.recognition != nextState.recognition;
    },

    getInitialState: function() {
        return {
            recognizing: false,
            status: "",
            recognition: null,
        };
    },

    startRecognize: function() {
        if (this.state.recognizing == false) {
            this.state.recognition.start();
        }
        else{
            this.state.recognition.stop();
        }
    },

    // prevent trigger checking answer when clicking button
    startRecognizeOnClick: function(e) {
        this.startRecognize();
        e.preventDefault();
        return false;
    },

    // ignore clicking event
    resetOnClick: function(e) {
        this.props.setValue('');
        e.preventDefault();
        return false;
    },
    componentWillMount: function() {
        var self = this;
        var os = self.getMobileOperatingSystem();
        if (self.hasSpeechRecognition()) {
            var recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.maxAlternatives = 20;
            self.setState({recognizing: false});
            recognition.onstart = function() {
                self.setState({recognizing: true});
                self.props.setValue('');
            };
            recognition.onend = function() {
                self.setState({recognizing: false});
            };
            recognition.onresult = function(event) {
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
            self.setState({recognition});
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
        val = val || '';
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
                <TextInput value={this.state.value} setValue={this.setValue}/>
                <SpeakingBtn setValue={this.setValue}/>
            </div>
        );
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
                        <input value={this.props.correct} onChange={this.handleAnswerChange}/>
                    </label>
                </div>
                <div>
                    <label>
                        精準度 (1-20):
                        <input value={this.props.correctIdxLessThen} onChange={this.handleCorrectIdxChange} type="integer"/>
                    </label>
                </div>
            </div>;
        },
    });

    module.exports = {
        name: "speaking-text-input",
        displayName: "English Speech Recognition/英文口說辨識",
        widget: SpeakingTextInput,
        editor: SpeakingTextInputEditor
    };
