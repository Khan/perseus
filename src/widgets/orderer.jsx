/** @jsx React.DOM */
(function(Perseus) {

require("../core.js");
var Util = require("../util.js");
require("../renderer.jsx");

var InfoTip        = require("../components/info-tip.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");
var Widgets        = require("../widgets.js");

var PlaceholderCard = React.createClass({
    propTypes: {
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired
    },

    render: function() {
        return <div className="card-wrap" style={{width: this.props.width}}>
            <div
                className="card placeholder"
                style={{height: this.props.height}} />
        </div>;
    }
});

var DragHintCard = React.createClass({
    render: function() {
        return <div className="card-wrap">
            <div className="card drag-hint" />
        </div>;
    }
});

var DraggableCard = React.createClass({
    propTypes: {
        width: React.PropTypes.number,
        stack: React.PropTypes.bool,
        onMouseDown: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            stack: false
        };
    },

    render: function() {
        var style = {};
        if (this.props.width) {
            style.width = this.props.width;
        }

        var className = ["card"];
        if (this.props.stack) {
            className.push("stack");
        }

        // Pull out the content to get rendered
        var rendererProps = _.pick(this.props, "content");

        return <div className="card-wrap"
                    style={style}>
                <div className={className.join(" ")}
                       onMouseDown={this.onMouseDown}
                       onTouchStart={this.onMouseDown}>
                    {Perseus.Renderer(rendererProps)}
                </div>
            </div>;
    },

    onMouseDown: function(event) {
        if (!(event.button === 0 ||
                (event.touches != null && event.touches.length === 1))) {
            return;
        }

        event.preventDefault();
        if (event.touches != null) {
            this.props.onMouseDown(this, {
                    pageX: event.touches[0].pageX,
                    pageY: event.touches[0].pageY
                });
        } else {
            this.props.onMouseDown(this, event);
        }
    }

});

var PropTypes = {
    position: React.PropTypes.shape({
        left: React.PropTypes.number,
        top: React.PropTypes.number
    })
};

var FloatingCard = React.createClass({
    propTypes: {
        startMouse: PropTypes.position,
        startOffset: PropTypes.position.isRequired,
        width: React.PropTypes.number.isRequired,
        animating: React.PropTypes.bool,
        animateTo: PropTypes.position,
        onAnimationEnd: React.PropTypes.func,
        floating: React.PropTypes.bool.isRequired,
        onMouseMove: React.PropTypes.func,
        onMouseUp: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            animating: false
        };
    },

    getInitialState: function() {
        return {
            mouse: this.props.startMouse
        };
    },

    render: function() {
        var style = {
            position: "absolute",
            left: this.props.startOffset.left,
            top: this.props.startOffset.top,
            width: this.props.width
        };

        var className = ["card"];
        if (!this.props.animating) {
            className.push("dragging");
            style.left += this.state.mouse.left - this.props.startMouse.left;
            style.top += this.state.mouse.top - this.props.startMouse.top;
        }

        // Pull out the content to get rendered
        var rendererProps = _.pick(this.props, "content");

        return <div className="card-wrap"
                    style={style}>
                <div className={className.join(" ")}>
                    {Perseus.Renderer(rendererProps)}
                </div>
            </div>;
    },

    componentDidMount: function() {
        $(document).on("vmousemove", this.onVMouseMove);
        $(document).on("vmouseup", this.onVMouseUp);
    },

    componentWillUnmount: function() {
        $(document).off("vmousemove", this.onVMouseMove);
        $(document).off("vmouseup", this.onVMouseUp);
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.props.animating && !prevProps.animating) {
            // If we just were changed into animating, start the animation.
            // We pick the animation speed based on the distance that the card
            // needs to travel. (Why sqrt? Just because it looks nice -- with a
            // linear scale, far things take too long to come back.)
            var ms = 15 * Math.sqrt(
                Math.sqrt(
                    Math.pow(this.props.animateTo.left -
                             this.props.startOffset.left, 2) +
                    Math.pow(this.props.animateTo.top -
                             this.props.startOffset.top, 2)
                )
            );
            $(this.getDOMNode()).animate(
                this.props.animateTo, Math.max(ms, 1),
                this.props.onAnimationEnd
            );
        }
    },

    onVMouseMove: function(event) {
        if (this.props.floating) {
            event.preventDefault();
            this.setState({
                mouse: {left: event.pageX, top: event.pageY}
            });
            this.props.onMouseMove(this);
        }
    },

    onVMouseUp: function(event) {
        if (this.props.floating) {
            event.preventDefault();
            this.props.onMouseUp(this, event);
        }
    }
});

