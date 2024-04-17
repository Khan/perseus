export function pathBuilder(): PathBuilder {
    return new PathBuilder();
}

export class PathBuilder {
    private path: Command[] = [];
    private scaleFactor: number = 1;

    build(): string {
        return this.path
            .map((command) => command.scaleBy(this.scaleFactor))
            .join("");
    }

    // add a move (M) command to the path
    move(x: number, y: number): PathBuilder {
        this.path.push(new MoveCommand(x, y));
        return this;
    }

    // add a curve (C) command to the path
    curve(
        control1X: number,
        control1Y: number,
        control2X: number,
        control2Y: number,
        endX: number,
        endY: number,
    ): PathBuilder {
        this.path.push(
            new CurveCommand(
                control1X,
                control1Y,
                control2X,
                control2Y,
                endX,
                endY,
            ),
        );
        return this;
    }

    scale(factor: number): PathBuilder {
        this.scaleFactor *= factor;
        return this;
    }
}

abstract class Command {
    abstract type: string;
    coords: number[] = [];

    toString() {
        return `${this.type}${this.coords.join(" ")}`;
    }

    scaleBy(factor: number) {
        this.coords = this.coords.map((coord) => coord * factor);
        return this;
    }
}

class MoveCommand extends Command {
    type = "M";
    constructor(x, y) {
        super();
        this.coords = [x, y];
    }
}

class CurveCommand extends Command {
    type = "C";
    constructor(
        control1X: number,
        control1Y: number,
        control2X: number,
        control2Y: number,
        endX: number,
        endY: number,
    ) {
        super();
        this.coords = [control1X, control1Y, control2X, control2Y, endX, endY];
    }
}
