/* eslint-disable @babel/no-invalid-this, react/sort-comp */
// @flow
import createReactClass from "create-react-class";
import $ from "jquery";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import SvgImage from "../components/svg-image.jsx";
import {ApiOptions} from "../perseus-api.jsx";
import GraphUtils from "../util/graph-utils.js";
import Button from "@khanacademy/wonder-blocks-button";
import {StyleSheet, css} from "aphrodite";

import type {WidgetExports} from "../types.js";
import {red} from "../styles/constants";
import RulerSVG from "./measurer-sounds/ruler.svg";
import SalSVG from "./measurer-sounds/sal.svg";
import ticktick from "./measurer-sounds/tickticktick.m4a";
import click from "./measurer-sounds/click.m4a";
import pop from "./measurer-sounds/pop.m4a";
import one from "./measurer-sounds/one.m4a";
import two from "./measurer-sounds/two.m4a";
import three from "./measurer-sounds/three.m4a";
import four from "./measurer-sounds/four.m4a";
import five from "./measurer-sounds/five.m4a";
import six from "./measurer-sounds/six.m4a";
import greatJob from "./measurer-sounds/great_job.m4a";
import greatJobPNG from "./measurer-sounds/great_job.png";

const defaultImage = {
    url: null,
    top: 0,
    left: 0,
};
const defaultSalDistance = 0;
const defaultRulerPosition = 15;