var NORMAL = "normal",
    AUTO = "auto",
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical";

var Orderer = React.createClass({
    propTypes: {
        current: React.PropTypes.array,
        options: React.PropTypes.array,
        correctOptions: React.PropTypes.array,
        height: React.PropTypes.oneOf([NORMAL, AUTO]),
        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL])
    },

    getDefaultProps: function() {
        return {
            current: [],
            options: [],
            correctOptions: [],
            height: NORMAL,
            layout: HORIZONTAL
        };
    },

    getInitialState: function() {
        return {
            current: [],
            dragging: false,
            placeholderIndex: null
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if (!_.isEqual(this.props.current, nextProps.current)) {
            this.setState({current: nextProps.current});
        }
    },

    render: function() {
        var orderer = this;

        // This is the card we are currently dragging
        var dragging = this.state.dragging &&
            <FloatingCard floating={true}
                       content={this.state.dragContent}
                       startOffset={this.state.offsetPos}
                       startMouse={this.state.grabPos}
                       width={this.state.dragWidth}
                       onMouseUp={this.onRelease}
                       onMouseMove={this.onMouseMove}
                       key="draggingCard"
                       />;

        // This is the card that is currently animating
        var animating = this.state.animating &&
            <FloatingCard floating={false}
                       animating={true}
                       content={this.state.dragContent}
                       startOffset={this.state.offsetPos}
                       width={this.state.dragWidth}
                       animateTo={this.state.animateTo}
                       onAnimationEnd={this.state.onAnimationEnd}
                       key="draggingCard"
                       />;

        // This is the list of draggable, rearrangable cards
        var sortableCards = _.map(this.state.current, function(opt, i) {
            return <DraggableCard
                ref={"sortable" + i}
                content={opt.content}
                width={opt.width}
                key={opt.key}
                onMouseDown={orderer.onClick.bind(orderer, "current", i)} />;
        });

        if (this.state.placeholderIndex != null) {
            var placeholder = <PlaceholderCard
                ref="placeholder"
                width={this.state.dragWidth}
                height={this.state.dragHeight}
                key="placeholder" />;
            sortableCards.splice(this.state.placeholderIndex, 0, placeholder);
        }

        // If there are no cards in the list, then add a "hint" card
        var sortable = <div className="ui-helper-clearfix draggable-box">
            {!sortableCards.length && <DragHintCard />}
            <div ref="dragList">{sortableCards}</div>
        </div>;

        // This is the bank of stacks of cards
        var bank = <div ref="bank" className="bank ui-helper-clearfix">
            {_.map(this.props.options, function(opt, i) {
                return <DraggableCard
                    ref={"bank" + i}
                    content={opt.content}
                    stack={true}
                    key={i}
                    onMouseDown={orderer.onClick.bind(orderer, "bank", i)} />;
            })}
        </div>;

        return <div className={"draggy-boxy-thing orderer " +
                        "height-" + this.props.height + " " +
                        "layout-" + this.props.layout + " " +
                        "above-scratchpad blank-background " +
                        "ui-helper-clearfix"}
                    ref="orderer">
                   {bank}
                   {sortable}
                   {dragging}
                   {animating}
               </div>;
    },

    onClick: function(type, index, draggable,  event) {
        var $draggable = $(draggable.getDOMNode());
        var list = this.state.current.slice();

        var opt;
        var placeholderIndex = null;

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
            dragContent: opt.content,
            dragWidth: $draggable.width(),
            dragHeight: $draggable.height(),
            grabPos: {
                left: event.pageX,
                top: event.pageY
            },
            offsetPos: $draggable.position()
        });
    },

    onRelease: function(draggable, event) {
        var inCardBank = this.isCardInBank(draggable);
        var index = this.state.placeholderIndex;

        // Here, we build a callback function for the card to call when it is
        // done animating
        var onAnimationEnd = function() {
            var list = this.state.current.slice();

            if (!inCardBank) {
                // Insert the new card into the position
                var newCard = {
                    content: this.state.dragContent,
                    key: _.uniqueId("perseus_draggable_card_"),
                    width: this.state.dragWidth
                };

                list.splice(index, 0, newCard);
            }

            this.props.onChange({
                current: list
            });
            this.setState({
                current: list,
                dragging: false,
                placeholderIndex: null,
                animating: false
            });
        }.bind(this);

        // Find the position of the card we should animate to
        var offset = $(draggable.getDOMNode()).position();
        var finalOffset = null;
        if (inCardBank) {
            // If we're in the card bank, go through the options to find the
            // one with the same content
            _.each(this.props.options, function(opt, i) {
                if (opt.content === this.state.dragContent) {
                    var card = this.refs["bank" + i].getDOMNode();
                    finalOffset = $(card).position();
                }
            }, this);
        } else {
            // Otherwise, go to the position that the placeholder is at
            finalOffset = $(this.refs.placeholder.getDOMNode()).position();
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
                dragging: false
            });
        }
    },

    onMouseMove: function(draggable) {
        var index;
        if (this.isCardInBank(draggable)) {
            index = null;
        } else {
            index = this.findCorrectIndex(draggable, this.state.current);
        }

        this.setState({placeholderIndex: index});
    },

    findCorrectIndex: function(draggable, list) {
        // Find the correct index for a card given the current cards.
        var isHorizontal = this.props.layout === HORIZONTAL,
            $dragList = $(this.refs.dragList.getDOMNode()),
            leftEdge = $dragList.offset().left,
            topEdge = $dragList.offset().top,
            midWidth = $(draggable.getDOMNode()).offset().left - leftEdge,
            midHeight = $(draggable.getDOMNode()).offset().top - topEdge,
            index = 0,
            sumWidth = 0,
            sumHeight = 0;

        if (isHorizontal) {
            _.each(list, function(opt, i) {
                var card = this.refs["sortable" + i].getDOMNode();
                var outerWidth = $(card).outerWidth(true);
                if (midWidth > sumWidth + outerWidth / 2) {
                    index += 1;
                }
                sumWidth += outerWidth;
            }, this);
        } else {
            _.each(list, function(opt, i) {
                var card = this.refs["sortable" + i].getDOMNode();
                var outerHeight = $(card).outerHeight(true);
                if (midHeight > sumHeight + outerHeight / 2) {
                    index += 1;
                }
                sumHeight += outerHeight;
            }, this);
        }

        return index;
    },

    isCardInBank: function(draggable) {
        var isHorizontal = this.props.layout === HORIZONTAL,
            $draggable = $(draggable.getDOMNode()),
            $bank = $(this.refs.bank.getDOMNode()),
            draggableOffset = $draggable.offset(),
            bankOffset = $bank.offset(),
            draggableHeight = $draggable.outerHeight(true),
            bankHeight = $bank.outerHeight(true),
            bankWidth = $bank.outerWidth(true),
            dragList = this.refs.dragList.getDOMNode(),
            dragListWidth = $(dragList).width(),
            draggableWidth = $draggable.outerWidth(true),
            currentWidth =
                _.reduce(this.state.current, function(sum, opt, i) {
                    var card = this.refs["sortable" + i].getDOMNode();
                    return sum + $(card).outerWidth(true);
                }, 0, this);

        if (isHorizontal) {
            return (draggableOffset.top + draggableHeight / 2 <
                    bankOffset.top + bankHeight) ||
                   (currentWidth + draggableWidth > dragListWidth);
        } else {
            return (draggableOffset.left + draggableWidth / 2 <
                    bankOffset.left + bankWidth);
        }
    },

    toJSON: function(skipValidation) {
        return {current: _.map(this.props.current, function(v) {
            return v.content;
        })};
    },

    simpleValidate: function(rubric) {
        return Orderer.validate(this.toJSON(), rubric);
    },
});

