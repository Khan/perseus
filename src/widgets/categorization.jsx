/** @jsx React.DOM */
(function(Perseus) {

require("../core.js");
require("../renderer.jsx");

var InfoTip = require("../components/info-tip.jsx");
var Widgets = require("../widgets.js");

var defaultNumCategories = 2;

function removeFromArray(array, item) {
    var index = _.indexOf(array, item);
    if (index >= 0) {
        array.splice(index, 1);
    }
}

function coordsRelativeTo(coords, div) {
    return _.map(offsetToCoords($(div).offset()), function(offset, i) {
        return coords[i] - offset;
    });
}

function offsetToCoords(offset) {
    return [offset.left, offset.top];
}

function getMouseCoords(e) {
    if (_.has(e, "nativeEvent")) {
        e = e.nativeEvent;
    }
    return [e.pageX, e.pageY];
}

function offsetCoordsBy(coords, offset) {
    return _.map(coords, function(coord, i) {
        return coord - offset[i];
    });
}

function getDimensions($ele) {
    return [$ele.outerWidth(), $ele.outerHeight()];
}

function findDimensionsFor(root, ele) {
    var $ele = $(ele);
    var offset = offsetToCoords($ele.offset());
    return getAllCoordTypes(offset, $ele, root);
}

function withinBox(box, middle) {
    return _.every(middle, function(coord, i) {
        var c = box.topLeft[i];
        return c <= coord && coord <= c + box.dimensions[i];
    });
}

function getAllCoordTypes(coords, $ele, root) {
    var topLeft = coordsRelativeTo(coords, root);
    var dimensions = getDimensions($ele);
    return {
        dimensions: dimensions,
        topLeft: topLeft,
        middle: _.map(dimensions, function(dim, i) {
            return topLeft[i] + dim / 2;
        })
    };
}

function cloneMatrix(matrix) {
    return _.map(matrix, function(row) {
        return row.slice();
    });
}

function blankItem(position) {
    return {
        content: "",
        location: {
            category: 0,
            position: position || 0
        }
    };
}

function getDefaultProps() {
    var item = blankItem();
    return {
        isEditor: false,
        items: [item],
        correctLocations: [item.location],
        categoryHeaders: [""]
    };
}

function isBank(category) {
    return category === 0;
}

function nextPosition(items) {
    var item = _.max(items, function (item) {
        return item.location.position;
    });
    return item.location.position + 1;
}

function nextPositionCorrectLocations(correctLocations) {
    return _.max(_.pluck(correctLocations, "position")) + 1;
}

// This is adapted from the calculation in orderer.
// It gives an animation time that is distance dependent,
// based on the square root of the distance.
function dragReturnAnimationTime(fromCoords, toCoords) {
    var squareDistance = _.reduce(fromCoords, function(squareD, coord, i) {
        var diff = toCoords[i] - coord;
        return squareD + diff * diff;
    }, 0);
    var distance = Math.sqrt(squareDistance);
    return Math.max(15 * Math.sqrt(distance), 1);
}

var Categorization = React.createClass({
    getDefaultProps: getDefaultProps,

    getInitialState: function() {
        return {
            showDragHint: true,
            dragging: null
        };
    },

    getAllMouseCoordTypes: function(mouseCoords, $ele) {
        var offsetMouse = offsetCoordsBy(
                mouseCoords, this.state.dragging.offset);
        var c = getAllCoordTypes(offsetMouse, $ele, $(this.getDOMNode()));
        c.mouse = mouseCoords;
        return c;
    },

    getItems: function() {
        return _.map(this.props.items, function(item, index) {
            return _.extend({index: index}, item);
        });
    },

    startDrag: function(itemIndex, event) {
        var self = this;
        if (itemIndex == null || self.state.dragging) {
            return;
        }
        var items = self.getItems();
        var item = items[itemIndex];

        var cardDiv = $(event.target);
        while (!cardDiv.hasClass("card")) {
            cardDiv = cardDiv.parent();
        }
        var coords = getMouseCoords(event);
        var offset = coordsRelativeTo(coords, cardDiv);
        var root = $(self.getDOMNode());
        var categories = root.find(".categories .category");
        var findDims = _.partial(findDimensionsFor, root);
        self.categoryDimensions = _.map(categories, findDims);
        if (self.props.isEditor) {
            var deleteItem = root.find(".delete-item-area");
            self.deleteItemDimensions = findDimensionsFor(root, deleteItem);
        }

        self.setState({
            dragging: {
                itemIndex: itemIndex,
                offset: offset
            }
        }, _.bind(self.updateDrag, self, coords));

        $(document)
        .on("vmousemove.categorization", function(e) {
            self.updateDrag(getMouseCoords(e));
        })
        .on("vmouseup.categorization", function(e) {
            self.endDrag(getMouseCoords(e));
        });
    },

    findDrag: function() {
        return $(this.getDOMNode()).find(".card.dragging");
    },

    updateDrag: function(coords) {
        var self = this;
        var $drag = this.findDrag();

        var c = self.getAllMouseCoordTypes(coords, $drag);
        var middle = c.middle;
        $drag
            .css("left", c.topLeft[0])
            .css("top", c.topLeft[1]);
        var targetCategory = self.findTargetCategory(middle);
        self.setState({targetCategory: targetCategory});
    },

    findTargetCategory: function(middle) {
        var self = this;
        var categoryIndex;
        if (self.props.isEditor) {
            if (withinBox(self.deleteItemDimensions, middle)) {
                return "delete";
            }
        }
        var inCategory = _.find(self.categoryDimensions, function(col, index) {
            categoryIndex = index;
            return withinBox(col, middle);
        });

        // 0th category is bank
        if (!inCategory) {
            return 0;
        }

        // Therefore true categories get incremented indicies.
        return categoryIndex + 1;
    },

    endDrag: function(coords) {
        var self = this;
        var dragging = self.state.dragging;
        if (!dragging) {
            return;
        }
        var $drag = self.findDrag();
        var items = self.getItems();
        var itemIndex = dragging.itemIndex;
        var item = items[itemIndex];

        $(document)
            .off("vmousemove.categorization")
            .off("vmouseup.categorization");

        var c = self.getAllMouseCoordTypes(coords, $drag);
        var targetCategory = self.findTargetCategory(c.middle);

        if (targetCategory === "delete") {
            self.updateLocation(targetCategory);
            self.props.deleteItem(itemIndex);
            return;
        }

        var root = $(self.getDOMNode());
        var returnedToSame = false;
        if (_.isEqual(targetCategory, item.location.category)) {
            returnedToSame = true;
        }
        var slotClass;
        if (returnedToSame) {
            slotClass = ".card.placeholder";
        } else {
            slotClass = ".card-empty-slot";
        }
        var offsetTop = false;
        var slot = root.find(
                ".category-" + targetCategory + " " + slotClass);
        if (!returnedToSame) {
            if (!isBank(item.location.category) &&
                item.location.category < targetCategory) {
                offsetTop = true;
            }
        }
        var dims = findDimensionsFor(root, slot);
        var topLeft = {left: dims.topLeft[0], top: dims.topLeft[1]};
        if (offsetTop) {
            var placeholder = root.find(".category-" +
                    item.location.category + " .card.placeholder");
            var parentDims = getDimensions(placeholder.parent());
            topLeft.top -= parentDims[1];
        }
        var animationTime = dragReturnAnimationTime(
                c.topLeft, dims.topLeft);
        $drag.animate(topLeft, {
            duration: animationTime,
            complete: _.bind(self.updateLocation, self, targetCategory)
        });
    },

    updateLocation: function(targetCategory) {
        var self = this;
        var items = self.getItems();
        var itemIndex = self.state.dragging.itemIndex;
        var item = items[itemIndex];

        var change = {
            targetCategory: null,
            dragging: null
        };
        if (item.location.category !== targetCategory) {
            var position = nextPosition(items);
            item.location = {
                category: targetCategory,
                position: position
            };
            change.showDragHint = false;
            self.props.onChange({
                items: items
            });
        }
        self.setState(change);
    },

    render: function() {
        var self = this;
        var items = self.getItems();
        var targetCategory = self.state.targetCategory;
        var dragging = self.state.dragging;
        var isEditor = self.props.isEditor;

        var dragItem;
        if (dragging) {
            dragItem = CategoryItem({
                isDragItem: true,
                item: dragging ? items[dragging.itemIndex] : null,
                isEditor: this.props.isEditor
            });
        }

        // bank
        var bank = <div className="bank">
            <Category
                ref="bank"
                category={0}
                items={items}
                isEditor={isEditor}
                targetCategory={targetCategory}
                dragging={dragging}
                onChangeContent={self.props.onChangeContent}
                startDrag={self.startDrag}
                />
        </div>;

        var deleteItem;
        if (isEditor) {
            var deleteItemClass = "delete-item-area";
            if (targetCategory === "delete") {
                deleteItemClass += " target";
            }
            deleteItem = <div className={deleteItemClass}>
                <span className="icon-trash"></span>
            </div>;
        }

        // categories
        var categories = <div className="categories clearfix">{
            _.map(self.props.categoryHeaders, function(header, c) {
                var category = c + 1;
                return <Category
                            ref={"category-" + category}
                            category={category}
                            key={category}
                            categoryHeader={header}
                            isEditor={isEditor}
                            items={items}
                            isTarget={targetCategory === category}
                            dragging={dragging}
                            showDragHint={self.state.showDragHint}
                            onChangeContent={self.props.onChangeContent}
                            onChangeHeader={self.props.onChangeHeader}
                            removeCategory={self.props.removeCategory}
                            startDrag={self.startDrag}
                            />;
            })
        }</div>;

        // container
        var containerName = "draggy-boxy-thing categorization-container" +
                            " clearfix";
        if (isEditor) {
            containerName += " categorization-container-editor";
        }
        if (dragging) {
            containerName += " currently-dragging";
        }

        return <div className={containerName}>
            {dragItem}
            {bank}
            {categories}
            {deleteItem}
        </div>;
    },

    toJSON: function() {
        var items = _.map(this.props.items, function (item) {
            return _.pick(item, "location");
        });
        return {items: items};
    },

    simpleValidate: function(rubric) {
        return Categorization.validate(this.toJSON(), rubric);
    },

    focusAddedItem: function() {
        this.refs.bank.focusAddedItem();
    },

    focusAddedCategory: function() {
        var category = this.props.categoryHeaders.length;
        this.refs["category-" + category].focus();
    },
});

_.extend(Categorization, {
    validate: function(state, rubric) {
        var started = false;
        var allCorrect = true;
        _.each(state.items, function(item, i) {
            var correctLocation = rubric.correctLocations[i];
            var loc = item.location;
            if (!isBank(loc.category)) {
                started = true;
            }
            if (loc.category !== correctLocation.category) {
                allCorrect = false;
            }
        });
        if (!started) {
            return {
                type: "invalid",
                message: "At least one item must be categorized."
            };
        }
        return {
            type: "points",
            earned: allCorrect ? 1 : 0,
            total: 1,
            message: null
        };
    }
});

var Category = React.createClass({

    renderCategoryItem: function(item, options) {
        var dragging = this.props.dragging;
        if (dragging && dragging.itemIndex === item.index) {
            return <PlaceholderItem item={item} />;
        }
        var key = "category-item-" + item.index;
        return CategoryItem({
            ref: key,
            key: key,
            item: item,
            isEditor: this.props.isEditor,
            onMouseDown: _.partial(this.props.startDrag, item.index),
            onChange: _.partial(this.props.onChangeContent, item.index)
        });
    },

    getDefaultProps: function() {
        return {
            isEditor: false,
            showDragHint: false,
            categoryHeader: null
        };
    },

    categoryItems: function() {
        var self = this;
        var colItems = _.filter(self.props.items, function(item) {
            return item.location.category === self.props.category;
        });
        return _.sortBy(colItems, function(item) {
            return item.location.position;
        });
    },

    render: function() {
        var self = this;
        var category = self.props.category;
        var items = self.categoryItems();

        var cardList = <ul className="clearfix">
            {_.map(items, self.renderCategoryItem, self)}
            {self.props.showDragHint ? <DragHintItem /> : <InvisibleItem />}
        </ul>;

        var header = self.renderHeader();

        // container class
        var className = "category clearfix category-" + category;
        if (self.props.isTarget) {
            className += " target";
        } else if (self.props.dragging) {
            className += " non-target";
        }

        var listClass = "cards-list";
        if (!isBank(category)) {
            listClass += " cards-area";
        }

        return <div className={className}>
            <div className={listClass}>
                {header}
                {cardList}
            </div>
        </div>;
    },

    renderHeader: function() {
        var self = this;
        if (isBank(self.props.category)) {
            return null;
        }
        var header;
        if (self.props.isEditor) {
            var onChangeHeader = function(e) {
                var header = self.refs.header;
                var value = header.getDOMNode().value;
                self.props.onChangeHeader(self.props.category, value);
            };
            var removeCategory = _.partial(
                    self.props.removeCategory, self.props.category);

            header = <div>
                <div
                        className="remove"
                        onClick={removeCategory}>
                    <span className="icon-remove"></span>
                </div>
                <input
                        ref="header"
                        type="text"
                        onChange={onChangeHeader}
                        value={self.props.categoryHeader}
                        />
            </div>;
        } else {
            header = Perseus.Renderer({
                content: self.props.categoryHeader
            });
        }
        return <div className="header">{header}</div>;
    },

    focus: function() {
        this.refs.header.getDOMNode().focus();
    },

    focusAddedItem: function() {
        var length = this.props.items.length;
        if (length) {
            var item = this.props.items[length - 1];
            var ref = this.refs["category-item-" + item.index];
            if (ref) {
                ref.focus();
            }
        }
    },
});

var PlaceholderItem = React.createClass({
    render: function() {
        return <li className="card-container">
            <div className="card placeholder">
                {Perseus.Renderer({content: this.props.item.content})}
            </div>
        </li>;
    }
});

var DragHintItem = React.createClass({
    render: function() {
        return <li className="card-container">
            <div className="card card-empty-slot drag-hint"></div>
        </li>;
    }
});

var InvisibleItem = React.createClass({
    render: function() {
        return <li className="card-container">
            <div className="card card-empty-slot card-hidden"></div>
        </li>;
    }
});

var CategoryItem = React.createClass({
    getDefaultProps: function() {
        return {
            onChange: function() {},
            onMouseDown: function() {},
            isEditor: false
        };
    },

    render: function() {
        var self = this;
        var item = self.props.item;
        var content = item.content;
        var isEditor = self.props.isEditor;
        var onChange = function(e) {
            self.props.onChange(self.refs.editor.getDOMNode().value);
        };
        var onMouseDown = function(e) {
            if (isEditor) {
                if (e.target.tagName === "TEXTAREA") {
                    return;
                }
            }
            self.props.onMouseDown(e);
            e.preventDefault();
        };

        var className = "card";
        if (self.props.isDragItem) {
            className += " dragging";
        }

        var inner;
        if (isEditor) {
            var mouseDownEditor = function(e) {
                e.stopPropagation();
            };
            inner = <div
                    className={className + " card-editor"}
                    onMouseDown={onMouseDown}>
                <div className="drag-bar">
                    <span className="icon-reorder"></span>
                </div>
                <input
                        ref="editor"
                        type="text"
                        onChange={onChange}
                        onMouseDown={mouseDownEditor}
                        value={content}
                        />
            </div>;
        } else {
            inner = <div
                className={className}
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
            >{Perseus.Renderer({content: content})}</div>;
        }

        if (self.props.isDragItem) {
            return inner;
        }
        return <li className="card-container">
            {inner}
        </li>;
    },

    focus: function() {
        this.refs.editor.getDOMNode().focus();
    },
});

var CategorizationEditor = React.createClass({
    getDefaultProps: getDefaultProps,

    render: function() {
        var self = this;
        var correctLocations = self.props.correctLocations;
        var items = _.map(self.props.items, function(item, index) {
            return {
                content: item.content,
                location: correctLocations[index]
            };
        });
        return <div>
            <InfoTip>
              <p>The number of cards and categories is unlimited, but we
              recommend a max of five cards and three categories to prevent the
              question from running off the screen.</p>

              <p>For the correct answer, move the cards into the correct
              categories in the question area on the left side of the
              screen.</p>
            </InfoTip>
            <div className="categorization-editor-area">
                <div className="add-item">
                    <button onClick={self.addItem}>
                        {' '}Add an item{' '}
                    </button>
                </div>
                <div className="add-category">
                    <button onClick={self.onAddCategory}>
                        {' '}Add a category{' '}
                    </button>
                </div>
            </div>
            <Categorization
                ref="categorization"
                items={items}
                categoryHeaders={self.props.categoryHeaders}
                isEditor={true}
                removeCategory={self.removeCategory}
                onChangeHeader={self.onChangeHeader}
                onChangeContent={self.onChangeContent}
                deleteItem={self.deleteItem}
                onChange={function(rawNewProps) {
                    var newProps = _.clone(rawNewProps);
                    if (rawNewProps.items) {
                        newProps.correctLocations = _.pluck(
                                newProps.items, "location");
                    }
                    self.props.onChange(newProps);
                }}
                />
        </div>;
    },

    onAddCategory: function(e) {
        var headers = this.props.categoryHeaders.slice();
        headers.push("");
        this.props.onChange({
            categoryHeaders: headers
        }, this.refs.categorization.focusAddedCategory);
    },

    removeCategory: function(category) {
        var correctLocations = this.props.correctLocations;
        var headers = this.props.categoryHeaders.slice();
        var position = nextPositionCorrectLocations(correctLocations);
        correctLocations = _.map(correctLocations, function(loc) {
            if (loc.category === category) {
                position += 1;
                return {category: 0, position: position};
            } else if (loc.category > category) {
                loc = _.clone(loc);
                loc.category = loc.category - 1;
                return loc;
            } else {
                return loc;
            }
        });
        headers.splice(category - 1, 1);
        this.props.onChange({
            categoryHeaders: headers,
            correctLocations: correctLocations
        });
    },

    addItem: function() {
        var items = this.props.items.slice();
        var correctLocations = this.props.correctLocations.slice();
        var position = nextPositionCorrectLocations(correctLocations);
        var item = blankItem(position);
        items.push(item);
        correctLocations.push(item.location);
        this.props.onChange({
            items: items,
            correctLocations: correctLocations
        }, this.refs.categorization.focusAddedItem);
    },

    deleteItem: function(removeIndex) {
        var items = this.props.items.slice();
        var correctLocations = this.props.correctLocations.slice();
        items.splice(removeIndex, 1);
        correctLocations.splice(removeIndex, 1);
        this.props.onChange({
            items: items,
            correctLocations: correctLocations
        });
    },

    onChangeContent: function(itemIndex, content) {
        if (itemIndex == null) {
            return;
        }
        var items = this.props.items.slice();
        items[itemIndex] = _.extend({}, items[itemIndex], {content: content});
        this.props.onChange({items: items});
    },

    onChangeHeader: function(category, content) {
        var headers = this.props.categoryHeaders.slice();
        headers[category - 1] = content;
        this.props.onChange({categoryHeaders: headers});
    },

    focus: function() {
        this.refs.categorization.focusAddedItem();
    },

    toJSON: function() {
        var json = _.pick(this.props, "items", "correctLocations",
                          "categoryHeaders");
        json.items = _.map(json.items, function(item, index) {
            item = _.clone(item);
            delete item.index;
            item.location = {category: 0, position: index};
            return item;
        });
        return json;
    }
});

Widgets.register("categorization", Categorization);
Widgets.register("categorization-editor", CategorizationEditor);

})(Perseus);
