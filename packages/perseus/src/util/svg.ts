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
        this.path.push({action: "M", args: [x, y]});
        return this;
    }

    line(x: number, y: number): PathBuilder {
        this.path.push({action: "L", args: [x, y]});
        return this;
    }

    circularArc(
        radius: number,
        toX: number,
        toY: number,
        {
            sweep = false,
            largeArc = false,
        }: {sweep?: boolean; largeArc?: boolean} = {},
    ): PathBuilder {
        this.path.push({
            action: "A",
            args: [
                radius,
                radius,
                0 /* rotation */,
                largeArc ? 1 : 0,
                sweep ? 1 : 0,
                toX,
                toY,
            ],
        });
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
            args: [control1X, control1Y, control2X, control2Y, endX, endY],
        });
        return this;
    }

    // Scale all coordinates of the path by a factor
    scale(factor: number): PathBuilder {
        this.scaleFactor *= factor;
        return this;
    }
}

type Command = {action: "M" | "L" | "C" | "A"; args: number[]};

function commandToString(command: Command): string {
    return `${command.action}${command.args.join(" ")}`;
}

function scaleCommandBy(scaleFactor: number): (command: Command) => Command {
    return (command) => {
        switch (command.action) {
            case "A":
                // Arc command
                return {
                    ...command,
                    args: [
                        command.args[0] * scaleFactor, // x radius
                        command.args[1] * scaleFactor, // y radius
                        command.args[2], // rotation
                        command.args[3], // largeArc flag
                        command.args[4], // sweep flag
                        command.args[5] * scaleFactor, // end x
                        command.args[6] * scaleFactor, // end y
                    ],
                };
            default:
                return {
                    ...command,
                    args: command.args.map((c) => c * scaleFactor),
                };
        }
    };
}
