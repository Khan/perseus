import {ExerciseNotFoundError, InvalidImportError} from "../../app/errors";

import {streamEvents} from "./event-stream";
import {jsonFilesInZip, ZipReadError} from "./zip-entries";

import type {PreviewPages} from "./server";
import type {ExerciseUseCases} from "../../app/exercises";
import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

type ExerciseParams = {Params: {exerciseId: string}};

/**
 * The exercise pages and what they read:
 *
 * - With `pages`, `/exercises` (the list) and `/exercises/<exerciseId>`
 *   (the tree and a preview of the selected item, `?item=<itemId>`).
 * - `/api/exercises`: the list, as JSON.
 * - `/exercises/<exerciseId>/events`: a server-sent event stream of the
 *   exercise's tree, with each item's change since import and its
 *   validation issues, sent on connect and after every change to the
 *   exercise or its drafts.
 * - `/api/exercises/<exerciseId>/bulk.json`: the exercise in the exercise
 *   editor's bulk JSON format (`?onlyChanged=true` for the new and edited
 *   items only), for the page's copy button.
 * - `POST /exercises/import?fileName=<name>`: the list page's upload. The
 *   body is a file import_exercise reads (`application/json`), or a zip of
 *   them (`application/zip`), each made an exercise of its own.
 */
export function registerExerciseRoutes(
    app: FastifyInstance,
    {
        exercises,
        pages,
    }: {exercises: ExerciseUseCases; pages: PreviewPages | null},
): void {
    function notFound(reply: FastifyReply, e: unknown): FastifyReply {
        if (e instanceof ExerciseNotFoundError) {
            return reply.code(404).send({error: e.message});
        }
        throw e;
    }

    if (pages != null) {
        app.get("/exercises", async (request, reply) => {
            const html = await pages.html("exercise-list", request.url);
            return reply.type("text/html; charset=utf-8").send(html);
        });
        app.get<ExerciseParams>(
            "/exercises/:exerciseId",
            async (request, reply) => {
                try {
                    exercises.getExercise(request.params.exerciseId);
                } catch (e) {
                    return notFound(reply, e);
                }
                const html = await pages.html("exercise-page", request.url);
                return reply.type("text/html; charset=utf-8").send(html);
            },
        );
    }

    registerImportRoute(app, exercises);

    app.get("/api/exercises", async () => ({
        exercises: exercises.listExercises(),
    }));

    app.get<ExerciseParams>(
        "/exercises/:exerciseId/events",
        async (request, reply) =>
            streamEvents(request, reply, {
                event: "exercise",
                watch: (send) =>
                    exercises.watchExercise(request.params.exerciseId, send),
                onError: (e) => notFound(reply, e),
            }),
    );

    app.get<ExerciseParams & {Querystring: {onlyChanged?: string}}>(
        "/api/exercises/:exerciseId/bulk.json",
        async (request, reply) => {
            try {
                const json = exercises.bulkJson(
                    request.params.exerciseId,
                    request.query.onlyChanged === "true",
                );
                return reply.type("application/json; charset=utf-8").send(json);
            } catch (e) {
                return notFound(reply, e);
            }
        },
    );
}

/** How large an upload, or a zip's .json files unzipped, may be. */
const UPLOAD_LIMIT = 20_000_000;
const UNZIPPED_LIMIT = 100_000_000;

type ImportedExercise = {
    exerciseId: string;
    name: string;
    imported: number;
    skipped: number;
};

/**
 * Whether the request comes from one of this server's own pages. The Host
 * check stops DNS rebinding, but not another site's page posting to
 * localhost, so an upload must name this server as its Origin. (Its body
 * types, JSON and zip, also make a browser ask before sending one across
 * sites, and this server never says yes.)
 */
function isSameOrigin(request: FastifyRequest): boolean {
    const origin = request.headers.origin;
    return origin != null && origin === `${request.protocol}://${request.host}`;
}

function registerImportRoute(
    app: FastifyInstance,
    exercises: ExerciseUseCases,
): void {
    // Its own parsers, in a scope of its own: the body is read as text (or
    // bytes, for a zip) for the use case to parse, with a larger limit than
    // other routes need.
    void app.register(async (scope) => {
        // Only these two: Fastify also reads text/plain by default, which a
        // cross-site form can send without asking first.
        scope.removeAllContentTypeParsers();
        scope.addContentTypeParser(
            "application/json",
            {parseAs: "string", bodyLimit: UPLOAD_LIMIT},
            (_request, body, done) => done(null, body),
        );
        scope.addContentTypeParser(
            "application/zip",
            {parseAs: "buffer", bodyLimit: UPLOAD_LIMIT},
            (_request, body, done) => done(null, body),
        );

        scope.post<{
            Querystring: {fileName?: string};
            Body: string | Buffer;
        }>("/exercises/import", async (request, reply) => {
            if (!isSameOrigin(request)) {
                return reply.code(403).send({
                    error: "Uploads come only from perseus-mcp's own pages.",
                });
            }
            const fileName = request.query.fileName ?? "upload.json";
            const {body} = request;

            if (typeof body === "string") {
                try {
                    const result = exercises.importExerciseText({
                        text: body,
                        fileName,
                    });
                    return {exercises: [summary(result)], failed: []};
                } catch (e) {
                    if (e instanceof InvalidImportError) {
                        return reply.code(400).send({error: e.message});
                    }
                    throw e;
                }
            }

            let files;
            try {
                files = jsonFilesInZip(body, {maxBytes: UNZIPPED_LIMIT});
            } catch (e) {
                if (e instanceof ZipReadError) {
                    return reply.code(400).send({error: e.message});
                }
                throw e;
            }
            if (files.length === 0) {
                return reply
                    .code(400)
                    .send({error: `${fileName} holds no .json files.`});
            }
            const imported: ImportedExercise[] = [];
            const failed: Array<{fileName: string; error: string}> = [];
            for (const file of files) {
                try {
                    imported.push(summary(exercises.importExerciseText(file)));
                } catch (e) {
                    if (!(e instanceof InvalidImportError)) {
                        throw e;
                    }
                    failed.push({fileName: file.fileName, error: e.message});
                }
            }
            return {exercises: imported, failed};
        });
    });
}

function summary(
    result: ReturnType<ExerciseUseCases["importExerciseText"]>,
): ImportedExercise {
    return {
        exerciseId: result.exercise.exerciseId,
        name: result.exercise.name,
        imported: result.imported,
        skipped: result.skipped.length,
    };
}