const Measurer: $FlowFixMe = createReactClass({
    displayName: "Measurer",

    propTypes: {
        apiOptions: ApiOptions.propTypes,
        box: PropTypes.arrayOf(PropTypes.number),
        image: PropTypes.shape({
            url: PropTypes.string,
            top: PropTypes.number,
            left: PropTypes.number,
        }),
        showProtractor: PropTypes.bool,
        protractorX: PropTypes.number,
        protractorY: PropTypes.number,
        showRuler: PropTypes.bool,
        rulerLabel: PropTypes.string,
        rulerTicks: PropTypes.number,
        rulerPixels: PropTypes.number,
        rulerLength: PropTypes.number,
    },

    getDefaultProps: function () {
        return {
            box: [480, 480],
            image: {},
            showProtractor: true,
            protractorX: 7.5,
            protractorY: 0.5,
            showRuler: false,
            rulerLabel: "",
            rulerTicks: 10,
            rulerPixels: 40,
            rulerLength: 10,
        };
    },

    getInitialState: function () {
        return {
            salDistance: defaultSalDistance,
            rulerPosition: 0,
        };
    },

    componentDidUpdate: function () {
        const audioContext = new AudioContext();
        const tickTickElement = document.querySelector("#ticktick");
        // pass it into the audio context
        if (
            this.tickTickAudio == null &&
            tickTickElement != null &&
            tickTickElement instanceof HTMLMediaElement
        ) {
            const track =
                audioContext.createMediaElementSource(tickTickElement);
            track.connect(audioContext.destination);
            this.tickTickAudio = tickTickElement;
        }

        const clickElement = document.querySelector("#click");
        // pass it into the audio context
        if (
            this.clickAudio == null &&
            clickElement != null &&
            clickElement instanceof HTMLMediaElement
        ) {
            const track = audioContext.createMediaElementSource(clickElement);
            track.connect(audioContext.destination);
            this.clickAudio = clickElement;
        }

        const gainNode = audioContext.createGain();
        const popElement = document.querySelector("#pop");
        // pass it into the audio context
        if (
            this.popAudio == null &&
            popElement != null &&
            popElement instanceof HTMLMediaElement
        ) {
            const track = audioContext.createMediaElementSource(popElement);
            track.connect(gainNode).connect(audioContext.destination);
            this.popAudio = popElement;
            gainNode.gain.value = 0.15;
        }

        const oneElement = document.querySelector("#one");
        // pass it into the audio context
        if (
            this.oneAudio == null &&
            oneElement != null &&
            oneElement instanceof HTMLMediaElement
        ) {
            const track = audioContext.createMediaElementSource(oneElement);
            track.connect(audioContext.destination);
            this.oneAudio = oneElement;
        }

        const twoElement = document.querySelector("#two");
        // pass it into the audio context
        if (
            this.twoAudio == null &&
            twoElement != null &&
            twoElement instanceof HTMLMediaElement
        ) {
            const track = audioContext.createMediaElementSource(twoElement);
            track.connect(audioContext.destination);
            this.twoAudio = twoElement;
        }

        const threeElement = document.querySelector("#three");
        // pass it into the audio context
        if (
            this.threeAudio == null &&
            threeElement != null &&
            threeElement instanceof HTMLMediaElement
        ) {
            const track = audioContext.createMediaElementSource(threeElement);
            track.connect(audioContext.destination);
            this.threeAudio = threeElement;
        }

        const fourElement = document.querySelector("#four");
        // pass it into the audio context
        if (
            this.fourAudio == null &&
            fourElement != null &&
            fourElement instanceof HTMLMediaElement
        ) {
            const track = audioContext.createMediaElementSource(fourElement);
            track.connect(audioContext.destination);
            this.fourAudio = fourElement;
        }

        const fiveElement = document.querySelector("#five");
        // pass it into the audio context
        if (
            this.fiveAudio == null &&
            fiveElement != null &&
            fiveElement instanceof HTMLMediaElement
        ) {
            const track = audioContext.createMediaElementSource(fiveElement);
            track.connect(audioContext.destination);
            this.fiveAudio = fiveElement;
        }

        const sixElement = document.querySelector("#six");
        // pass it into the audio context
        if (
            this.sixAudio == null &&
            sixElement != null &&
            sixElement instanceof HTMLMediaElement
        ) {
            const track = audioContext.createMediaElementSource(sixElement);
            track.connect(audioContext.destination);
            this.sixAudio = sixElement;
        }

        const greatJobElement = document.querySelector("#greatJob");
        // pass it into the audio context
        if (
            this.greatJobAudio == null &&
            greatJobElement != null &&
            greatJobElement instanceof HTMLMediaElement
        ) {
            const track =
                audioContext.createMediaElementSource(greatJobElement);
            track.connect(audioContext.destination);
            this.greatJobAudio = greatJobElement;
        }
    },

    render: function () {
        const image = _.extend({}, defaultImage, this.props.image);
        const houseLeftEdge = 107;
        const houseRightEdge = 230;
        const salDistance = this.state.salDistance;
        const salOffset = 15;
        const salPosition = this.state.rulerPosition + salDistance;
        const rulerOffset = 10; // there are 10 px left of the first ruler tick
        const onePosition = 38;
        const twoPosition = onePosition + 40;
        const threePosition = twoPosition + 40;
        const fourPosition = threePosition + 40;
        const fivePosition = fourPosition + 40;
        const sixPosition = fivePosition + 40;

        const playSalPositionAudio = () => {
            if (
                houseLeftEdge == salPosition + salOffset ||
                houseRightEdge == salPosition + salOffset
            ) {
                this.clickAudio.play();
            }

            if (salPosition - this.state.rulerPosition === onePosition) {
                this.oneAudio.play();
            }
            if (salPosition - this.state.rulerPosition === twoPosition) {
                this.twoAudio.play();
            }
            if (salPosition - this.state.rulerPosition === threePosition) {
                this.threeAudio.play();
            }
            if (salPosition - this.state.rulerPosition === fourPosition) {
                this.fourAudio.play();
            }
            if (salPosition - this.state.rulerPosition === fivePosition) {
                this.fiveAudio.play();
            }
            if (salPosition - this.state.rulerPosition === sixPosition) {
                this.sixAudio.play();
            }
        };

        const moveSalRight = () => {
            this.setState({salDistance: this.state.salDistance + 1});
            this.tickTickAudio.play();

            if (this.tickTimeout) {
                clearTimeout(this.tickTimeout);
            }
            this.tickTimeout = setTimeout(() => {
                this.tickTickAudio.pause();
            }, 400);

            playSalPositionAudio();
        };

        const moveSalLeft = () => {
            this.setState({salDistance: this.state.salDistance - 1});
            this.popAudio.play();

            if (this.popTimeout) {
                clearTimeout(this.popTimeout);
            }
            this.popTimeout = setTimeout(() => {
                this.popAudio.pause();
            }, 400);

            playSalPositionAudio();
        };

        const moveRulerRight = () => {
            this.setState({rulerPosition: this.state.rulerPosition + 1});
            this.tickTickAudio.play();

            if (this.tickTimeout) {
                clearTimeout(this.tickTimeout);
            }
            this.tickTimeout = setTimeout(() => {
                this.tickTickAudio.pause();
            }, 400);

            if (
                houseLeftEdge == this.state.rulerPosition + rulerOffset ||
                houseRightEdge == this.state.rulerPosition + rulerOffset
            ) {
                this.clickAudio.play();
            }
        };

        const moveRulerLeft = () => {
            this.setState({rulerPosition: this.state.rulerPosition - 1});
            this.popAudio.play();

            if (this.popTimeout) {
                clearTimeout(this.popTimeout);
            }
            this.popTimeout = setTimeout(() => {
                this.popAudio.pause();
            }, 400);

            if (
                houseLeftEdge === this.state.rulerPosition - rulerOffset ||
                houseRightEdge === this.state.rulerPosition - rulerOffset
            ) {
                this.clickAudio.play();
            }
        };

        const focusRuler = () => {
            document.querySelector("#sal")?.focus();
        };

        return (
            <div
                className={
                    "perseus-widget perseus-widget-measurer " +
                    "graphie-container above-scratchpad"
                }
                style={{width: this.props.box[0], height: this.props.box[1]}}
            >
                <audio id="ticktick" loop={true} src={ticktick}></audio>
                <audio id="pop" loop={true} src={pop}></audio>

                <audio id="click" src={click}></audio>

                <audio id="greatJob" src={greatJob}></audio>

                <audio id="one" src={one}></audio>
                <audio id="two" src={two}></audio>
                <audio id="three" src={three}></audio>
                <audio id="four" src={four}></audio>
                <audio id="five" src={five}></audio>
                <audio id="six" src={six}></audio>

                {image.url && (
                    <div
                        style={{
                            position: "relative",
                            top: image.top,
                            left: image.left,
                        }}
                    >
                        {/* $FlowFixMe[prop-missing]: alt prop is missing */}
                        <SvgImage src={image.url} />
                    </div>
                )}

                {/* THE RULER */}

                <div
                    className={css(styles.divider)}
                    style={{left: salPosition + 13}}
                />
                <div
                    className={css(styles.sal)}
                    style={{left: salPosition}}
                    tabIndex={0}
                    id="sal"
                    onKeyDown={(event) => {
                        if (event.key === "ArrowRight") {
                            moveSalRight();
                        }
                        if (event.key === "ArrowLeft") {
                            moveSalLeft();
                        }
                    }}
                />
                <div
                    className={css(styles.ruler, styles.rulerImage)}
                    style={{left: this.state.rulerPosition}}
                    tabIndex={0}
                    onKeyDown={(event) => {
                        if (event.key === "ArrowRight") {
                            moveRulerRight();
                        }
                        if (event.key === "ArrowLeft") {
                            moveRulerLeft();
                        }
                    }}
                />
                {/* END RULER */}

                <div className={css(styles.buttonContainer)}>
                    <Button
                        onClick={() => {
                            this.setState({
                                salDistance: defaultSalDistance,
                                rulerPosition: 0,
                                answered: false,
                            });
                            focusRuler();
                        }}
                    >
                        Reset
                    </Button>
                </div>
                <div>
                    <br />
                    <br />
                    <label htmlFor="answer">How wide is the house?</label>
                    <br />
                    <input id="answer" />
                </div>
                <br />
                <div>
                    <Button
                        size="small"
                        onClick={() => {
                            this.setState({answered: true});
                            this.greatJobAudio.play();
                        }}
                    >
                        Submit answer
                    </Button>
                </div>

                {this.state.answered && (
                    <img
                        className={css(styles.greatJob)}
                        src={greatJobPNG}
                        alt="speech bubble with the text great job"
                        style={{left: salPosition - 108}}
                    />
                )}
            </div>
        );
    },

    getUserInput: function () {
        return {};
    },

    simpleValidate: function (rubric) {
        // TODO(joel) - I don't understand how this is useful!
        return Measurer.validate(this.getUserInput(), rubric);
    },

    focus: $.noop,
});

