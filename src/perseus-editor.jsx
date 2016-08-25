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
    Entity,
    Editor,
    EditorState,
    CompositeDecorator,
    ContentState,
    Modifier,
    genKey,
    getDefaultKeyBinding,
    KeyBindingUtil,
} = require('draft-js');
const Widgets = require('./widgets.js');
const DraftUtils = require('./draft-utils.js');


// This controls the minimum time between when updates for the parent
// component are generated.  The best time for this number sort of depends
// on the user's typing speed though, as if the time between each letter being
// typed is longer than the throttle, they would notice a freeze when the update
// is being calculated.
// TODO(samiskin): Figure out whats the best value for this number
// 100 is best for my typing speed, but may not work as well for slower typists
const UPDATE_PARENT_THROTTLE = 100;

const widgetPlaceholder = '[[\u2603 {id}]]';
const widgetRegExp = /\[\[\u2603 [a-z-]+ [0-9]+\]\]/g;
const widgetPartsRegExp = /^\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]$/;
const widgetRegexForId = (id) => new RegExp(`(\\[\\[\u2603 ${id}\\]\\])`, 'gm');
const partialWidgetRegex = /\[\[([a-z-]+)$/; // Used for autocompletion

const imageRegExp = /!\[[^]*]*?\]\([^)*].*?\)/g;

