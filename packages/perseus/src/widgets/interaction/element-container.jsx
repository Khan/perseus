/* eslint-disable jsx-a11y/anchor-is-valid */
// @flow
import * as React from "react";

import InlineIcon from "../../components/inline-icon.jsx";
import {
    iconChevronDown,
    iconChevronRight,
    iconCircleArrowDown,
    iconCircleArrowUp,
    iconTrash,
} from "../../icon-paths.js";

type ElementContainerProps = {|
    children: React.Element<any> | $ReadOnlyArray<React.Element<any>>,
    initiallyVisible: boolean,
    onDelete?: ?() => void,
    onDown?: ?() => void,
    onUp?: ?() => void,
    title: string | React.Element<any>,
|};

class ElementContainer extends React.Component<
    ElementContainerProps,
    {show: boolean, ...},
> {
    static defaultProps: {|initiallyVisible: boolean, title: string|} = {
        initiallyVisible: false,
        title: "More",
    };

    constructor(props: ElementContainerProps) {
        super(props);

        this.state = {
            show: props.initiallyVisible,
        };
    }

    toggle: (e: SyntheticEvent<>) => void = (e: SyntheticEvent<>) => {
        e.preventDefault();
        this.setState({show: !this.state.show});
    };

    render(): React.Element<"div"> {
        return (
            <div className="perseus-interaction-element">
                <a
                    href="#"
                    className={
                        "perseus-interaction-element-title " +
                        (this.state.show ? "open" : "closed")
                    }
                    onClick={this.toggle}
                >
                    {this.state.show ? (
                        <InlineIcon {...iconChevronDown} />
                    ) : (
                        <InlineIcon {...iconChevronRight} />
                    )}
                    {this.props.title}
                </a>
                <div
                    className={
                        "perseus-interaction-element-content " +
                        (this.state.show ? "enter" : "leave")
                    }
                >
                    {this.props.children}
                    {(this.props.onUp != null ||
                        this.props.onDown != null ||
                        this.props.onDelete != null) && (
                        <div className="edit-controls">
                            {this.props.onUp != null && (
                                <button onClick={this.props.onUp}>
                                    <InlineIcon {...iconCircleArrowUp} />
                                </button>
                            )}
                            {this.props.onDown != null && (
                                <button onClick={this.props.onDown}>
                                    <InlineIcon {...iconCircleArrowDown} />
                                </button>
                            )}
                            {this.props.onDelete != null && (
                                <button onClick={this.props.onDelete}>
                                    <InlineIcon {...iconTrash} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ElementContainer;
