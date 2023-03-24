/* eslint-disable react/sort-comp */
import $ from "jquery";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import {getDependencies} from '../dependencies';
import {ClassNames as ApiClassNames} from '../perseus-api';
import TexWrangler from '../tex-wrangler';

const ModifyTex = TexWrangler.modifyTex;

class MathOutput extends React.Component<any, any> {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        className: PropTypes.string,
        labelText: PropTypes.string,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
    };

    static defaultProps: any = {
        value: "",
        onFocus: function () {},
        onBlur: function () {},
    };

    state: any = {
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

    _getDisplayValue: (arg1: string | number) => string = (value) => {
        // Cast from (potentially a) number to string
        let displayText;
        if (value != null) {
            displayText = "" + value;
        } else {
            displayText = "";
        }
        return ModifyTex(displayText);
    };

    render(): React.ReactElement {
        const divStyle = {
            textAlign: "center",
        } as const;
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
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'TeX' cannot be used as a JSX component. */}
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
// @ts-expect-error [FEI-5003] - TS2769 - No overload matches this call.
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