const styles = StyleSheet.create({
    ruler: {
        top: 218,
        height: 63,
        position: "absolute",
        width: 388,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "left",
    },
    divider: {
        top: 175,
        width: 4,
        height: 65,
        position: "absolute",
        zIndex: 1,
        borderRadius: 2,
        background: `linear-gradient(
            45deg,
            rgba(255, 0, 0, 1) 0%,
            rgba(255, 154, 0, 1) 10%,
            rgba(208, 222, 33, 1) 20%,
            rgba(79, 220, 74, 1) 30%,
            rgba(63, 218, 216, 1) 40%,
            rgba(47, 201, 226, 1) 50%,
            rgba(28, 127, 238, 1) 60%,
            rgba(95, 21, 242, 1) 70%,
            rgba(186, 12, 248, 1) 80%,
            rgba(251, 7, 217, 1) 90%,
            rgba(255, 0, 0, 1) 100%
        )`,
    },
    sal: {
        top: 190,
        width: 27,
        height: 35,
        position: "absolute",
        backgroundImage: `url("${SalSVG}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        zIndex: 1,
    },
    greatJob: {
        position: "absolute",
        top: 60,
        height: 150,
    },
    rulerRainbow: {
        background: `linear-gradient(
            45deg,
            rgba(255, 0, 0, 1) 0%,
            rgba(255, 154, 0, 1) 10%,
            rgba(208, 222, 33, 1) 20%,
            rgba(79, 220, 74, 1) 30%,
            rgba(63, 218, 216, 1) 40%,
            rgba(47, 201, 226, 1) 50%,
            rgba(28, 127, 238, 1) 60%,
            rgba(95, 21, 242, 1) 70%,
            rgba(186, 12, 248, 1) 80%,
            rgba(251, 7, 217, 1) 90%,
            rgba(255, 0, 0, 1) 100%
        )`,
    },
    rulerImage: {
        backgroundPosition: "left",
        backgroundImage: `url("${RulerSVG}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    buttonContainer: {
        paddingTop: 290,
    },
});

_.extend(Measurer, {
    validate: function (state, rubric) {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        };
    },
});

const propUpgrades = {
    "1": (v0props: $FlowFixMe): $FlowFixMe => {
        const v1props = _(v0props)
            .chain()
            .omit("imageUrl", "imageTop", "imageLeft")
            .extend({
                image: {
                    url: v0props.imageUrl,
                    top: v0props.imageTop,
                    left: v0props.imageLeft,
                },
            })
            .value();
        return v1props;
    },
};

export default ({
    name: "measurer",
    displayName: "Measurer",
    widget: Measurer,
    version: {major: 1, minor: 0},
    propUpgrades: propUpgrades,
}: WidgetExports<typeof Measurer>);
