// flow-typed signature: d56cab49bad56753d465920aa087ed8a
// flow-typed version: c6154227d1/winston_v3.x.x/flow_>=v0.104.x

declare type $winstonLevels = {[string]: number, ...};

// KA> Made exact (fixed a lot of errors when reaching Flow 0.142.0)
declare type $winstonNpmLogLevels = {|
    error: number,
    warn: number,
    info: number,
    verbose: number,
    debug: number,
    silly: number,
|};
// KA<

declare type $winstonInfo<T: $winstonLevels> = {
    [optionName: string]: any,
    level: $Keys<T>,
    message: string,
    ...
};

declare type $winstonFormat = {...};

declare type $winstonFileTransportConfig<T: $winstonLevels> = {
    filename: string,
    level?: $Keys<T>,
    ...
};

declare interface $winstonTransport {
    level?: string;
    silent?: boolean;
}

declare class $winstonFileTransport<T> implements $winstonTransport {
    constructor($winstonFileTransportConfig<T>): $winstonFileTransport<T>;
}

declare type $winstonConsoleTransportConfig<T: $winstonLevels> = {
    level?: $Keys<T>,
    ...
};

declare class $winstonConsoleTransport<T> implements $winstonTransport {
    constructor(
        config?: $winstonConsoleTransportConfig<T>,
    ): $winstonConsoleTransport<T>;
}

// Start: https://github.com/Khan/react-render-server/pull/20
declare type $winstonStreamTransportConfig<T: $winstonLevels> = {
    level?: $Keys<T>,
    stream: stream$Writable,
    eol?: string,
    ...
};

declare class $winstonStreamTransport<T> implements $winstonTransport {
    constructor(
        config?: $winstonStreamTransportConfig<T>,
    ): $winstonStreamTransport<T>;
}
// End: https://github.com/Khan/react-render-server/pull/20

// Start: https://github.com/Khan/react-render-server/pull/21
declare type $winstonProfiler<T: $winstonLevels> = {
    logger: $winstonLogger<T>,
    start: Date,
    done(info?: $winstonInfo<T>): boolean,
};
// End: https://github.com/Khan/react-render-server/pull/21

declare type $winstonLoggerConfig<T: $winstonLevels> = {
    exitOnError?: boolean,
    format?: $winstonFormat,
    level?: $Keys<T>,
    levels?: T,
    transports?: $winstonTransport | Array<$winstonTransport>,
    // Start: https://github.com/Khan/render-gateway/pull/223
    defaultMeta?: any,
    // End: https://github.com/Khan/render-gateway/pull/223
    ...
};

declare type $winstonLogger<T: $winstonLevels> = {
    // Start: https://github.com/Khan/render-gateway/pull/196
    [$Keys<T>]: (
        message: string,
        metaOrCallback?: Object | (() => void),
        callback?: () => void,
    ) => void,
    // End: https://github.com/Khan/render-gateway/pull/196
    add: ($winstonTransport) => void,
    clear: () => void,
    child: (defaultRequestMetadata: any) => $winstonLogger<T>,
    configure: ($winstonLoggerConfig<T>) => void,
    log: (message: $winstonInfo<T>) => void,
    remove: ($winstonTransport) => void,
    // Start: https://github.com/Khan/react-render-server/pull/21
    startTimer: () => $winstonProfiler<T>,
    // End: https://github.com/Khan/react-render-server/pull/21
    // Start: https://github.com/Khan/render-gateway/pull/223
    defaultMeta?: any,
    // End: https://github.com/Khan/render-gateway/pull/223
    ...
};

declare type $winstonConfigSubModule = {npm: () => $winstonNpmLogLevels, ...};

declare type $winstonFormatJsonOptions = {
    replacer?: (key: string, value: any) => any,
    space?: number,
    stable?: boolean,
    ...
};

