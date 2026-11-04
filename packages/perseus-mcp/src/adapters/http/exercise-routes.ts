import {ExerciseNotFoundError} from "../../app/errors";

import {streamEvents} from "./event-stream";

import type {PreviewPages} from "./server";
import type {ExerciseUseCases} from "../../app/exercises";
import type {FastifyInstance, FastifyReply} from "fastify";

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
