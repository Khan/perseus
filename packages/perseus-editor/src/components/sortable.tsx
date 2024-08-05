import {css, StyleSheet} from "aphrodite";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";

const PT = PropTypes;

/**
 * Takes an array of components to sort.
 * As of this writing, there are two sortable components
 * (one in perseus and one in perseus-editor).
 * As far as I can tell, this one is only used in ExpressionEditor.
 */
// eslint-disable-next-line react/no-unsafe
const SortableArea = createReactClass({
    propTypes: {
        className: PT.string,
        components: PT.arrayOf(PT.node).isRequired,
        onReorder: PT.func.isRequired,
        style: PT.any,
        verify: PT.func,
    },
    getDefaultProps: function () {
        return {verify: () => true};
    },
    getInitialState: function () {
        return {
            // index of the component being dragged
            dragging: null,
            components: this.props.components,
        };
    },
    // Firefox refuses to drag an element unless you set data on it. Hackily
    // add data each time an item is dragged.
    componentDidMount: function () {
        this._setDragEvents();
    },
    // eslint-disable-next-line react/no-unsafe
    UNSAFE_componentWillReceiveProps: function (nextProps) {
        this.setState({components: nextProps.components});
    },
    componentDidUpdate: function () {
        this._setDragEvents();
    },
    // Alternatively send each handler to each component individually,
    // partially applied
    onDragStart: function (startIndex) {
        this.setState({dragging: startIndex});
    },
    onDrop: function () {
        // tell the parent component
        this.setState({dragging: null});
        this.props.onReorder(this.state.components);
    },
    onDragEnter: function (enterIndex) {
        // When a label is first dragged it triggers a dragEnter with itself,
        // which we don't care about.
        if (this.state.dragging === enterIndex) {
            return;
        }

        const newComponents = this.state.components.slice();

        // splice the tab out of its old position
        const removed = newComponents.splice(this.state.dragging, 1);
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
    },
    _listenEvent: function (e) {
        e.dataTransfer.setData("hackhackhack", "because browsers!");
    },
    _cancelEvent: function (e) {
        // prevent the browser from redirecting to 'because browsers!'
        e.preventDefault();
    },
    _setDragEvents: function () {
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
    },
    render: function () {
        const sortables = this.state.components.map((component, index) => (
            <SortableItem
                index={index}
                component={component}
                area={this}
                key={component.key}
                draggable={component.props.draggable}
                dragging={index === this.state.dragging}
            />
        ));
        return (
            <ol className={this.props.className} style={this.props.style}>
                {sortables}
            </ol>
        );
    },
});

// An individual sortable item
const SortableItem = createReactClass({
    propTypes: {
        area: PT.shape({
            onDragEnter: PT.func.isRequired,
            onDragStart: PT.func.isRequired,
            onDrop: PT.func.isRequired,
        }),
        component: PT.node.isRequired,
        dragging: PT.bool.isRequired,
        draggable: PT.bool.isRequired,
        index: PT.number.isRequired,
    },
    handleDragStart: function (e) {
        e.nativeEvent.dataTransfer.effectAllowed = "move";
        this.props.area.onDragStart(this.props.index);
    },
    handleDrop: function () {
        this.props.area.onDrop(this.props.index);
    },
    handleDragEnter: function (e) {
        const verified = this.props.area.onDragEnter(this.props.index);
        // Ideally this would change the cursor based on whether this is a
        // valid place to drop.
        e.nativeEvent.dataTransfer.effectAllowed = verified ? "move" : "none";
    },
    handleDragOver: function (e) {
        // allow a drop by preventing default handling
        e.preventDefault();
    },
    render: function () {
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
    },
});

const styles = StyleSheet.create({
    sortableListItem: {
        margin: "5px 0",
    },
});

export default SortableArea;
