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
import {length} from "../../../kmath/src/vector";

const defaultImage = {
    url: null,
    top: 0,
    left: 0,
};
const defaultRulerLength = 50

const modes = {position: "position_ruler", extend: "extend_ruler"};

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
            length: defaultRulerLength,
            mode: modes.position,
            leftEdge: 0,
        };
    },

    componentDidUpdate: function () {
        const tickTickContext = new AudioContext();
        const tickTickElement = document.querySelector("#ticktick");
        // pass it into the audio context
        if (
            this.tickTickAudio == null &&
            tickTickElement != null &&
            tickTickElement instanceof HTMLMediaElement
        ) {
            const track =
                tickTickContext.createMediaElementSource(tickTickElement);
            track.connect(tickTickContext.destination);
            this.tickTickAudio = tickTickElement;
            // for debugging
            window.tickTick = tickTickElement;
        }

        const clickContext = new AudioContext();
        const clickElement = document.querySelector("#click");
        // pass it into the audio context
        if (
            this.clickAudio == null &&
            clickElement != null &&
            clickElement instanceof HTMLMediaElement
        ) {
            const track = clickContext.createMediaElementSource(clickElement);
            track.connect(clickContext.destination);
            this.clickAudio = clickElement;
            // for debugging
            window.click = clickElement;
        }

        const popContext = new AudioContext();
        const popElement = document.querySelector("#pop");
        // pass it into the audio context
        if (
            this.popAudio == null &&
            popElement != null &&
            popElement instanceof HTMLMediaElement
        ) {
            const track = popContext.createMediaElementSource(popElement);
            track.connect(popContext.destination);
            this.popAudio = popElement;
            // for debugging
            window.pop = popElement;
        }
    },

    render: function () {
        const image = _.extend({}, defaultImage, this.props.image);
        const houseLeftEdge = 107;
        const houseRightEdge = 230;
        const rulerWidth = this.state.length;
        const rulerRightPosition = this.state.leftEdge + rulerWidth;


        const grow = () => {
            this.setState({length: this.state.length + 1});
            this.tickTickAudio.play();

            if (this.tickTimeout) {
                clearTimeout(this.tickTimeout);
            }
            this.tickTimeout = setTimeout(() => {
                this.tickTickAudio.pause();
            }, 400);

            if (
                houseLeftEdge == rulerRightPosition ||
                houseRightEdge == rulerRightPosition
            ) {
                this.clickAudio.play();
            }
        };

        const shrink = () => {
            this.setState({length: this.state.length - 1});
            this.popAudio.play();

            if (this.popTimeout) {
                clearTimeout(this.popTimeout);
            }
            this.popTimeout = setTimeout(() => {
                this.popAudio.pause();
            }, 400);

            if (
                houseLeftEdge == rulerRightPosition ||
                houseRightEdge == rulerRightPosition
            ) {
                this.clickAudio.play();
            }
        };

        const moveRight = () => {
            this.setState({leftEdge: this.state.leftEdge + 1});
            this.tickTickAudio.play();

            if (this.tickTimeout) {
                clearTimeout(this.tickTimeout);
            }
            this.tickTimeout = setTimeout(() => {
                this.tickTickAudio.pause();
            }, 400);

            if (
                houseLeftEdge == this.state.leftEdge ||
                houseRightEdge == this.state.leftEdge
            ) {
                this.clickAudio.play();
            }
        };

        const moveLeft = () => {
            this.setState({leftEdge: this.state.leftEdge - 1});
            this.popAudio.play();

            if (this.popTimeout) {
                clearTimeout(this.popTimeout);
            }
            this.popTimeout = setTimeout(() => {
                this.popAudio.pause();
            }, 400);

            if (
                houseLeftEdge == this.state.leftEdge ||
                houseRightEdge == this.state.leftEdge
            ) {
                this.clickAudio.play();
            }
        };

        const focusRuler = () => {
            document.querySelector("#sal")?.focus();
        }

        return (
            <div
                className={
                    "perseus-widget perseus-widget-measurer " +
                    "graphie-container above-scratchpad"
                }
                style={{width: this.props.box[0], height: this.props.box[1]}}
            >
                <audio id="ticktick" loop={true} src={ticktick}></audio>
                <audio id="click" src={click}></audio>
                <audio id="pop" loop={true} src={pop}></audio>

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
                    className={css(styles.ruler, styles.rulerImage)}
                    style={{width: rulerWidth, left: this.state.leftEdge}}
                    tabIndex={0}
                />
                <div
                    className={css(styles.sal)}
                    style={{width: rulerWidth, left: this.state.leftEdge}}
                    tabIndex={0}
                    id="sal"
                    onKeyDown={(event) => {
                        if (event.key === "ArrowRight") {
                            if (this.state.mode === modes.extend) {
                                grow();
                            } else {
                                moveRight();
                            }
                        }
                        if (event.key === "ArrowLeft") {
                            if (this.state.mode === modes.extend) {
                                shrink();
                            } else {
                                moveLeft();
                            }
                        }
                    }}
                />
                {/* END RULER */}

                <div className={css(styles.buttonContainer)}>
                    <Button
                        onClick={() => {
                            this.setState({length: defaultRulerLength});
                            focusRuler();
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        onClick={() => {
                            this.setState({mode: modes.position});
                            focusRuler();
                        }}
                    >
                        Adjust ruler position
                    </Button>
                    <Button
                        onClick={() => {
                            this.setState({mode: modes.extend});
                            focusRuler();
                        }}
                    >
                        Measure length
                    </Button>
                    <div>
                        {this.state.mode === modes.position &&
                            "Positioning ruler"}
                        {this.state.mode === modes.extend && "Measuring length"}
                    </div>
                </div>
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
        height: 57,
        position: "absolute",
        width: 388,
        left: 15,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "left",
    },
    sal: {
        top: 190,
        height: 35,
        position: "absolute",
        backgroundImage: `url("${SalSVG}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",

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
