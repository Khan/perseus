export const adaptLegacyMarkdown = (str: string) => {
    // heading 前只有一個 \n 時，將 \n 改為 \n\n
    const addedNewLineAboveHeadingStr = str.replace(
        /([^\n]\n *)(#{1,6}.*)/g,
        "$1\n$2",
    );
    // heading 後只有一個 \n 時，將 \n 改為 \n\n
    const addedNewLineUnderHeadingStr = addedNewLineAboveHeadingStr.replace(
        /(\n *|^)(#{1,6}[^\n]*)(?=\n[^\n])/g,
        "$1$2\n",
    );
    // hr 後只有一個 \n 時，將 \n 改為 \n\n
    const addedNewLineUnderHrStr = addedNewLineUnderHeadingStr.replace(
        /(\n *)([-*_]{3,})(?=\n[^\n])/g,
        "$1$2\n",
    );

    return addedNewLineUnderHrStr;
};
