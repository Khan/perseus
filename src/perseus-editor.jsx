/* eslint-disable react/jsx-sort-prop-types */

/*
This is essentially a more advanced `textarea`, using Draft.js
https://facebook.github.io/draft-js/

The important Draft.js concepts needed to understand this file are:
    - Everything is immutable, and inputs all result in a new `editorState`
      object being passed to `handleChange`.  All changes must be done by
      constructing new objects.  This means simply editing text involves
      creating a new ContentState, which is used to create a new EditorState
    - `EditorState` contains a `ContentState` property which contains the data
      relevant to the text content
    - `ContentState` is organized into individual "Blocks", which helps with
      performance as updates only affect a single block
    - Specific text in blocks can be denoted as "Entities", which can store
      data relevant to its text.  This is what allows backspacing a widget
      to result in its deletion in Perseus
    - Special styling is done using Decorators, which allow substituting text
      content with a custom react element
    - Modifier is a collection of helpful utilities for modification purposes

TODO(samiskin): Make tasks such as "addWidget" and "updateWidget" not functions
                that you call on the PerseusEditor component (Can do once this
                fully replacess the old editor).
*/

const React = require('react');
const {
    CharacterMetadata,
    BlockMapBuilder,
    ContentBlock,
    Entity,
    Editor,
    EditorState,
    CompositeDecorator,
    ContentState,
    Modifier,
    SelectionState,
    convertToRaw,
    genKey,
} = require('draft-js');
const {List} = require('immutable');
const Widgets = require("./widgets.js");

const NEWLINE_REGEX = /\r\n?|\n/g;

const widgetPlaceholder = "[[\u2603 {id}]]";
const widgetRegExpTemplate = "(\\[\\[\u2603 {id}\\]\\])";
const widgetRegExp = /\[\[\u2603 [a-z-]+ [0-9]+\]\]/g;
const widgetPartsRegExp = /^\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]$/;

/*
    Styled ranges in Draft.js are done using a `CompositeDecorator`,
    where a `strategy` is given to denote what ranges of text to style,
    and a `component` is given to denote how that range should be rendered
*/
const findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr;
    let start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
};

const widgetStrategy = (contentBlock, callback) =>
    findWithRegex(widgetRegExp, contentBlock, callback);

const WidgetSpan = React.createClass({
    propTypes: {children: React.PropTypes.any},
    render() {
        return <span {...this.props} style={{backgroundColor: '#DFD'}}>
            {this.props.children}
        </span>;
    },
});

const decorator = new CompositeDecorator([{
    strategy: widgetStrategy,
    component: WidgetSpan,
}]);


