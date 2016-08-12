const {
    CharacterMetadata,
    BlockMapBuilder,
    ContentBlock,
    Entity,
    Modifier,
    SelectionState,
    genKey,
} = require('draft-js');

const {List} = require('immutable');

const regexStrategy = (contentBlock, callback, regex) => {
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

function replaceSelection(contentState, selection, text, entity = null) {
    return Modifier.replaceText(
        contentState,
        selection,
        text,
        null, // For custom styling, but we use a decorator instead
        entity
    );
}

function deleteSelection(contentState, selection) {
    return Modifier.removeRange(
        contentState,
        selection,
        'backward'
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
function insertText(contentState, selection, rawText, sanitizer = () => null) {
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

    const newContent = Modifier.replaceWithFragment(
        contentState,
        selection,
        fragment
    );

    return newContent;
}

function selectEnd(block) {
    const emptySelection = SelectionState.createEmpty(block.getKey());
    const newSelection = emptySelection.merge({
        focusOffset: block.getCharacterList().size,
        anchorOffset: block.getCharacterList().size,
    });
    return newSelection;
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
};

