export function pathBuilder(): PathBuilder {
    return new PathBuilder();
}

export class PathBuilder {
    private path: Command[] = [];
    private scaleFactor: number = 1;

    build(): string {
        return this.path
            .map(scaleCommandBy(this.scaleFactor))
            .map(commandToString)
            .join("");
    }

    // add a move (M) command to the path
    move(x: number, y: number): PathBuilder {
        this.path.push({action: "M", coords: [x, y]});
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
        this.path.push({
            action: "C",
            coords: [control1X, control1Y, control2X, control2Y, endX, endY],
        });
        return this;
    }

    // Scale all coordinates of the path by a factor
    scale(factor: number): PathBuilder {
        this.scaleFactor *= factor;
        return this;
    }
}

type Command = {action: "M" | "C"; coords: number[]};

function commandToString(command: Command): string {
    return `${command.action}${command.coords.join(" ")}`;
}

function scaleCommandBy(scaleFactor: number): (command: Command) => Command {
    return (command) => ({
        ...command,
        coords: command.coords.map((c) => c * scaleFactor),
    });
}
