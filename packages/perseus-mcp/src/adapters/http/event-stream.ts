import type {FastifyReply, FastifyRequest} from "fastify";

// Proxies and browsers drop an idle stream; a comment line keeps it open.
const KEEP_ALIVE_MS = 25_000;

/**
 * Answers `request` with a server-sent event stream of what `watch` sends,
 * each as an `event` event, until the client goes away. `watch` must send
 * once straight away (so the stream starts with an event) and return its
 * unsubscribe function, or throw, in which case `onError` answers instead.
 */
export function streamEvents<T>(
    request: FastifyRequest,
    reply: FastifyReply,
    {
        event,
        watch,
        onError,
    }: {
        event: string;
        watch: (send: (data: T) => void) => () => void;
        onError: (error: unknown) => FastifyReply;
    },
): FastifyReply | undefined {
    const res = reply.raw;
    let unsubscribe: () => void;
    try {
        unsubscribe = watch((data) => {
            if (!res.headersSent) {
                // The stream stays open, so it's written directly rather
                // than through Fastify's reply.
                reply.hijack();
                res.writeHead(200, {
                    "Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache",
                    Connection: "keep-alive",
                });
            }
            res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
        });
    } catch (e) {
        return onError(e);
    }
    const keepAlive = setInterval(
        () => res.write(": keep-alive\n\n"),
        KEEP_ALIVE_MS,
    );
    request.raw.on("close", () => {
        clearInterval(keepAlive);
        unsubscribe();
    });
    return undefined;
}
