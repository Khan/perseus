import {css, StyleSheet} from "aphrodite";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";

const PT = PropTypes;

// Need to update these values.
type Props = {
    className: string;
    components: any[];
    onReorder: (i: any[]) => void;
    style: any;
    verify: (i: any) => boolean;
};

type DefaultProps = {
    className: Props["className"];
    components: Props["components"];
    onReorder: Props["onReorder"];
    style: Props["style"];
    verify: Props["verify"];
};

/**
 * Takes an array of components to sort.
 * As of 08/05/24, there are two sortable components
 * (one in perseus and one in perseus-editor).
 * As far as I can tell, this one is only used in ExpressionEditor.
 */
// eslint-disable-next-line react/no-unsafe
export class SortableArea extends React.Component<Props> {
    dragging: any;
    _dragItems: any;

    static defaultProps: DefaultProps = {
        className: "",
        components: [],
        onReorder: () => true,
        style: {},
        verify: () => true,
    };

    getInitialState() {
        return {
            // index of the component being dragged
            dragging: null,
            components: this.props.components,
        };
    }
    // Firefox refuses to drag an element unless you set data on it. Hackily
    // add data each time an item is dragged.
    componentDidMount() {
        this._setDragEvents();
    }

    // eslint-disable-next-line react/no-unsafe
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({components: nextProps.components});
    }

    componentDidUpdate() {
        this._setDragEvents();
    }

    // Alternatively send each handler to each component individually,
    // partially applied
    onDragStart(startIndex) {
        this.setState({dragging: startIndex});
    }

    onDrop() {
        // tell the parent component
        this.setState({dragging: null});
        this.props.onReorder(this.props.components);
    }

    onDragEnter(enterIndex) {
        // When a label is first dragged it triggers a dragEnter with itself,
        // which we don't care about.
        if (this.dragging === enterIndex) {
            return;
        }

        const newComponents = this.props.components.slice();

        // splice the tab out of its old position
        const removed = newComponents.splice(this.dragging, 1);
        // ... and into its new position
        newComponents.splice(enterIndex, 0, removed[0]);

        const verified = this.props.verify(newComponents);
        if (verified) {
            this.setState({
                dragging: enterIndex,
                components: newComponents,
            });
        }
        return verified;
    }

    _listenEvent(e) {
        e.dataTransfer.setData("hackhackhack", "because browsers!");
    }

    _cancelEvent(e) {
        // prevent the browser from redirecting to 'because browsers!'
        e.preventDefault();
    }

    _setDragEvents() {
        this._dragItems = this._dragItems || [];
        const items =
            // @ts-expect-error - TS2531 - Object is possibly 'null'
            ReactDOM.findDOMNode(this).querySelectorAll("[draggable=true]");

        const oldItems: Array<HTMLElement> = [];
        const newItems: Array<HTMLElement> = [];

        for (let i = 0; i < this._dragItems.length; i++) {
            const item = this._dragItems[i];
            if (items.indexOf(item) < 0) {
                oldItems.push(item);
            }
        }

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (this._dragItems.indexOf(item) < 0) {
                newItems.push(item);
            }
        }

        for (let i = 0; i < newItems.length; i++) {
            const dragItem = newItems[i];
            dragItem.addEventListener("dragstart", this._listenEvent);
            dragItem.addEventListener("drop", this._cancelEvent);
        }

        for (let i = 0; i < oldItems.length; i++) {
            const dragItem = oldItems[i];
            dragItem.removeEventListener("dragstart", this._listenEvent);
            dragItem.removeEventListener("drop", this._cancelEvent);
        }
    }

    render() {
        const sortables = this.props.components.map((component, index) => (
            <SortableItem
                index={index}
                component={component}
                area={this}
                key={component.key}
                draggable={component.props.draggable}
                dragging={index === this.dragging}
            />
        ));
        return (
            <ol className={this.props.className} style={this.props.style}>
                {sortables}
            </ol>
        );
    }
}

type ItemProps = {
    area: any;
    component: any;
    dragging: boolean;
    draggable: boolean;
    index: number;
};

type DefaultItemProps = {
    area: ItemProps["area"];
    component: ItemProps["component"];
    dragging: ItemProps["dragging"];
    draggable: ItemProps["draggable"];
    index: ItemProps["index"];
};

// An individual sortable item
export class SortableItem extends React.Component<ItemProps> {
    static defaultProps: DefaultItemProps = {
        area: "",
        component: {},
        dragging: false,
        draggable: false,
        index: 0,
    };

    handleDragStart(e) {
        e.nativeEvent.dataTransfer.effectAllowed = "move";
        this.props.area.onDragStart(this.props.index);
    }

    handleDrop() {
        this.props.area.onDrop(this.props.index);
    }

    handleDragEnter(e) {
        const verified = this.props.area.onDragEnter(this.props.index);
        // Ideally this would change the cursor based on whether this is a
        // valid place to drop.
        e.nativeEvent.dataTransfer.effectAllowed = verified ? "move" : "none";
    }

    handleDragOver(e) {
        // allow a drop by preventing default handling
        e.preventDefault();
    }

    render() {
        // I think these might be getting styles from Webapp
        let dragState = "sortable-disabled";
        if (this.props.dragging) {
            dragState = "sortable-dragging";
        } else if (this.props.draggable) {
            dragState = "sortable-enabled";
        }

        return (
            <li
                draggable={this.props.draggable}
                className={[dragState, css(styles.sortableListItem)].join(" ")}
                onDragStart={this.handleDragStart}
                onDrop={this.handleDrop}
                onDragEnter={this.handleDragEnter}
                onDragOver={this.handleDragOver}
            >
                {this.props.component}
            </li>
        );
    }
}

const styles = StyleSheet.create({
    sortableListItem: {
        margin: "5px 0",
    },
});

export default SortableArea;
