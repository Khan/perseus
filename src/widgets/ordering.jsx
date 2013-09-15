/** @jsx React.DOM */
(function(Perseus) {

var PlaceholderCard = React.createClass({
    render: function() {
        return <div className="card-wrap"
                    style={{width: this.props.width}}>
                <div className="card placeholder" />
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
        if (event.button !== 0) {
            return;
        }

        event.preventDefault();
        this.props.onMouseDown(this, event);
    },

});

var FloatingCard = React.createClass({
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

        return <div class="card-wrap"
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

    componentDidUpdate: function(prevProps, prevState, rootNode) {
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

var Orderer = React.createClass({
    getDefaultProps: function() {
        return {
            current: [],
            options: [],
            correctOptions: [],
            height: "normal"
        };
    },

    getInitialState: function() {
        return {
            current: [],
            dragging: false,
            placeholderIndex: null
        };
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

        return <div className={"draggy-boxy-thing ordering height-" +
                        this.props.height}
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
        var $dragList = $(this.refs.dragList.getDOMNode()),
            leftEdge = $dragList.offset().left,
            midWidth = $(draggable.getDOMNode()).offset().left - leftEdge,
            index = 0,
            sumWidth = 0;

        _.each(list, function(opt, i) {
            var card = this.refs["sortable" + i].getDOMNode();
            var outerWidth = $(card).outerWidth(true);
            if (midWidth > sumWidth + outerWidth / 2) {
                index += 1;
            }
            sumWidth += outerWidth;
        }, this);

        return index;
    },

    isCardInBank: function(draggable) {
        var $draggable = $(draggable.getDOMNode()),
            $bank = $(this.refs.bank.getDOMNode()),
            draggableOffset = $draggable.offset(),
            bankOffset = $bank.offset(),
            draggableHeight = $draggable.outerHeight(true),
            bankHeight = $bank.outerHeight(true),
            dragList = this.refs.dragList.getDOMNode(),
            dragListWidth = $(dragList).width(),
            draggableWidth = $draggable.outerWidth(true),
            currentWidth =
                _.reduce(this.state.current, function(sum, opt, i) {
                    var card = this.refs["sortable" + i].getDOMNode();
                    return sum + $(card).outerWidth(true);
                }, 0, this);

        return (draggableOffset.top + draggableHeight / 2 <
                bankOffset.top + bankHeight) ||
               (currentWidth + draggableWidth > dragListWidth);
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

var textWidthCache = {};

function getTextWidth(text) {
    if (textWidthCache[text]) {
        return textWidthCache[text];
    }

    // Hacky way to guess the width of an input box
    var testElement = $("<span>");
    testElement.text(text);

    testElement.appendTo("body");
    var width = testElement.width();
    testElement.remove();

    textWidthCache[text] = width + 5;
    return textWidthCache[text];
}


var TextListEditor = React.createClass({
    getDefaultProps: function() {
        return {
            options: [{
                content: "$x$"
            }]
        };
    },

    render: function() {
        var inputs = this.props.options.map(function(option, i) {
            return <li key={i}>
                <input type="text"
                       ref={"editor" + i}
                       style={{width: getTextWidth(option.content)}}
                       onInput={this.onContentChange.bind(this, i)}
                       value={option.content} />
            </li>;
        }, this);

        inputs.push(
            <li key={inputs.length}>
                <input type="text"
                       ref={"editorExtra"}
                       onInput={this.addOption}
                       style={{width: "20px"}}
                       value="" />
            </li>
        );

        return <ul className="ui-helper-clearfix">{inputs}</ul>;
    },

    addOption: function(e) {
        // If we type into the empty input box at the end, we add a new input
        // box in its place, copy over the contents, focus it at the correct
        // place, and re-empty the last input box
        e.preventDefault();

        var options = this.props.options;
        var blankOption = {content: e.target.value};

        this.props.onContentChange(options.concat([blankOption]));
    },

    onContentChange: function(optionIndex, e) {
        var options = this.props.options.slice();
        var option = _.clone(options[optionIndex]);

        option.content = e.target.value;
        options[optionIndex] = option;

        // Delete empty inputs at the end
        var didDelete = false;
        for (var i = options.length - 1;
             i >= 0 && options[i].content === "";
             i--) {
            options.splice(i, 1);
            didDelete = true;
        }

        this.props.onContentChange(options);
    }
});

var OrdererEditor = React.createClass({
    getDefaultProps: function() {
        return {
            correctOptions: [
                {content: "$x$"}
            ],
            otherOptions: [
                {content: "$y$"}
            ],
            height: "normal"
        };
    },

    render: function() {
        var editor = this;

        return <div className="perseus-widget-orderer">
            <div>Correct answer:</div>
            <TextListEditor options={this.props.correctOptions}
                            onContentChange={function(options) {
                                editor.props.onChange({
                                    correctOptions: options
                                });
                            }}/>

            <div>Other cards:</div>
            <TextListEditor options={this.props.otherOptions}
                            onContentChange={function(options) {
                                editor.props.onChange({otherOptions: options});
                            }}/>

            <div>Height:</div>
            <select value={this.props.height} onChange={this.onHeightChange}>
                <option value="normal">Normal (45px)</option>
                <option value="large">Large (140px)</option>
            </select>
        </div>;
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
            height: this.props.height
        };
    }
});

Perseus.Widgets.register("orderer", Orderer);
Perseus.Widgets.register("orderer-editor", OrdererEditor);

})(Perseus);

