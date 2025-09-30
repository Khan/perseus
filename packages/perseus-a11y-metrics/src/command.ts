import {spawn} from "child_process";

export interface Command<TResult> {
    run(): Promise<TResult>
}

export function command(program: string, ...args: string[]): Command<void> {
    return new VoidCommand(program, args);
}

export class VoidCommand implements Command<void> {
    constructor(private program: string, private args: string[] = []) {}

    /**
     * Runs the command and returns the exit code.
     */
    run(): Promise<void> {
        return new Promise((resolve, reject) => {
            const subprocess = spawn(this.program, this.args, {stdio: "inherit"});
            subprocess.on("close", (exitCode, signal) => {
                if (signal != null) {
                    reject(
                        Error(`${this.program}: terminated by signal ${signal}`),
                    );
                } else if (exitCode != 0) {
                    reject(
                        Error(`${this.program}: exited with code ${exitCode}`),
                    );
                } else {
                    resolve()
                }
            });
        })
    }
}
