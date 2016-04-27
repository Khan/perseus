/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const ReactDOM = require("react-dom");
const _ = require("underscore");

const Renderer = require("../renderer.jsx");
const Util = require("../util.js");

const ApiClassNames = require("../perseus-api.jsx").ClassNames;

const PlaceholderCard = React.createClass({
    propTypes: {
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
    },

    render: function() {
        return <div
                className={"card-wrap " + ApiClassNames.INTERACTIVE}
                style={{width: this.props.width}}>
            <div
                className="card placeholder"
                style={{height: this.props.height}} />
        </div>;
    },
});

const DragHintCard = React.createClass({
    render: function() {
        return <div className={"card-wrap " + ApiClassNames.INTERACTIVE}>
            <div className="card drag-hint" />
        </div>;
    },
});

const PropTypes = {
    position: React.PropTypes.shape({
        left: React.PropTypes.number,
        top: React.PropTypes.number,
    }),
};

const Card = React.createClass({
    propTypes: {
        floating: React.PropTypes.bool.isRequired,
        animating: React.PropTypes.bool,
        width: React.PropTypes.number,
        stack: React.PropTypes.bool,

        onMouseDown: React.PropTypes.func,
        onMouseMove: React.PropTypes.func,
        onMouseUp: React.PropTypes.func,

        // Used only for floating/animating cards
        startMouse: PropTypes.position,
        startOffset: PropTypes.position,
        animateTo: PropTypes.position,
        onAnimationEnd: React.PropTypes.func,

        mouse: PropTypes.position,

        content: React.PropTypes.string,
        fakeRef: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            stack: false,
            animating: false,
        };
    },

    render: function() {
        let style = {};

        if (this.props.floating) {
            style = {
                position: "absolute",
                left: this.props.startOffset.left,
                top: this.props.startOffset.top,
            };
        }

        if (this.props.width) {
            style.width = this.props.width;
        }

        const className = ["card"];
        if (this.props.stack) {
            className.push("stack");
        }
        if (this.props.floating && !this.props.animating) {
            className.push("dragging");
            style.left += this.props.mouse.left - this.props.startMouse.left;
            style.top += this.props.mouse.top - this.props.startMouse.top;
        }

        // Pull out the content to get rendered
        const rendererProps = _.pick(this.props, "content");

        const onMouseDown = (this.props.animating) ? $.noop : this.onMouseDown;

        return <div className={"card-wrap " + ApiClassNames.INTERACTIVE}
                    style={style}
                    onMouseDown={onMouseDown}
                    onTouchStart={onMouseDown}
                    onTouchMove={this.onMouseMove}
                    onTouchEnd={this.onMouseUp}
                    onTouchCancel={this.onMouseUp}>
                <div className={className.join(" ")}>
                    <Renderer {...rendererProps} />
                </div>
            </div>;
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        // Cards in the bank or drag list don't usually change -- they only
        // reorder themselves -- so we want to skip the update to things a
        // little faster. We also need to re-render if the content changes,
        // which happens only in the editor. (We do want to update the floating
        // card on mouse move to update its position.)
        return this.props.floating || nextProps.floating ||
            this.props.content !== nextProps.content ||
            // TODO(alpert): Remove ref here after fixing facebook/react#1392.
            this.props.fakeRef !== nextProps.fakeRef;
    },

    componentDidMount: function() {
        this.mouseMoveUpBound = false;
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.props.animating && !prevProps.animating) {
            // If we just were changed into animating, start the animation.
            // We pick the animation speed based on the distance that the card
            // needs to travel. (Why sqrt? Just because it looks nice -- with a
            // linear scale, far things take too long to come back.)
            const ms = 15 * Math.sqrt(
                Math.sqrt(
                    Math.pow(this.props.animateTo.left -
                             this.props.startOffset.left, 2) +
                    Math.pow(this.props.animateTo.top -
                             this.props.startOffset.top, 2)
                )
            );
            $(ReactDOM.findDOMNode(this)).animate(
                this.props.animateTo, Math.max(ms, 1),
                this.props.onAnimationEnd
            );
        }
    },

    componentWillUnmount: function() {
        // Event handlers should be unbound before component unmounting, but
        // just in case...
        if (this.mouseMoveUpBound) {
            /* eslint-disable no-console */
            console.warn("Removing an element with bound event handlers.");
            /* eslint-enable no-console */

            this.unbindMouseMoveUp();
            Util.resetTouchHandlers();
        }
    },

    bindMouseMoveUp: function() {
        this.mouseMoveUpBound = true;
        $(document).on("mousemove", this.onMouseMove);
        $(document).on("mouseup", this.onMouseUp);
    },

    unbindMouseMoveUp: function() {
        this.mouseMoveUpBound = false;
        $(document).off("mousemove", this.onMouseMove);
        $(document).off("mouseup", this.onMouseUp);
    },

    onMouseDown: function(event) {
        event.preventDefault();
        const loc = Util.extractPointerLocation(event);
        if (loc) {
            this.bindMouseMoveUp();
            this.props.onMouseDown && this.props.onMouseDown(loc, this);
        }
    },

    onMouseMove: function(event) {
        event.preventDefault();
        const loc = Util.extractPointerLocation(event);
        if (loc) {
            this.props.onMouseMove && this.props.onMouseMove(loc);
        }
    },

    onMouseUp: function(event) {
        event.preventDefault();
        const loc = Util.extractPointerLocation(event);
        if (loc) {
            this.unbindMouseMoveUp();
            this.props.onMouseUp && this.props.onMouseUp(loc);
        }
    },
});

