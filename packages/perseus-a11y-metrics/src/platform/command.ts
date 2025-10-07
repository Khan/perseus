import {spawn} from "child_process";
import {text} from "node:stream/consumers";

export interface StdoutResult {
    stdout: string;
}

export interface Command<TResult> {
    run(): Promise<TResult>;
    withStdoutToString(): Command<StdoutResult>;
}

export function command(program: string, ...args: string[]): Command<void> {
    return new VoidCommand(program, args);
}

class VoidCommand implements Command<void> {
    constructor(
        private program: string,
        private args: string[] = [],
    ) {}

    /**
     * Runs the command and returns the exit code.
     */
    run(): Promise<void> {
        return new Promise((resolve, reject) => {
            const subprocess = spawn(this.program, this.args, {
                stdio: "inherit",
            });
            subprocess.on("close", (exitCode, signal) => {
                if (signal != null) {
                    reject(
                        Error(
                            `${this.program}: terminated by signal ${signal}`,
                        ),
                    );
                } else if (exitCode !== 0) {
                    reject(
                        Error(`${this.program}: exited with code ${exitCode}`),
                    );
                } else {
                    resolve();
                }
            });
        });
    }

    withStdoutToString(): Command<StdoutResult> {
        return new StdoutCommand(this.program, this.args);
    }
}

class StdoutCommand implements Command<StdoutResult> {
    constructor(
        private program: string,
        private args: string[] = [],
    ) {}

    run(): Promise<StdoutResult> {
        return new Promise((resolve, reject) => {
            const subprocess = spawn(this.program, this.args, {
                stdio: ["inherit", "pipe", "inherit"],
            });
            const stdoutPromise = text(subprocess.stdout);

            subprocess.on("close", (exitCode, signal) => {
                if (signal != null) {
                    reject(
                        Error(
                            `${this.program}: terminated by signal ${signal}`,
                        ),
                    );
                } else if (exitCode !== 0) {
                    reject(
                        Error(`${this.program}: exited with code ${exitCode}`),
                    );
                } else {
                    resolve(stdoutPromise.then((value) => ({stdout: value})));
                }
            });
        });
    }

    withStdoutToString(): Command<StdoutResult> {
        return this;
    }
}
