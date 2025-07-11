/**
 * Traverse all of the nodes in the Perseus Markdown AST. The callback is
 * called for each node in the AST.
 */
export const traverseContent = (ast: any, cb: (node: any) => void) => {
    if (Array.isArray(ast)) {
        ast.forEach((node) => traverseContent(node, cb));
    } else if (typeof ast === "object" && ast !== null) {
        cb(ast);
        if (ast.type === "table") {
            traverseContent(ast.header, cb);
            traverseContent(ast.cells, cb);
        } else if (ast.type === "list") {
            traverseContent(ast.items, cb);
        } else if (ast.type === "titledTable") {
            traverseContent(ast.table, cb);
        } else if (ast.type === "columns") {
            traverseContent(ast.col1, cb);
            traverseContent(ast.col2, cb);
        } else if (Array.isArray(ast.content)) {
            traverseContent(ast.content, cb);
        }
    }
};
