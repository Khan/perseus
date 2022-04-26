/* eslint-disable react/sort-comp */
// @flow
import $ from "jquery";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import {getDependencies} from "../dependencies.js";
import {ClassNames as ApiClassNames} from "../perseus-api.jsx";
import TexWrangler from "../tex-wrangler.js";

const ModifyTex = TexWrangler.modifyTex;

class MathOutput extends React.Component<$FlowFixMe, $FlowFixMe> {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        className: PropTypes.string,
        labelText: PropTypes.string,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
    };

    static defaultProps: $FlowFixMe = {
        value: "",
        onFocus: function () {},
        onBlur: function () {},
    };

    state: $FlowFixMe = {
        focused: false,
        selectorNamespace: _.uniqueId("math-output"),
    };

    _getInputClassName: () => string = () => {
        let className =
            "math-output " +
            ApiClassNames.INPUT +
            " " +
            ApiClassNames.INTERACTIVE;
        if (this.state.focused) {
            className += " " + ApiClassNames.FOCUSED;
        }
        if (this.props.className) {
            className += " " + this.props.className;
        }
        return className;
    };

    _getDisplayValue: (string | number) => string = (value) => {
        // Cast from (potentially a) number to string
        let displayText;
        if (value != null) {
            displayText = "" + value;
        } else {
            displayText = "";
        }
        return ModifyTex(displayText);
    };

    render(): React.Node {
        const divStyle = {
            textAlign: "center",
        };
        const {TeX} = getDependencies();

        return (
            <span
                // eslint-disable-next-line react/no-string-refs
                ref="input"
                className={this._getInputClassName()}
                aria-label={this.props.labelText}
                onMouseDown={this.focus}
                onTouchStart={this.focus}
            >
                <div style={divStyle}>
                    <TeX>{this._getDisplayValue(this.props.value)}</TeX>
                </div>
            </span>
        );
    }

    getValue: () => string | number = () => {
        return this.props.value;
    };

    focus: () => void = () => {
        if (!this.state.focused) {
            this.props.onFocus();
            this._bindBlurHandler();
            this.setState({
                focused: true,
            });
        }
    };

    blur: () => void = () => {
        if (this.state.focused) {
            this.props.onBlur();
            this._unbindBlurHandler();
            this.setState({
                focused: false,
            });
        }
    };

    _bindBlurHandler: () => void = () => {
        $(document).bind("vclick." + this.state.selectorNamespace, (e) => {
            // Detect whether the target has our React DOM node as a parent
            const $closestWidget = $(e.target).closest(
                ReactDOM.findDOMNode(this),
            );
            if (!$closestWidget.length) {
                this.blur();
            }
        });
    };

    _unbindBlurHandler: () => void = () => {
        $(document).unbind("." + this.state.selectorNamespace);
    };

    componentWillUnmount() {
        this._unbindBlurHandler();
    }
}

export default MathOutput;
