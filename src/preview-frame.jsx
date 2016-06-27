 /* eslint-disable no-console */

 /**
  * Demonstrates the rendered result of a Perseus question within an iframe
  *
  * This mounts an ItemRenderer or HintRenderer (depending on the content given)
  * and applies mobile styling if necessary
  */

const React = require('react');

const ItemRenderer = require('./item-renderer.jsx');
const HintRenderer = require('./hint-renderer.jsx');
const TouchEmulator = require('../lib/touch-emulator.js');

const PreviewFrame = React.createClass({
    propTypes: {
        isMobile: React.PropTypes.bool.isRequired,
    },

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        window.addEventListener("message", (event) => {
            this.setState(window.parent.iframeDataStore[event.data]);
        });

        window.parent.postMessage(
            window.frameElement.getAttribute("data-id"), "*");

        if (this.props.isMobile) {
            TouchEmulator();
        }
    },

    render: function() {
        if (this.state.data) {
            const updatedData = Object.assign(this.state.data, {
                workAreaSelector: "#workarea",
                hintsAreaSelector: "#hintsarea",
            });

            const perseusClass = "framework-perseus " +
                (this.props.isMobile ? "perseus-xom-manatee" : "");
            if (this.state.isQuestion) {
                return <div
                    className={perseusClass}
                    style={this.props.isMobile ? {} : {margin: 30}}
                >
                    <ItemRenderer {...updatedData} />
                    <div id="workarea" style={{marginLeft: 0}}></div>
                    <div id="hintsarea"></div>
                </div>;
            } else {
                return <div
                    className={perseusClass}
                    style={this.props.isMobile ? {} : {margin: 30}}
                >
                    <HintRenderer
                        {...updatedData}
                    />
                </div>;
            }
        } else {
            return <div></div>;
        }
    },
});


module.exports = PreviewFrame;
