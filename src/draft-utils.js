/*
Draft.js can seem pretty low level, and its library is highly imperative.
While this gives the user a very good grasp of the underlying mechanisms,
making it easier to understand, it can get verbose.

This file contains various utility functions to search and edit Draft.js
data.

NOTE:

Return values for functions which cause mutations to the content must return

{
    editorState?: EditorState,
    contentState: ContentState
}

The issue with returning only the `editorState` is that editing it through
the suggested way (EditorState.push) may add a state onto the undo/redo stack.
This stops the function from being able to be used in the middle of a set of
operations, undo/redo should not bring you to an intermediate step.

The issue with returning only the `contentState` is that the verbose
EditorState.push step ends up being repeated quite often

Therefore both must always be returned
*/

const {
    CharacterMetadata,
    BlockMapBuilder,
    ContentBlock,
    EditorState,
    Entity,
    Modifier,
    SelectionState,
    genKey,
} = require('draft-js');

const {List} = require('immutable');


// This provides sensible defaults for all aspects of draftData
const _fillData = (draftData) => {
    const {editorState, contentState, selection} = draftData;
    const newData = {};
    newData.editorState = editorState || null;
    newData.contentState = contentState
                            || (editorState && editorState.getCurrentContent())
                            || null;
    newData.selection = selection
                        || (editorState && editorState.getSelection())
                        || (contentState && contentState.getSelectionAfter())
                        || null;
    return newData;
};