// Note: Nested decorators currently do not work, therefore this will not
//       work when nesting bold/italics/underline.  Hopefully this is
//       fixed in future versions of Draft.js
const boldRegExp = /\*\*([\s\S]+?)\*\*(?!\*)/g;
const italicsRegExp = /\**(?:^|[^*])(\*(\w+(\s\w+)*)\*)/g; // copied from https://github.com/ayberkt/RFMarkdownTextView/blob/387312e602f03b87f3ef82dc82c62df455d6fd30/RFMarkdownTextView/RFMarkdownSyntaxStorage.m  eslint-disable-line max-len
const boldItalicsRegExp = /(\*\*\*\w+(\s\w+)*\*\*\*)/g;
const underlineRegExp = /__([\s\S]+?)__(?!_)/g;
const headerRegExp = /^ *(#{1,6})([^\n]+)$/g;

/*
    Styled ranges in Draft.js are done using a `CompositeDecorator`,
    where a `strategy` is given to denote what ranges of text to style,
    and a `component` is given to denote how that range should be rendered
*/
const entityStrategy = (contentBlock, callback, type) =>
    contentBlock.findEntityRanges(
        char => char.getEntity()
                && Entity.get(char.getEntity()).type === type,
        callback
    );

const styledBlock = (props, style) =>
        <span {...props} style={style}>
            {props.children}
        </span>;
styledBlock.propTypes = {children: React.PropTypes.any};

const highlightedBlock =
    (props, backgroundColor) => styledBlock(props, {backgroundColor});


const entityColorDecorator = (type, color) => ({
    strategy: (...args) => entityStrategy(...args, type),
    component: (props) => highlightedBlock(props, color),
});

const regexColorDecorator = (regex, color) => ({
    strategy: (...args) => DraftUtils.regexStrategy(...args, regex),
    component: (props) => highlightedBlock(props, color),
});

const boldDecorator = {
    strategy: (...args) => DraftUtils.regexStrategy(...args, boldRegExp),
    component: (props) => styledBlock(props, {fontWeight: 'bold'}),
};


// The italics regex has a group that ensures that the *___* block
// does not include the * used to create a list.  Since this results
// in match.index also including the first non-capturing group, we must
// use custom logic for this strategy
const italicsStrategy = (...args) => {
    return DraftUtils.regexStrategy(
        ...args,
        italicsRegExp,
        (matchArr) => {
            const start = matchArr.index
                          + matchArr[0].length
                          - matchArr[1].length;
            const end = start + matchArr[1].length;
            return {start, end};
        }
    );
};
const italicsDecorator = {
    strategy: italicsStrategy,
    component: (props) => styledBlock(props, {fontStyle: 'italic'}),
};

const underlineDecorator = {
    strategy: (...args) => DraftUtils.regexStrategy(...args, underlineRegExp),
    component: (props) => styledBlock(props, {textDecoration: 'underline'}),
};

const boldItalicsDecorator = {
    strategy: (...args) => DraftUtils.regexStrategy(...args, boldItalicsRegExp),
    component: (props) => styledBlock(props, {
        fontWeight: 'bold',
        fontStyle: 'italic',
    }),
};


// TODO: Make the headers also able to scale with the rest of the text
// when changing the fontSize percentage
const headerComponent = (props) => {
    const text = props.decoratedText;
    const headerSize = text.split(headerRegExp)[1].length;
    const style = {marginBottom: 0};
    return React.createElement(`h${headerSize}`, {style}, props.children);
};
headerComponent.propTypes = {
    decoratedText: React.PropTypes.string,
    children: React.PropTypes.any,
};

const headerDecorator = {
    strategy: (...args) => DraftUtils.regexStrategy(...args, headerRegExp),
    component: headerComponent,
};

const decorator = new CompositeDecorator([
    entityColorDecorator('WIDGET', '#DFD'),
    entityColorDecorator('TEMP_IMAGE', '#fdffdd'),
    regexColorDecorator(imageRegExp, '#dffdfa'),
    boldItalicsDecorator,
    boldDecorator,
    italicsDecorator,
    underlineDecorator,
    headerDecorator,
]);

// Key bindings are handled by mapping events to strings
const keyBindings = (e) => {
    const isCommandPressed = KeyBindingUtil.hasCommandModifier(e);
    if (isCommandPressed && e.keyCode === 66) { // 66 = b
        return 'perseus-bold';
    } else if (isCommandPressed && e.keyCode === 73) {// 73 = i
        return 'perseus-italics';
    } else if (isCommandPressed && e.keyCode === 85) {// 85 = u
        return 'perseus-underline';
    } else if (isCommandPressed && e.keyCode === 219) {// 219 = [
        return 'perseus-decrease-font-size';
    } else if (isCommandPressed && e.keyCode === 221) {// 221 = ]
        return 'perseus-increase-font-size';
    } else if (isCommandPressed && e.keyCode === 220) {// 220 = ]
        return 'perseus-reset-font-size';
    } else {
        return getDefaultKeyBinding(e);
    }
};


/*
    This is the main Draft.js editor.  It keeps track of its internal Draft.js
    state, however what it exposes through its `onChange` is a simple string
    as well as a list of the currently active widgets.
*/
const PerseusEditor = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
        content: React.PropTypes.string,
        initialWidgets: React.PropTypes.any,
        placeholder: React.PropTypes.string,
        imageUploader: React.PropTypes.func,
        widgetEnabled: React.PropTypes.bool,
    },

    getDefaultProps: () => ({
        onChange: () => {},
        content: '',
        initialWidgets: {},
        widgetEnabled: true,
        placeholder: 'Type here',
    }),

    getInitialState() {
        const {content, initialWidgets, widgetEnabled} = this.props;
        const contentState = ContentState.createFromText(content);
        let editorState =
            EditorState.createWithContent(contentState, decorator);

        if (widgetEnabled) {
            editorState = this._insertWidgetsAsEntities(
                editorState,
               initialWidgets
            );
        }

        return {
            editorState,
            widgets: initialWidgets,
            fontSizePercentage: 100,
        };
    },

    // The editor can have its content changed completely by changing the
    // content prop, however if the data this component sent to its parent
    // using `this.props.onChange()` is being fed back in, ignore it
    componentDidUpdate(prevProps) {
        if (this.props.content !== this.lastContentUpdate) {
            this.lastContentUpdate = this.props.content;
            this.setState(this.getInitialState()); //eslint-disable-line
        }
    },

    // By turning widgets into Entities, we allow for widgets to be considered
    // "IMMUTABLE", that is, backspacing a widget will delete the entire text
    // rather than just a "]" character.  It also enables us to detect which
    // widget id has been deleted, as metadata can be attached to entities
    // TODO(samiskin): Turn this task of `applyEntities(pattern, createEntity)`
    // into a DraftUtils function
    _insertWidgetsAsEntities(editorState, widgets) {
        let content = editorState.getCurrentContent();

        Object.keys(widgets).forEach((id) => {
            const selection = DraftUtils.findPattern(content, widgetRegexForId(id)); //eslint-disable-line max-len
            if (selection) { // Sometimes the widgets don't actually exist
                const entity = Entity.create('WIDGET', 'IMMUTABLE', {id});
                content = Modifier.applyEntity(content, selection, entity);
            }
        });

        // EditorState.set is used rather than push, because no state should
        // be added to the undo stack.
        const withEntity =
            EditorState.set(editorState, {currentContent: content});

        return withEntity;
    },

    _getDraftData() {
        const editorState = this.state.editorState;
        const contentState = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        return {editorState, contentState, selection};
    },

    _getNextWidgetId(type) {
        const currWidgets = this.state.widgets;
        return Object.keys(currWidgets)
            .filter(id => currWidgets[id].type === type)
            .map(id => +id.split(" ")[1]) //ids are (([a-z-]+) ([0-9]+))
            .reduce((maxId, currId) => Math.max(maxId, currId), 0);
    },

    _createInitialWidget(widgetType) {
        // Since widgets are given IDs, adding a new widget must ensure that a
        // unique id is generated for it.
        const widgetNum = this._getNextWidgetId(widgetType);
        const id = widgetType + " " + (widgetNum + 1);
        const widget = {
            options: Widgets.getEditor(widgetType).defaultProps,
            type: widgetType,
            // Track widget version on creation, so that a widget editor
            // without a valid version prop can only possibly refer to a
            // pre-versioning creation time.
            version: Widgets.getVersion(widgetType),
        };
        return [id, widget];
    },

    addWidget(type) {
        this.focus(() => this._handleChange(
            this._insertNewWidget(type)
        ));
    },

    _insertNewWidget(type, draftDataParams) {
        const draftData = {
            ...this._getDraftData(),
            ...draftDataParams,
        };
        const [id, widget] = this._createInitialWidget(type);

        const newWidgets = {...this.state.widgets, [id]: widget};
        const newDraftData = this._insertWidgetText(draftData, id);

        return {
            editorState: newDraftData.editorState,
            widgets: newWidgets,
        };
    },

    _insertWidgetText(draftData, id) {
        // Text for the widget is inserted, and an entity is assigned
        const text = widgetPlaceholder.replace("{id}", id);
        const entity = Entity.create('WIDGET', 'IMMUTABLE', {id});

        return DraftUtils.replaceSelection(
            draftData, text, entity
        );
    },

    updateWidget(id, newProps) {
        this.setState({widgets: {...this.state.widgets, [id]: newProps}});
    },

    // This function only removes the widget from the content, and then
    // handleChange handles removing widgets from the state, as widgets
    // can also be deleted by editor actions such as backspace and delete
    removeWidget(id) {
        this.focus(() => {
            const {editorState, contentState} = this._getDraftData();
            const selection = DraftUtils.findPattern(contentState, widgetRegexForId(id)); //eslint-disable-line max-len
            const newDraftData = DraftUtils.deleteSelection(
                {editorState, selection}
            );

            this._handleChange({editorState: newDraftData.editorState});
        });
    },

    addTemplate(templateType) {
        this.focus(() => {
            this._addTemplate(templateType);
        });
    },

    _addTemplate(templateType) {
        let {editorState, contentState, selection} = this._getDraftData();

        const widgets = {...this.state.widgets};

        // Templates shouldn't interrupt a line if the cursor is not at the end
        const currBlock = contentState.getBlockForKey(selection.getEndKey());
        selection = DraftUtils.selectEnd(currBlock);

        // Insert a new line at the beginning if there is content there, that
        // way the template appears on a newline in the rendered markdown
        if (currBlock.getText().length > 0) {
            contentState = Modifier.splitBlock(contentState, selection);
            selection = contentState.getSelectionAfter();
        }

        if (templateType === "allWidgets") {
            const allTypes = Widgets.getAllWidgetTypes().sort();

            // Insert a newline at the beginning
            contentState = Modifier.splitBlock(contentState, selection);
            contentState = allTypes.reduce((content, type) => {
                const [id, widget] = this._createInitialWidget(type);
                widgets[id] = widget;
                content = this._insertWidgetText(
                    {
                        contentState: content,
                        selection: content.getSelectionAfter(),
                    },
                    id
                ).contentState;
                return Modifier.splitBlock( // Put each widget on a new line
                    content, content.getSelectionAfter()
                );
            }, contentState);

            editorState = EditorState.push(
                editorState,
                contentState,
                'insert-fragment'
            );
        } else {
            let template = "";
            if (templateType === "table") {
                template = "header 1 | header 2 | header 3\n" +
                           "- | - | -\n" +
                           "data 1 | data 2 | data 3\n" +
                           "data 4 | data 5 | data 6\n" +
                           "data 7 | data 8 | data 9";
            } else if (templateType === "titledTable") {
                template = "|| **Table title** ||\n" +
                           "header 1 | header 2 | header 3\n" +
                           "- | - | -\n" +
                           "data 1 | data 2 | data 3\n" +
                           "data 4 | data 5 | data 6\n" +
                           "data 7 | data 8 | data 9";
            } else if (templateType === "alignment") {
                template = "$\\begin{align} x+5 &= 30 \\\\\n" +
                           "x+5-5 &= 30-5 \\\\\n" +
                           "x &= 25 \\end{align}$";
            } else if (templateType === "piecewise") {
                template = "$f(x) = \\begin{cases}\n" +
                           "7 & \\text{if $x=1$} \\\\\n" +
                           "f(x-1)+5 & \\text{if $x > 1$}\n" +
                           "\\end{cases}$";
            }

            editorState = DraftUtils.insertText(
                {editorState, contentState, selection}, `\n${template}\n`
            ).editorState;
        }
        this._handleChange({editorState, widgets});
    },

    _handleCopy() {
        const {contentState, selection} = this._getDraftData();
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
    _createSafeWidgetMapping(newWidgets, currentWidgets) {

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
    _handlePaste(pastedText, html, selection) {

        // If no widgets are in localstorage, just use default behavior
        const sourceWidgetsJSON = localStorage.perseusLastCopiedWidgets;
        if (!sourceWidgetsJSON) {
            return false;
        }

        const sourceWidgets = JSON.parse(sourceWidgetsJSON);
        const widgets = {...this.state.widgets};
        const safeWidgetMapping = this._createSafeWidgetMapping(sourceWidgets, widgets); //eslint-disable-line max-len
        const charData = CharacterMetadata.create();

        // insertText takes a sanitizer function which gets ran on every
        // line.  It is used here in order to fix the new widgets to not
        // have conflicting IDs, as well as fill in the widget data
        const sanitizeText = (textLine) => {
            const sanitized = textLine.replace(new RegExp('\r', 'g'), ''); //eslint-disable-line no-control-regex
            const characterList = Array(sanitized.length).fill(charData);
            const safeText = sanitized.replace(widgetRegExp, (syntax, offset) => { //eslint-disable-line max-len
                const match = widgetPartsRegExp.exec(syntax);
                const fullText = match[0]; // The entire [[ widgetName id ]]
                const widgetId = match[1]; // Just the "widgetName id" part
                const newId = safeWidgetMapping[widgetId];
                const newText = widgetPlaceholder.replace("{id}", newId);

                // Create an entity for the new widget, and assign it to the
                // characters that match up to the new widget text (splice)
                const entity = Entity.create('WIDGET', 'IMMUTABLE', {id: newId}); //eslint-disable-line max-len
                const entityChar = CharacterMetadata.applyEntity(charData, entity); //eslint-disable-line max-len
                const entityChars = Array(newText.length).fill(entityChar);
                characterList.splice(offset, fullText.length, ...entityChars);

                widgets[newId] = sourceWidgets[widgetId];
                return fullText.replace(widgetId, newId);
            });
            return {text: safeText, characterList};
        };

        const data = this._getDraftData();
        data.selection = selection || data.selection;
        const {editorState} = DraftUtils.insertText(
            data, pastedText, sanitizeText
        );
        this._handleChange({editorState, widgets});
        return true; // True means draft doesn't run its default behavior
    },

    _handleDrop(selection, dataTransfer) {
        // All insertions are done to the end of the current block
        const contentState = this.state.editorState.getCurrentContent();
        const endKey = selection.getEndKey();
        const endBlock = contentState.getBlockForKey(endKey);
        const endSelection = DraftUtils.selectEnd(endBlock);

        const imageUrl = dataTransfer.getLink();
        if (imageUrl) {
            // Adds new lines and collapses the selection
            const {editorState} = DraftUtils.insertText(
                {...this._getDraftData(), selection: endSelection},
               `\n![](${imageUrl})`
            );
            this._handleChange({editorState});
        } else {
            this._handlePaste(dataTransfer.getText(), null, endSelection);
        }

        return true; // Disable default draft drop handler
    },

    _handleDroppedFiles(selection, files) {
        const images = files.filter(file => file.type.match('image.*'));
        let contentState = this.state.editorState.getCurrentContent();
        images.forEach(image => {

            // Insert placeholder text to show that the image is being uploaded
            const text = `![](${image.name}...)`;
            const id = genKey();
            const entity = Entity.create('TEMP_IMAGE', 'IMMUTABLE', {id});

            const charData = CharacterMetadata.create().merge({entity});
            const characterList = Array(text.length).fill(charData);
            const sanitizer = (textLine) =>
                textLine === text ? {text, characterList} : null;

            const blockKey = selection.getEndKey();
            const contentBlock = contentState.getBlockForKey(blockKey);
            const endOfBlockSelection = DraftUtils.selectEnd(contentBlock);
            contentState = DraftUtils.insertText(
                {contentState, selection: endOfBlockSelection},
                `\n${text}\n`,
                sanitizer
            ).contentState;

            // Begin uploading the image, and update the link once complete
            this.props.imageUploader(image, url => {
                const currEditor = this.state.editorState;
                const currContent = currEditor.getCurrentContent();
                const placeholderLocation = DraftUtils.findEntity(
                    currContent, c => c.getData().id === id);
                const newDraftData = DraftUtils.replaceSelection(
                    {
                        editorState: currEditor,
                        contentState: currContent,
                        selection: placeholderLocation,
                    },
                    `![](${url})`
                );
                this._handleChange({editorState: newDraftData.editorState});
            });

        });
        const editorState = EditorState.push(
            this.state.editorState,
            contentState,
            'insert-fragment'
        );
        this._handleChange({editorState});
        return true; // Disable default draft drop handler
    },


    // This implements tab completion for widgets.  When the user
    // has typed [[d, then presses tab, we should replace [[d
    // with the full [[ {emoji} dropdown 1 ]] text
    _handleTab(e) {
        const {contentState, selection} = this._getDraftData();

        // isCollapsed means that there is no active selection, its just
        // a blinking cursor.  For the SelectionState object, this
        // essentially means that anchorOffset === focusOffset
        if (!selection.isCollapsed() || !this.props.widgetEnabled) {
            return;
        }
        e.preventDefault();

        const currBlock = contentState.getBlockForKey(selection.getEndKey());
        const text = currBlock.getText().substring(0, selection.getEndOffset());
        const match = text.match(partialWidgetRegex);
        if (match) {
            const partialName = match[1];
            const allWidgets = Widgets.getAllWidgetTypes();
            const matchingWidgets = allWidgets.filter(widget => {
                return widget.substring(0, partialName.length) === partialName;
            });

            // If only one match is available, complete it
            if (matchingWidgets.length === 1) {
                const widgetType = matchingWidgets[0];
                const replacementArea = selection.merge({
                    anchorOffset: match.index,
                });

                this._handleChange(
                    this._insertNewWidget(widgetType, {
                        selection: replacementArea,
                    })
                );
            }
        }
        return true; // Say that we've handled the event, no other work needed
    },

    _getDecorationForStyle(style) {
        switch (style) {
            case 'perseus-bold':
                return '**';
            case 'perseus-italics':
                return '*';
            case 'perseus-underline':
                return '__';
            default:
                return null;
        }
    },

    _handleKeyCommand(command) {
        // Check if the font size should be changed
        const {fontSizePercentage} = this.state;
        if (command === 'perseus-increase-font-size') {
            this.setState({fontSizePercentage: fontSizePercentage + 10});
            return true;
        } else if (command === 'perseus-decrease-font-size') {
            this.setState({fontSizePercentage: fontSizePercentage - 10});
            return true;
        } else if (command === 'perseus-reset-font-size') {
            this.setState({fontSizePercentage: 100});
            return true;
        }

        // Check whether a style such as bold/italics/underline should be added
        const decoration = this._getDecorationForStyle(command);
        if (decoration !== null) {
            const data = this._getDraftData();
            const {editorState} =
                DraftUtils.decorateSelection(data, decoration);
            this._handleChange({editorState});
            return true;
        }

        return false;
    },

    lastContentUpdate: "",
    _updateParent(content, widgets) {
        // The parent component should know of only the active widgets,
        // however the widgets are not deleted from this.state because a
        // user undoing a widget deletion should also recover the
        // widget's metadata
        const currEntities = DraftUtils.getEntities(content);
        const visibleWidgets = currEntities.reduce((map, entity) => {
            const id = entity.getData().id;
            map[id] = widgets[id];
            return map;
        }, {});

        this.lastContentUpdate = content.getPlainText('\n');

        // Provide the parent component with the current text
        // representation, as well as the current active widgets
        this.props.onChange({
            content: this.lastContentUpdate,
            widgets: visibleWidgets,
        });
    },

    pastContentState: null,
    lastIdleCallback: null,
    _handleChange(newState) {
        const state = {...this.state, ...newState};
        const widgets = state.widgets;
        let editorState = state.editorState;

        // The cursor should not exist within an entity
        editorState =
            DraftUtils.snapSelectionOutsideEntities(
                {editorState},
                this.state.editorState.getSelection()
            ).editorState;

        const newContent = editorState.getCurrentContent();

        // editorState contains more than just the content, such as the current
        // cursor position.  This means `handleChange` gets called for more than
        // just content changes, so certain calculations aren't always needed.
        if (newContent !== this.pastContentState) {
            // This ensures that unless the content stops changing for a certain
            // short duration, no processing will be done to update the parent.
            // This allows the editing to remain performant for large files,
            // as basic tasks only occur on individual ContentBlocks, while
            // updating the parent involves iterating through them all
            clearTimeout(this.lastIdleCallback);
            this.lastIdleCallback = setTimeout(
                () => this._updateParent(newContent, widgets),
                UPDATE_PARENT_THROTTLE
            );
        }

        this.pastContentState = newContent;
        this.setState({editorState, widgets});
    },

    // HACK: There are currently serious Draft.js bugs related to mutating the
    //       editorState when it is not in focus, then pressing undo.  This
    //       workaround uses a callback parameter to run code after the
    //       editorState has been updated to be in focus, that way functions
    //       such as addWidget will not bring up serious issues when undone
    focus(callback) {
        this.editor.focus();
        let editorState = this.state.editorState;
        editorState = EditorState.set(editorState, {
            selection: editorState.getSelection().set('hasFocus', true),
            forceSelection: true,
        });
        this.setState({editorState}, callback);
    },

    render() {
        return <div
            onCopy={this._handleCopy}
            onCut={this._handleCopy}
            onDragStart={this._handleCopy}
            style={{
                fontSize: `${this.state.fontSizePercentage}%`,
            }}
        >
            <Editor
                ref={(e) => this.editor = e}
                editorState={this.state.editorState}
                onChange={(editorState) => this._handleChange({editorState})}
                spellCheck={true}
                stripPastedStyles={true}
                placeholder={this.props.placeholder}
                handlePastedText={this._handlePaste}
                handleDroppedFiles={this._handleDroppedFiles}
                handleDrop={this._handleDrop}
                keyBindingFn={keyBindings}
                handleKeyCommand={this._handleKeyCommand}
                onTab={this._handleTab}
            />
        </div>;
    },
});

module.exports = PerseusEditor;
