/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";

import InlineIcon from "../../components/inline-icon";
import {
    iconChevronDown,
    iconChevronRight,
    iconCircleArrowDown,
    iconCircleArrowUp,
    iconTrash,
} from "../../icon-paths";

type ElementContainerProps = {
    children: React.ReactElement<any> | ReadonlyArray<React.ReactElement<any>>;
    initiallyVisible: boolean;
    onDelete?: () => void | null | undefined;
    onDown?: () => void | null | undefined;
    onUp?: () => void | null | undefined;
    title: string | React.ReactElement<any>;
};

class ElementContainer extends React.Component<
    ElementContainerProps,
    {
        show: boolean;
    }
> {
    static defaultProps: {
        initiallyVisible: boolean;
        title: string;
    } = {
        initiallyVisible: false,
        title: "More",
    };

    constructor(props: ElementContainerProps) {
        super(props);

        this.state = {
            show: props.initiallyVisible,
        };
    }

    toggle: (e: React.SyntheticEvent) => void = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.setState({show: !this.state.show});
    };

    render(): React.ReactElement<React.ComponentProps<"div">> {
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