// Start: https://github.com/Khan/react-render-server/pull/20
declare type $winstonFormatPrintPrintOptions = {
    depth?: number,
    colorize?: boolean,
    ...
};

declare type $winstonFormatCliOptions = {...};
// End: https://github.com/Khan/react-render-server/pull/20

declare type $winstonFormatSubModule = {
    ((info: Object) => Object): () => $winstonFormat,
    // Start: https://github.com/Khan/react-render-server/pull/20
    cli: (options?: $winstonFormatCliOptions) => $winstonFormat,
    // End: https://github.com/Khan/react-render-server/pull/20
    combine: (...args: Array<$winstonFormat>) => $winstonFormat,
    json: (options?: $winstonFormatJsonOptions) => $winstonFormat,
    label: (config?: Object) => $winstonFormat,
    metadata: () => $winstonFormat,
    // Start: https://github.com/Khan/react-render-server/pull/20
    prettyPrint: (options?: $winstonFormatPrintPrintOptions) => $winstonFormat,
    // End: https://github.com/Khan/react-render-server/pull/20
    simple: () => $winstonFormat,
    splat: () => $winstonFormat,
    timestamp: (
        ?{
            alias?: string,
            format?: string,
            ...
        },
    ) => $winstonFormat,
    colorize: () => $winstonFormat,
    logstash: () => $winstonFormat,
    printf: ((args: $winstonInfo<any>) => string) => $winstonFormat,
    ...
};

declare type $winstonDefaultLogger = $winstonLogger<$winstonNpmLogLevels>;

declare class $winstonContainer<T> {
    constructor(config?: $winstonLoggerConfig<T>): $winstonContainer<T>;
    add(loggerId: string, config?: $winstonLoggerConfig<T>): $winstonLogger<T>;
    get(loggerId: string): $winstonLogger<T>;
    has(loggerId: string): boolean;
}

declare module "winston" {
    declare export type Levels = $winstonLevels;
    declare export type NpmLogLevels = $winstonNpmLogLevels;
    declare export type Info<T: Levels> = $winstonInfo<T>;
    declare export type Format = $winstonFormat;
    declare export type FileTransportConfig<
        T: Levels,
    > = $winstonFileTransportConfig<T>;
    declare export type Transport = $winstonTransport;
    declare export type FileTransport<T: Levels> = $winstonFileTransport<T>;
    declare export type ConsoleTransportConfig<
        T: Levels,
    > = $winstonConsoleTransportConfig<T>;
    declare export type ConsoleTransport<
        T: Levels,
    > = $winstonConsoleTransport<T>;
    // Start: https://github.com/Khan/react-render-server/pull/20
    declare export type StreamTransportConfig<
        T: Levels,
    > = $winstonStreamTransportConfig<T>;
    declare export type StreamTransport<T: Levels> = $winstonStreamTransport<T>;
    // End: https://github.com/Khan/react-render-server/pull/20
    declare export type LoggerConfig<T: Levels> = $winstonLoggerConfig<T>;
    declare export type Logger<T: Levels> = $winstonLogger<T>;
    declare export type ConfigSubModule = $winstonConfigSubModule;
    declare export type FormatSubModule = $winstonFormatSubModule;
    declare export type DefaultLogger = $winstonDefaultLogger;
    declare export type Container<T: Levels> = $winstonContainer<T>;

    declare module.exports: {
        ...$Exact<$winstonDefaultLogger>,
        format: $winstonFormatSubModule,
        transports: {
            Console: typeof $winstonConsoleTransport,
            File: typeof $winstonFileTransport,
            // Start: https://github.com/Khan/react-render-server/pull/20
            Stream: typeof $winstonStreamTransport,
            // End: https://github.com/Khan/react-render-server/pull/20
            ...
        },
        createLogger: <T>($winstonLoggerConfig<T>) => $winstonLogger<T>,
        Container: typeof $winstonContainer,
        loggers: $winstonContainer<*>,
        ...
    };
}
