import type {PreviewPages} from "./server";
import type {OverviewUseCases} from "../../app/overview";
import type {FastifyInstance} from "fastify";

/**
 * The homepage and the images page:
 *
 * - With `pages`, `/`: what this server holds, the latest drafts and
 *   exercises, and links to the exercises and the images; and `/images`:
 *   the Graffiti diagrams, each with the drafts that show it.
 * - `/api/home` and `/api/images`: what those pages show, as JSON, and
 *   `/api/images/<graffitiId>`: one diagram's, for its own page.
 */
export function registerOverviewRoutes(
    app: FastifyInstance,
    {
        overview,
        pages = null,
    }: {overview: OverviewUseCases; pages?: PreviewPages | null},
): void {
    if (pages != null) {
        app.get("/", async (request, reply) =>
            reply
                .type("text/html; charset=utf-8")
                .send(await pages.html("home", request.url)),
        );
        app.get("/images", async (request, reply) =>
            reply
                .type("text/html; charset=utf-8")
                .send(await pages.html("images", request.url)),
        );
    }
    app.get("/api/home", async () => overview.overview());
    app.get("/api/images", async () => ({diagrams: overview.diagrams()}));
    app.get<{Params: {graffitiId: string}}>(
        "/api/images/:graffitiId",
        async (request, reply) => {
            const diagram = overview
                .diagrams()
                .find((d) => d.graffitiId === request.params.graffitiId);
            return diagram ?? reply.code(404).send({error: "No such diagram"});
        },
    );
}
