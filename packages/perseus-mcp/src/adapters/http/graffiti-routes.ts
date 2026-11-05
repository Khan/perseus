import {GraffitiNotFoundError, GraffitiRenderError} from "../../app/errors";
import {isDiagramId} from "../../domain/graffiti/diagram";

import type {GraffitiUseCases} from "../../app/graffiti";
import type {FastifyInstance, FastifyReply} from "fastify";

/**
 * A Graphie file's name: `<id>.svg` or `<id>-data.json` for a diagram's
 * latest revision, `<id>.<revision>.svg` or `<id>.<revision>-data.json` for
 * another. Perseus makes these from a Graphie URL by adding `.svg` and
 * `-data.json`, so `/graffiti/<id>.<revision>` is a Graphie URL too.
 */
const FILE_NAME = /^([a-z0-9-]+)(?:\.(\d+))?(\.svg|-data\.json)$/;

/**
 * Serves Graffiti diagrams as Graphie images, drawn from the stored script
 * when asked for: `/graffiti/<file>`, and `/graffiti/<locale>/<file>` for a
 * locale's labels, which are the English ones until labels are translated.
 */
export function registerGraffitiRoutes(
    app: FastifyInstance,
    {graffiti}: {graffiti: GraffitiUseCases},
): void {
    async function serve(file: string, reply: FastifyReply) {
        const match = FILE_NAME.exec(file);
        if (match == null || !isDiagramId(match[1])) {
            return reply.code(404).send({error: `No such file: ${file}`});
        }
        const [, graffitiId, revision, kind] = match;
        try {
            const drawing = await graffiti.renderGraffiti(
                graffitiId,
                revision == null ? undefined : Number(revision),
            );
            // A revision never changes; the latest does.
            reply.header(
                "Cache-Control",
                revision == null ? "no-cache" : "public, max-age=31536000",
            );
            return kind === ".svg"
                ? reply.type("image/svg+xml").send(drawing.svg)
                : reply
                      .type("application/json; charset=utf-8")
                      .send(JSON.stringify(drawing.data));
        } catch (e) {
            if (e instanceof GraffitiNotFoundError) {
                return reply.code(404).send({error: e.message});
            }
            if (e instanceof GraffitiRenderError) {
                return reply.code(422).send({error: e.message});
            }
            throw e;
        }
    }

    app.get<{Params: {file: string}}>("/graffiti/:file", (request, reply) =>
        serve(request.params.file, reply),
    );
    app.get<{Params: {locale: string; file: string}}>(
        "/graffiti/:locale/:file",
        (request, reply) => serve(request.params.file, reply),
    );
}