const NORMAL = "normal";
const AUTO = "auto";
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

const Orderer = React.createClass({
    propTypes: {
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        correctOptions: React.PropTypes.arrayOf(React.PropTypes.any),
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        current: React.PropTypes.arrayOf(React.PropTypes.any),
        height: React.PropTypes.oneOf([NORMAL, AUTO]),
        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
        onChange: React.PropTypes.func.isRequired,
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        options: React.PropTypes.arrayOf(React.PropTypes.any),
        trackInteraction: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            current: [],
            options: [],
            correctOptions: [],
            height: NORMAL,
            layout: HORIZONTAL,
        };
    },

    getInitialState: function() {
        return {
            current: [],
            dragging: false,
            placeholderIndex: null,
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if (!_.isEqual(this.props.current, nextProps.current)) {
            this.setState({current: nextProps.current});
        }
    },

    render: function() {
        // This is the card we are currently dragging
        const dragging = this.state.dragging &&
            <Card ref="dragging"
                       floating={true}
                       content={this.state.dragContent}
                       startOffset={this.state.offsetPos}
                       startMouse={this.state.grabPos}
                       mouse={this.state.mousePos}
                       width={this.state.dragWidth}
                       onMouseUp={this.onRelease}
                       onMouseMove={this.onMouseMove}
                       key={this.state.dragKey || "draggingCard"}
                       />;

        // This is the card that is currently animating
        const animating = this.state.animating &&
            <Card floating={true}
                       animating={true}
                       content={this.state.dragContent}
                       startOffset={this.state.offsetPos}
                       width={this.state.dragWidth}
                       animateTo={this.state.animateTo}
                       onAnimationEnd={this.state.onAnimationEnd}
                       key={this.state.dragKey || "draggingCard"}
                       />;

        // This is the list of draggable, rearrangable cards
        const sortableCards = _.map(this.state.current, function(opt, i) {
            return <Card
                ref={"sortable" + i}
                fakeRef={"sortable" + i}
                floating={false}
                content={opt.content}
                width={opt.width}
                key={opt.key}
                onMouseDown={(this.state.animating) ?
                    $.noop :
                    this.onClick.bind(null, "current", i)} />;
        }, this);

        if (this.state.placeholderIndex != null) {
            const placeholder = <PlaceholderCard
                ref="placeholder"
                width={this.state.dragWidth}
                height={this.state.dragHeight}
                key="placeholder" />;
            sortableCards.splice(this.state.placeholderIndex, 0, placeholder);
        }

        const anySortableCards = sortableCards.length > 0;
        sortableCards.push(dragging, animating);

        // If there are no cards in the list, then add a "hint" card
        const sortable = <div className="ui-helper-clearfix draggable-box">
            {!anySortableCards && <DragHintCard />}
            <div ref="dragList">{sortableCards}</div>
        </div>;

        // This is the bank of stacks of cards
        const bank = <div ref="bank" className="bank ui-helper-clearfix">
            {_.map(this.props.options, (opt, i) => {
                return <Card
                    ref={"bank" + i}
                    floating={false}
                    content={opt.content}
                    stack={true}
                    key={i}
                    onMouseDown={(this.state.animating) ?
                        $.noop :
                        this.onClick.bind(null, "bank", i)}
                    onMouseMove={this.onMouseMove}
                    onMouseUp={this.onRelease} />;
            }, this)}
        </div>;

        return <div className={"draggy-boxy-thing orderer " +
                        "height-" + this.props.height + " " +
                        "layout-" + this.props.layout + " " +
                        "above-scratchpad blank-background " +
                        "ui-helper-clearfix " + ApiClassNames.INTERACTIVE}
                    ref="orderer">
                   {bank}
                   {sortable}
               </div>;
    },

    onClick: function(type, index, loc, draggable) {
        const $draggable = $(ReactDOM.findDOMNode(draggable));
        const list = this.state.current.slice();

        let opt;
        let placeholderIndex = null;

        if (type === "current") {
            // If this is coming from the original list, remove the original
            // card from the list
            list.splice(index, 1);
            opt = this.state.current[index];
            placeholderIndex = index;
        } else if (type === "bank") {
            opt = this.props.options[index];
        }

        this.setState({
            current: list,
            dragging: true,
            placeholderIndex: placeholderIndex,
            dragKey: opt.key,
            dragContent: opt.content,
            dragWidth: $draggable.width(),
            dragHeight: $draggable.height(),
            grabPos: loc,
            mousePos: loc,
            offsetPos: $draggable.position(),
        });
    },

    onRelease: function(loc) {
        const draggable = this.refs.dragging;
        if (draggable == null) {
            return;
        }
        const inCardBank = this.isCardInBank(draggable);
        const index = this.state.placeholderIndex;

        // Here, we build a callback function for the card to call when it is
        // done animating
        const onAnimationEnd = () => {
            const list = this.state.current.slice();

            if (!inCardBank) {
                // Insert the new card into the position
                const newCard = {
                    content: this.state.dragContent,
                    key: _.uniqueId("perseus_draggable_card_"),
                    width: this.state.dragWidth,
                };

                list.splice(index, 0, newCard);
            }

            this.props.onChange({
                current: list,
            });
            this.setState({
                current: list,
                dragging: false,
                placeholderIndex: null,
                animating: false,
            });
            this.props.trackInteraction();
        };

        // Find the position of the card we should animate to
        // TODO(alpert): Update mouse position once more before animating?
        const offset = $(ReactDOM.findDOMNode(draggable)).position();
        let finalOffset = null;
        if (inCardBank) {
            // If we're in the card bank, go through the options to find the
            // one with the same content
            _.each(this.props.options, function(opt, i) {
                if (opt.content === this.state.dragContent) {
                    const card = ReactDOM.findDOMNode(this.refs["bank" + i]);
                    finalOffset = $(card).position();
                }
            }, this);
        } else if (this.refs.placeholder != null) {
            // Otherwise, go to the position that the placeholder is at
            finalOffset =
                $(ReactDOM.findDOMNode(this.refs.placeholder)).position();
        }

        if (finalOffset == null) {
            // If we didn't find a card to go to, simply make the changes we
            // would have made at the end. (should only happen if we are
            // messing around with card contents, and not on the real site)
            onAnimationEnd();
        } else {
            this.setState({
                offsetPos: offset,
                animateTo: finalOffset,
                onAnimationEnd: onAnimationEnd,
                animating: true,
                dragging: false,
            });
        }
    },

    onMouseMove: function(loc) {
        const draggable = this.refs.dragging;
        if (draggable == null) {
            return;
        }

        let index;
        if (this.isCardInBank(draggable)) {
            index = null;
        } else {
            index = this.findCorrectIndex(draggable, this.state.current);
        }

        this.setState({
            mousePos: loc,
            placeholderIndex: index,
        });
    },

    findCorrectIndex: function(draggable, list) {
        // Find the correct index for a card given the current cards.
        const isHorizontal = this.props.layout === HORIZONTAL;
        const $dragList = $(ReactDOM.findDOMNode(this.refs.dragList));
        const leftEdge = $dragList.offset().left;
        const topEdge = $dragList.offset().top;
        const midWidth =
                $(ReactDOM.findDOMNode(draggable)).offset().left - leftEdge;
        const midHeight =
                $(ReactDOM.findDOMNode(draggable)).offset().top - topEdge;
        let index = 0;
        let sumWidth = 0;
        let sumHeight = 0;

        if (isHorizontal) {
            _.each(list, function(opt, i) {
                const card = ReactDOM.findDOMNode(this.refs["sortable" + i]);
                const outerWidth = $(card).outerWidth(true);
                if (midWidth > sumWidth + outerWidth / 2) {
                    index += 1;
                }
                sumWidth += outerWidth;
            }, this);
        } else {
            _.each(list, function(opt, i) {
                const card = ReactDOM.findDOMNode(this.refs["sortable" + i]);
                const outerHeight = $(card).outerHeight(true);
                if (midHeight > sumHeight + outerHeight / 2) {
                    index += 1;
                }
                sumHeight += outerHeight;
            }, this);
        }

        return index;
    },

    isCardInBank: function(draggable) {
        if (draggable == null) {
            return false;
        }

        const isHorizontal = this.props.layout === HORIZONTAL;
        const $draggable = $(ReactDOM.findDOMNode(draggable));
        const $bank = $(ReactDOM.findDOMNode(this.refs.bank));
        const draggableOffset = $draggable.offset();
        const bankOffset = $bank.offset();
        const draggableHeight = $draggable.outerHeight(true);
        const bankHeight = $bank.outerHeight(true);
        const bankWidth = $bank.outerWidth(true);
        const draggableWidth = $draggable.outerWidth(true);

        if (isHorizontal) {
            return (draggableOffset.top + draggableHeight / 2 <
                    bankOffset.top + bankHeight);
        } else {
            return (draggableOffset.left + draggableWidth / 2 <
                    bankOffset.left + bankWidth);
        }
    },

    getUserInput: function() {
        return {current: _.map(this.props.current, function(v) {
            return v.content;
        })};
    },

    simpleValidate: function(rubric) {
        return Orderer.validate(this.getUserInput(), rubric);
    },
});

_.extend(Orderer, {
    validate: function(state, rubric) {
        if (state.current.length === 0) {
            return {
                type: "invalid",
                message: null,
            };
        }

        const correct = _.isEqual(
            state.current,
            _.pluck(rubric.correctOptions, 'content')
        );

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message: null,
        };
    },
});

module.exports = {
    name: "orderer",
    displayName: "Orderer",
    widget: Orderer,
};
