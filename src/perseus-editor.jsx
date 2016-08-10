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
    RichUtils,
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
const Widgets = require('./widgets.js');
const DraftUtils = require('./draft-utils.js');


// TODO(samiskin): Figure out whats the best value for this number
// 100 is best for my typing speed, but may not work as well for slower typists
const UPDATE_PARENT_THROTTLE = 100;

const widgetPlaceholder = '[[\u2603 {id}]]';
const widgetRegExp = /\[\[\u2603 [a-z-]+ [0-9]+\]\]/g;
const widgetPartsRegExp = /^\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]$/;
const widgetForId = (id) => new RegExp(`(\\[\\[\u2603 ${id}\\]\\])`, 'gm');

/*
    Styled ranges in Draft.js are done using a `CompositeDecorator`,
    where a `strategy` is given to denote what ranges of text to style,
    and a `component` is given to denote how that range should be rendered
*/
const widgetStrategy = (contentBlock, callback) =>
    DraftUtils.regexStrategy(contentBlock, widgetRegExp, callback);

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
        imageUploader: React.PropTypes.func,
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

    // By turning widgets into Entities, we allow for widgets to be considered
    // "IMMUTABLE", that is, backspacing a widget will delete the entire text
    // rather than just a "]" character.  It also enables us to detect which
    // widget id has been deleted, as metadata can be attached to entities
    _insertWidgetsAsEntities(editorState, widgets) {
        let content = editorState.getCurrentContent();

        Object.keys(widgets).forEach((id) => {
            const selection = DraftUtils.findPattern(content, widgetForId(id));
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

    _getCurrent() {
        const editorState = this.state.editorState;
        const contentState = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        return {editorState, contentState, selection};
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

        const {editorState, contentState, selection} = this._getCurrent();
        const text = widgetPlaceholder.replace("{id}", id);
        const newEditorState = EditorState.push(
            editorState,
            DraftUtils.replaceSelection(contentState, selection, text, entity),
            'insert-characters'
        );

        this.handleChange({editorState: newEditorState, widgets}, callback);
    },

    updateWidget(id, newProps) {
        this.setState({widgets: {...this.state.widgets, [id]: newProps}});
    },

    // This function only removes the widget from the content, and then
    // handleUpdate handles removing widgets from the state, as widgets
    // can also be deleted by editor actions such as backspace and delete
    removeWidget(id, callback) {
        const {editorState, contentState} = this._getCurrent();
        const selection = DraftUtils.findPattern(contentState, widgetForId(id));
        const newEditorState =
            EditorState.push(
                editorState,
                DraftUtils.deleteSelection(contentState, selection),
                'delete-word'
            );

        this.handleChange({editorState: newEditorState}, callback);
    },

    handleCopy() {
        const {contentState, selection} = this._getCurrent();
        const entities = DraftUtils.getEntities(contentState, selection);

        const copiedWidgets = entities.reduce((map, entity) => {
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

        const sourceWidgets = JSON.parse(sourceWidgetsJSON);
        const widgets = {...this.state.widgets};
        const safeWidgetMapping = this.createSafeWidgetMapping(sourceWidgets, widgets); //eslint-disable-line max-len
        const charData = CharacterMetadata.create();

        // textToFragment takes a sanitizer function which gets ran on every
        // line.  It is used here in order to fix the new widgets to not
        // have conflicting IDs, as well as fill in the widget data
        const sanitizeText = (textLine) => {
            const sanitized = textLine.replace(new RegExp('\r', 'g'), ''); //eslint-disable-line no-control-regex
            const characterList = Array(sanitized.length).fill(charData);
            const safeText = sanitized.replace(widgetRegExp, (syntax) => {
                const match = widgetPartsRegExp.exec(syntax);
                const fullText = match[0]; // The entire [[ widgetName id ]]
                const widget = match[1]; // Just the "widgetName id" part
                const index = match.index;
                const newId = safeWidgetMapping[widget];
                const newText = widgetPlaceholder.replace("{id}", newId);

                // Create an entity for the new widget, and assign it to the
                // characters that match up to the new widget text (splice)
                const entity = Entity.create('WIDGET', 'IMMUTABLE', {id: newId}); //eslint-disable-line max-len
                const entityChar = CharacterMetadata.applyEntity(charData, entity); //eslint-disable-line max-len
                const entityChars = Array(newText.length).fill(entityChar);
                characterList.splice(index, fullText.length, ...entityChars);

                widgets[newId] = sourceWidgets[widget];
                return fullText.replace(widget, newId);
            });
            return {text: safeText, characterList};
        };

        const {contentState, selection} = this._getCurrent();
        const newContentState = DraftUtils.insertText(
            contentState,
            selection,
            pastedText,
            sanitizeText
        );

        const newEditorState = EditorState.push(
            this.state.editorState,
            newContentState,
            'insert-fragment'
        );
        this.handleChange({editorState: newEditorState, widgets});
        return true; // True means draft doesn't run its default behavior
    },

    handleDrop(selection, dataTransfer) {
        let textToInsert = "";

        const imageUrl = dataTransfer.getLink();
        if (imageUrl) {
            textToInsert = `\n\n![](${imageUrl})`;
        } else {
            textToInsert = dataTransfer.getText();
        }
        // Adds new lines and collapses the selection
        const contentState = this.state.editorState.getCurrentContent();
        const newContent = DraftUtils.insertTextAtEndOfBlock(
            contentState, selection, textToInsert
        );
        const editorState = EditorState.push(
            this.state.editorState,
            newContent,
            'insert-fragment'
        );
        this.handleChange({editorState});
        return true; // Disable default draft drop handler
    },

    handleDroppedFiles(selection, files) {
        // const images = files.filter(file => file.type.match('image.*'));
        // images.forEach(image => {
        //     const id = genKey();
        //     const entity = Entity.create('TEMP_IMAGE', 'IMMUTABLE', {id});

        // });
        return true;
    },

    updateParent(content, widgets) {
        // The parent component should know of only the active widgets,
        // however the widgets are not deleted from this.state because a
        // user undoing a widget deletion should also recover the
        // widget's metadata
        const currEntities = DraftUtils.getEntities(content);
        const currWidgets = currEntities.reduce((map, entity) => {
            const id = entity.getData().id;
            map[id] = widgets[id];
            return map;
        }, {});

        // Provide the parent component with the current text
        // representation, as well as the current active widgets
        this.props.onChange({
            content: content.getPlainText('\n'),
            widgets: currWidgets,
        });
    },

    pastContentState: null,
    lastIdleCallback: null,
    handleChange(newState, callback) {
        const state = {...this.state, ...newState};
        const {editorState, widgets} = state;
        const newContent = editorState.getCurrentContent();

        // This ensures that unless the content stops changing for a certain
        // short duration, no processing will be done to update the parent.
        // This allows the editing to remain performant for large files,
        // as basic tasks only occur on individual ContentBlocks, while
        // updating the parent involves iterating through them all
        if (newContent !== this.pastContentState) {
            clearTimeout(this.lastIdleCallback);
            this.lastIdleCallback = setTimeout(
                () => this.updateParent(newContent, widgets),
                UPDATE_PARENT_THROTTLE
            );
        }

        this.pastContentState = newContent;
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
                handleDroppedFiles={this.handleDroppedFiles}
                handleDrop={this.handleDrop}
            />
        </div>;
    },
});

module.exports = PerseusEditor;
