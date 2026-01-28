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
// TODO(joel) - indicate before the hover is over the target that it's possible
// to drag into the target. This would (I think) require a high level handler -
// like on Perseus itself, waiting for onDragEnter, then passing down the
// event. Sounds like a pain. Possible workaround - create a div covering the
// entire page...
//
// Other extensions:
// * custom styles for global drag and dragOver
// * only respond to certain types of drags (only images for instance)!

import * as React from "react";

type Props = {
    onDrop: (e: DragEvent) => void;
    component?: any;
    shouldDragHighlight: (any) => boolean;
    style?: any;
    children?: React.ReactNode | React.ReactNode[];
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
