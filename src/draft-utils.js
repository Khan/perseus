const {
    CharacterMetadata,
    BlockMapBuilder,
    ContentBlock,
    Entity,
    EditorState,
    Modifier,
    SelectionState,
    genKey,
} = require('draft-js');

const {List} = require('immutable');

const regexStrategy = (contentBlock, regex, callback) => {
    const text = contentBlock.getText();
    let matchArr;
    let start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
};

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

function replaceSelection(editorState, text, entity = null) {
    const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        text,
        null, // For custom styling, but we use a decorator instead
        entity
    );

    return EditorState.push(
        editorState,
        contentState,
        'insert-characters'
    );
}

function deleteSelection(editorState, selection) {
    const contentWithoutSelection = Modifier.removeRange(
        editorState.getCurrentContent(),
        selection,
        'backward'
    );

    return EditorState.push(
        editorState,
        contentWithoutSelection,
        'delete-word'
    );
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

/*
    This function is needed in cases like pasting, where raw text must be
    converted into Draft.js ContentBlocks.
    The sanitizer allows for actions such as stripping characters and
    adding in entities where needed
*/
const NEWLINE_REGEX = /\r\n?|\n/g;
const defaultSanitizer = (a, b) => ({text: a, characterList: b});
function insertText(editorState, rawText, sanitizer = defaultSanitizer) {
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
        const defaultCharacterList = Array(textLine.length).fill(charData);
        const {text, characterList} = sanitizer(textLine, defaultCharacterList);

        return new ContentBlock({
            key: genKey(),
            text: text,
            type: 'unstyled',
            characterList: List(characterList),
        });
    });
    const fragment = BlockMapBuilder.createFromArray(contentBlocks);

    const newContent = Modifier.replaceWithFragment(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        fragment
    );

    return EditorState.push(
        editorState,
        newContent,
        'insert-fragment'
    );
}

function insertTextAtEndOfBlock(editorState, rawText, sanitizer) {
    // insertText inserts at the current selection, therefore to insert at the
    // end of the block, simply force the selection to be at that point
    const selection = editorState.getSelection();
    const blockKey = selection.getFocusKey();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(blockKey);
    const blockLength = block.getCharacterList().size;
    const newSelection = selection.merge({
        focusKey: blockKey,
        focusOffset: blockLength,
        anchorKey: blockKey,
        anchorOffset: blockLength,
    });

    return insertText(
        EditorState.forceSelection(editorState, newSelection),
        rawText,
        sanitizer
    );
}

module.exports = {
    regexStrategy,
    findPattern,
    replaceSelection,
    deleteSelection,
    getEntities,
    insertText,
    insertTextAtEndOfBlock,
};

