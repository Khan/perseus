const winston = require("winston");

exports.getLogger = () => {
    const simpleFormat = winston.format.printf(({level, message}) => {
        return `[${level.padEnd(5).toUpperCase()}]: ${message}`;
    });

    return winston.createLogger({
        level: process.env.DEBUG ? "debug" : "info",
        format: simpleFormat,
        transports: [new winston.transports.Console({})],
    });
};