_.extend(Orderer, {
    validate: function(state, rubric) {
        if (state.current.length === 0) {
            return {
                type: "invalid",
                message: null
            };
        }

        var correct = _.isEqual(
            state.current,
            _.pluck(rubric.correctOptions, 'content')
        );

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message: null
        };
    }
});


var OrdererEditor = React.createClass({
    propTypes: {
        correctOptions: React.PropTypes.array,
        otherOptions: React.PropTypes.array,
        height: React.PropTypes.oneOf([NORMAL, AUTO]),
        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            correctOptions: [
                {content: "$x$"}
            ],
            otherOptions: [
                {content: "$y$"}
            ],
            height: NORMAL,
            layout: HORIZONTAL
        };
    },

    render: function() {
        var editor = this;

        return <div className="perseus-widget-orderer">
            <div>
                {' '}Correct answer:{' '}
                <InfoTip><p>
                    Place the cards in the correct order. The same card can be
                    used more than once in the answer but will only be 
                    displayed once at the top of a stack of identical cards.
                </p></InfoTip>
            </div>
            <TextListEditor
                options={_.pluck(this.props.correctOptions, "content")}
                onChange={this.onOptionsChange.bind(this, "correctOptions")}
                layout={this.props.layout} />

            <div>
                {' '}Other cards:{' '}
                <InfoTip>
                    <p>Create cards that are not part of the answer.</p>
                </InfoTip>
            </div>
            <TextListEditor
                options={_.pluck(this.props.otherOptions, "content")}
                onChange={this.onOptionsChange.bind(this, "otherOptions")}
                layout={this.props.layout} />

            <div>
                <label>
                    {' '}Layout:{' '}
                    <select value={this.props.layout}
                            onChange={this.onLayoutChange}>
                        <option value={HORIZONTAL}>Horizontal</option>
                        <option value={VERTICAL}>Vertical</option>
                    </select>
                </label>
                <InfoTip>
                    <p>Use the horizontal layout for short text and small
                    images. The vertical layout is best for longer text (e.g.
                    proofs).</p>
                </InfoTip>
            </div>
            <div>
                <label>
                    {' '}Height:{' '}
                    <select value={this.props.height}
                            onChange={this.onHeightChange}>
                        <option value={NORMAL}>Normal</option>
                        <option value={AUTO}>Automatic</option>
                    </select>
                </label>
                <InfoTip>
                    <p>Use "Normal" for text, "Automatic" for images.</p>
                </InfoTip>
            </div>
        </div>;
    },

    onOptionsChange: function(whichOptions, options, cb) {
        var props = {};
        props[whichOptions] = _.map(options, function(option) {
            return {content: option};
        });
        this.props.onChange(props, cb);
    },

    onLayoutChange: function(e) {
        this.props.onChange({layout: e.target.value});
    },

    onHeightChange: function(e) {
        this.props.onChange({height: e.target.value});
    },

    toJSON: function(skipValidation) {
        // We combine the correct answer and the other cards by merging them,
        // removing duplicates and empty cards, and sorting them into
        // categories based on their content
        var options =
            _.chain(_.pluck(this.props.correctOptions, 'content'))
             .union(_.pluck(this.props.otherOptions, 'content'))
             .uniq()
             .reject(function(content) { return content === ""; })
             .sort()
             .sortBy(function(content) {
                 if (/\d/.test(content)) {
                     return 0;
                 } else if (/^\$?[a-zA-Z]+\$?$/.test(content)) {
                     return 2;
                 } else {
                     return 1;
                 }
             })
             .map(function(content) {
                 return { content: content };
             })
             .value();

        return {
            options: options,
            correctOptions: this.props.correctOptions,
            otherOptions: this.props.otherOptions,
            height: this.props.height,
            layout: this.props.layout
        };
    }
});

Widgets.register("orderer", Orderer);
Widgets.register("orderer-editor", OrdererEditor);

})(Perseus);

