import winston from "winston";

import type {Logger} from "winston";

export const getLogger = (): Logger => {
    const simpleFormat = winston.format.printf(({level, message}) => {
        return `[${level.padEnd(5).toUpperCase()}]: ${message}`;
    });

    return winston.createLogger({
        level: process.env.DEBUG ? "debug" : "info",
        format: simpleFormat,
        transports: [new winston.transports.Console({})],
    });
};
