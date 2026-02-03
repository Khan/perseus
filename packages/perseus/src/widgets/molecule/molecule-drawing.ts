/**
 * Draw some text into a 2D canvas drawing context.
 *
 * Args:
 *     ctx: the 2D drawing context
 *     item: the rendering instruction for the text.  Must look like: {
 *         type: "text",
 *         pos: [x, y],
 *         value: "some text to draw",
 *     }
 *
 */
function drawText(ctx, item: any) {
    if (item.value === null) {
        return;
    }
    ctx.fillStyle = styles.fgColor;
    ctx.font = styles.font;
    ctx.fillText(
        item.value,
        item.pos[0] - styles.fontSizePx / 2 + 1,
        item.pos[1] + styles.fontSizePx / 2,
    );
}

/**
 * Draw a double line into a 2D canvas drawing context.
 *
 * Apparently the way you do this is to stroke an extra-wide line in the
 * foreground color and then a smaller line in the background color. 5:3
 * foreground:background width looks reasonable for drawing chemical bonds.
 *
 * Args:
 *     ctx: the 2D drawing context
 *     item: the rendering instruction for the line.  Must look like: {
 *         type: "line:double",
 *         startPos: [x, y],
 *         endPos: [x, y],
 *     }
 */
function drawDoubleLine(ctx: any, item: any) {
    // Outer line that forms both of the bond lines.
    let path = new Path2D();
    ctx.lineWidth = 5 * styles.lineWidth;
    ctx.strokeStyle = styles.fgColor;
    path.moveTo(item.startPos[0], item.startPos[1]);
    path.lineTo(item.endPos[0], item.endPos[1]);
    ctx.stroke(path);

    // Inner white line that separates the two bond lines.
    path = new Path2D();
    ctx.lineWidth = 3 * styles.lineWidth;
    ctx.strokeStyle = styles.bgColor;
    path.moveTo(item.startPos[0], item.startPos[1]);
    path.lineTo(item.endPos[0], item.endPos[1]);
    ctx.stroke(path);
}

/**
 * Draw a triple line into a 2D canvas drawing context.
 *
 * Following the strategy for the double line, we stroke a very wide
 * foreground-color line, then a medium background-color line, then a narrow
 * foreground-color line.
 *
 * Args:
 *     ctx: the 2D drawing context
 *     item: the rendering instruction for the line.  Must look like: {
 *         type: "line:triple",
 *         startPos: [x, y],
 *         endPos: [x, y],
 *     }
 */
function drawTripleLine(ctx: any, item: any) {
    // Outer line that will form the two outer bond lines.
    let path = new Path2D();
    ctx.lineWidth = 7 * styles.lineWidth;
    ctx.strokeStyle = styles.fgColor;
    path.moveTo(item.startPos[0], item.startPos[1]);
    path.lineTo(item.endPos[0], item.endPos[1]);
    ctx.stroke(path);

    // Middle white line that separates the bonds
    path = new Path2D();
    ctx.lineWidth = 5 * styles.lineWidth;
    ctx.strokeStyle = styles.bgColor;
    path.moveTo(item.startPos[0], item.startPos[1]);
    path.lineTo(item.endPos[0], item.endPos[1]);
    ctx.stroke(path);

    // Inner line that forms the middle bond line.
    drawLine(ctx, item);
}

/**
 * Draw a single line into a 2D canvas drawing context
 *
 * Args:
 *     ctx: the 2D drawing context
 *     item: the rendering instruction for the line.  Must look like: {
 *         type: "line:single",
 *         startPos: [x, y],
 *         endPos: [x, y],
 *     }
 */
function drawLine(ctx: any, item) {
    const path = new Path2D();
    ctx.lineWidth = styles.lineWidth;
    ctx.strokeStyle = styles.fgColor;
    path.moveTo(item.startPos[0], item.startPos[1]);
    path.lineTo(item.endPos[0], item.endPos[1]);
    ctx.stroke(path);
}

/**
 * Lookup table that maps drawing instruction types to the functions that
 * render them.
 */
const drawingFuncs = {
    text: drawText,
    "line:single": drawLine,
    "line:double": drawDoubleLine,
    "line:triple": drawTripleLine,
} as const;

/**
 * Draw a single rendering instruction into a 2D canvas drawing context.
 */
function drawItem(ctx: any) {
    return function (item: any) {
        drawingFuncs[item.type](ctx, item);
    };
}

/**
 * Lookup table for drawing priorities.
 *
 * Types with lower priorities are drawn first.
 */
const ordering = {
    "line:single": 0,
    "line:double": 0,
    "line:triple": 0,
    text: 1,
} as const;

/**
 * Sorting comparison function that orders rendering instructions according to
 * their type's priority.
 */
function compareElements(item0: any, item1: any) {
    return ordering[item0.type] - ordering[item1.type];
}

/**
 * Draw an array of rendering instructions into a 2D canvas drawing context.
 */
function draw(ctx: any, items: Array<any>) {
    items.sort(compareElements).forEach(drawItem(ctx));
}

const styles = {
    bgColor: "rgb(255, 255, 255)",
    fgColor: "rgb(0, 0, 0)",
    fontSizePx: 12,
    lineWidth: 1,
    font: "12px sans",
} as const;

export default draw;