function regexStrategy(contentBlock, callback, regex) {
    const text = contentBlock.getText();
    let matchArr;
    let start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

// TODO: Make this return an array of all matches, rather than first
function findPattern(contentState, regExp) {
    // The entire content is organized into blocks, and so each one must be
    // searched in order to find every widget
    const blocks = contentState.getBlockMap().values();
    for (const block of blocks) {
        const match = regExp.exec(block.getText());
        if (match !== null) {
            const base = SelectionState.createEmpty(block.getKey());
            const selection = base.merge({
                anchorOffset: match.index,
                focusOffset: match.index + match[0].length,
            });
            return selection;
        }
    }
}

function replaceSelection(draftData, text, entity = null) {
    const data = _fillData(draftData);
    const newData = {};
    newData.contentState = Modifier.replaceText(
        data.contentState,
        data.selection,
        text,
        null, // For custom styling, but we use a decorator instead
        entity
    );

    if (data.editorState) {
        newData.editorState = EditorState.push(
            data.editorState,
            newData.contentState,
            'insert-characters'
        );
    }

    return newData;
}

function deleteSelection(draftData) {
    const data = _fillData(draftData);
    const newData = {};
    newData.contentState = Modifier.removeRange(
        data.contentState,
        data.selection,
        'backward'
    );

    if (data.editorState) {
        newData.editorState = EditorState.push(
            data.editorState,
            newData.contentState,
            'delete-word'
        );
    }

    return newData;
}

// Returns an array of all entiies contained within
// the provided selection, or in the entire contentState
// if no selection is provided
function getEntities(contentState, selection) {
    let blockMap = null;

    // Overriden if a selection is specified
    let filter = () => true;

    if (!selection) {
        blockMap = contentState.getBlockMap();
    } else {
        const blocks = [];
        const startKey = selection.getStartKey();
        const endKey = selection.getEndKey();
        const pastEndKey = contentState.getKeyAfter(endKey);

        for (let blockKey = startKey;
                blockKey !== pastEndKey;
                blockKey = contentState.getKeyAfter(blockKey)) {
            blocks.push(contentState.getBlockForKey(blockKey));
        }
        blockMap = BlockMapBuilder.createFromArray(blocks);

        // Ensure that entities in the same block as the start/end of the
        // selection are not included if they are not fully contained
        // within the selection
        filter = (key, start, end) => {
            if (key === startKey && start < selection.getStartOffset()) {
                return false;
            }
            if (key === endKey && end > selection.getEndOffset()) {
                return false;
            }
            return true;
        };
    }

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
}

function findEntity(contentState, filter) {
    const blocks = contentState.getBlocksAsArray();

    let selection = null;
    blocks.some((block) => {
        block.findEntityRanges(
            char => char.getEntity() !== null
                    && filter(Entity.get(char.getEntity())),
            (start, end) => {
                const base = SelectionState.createEmpty(block.getKey());
                selection = base.merge({
                    anchorOffset: start,
                    focusOffset: end,
                    isBackward: false,
                });
            }
        );
        return !!selection;
    });

    return selection;
}

/*
    This function is needed in cases like pasting, where raw text must be
    converted into Draft.js ContentBlocks.
    The sanitizer allows for actions such as stripping characters and
    adding in entities where needed
    */
const NEWLINE_REGEX = /\r\n?|\n/g;
function insertText(draftData, rawText, sanitizer = () => null) {
    const data = _fillData(draftData);
    const newData = {};

    // To insert text such that it will appear as multiple blocks,
    // createFragment must be used.  A fragment is an ordered map of
    // ContentBlocks.  There should be a ContentBlock for each paragraph
    const textLines = rawText.split(NEWLINE_REGEX);

    // Without basic character data, the text appears blank
    const charData = CharacterMetadata.create();

    // Create an array of ContentBlock objects, one for each line
    const contentBlocks = textLines.map((textLine) => {
        // Styles and entities in draft.js are applied per character, therefore
        // each block uses a list, where each element corresponds to a single
        // character.
        let text = textLine;
        let characterList = Array(textLine.length).fill(charData);
        const sanitizedObj = sanitizer(text, characterList);
        if (sanitizedObj !== null) {
            text = sanitizedObj.text;
            characterList = sanitizedObj.characterList;
        }

        return new ContentBlock({
            key: genKey(),
            text: text,
            type: 'unstyled',
            characterList: List(characterList),
        });
    });
    const fragment = BlockMapBuilder.createFromArray(contentBlocks);

    newData.contentState = Modifier.replaceWithFragment(
        data.contentState,
        data.selection,
        fragment
    );

    if (data.editorState) {
        newData.editorState = EditorState.push(
            data.editorState,
            newData.contentState,
            'insert-fragment'
        );
    }

    return newData;
}

function selectEnd(block) {
    const emptySelection = SelectionState.createEmpty(block.getKey());
    const newSelection = emptySelection.merge({
        focusOffset: block.getCharacterList().size,
        anchorOffset: block.getCharacterList().size,
    });
    return newSelection;
}


const isOffsetAnEntity = (contentBlock, offset) => {
    const key = contentBlock.getEntityAt(offset);
    return !key || Entity.get(key).mutability !== 'IMMUTABLE';
};

const canEditOffset = (contentBlock, offset) => {
    // A position is only uneditable if both characters to the
    // left and right are immutable entities
    return offset === 0
            || isOffsetAnEntity(contentBlock, offset - 1)
            || isOffsetAnEntity(contentBlock, offset);
};

function snapSelectionOutsideEntities(draftData, prevSelection) {
    const data = _fillData(draftData);
    const {contentState, selection, editorState} = data;
    const startBlock = contentState.getBlockForKey(selection.getStartKey());
    const endBlock = contentState.getBlockForKey(selection.getEndKey());

    let leftOffset = selection.getStartOffset();
    let rightOffset = selection.getEndOffset();

    while (leftOffset > 0
            && !canEditOffset(startBlock, leftOffset)) {
        leftOffset--;
    }
    while (rightOffset < endBlock.getLength()
            && !canEditOffset(endBlock, rightOffset)) {
        rightOffset++;
    }

    // If my cursor is precisely on the right of a widget, and I press
    // left, my cursor should move to the left of the widget
    if (prevSelection.getStartKey() === selection.getStartKey()
        && prevSelection.getStartOffset() === selection.getStartOffset() + 1) {
        rightOffset = leftOffset;
    }

    // If there was no selection before, it was just a cursor blinking, then
    // keep that status by making the left offset equal the right one
    // (Not having this would mean clicking inside would select all of it)
    if (selection.isCollapsed()) {
        leftOffset = rightOffset;
    }

    const start = selection.getIsBackward() ? 'focus' : 'anchor';
    const end = selection.getIsBackward() ? 'anchor' : 'focus';

    const newData = {contentState};
    newData.selection = selection.merge({
        [`${start}Offset`]: leftOffset,
        [`${end}Offset`]: rightOffset,
    });

    if (editorState) {
        // EditorState.forceSelection results in strange behavior
        // where characters are repeated when typing normally
        newData.editorState = EditorState.set(editorState, {
            selection: newData.selection,
            forceSelection: true,
        });
    }

    return newData;
}


module.exports = {
    regexStrategy,
    findPattern,
    replaceSelection,
    deleteSelection,
    getEntities,
    findEntity,
    insertText,
    selectEnd,
    snapSelectionOutsideEntities,
};

