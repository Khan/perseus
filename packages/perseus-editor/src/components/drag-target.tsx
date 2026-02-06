/* This component makes its children a drag target. Example:
 *
 *     <DragTarget onDrop={this.handleDrop}>Drag to me</DragTarget>
 *
 *     ...
 *
 *     handleDrop: function(e) {
 *         this.addImages(e.nativeEvent.dataTransfer.files);
 *     }
 *
 * Now "Drag to me" will be a drag target - when something is dragged over it,
 * the element will become partially transparent as a visual indicator that
 * it's a target.
 */

import * as React from "react";

type Props = {
    onDrop: (e: DragEvent) => void;
    component?: any;
    shouldDragHighlight: (any) => boolean;
    style?: any;
    children?: any;
    className?: string;
};

type DefaultProps = {
    component: Props["component"];
    shouldDragHighlight: Props["shouldDragHighlight"];
};

type State = {
    dragHover: boolean;
};
class DragTarget extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        component: "div",
        shouldDragHighlight: () => true,
    };

    constructor(props) {
        super(props);
        this.state = {
            dragHover: false,
        };

        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
    }

    handleDrop(e: DragEvent) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({dragHover: false});
        this.props.onDrop(e);
    }

    handleDragEnd() {
        this.setState({dragHover: false});
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragLeave() {
        this.setState({dragHover: false});
    }

    handleDragEnter(e) {
        this.setState({dragHover: this.props.shouldDragHighlight(e)});
    }

    render() {
        const opacity = this.state.dragHover ? {opacity: 0.3} : {};
        const {
            component: Component,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            shouldDragHighlight,
            ...forwardProps
        } = this.props;

        return (
            <Component
                {...forwardProps}
                style={Object.assign({}, this.props.style, opacity)}
                onDrop={this.handleDrop}
                onDragEnd={this.handleDragEnd}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
            />
        );
    }
}

export default DragTarget;
