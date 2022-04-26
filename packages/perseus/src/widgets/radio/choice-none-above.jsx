// @flow

import * as i18n from "@khanacademy/wonder-blocks-i18n";
import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";

import Renderer from "../../renderer.jsx";

import Choice from "./choice.jsx";

class ChoiceNoneAbove extends React.Component<$FlowFixMe> {
    _choice: $FlowFixMe;
    static propTypes = {
        className: PropTypes.string,
        content: PropTypes.node,
        showContent: PropTypes.bool,
    };

    static defaultProps: $FlowFixMe = {
        showContent: true,
    };

    focusInput: () => void = () => {
        this._choice.focusInput();
    };

    render(): React.Node {
        const choiceProps = {
            ...this.props,
            className: classNames(this.props.className, "none-of-above"),
            content: this.props.showContent ? (
                this.props.content
            ) : (
                // We use a Renderer here because that is how
                // `this.props.content` is wrapped otherwise.
                // We pass in a key here so that we avoid a semi-spurious
                // react warning when we render this in the same place
                // as the previous choice content renderer.
                // Note this destroys state, but since all we're doing
                // is outputting "None of the above", that is okay.
                <Renderer
                    key="noneOfTheAboveRenderer"
                    content={i18n._("None of the above")}
                />
            ),
            ref: (el) => (this._choice = el),
        };

        return <Choice {...choiceProps} />;
    }
}

export default ChoiceNoneAbove;
