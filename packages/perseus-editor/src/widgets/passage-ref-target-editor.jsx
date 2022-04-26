// @flow
import {Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

type Props = $FlowFixMe;

class PassageRefTargetEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        content: PropTypes.string,
    };

    static widgetName: "passage-ref-target" = "passage-ref-target";

    static defaultProps: Props = {
        content: "",
    };

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    handleContentChange: (SyntheticInputEvent<>) => void = (e) => {
        this.change({content: e.target.value});
    };

    serialize: () => $FlowFixMe = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.Node {
        return (
            <div>
                Content:
                <input
                    type="text"
                    value={this.props.content}
                    onChange={this.handleContentChange}
                />
            </div>
        );
    }
}

export default PassageRefTargetEditor;
