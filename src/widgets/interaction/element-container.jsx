/* eslint-disable react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */
// @flow

const React = require("react");

const {
    iconChevronDown,
    iconChevronRight,
    iconCircleArrowDown,
    iconCircleArrowUp,
    iconTrash,
} = require("../../icon-paths.js");
const InlineIcon   = require("../../components/inline-icon.jsx");

type ElementContainerProps = {
    children: React.Element<*> | React.Element<*>[],
    initiallyVisible: boolean,
    onDelete?: () => void,
    onDown?: () => void,
    onUp?: () => void,
    title: string | React.Element<*>,
};

class ElementContainer extends React.Component {
    static defaultProps = {
        initiallyVisible: false,
        title: "More",
    }

    constructor(props: ElementContainerProps) {
        super(props);

        this.state = {
            show: props.initiallyVisible,
        };
    }

    state: {
        show: boolean,
    }

    props: ElementContainerProps

    toggle = (e: SyntheticEvent) => {
        e.preventDefault();
        this.setState({show: !this.state.show});
    }

    render() {
        return <div className="perseus-interaction-element">
            <a href="#" className={"perseus-interaction-element-title " +
                (this.state.show ? "open" : "closed")}
                onClick={this.toggle}
            >
                {this.state.show
                    ? <InlineIcon {...iconChevronDown} />
                    : <InlineIcon {...iconChevronRight} />
                }
                {this.props.title}
            </a>
            <div className={"perseus-interaction-element-content " +
                    (this.state.show ? "enter" : "leave")}
            >
                {this.props.children}
                {(this.props.onUp != null ||
                    this.props.onDown != null ||
                    this.props.onDelete != null) &&
                    <div className={"edit-controls"}>
                        {(this.props.onUp != null) && <button
                            onClick={this.props.onUp}
                        >
                            <InlineIcon {...iconCircleArrowUp} />
                        </button>}
                        {(this.props.onDown != null) && <button
                            onClick={this.props.onDown}
                        >
                            <InlineIcon {...iconCircleArrowDown} />
                        </button>}
                        {(this.props.onDelete != null) && <button
                            onClick={this.props.onDelete}
                        >
                            <InlineIcon {...iconTrash} />
                        </button>}
                    </div>
                }
            </div>
        </div>;
    }
}

module.exports = ElementContainer;
