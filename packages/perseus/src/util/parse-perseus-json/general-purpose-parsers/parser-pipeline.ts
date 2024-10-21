import { Parser, PartialParser } from "../parser-types";
import { composeParsers } from "./compose-parsers";

export function parserPipeline<T>(parser: Parser<T>): ParserPipeline<T> {
    return new ParserPipeline(parser)
}

class ParserPipeline<T> {
    constructor(public parser: Parser<T>) {}

    then<U>(next: PartialParser<T, U>): ParserPipeline<U> {
        return new ParserPipeline(composeParsers(this.parser, next))
    }
}