const PerseusEditor = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
        initialContent: React.PropTypes.string,
        initialWidgets: React.PropTypes.any,
        placeholder: React.PropTypes.string,
    },

    getDefaultProps: () => ({
        onChange: () => {},
        initialContent: '',
        initialWidgets: {},
        placeholder: 'Type here',
    }),

    getInitialState() {
        const {initialContent, initialWidgets} = this.props;
        const content = ContentState.createFromText(initialContent);
        const editorState =
            this._insertWidgetsAsEntities(
                EditorState.createWithContent(content, decorator),
               initialWidgets
            );
        return {
            editorState,
            widgets: initialWidgets,
        };
    },

    // By delimiting widgets as Entities, this allows for widgets to be
    // considered "IMMUTABLE", that is, backspacing a widget will delete the
    // entire text rather than just a "]" character.  It also enables us
    // to detect which widget id has been deleted, as metadata can be attached
    // to entities
    _insertWidgetsAsEntities(editorState, widgets) {
        let content = editorState.getCurrentContent();

        Object.keys(widgets).forEach((id) => {
            const selection = this._findWidget(content, id);
            const entity = Entity.create('WIDGET', 'IMMUTABLE', {id});
            content = Modifier.applyEntity(content, selection, entity);
        });

        // The third parameter allows the editor to know what should be done
        // during undo/redo.  An "apply-entity" action should not be added to
        // the undo stack, however an "insert-characters" action should
        const withEntity =
            EditorState.push(editorState, content, 'apply-entity');

        // Applying entity causes it to be selected, so we reset the selection
        const firstBlock = withEntity.getCurrentContent().getFirstBlock();
        const withNoSelection = EditorState.forceSelection(
            withEntity,
            SelectionState.createEmpty(firstBlock)
        );
        return withNoSelection;
    },

    _findWidget(contentState, id) {
        // The entire content is organized into blocks, and so each one must be
        // searched in order to find every widget
        const blocks = contentState.getBlockMap().values();
        const re  = new RegExp(widgetRegExpTemplate.replace('{id}', id), 'gm');
        for (const block of blocks) {
            const match = re.exec(block.getText());
            if (match !== null) {
                const base = SelectionState.createEmpty(block.getKey());
                const selection = base.merge({
                    anchorOffset: match.index,
                    focusOffset: match.index + match[0].length,
                });
                return selection;
            }
        }
    },

    addWidget(widgetType, callback) {
        const currWidgets = this.state.widgets;

        // Since widgets are given IDs, adding a new widget must ensure that a
        // unique id is generated for it.
        const widgetNum =
            Object.keys(currWidgets)
            .filter(id => currWidgets[id].type === widgetType)
            .map(id => +id.split(" ")[1]) //ids are (([a-z-]+) ([0-9]+))
            .reduce((maxId, currId) => Math.max(maxId, currId), 0);
        const id = widgetType + " " + (widgetNum + 1);
        const widgetContent = widgetPlaceholder.replace("{id}", id);
        const widget = {
            options: Widgets.getEditor(widgetType).defaultProps,
            type: widgetType,
            // Track widget version on creation, so that a widget editor
            // without a valid version prop can only possibly refer to a
            // pre-versioning creation time.
            version: Widgets.getVersion(widgetType),
        };
        const widgets = {...currWidgets, [id]: widget};

        // Text for the widget is inserted, and an entity is assigned
        const entity = Entity.create('WIDGET', 'IMMUTABLE', {id});
        const currEditorState = this.state.editorState;
        const contentState = Modifier.replaceText(
            currEditorState.getCurrentContent(),
            currEditorState.getSelection(),
            widgetContent,
            null, // This is for custom styling, but we use a Decorator instead
            entity
        );
        const editorState = EditorState.push(
            currEditorState,
            contentState,
            'insert-characters'
        );

        this.handleChange({editorState, widgets}, callback);
    },

    updateWidget(id, newProps) {
        this.setState({widgets: {...this.state.widgets, [id]: newProps}});
    },

    // This function only removes the widget from the content, and then
    // handleUpdate handles removing widgets from the state, as widgets
    // can also be deleted by editor actions such as backspace and delete
    removeWidget(id, callback) {
        const currEditorState = this.state.editorState;
        const currContentState = currEditorState.getCurrentContent();
        const selection = this._findWidget(currContentState, id);

        const contentState = Modifier.removeRange(
            currContentState,
            selection,
            'backward'
        );
        const editorState = EditorState.push(
            currEditorState,
            contentState,
            'delete-word'
        );

        this.handleChange({editorState}, callback);
    },

    _getWidgetEntities(blockMap, filter = () => true) {
        const entities = [];
        blockMap.forEach((block, blockKey) => {
            block.findEntityRanges(
                char => char.getEntity() !== null,
                (start, end) => {
                    if (filter(blockKey, start, end)) {
                        entities.push(Entity.get(block.getEntityAt(start)));
                    }
                }
            );
        });
        return entities;
    },


    handleCopy() {
        const blocks = [];
        const contentState = this.state.editorState.getCurrentContent();
        const selection = this.state.editorState.getSelection();
        const pastEndKey = contentState.getKeyAfter(selection.getEndKey());
        for (let blockKey = selection.getStartKey();
                blockKey !== pastEndKey;
                blockKey = contentState.getKeyAfter(blockKey)) {
            blocks.push(contentState.getBlockForKey(blockKey));
        }

        const blockMap = BlockMapBuilder.createFromArray(blocks);
        const widgetEntities = this._getWidgetEntities(blockMap, (key, start, end) => {
            if (key === selection.getStartKey() && start < selection.getStartOffset()) {
                return false;
            }
            if (key === selection.getEndKey() && end > selection.getEndOffset()) {
                return false;
            }
            return true;
        });


        const copiedWidgets = widgetEntities.reduce((map, entity) => {
            const id = entity.getData().id;
            map[id] = this.state.widgets[id];
            return map;
        }, {});

        localStorage.perseusLastCopiedWidgets = JSON.stringify(copiedWidgets);
    },

    // Widgets cannot have ID conflicts, therefore this function exists
    // to return a mapping of { new id -> safe id }
    createSafeWidgetMapping(newWidgets, currentWidgets) {

        // Create a mapping of { type -> largest id of that type }
        const maxIds = Object.keys(currentWidgets).reduce((idMap, widget) => {
            const [type, id] = widget.split(' ');
            idMap[type] = idMap[type] ? Math.max(idMap[type], +id) : +id;
            return idMap;
        }, {});

        const safeWidgetMapping =
            Object.keys(newWidgets).reduce((safeMap, widget) => {
                const type = widget.split(' ')[0];
                maxIds[type] = maxIds[type] ? maxIds[type] + 1 : 1;
                safeMap[widget] = type + ' ' + maxIds[type];
                return safeMap;
            }, {});

        return safeWidgetMapping;
    },

    // Pasting text from another Perseus editor instance should also copy over
    // the widgets.  To do this properly, we must parse the text, replace the
    // widget ids with non-conflicting ones, store them, and also assign them
    // proper entities.  Sadly Draft.js only supports `handlePastedText` which
    // happens prior to the new content state being generated (which is needed
    // to add entities to).  We therefore must reimplement the default Paste
    // functionality, in order to add our custom steps afterwards
    handlePaste(pastedText, html) {

        // If no widgets are in localstorage, just use default behavior
        const sourceWidgetsJSON = localStorage.perseusLastCopiedWidgets;
        if (!sourceWidgetsJSON) {
            return false;
        }

        // To insert text such that it will appear as multiple blocks,
        // createFragment must be used.  A fragment is an ordered map of
        // ContentBlocks.  There should be a ContentBlock for each paragraph
        const textLines = pastedText.split(NEWLINE_REGEX);

        // Without basic character data, the text appears blank
        const charData = CharacterMetadata.create();

        const sourceWidgets = JSON.parse(sourceWidgetsJSON);
        const widgets = {...this.state.widgets};
        const safeWidgetMapping = this.createSafeWidgetMapping(sourceWidgets, widgets);

        // Create an array of ContentBlock objects, one for each line
        const contentBlocks = textLines.map((textLine) => {
            const sanitized = textLine.replace(new RegExp('\r', 'g'), ''); //eslint-disable-line

            // Styles and entities in draft.js are applied per character, therefore each
            // block uses a list, where each element corresponds to a single character.
            // To apply a widget entity
            const characterList = Array(sanitized.length).fill(charData);

            const safeText = sanitized.replace(widgetRegExp, (syntax) => {
                const match = widgetPartsRegExp.exec(syntax);
                const widgetText = match[0]; // The entire [[ widgetName id ]]
                const widget = match[1]; // Just the "widgetName id" part
                const newWidget = safeWidgetMapping[widget];

                // Create an entity for the new widget, and assign it to the characters
                // that match up to the new widget text (splice)
                const entity = Entity.create('WIDGET', 'IMMUTABLE', {id: newWidget});
                const entityChar = CharacterMetadata.applyEntity(charData, entity);
                const entityChars = Array(widgetText.length).fill(entityChar);
                characterList.splice(match.index, widgetText.length, ...entityChars);

                widgets[newWidget] = sourceWidgets[widget];
                return widgetText.replace(widget, newWidget);
            });
            return new ContentBlock({
                key: genKey(),
                text: safeText,
                type: 'unstyled',
                characterList: List(characterList),
            });
        });
        const fragment = BlockMapBuilder.createFromArray(contentBlocks);

        const currentState = this.state.editorState;
        const newContent = Modifier.replaceWithFragment(
            currentState.getCurrentContent(),
            currentState.getSelection(),
            fragment
        );
        const editorState = EditorState.push(
            currentState,
            newContent,
            'insert-fragment'
        );
        this.handleChange({editorState, widgets});
        return true; // True means draft doesn't run its default behavior
    },

    pastContentState: null,
    pastWidgets: new Set(),

    handleChange(newState, callback) {
        const state = {...this.state, ...newState};
        const {editorState, widgets} = state;
        const currContent = editorState.getCurrentContent();

        // Tasks for when the text content has changed, not just the selection
        if (currContent !== this.pastContentState) {
            // The parent component should be notified of the widget deletion,
            // however the widgets are not deleted from this.state because a
            // user undoing a widget deletion should also recover the
            // widget's metadata
            const newWidgets = {...widgets};
            const entities = this._getWidgetEntities(currContent.getBlockMap());
            const currIds = new Set(
                entities.map(entity => entity.getData().id)
            );
            this.pastWidgets.forEach(id => {
                if (!currIds.has(id)) {
                    delete newWidgets[id];
                }
            });

            this.pastWidgets = currIds;

            // Provide the parent component with the current text
            // representation, as well as the current active widgets
            this.props.onChange({
                content: currContent.getPlainText('\n'),
                widgets: newWidgets,
            });
        }

        this.pastContentState = currContent;
        this.setState({editorState, widgets}, callback);
    },

    focus() {
        this.refs.editor.focus();
    },

    render() {
        // STOPSHIP(samiskin): Delete this before landing
        console.log(convertToRaw(this.state.editorState.getCurrentContent())); // eslint-disable-line
        return <div onCopy={this.handleCopy}>
            <Editor
                ref="editor"
                editorState={this.state.editorState}
                onChange={(editorState) => this.handleChange({editorState})}
                spellCheck={true}
                stripPastedStyles={true}
                placeholder={this.props.placeholder}
                handlePastedText={this.handlePaste}
            />
        </div>;
    },
});

module.exports = PerseusEditor;
