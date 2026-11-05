// When the agent should use perseus-mcp, and that it should do the work
// through the tools: given in the server's instructions, and again in the
// start_authoring prompt a person can pick. Authors' machines have no
// Perseus source and no access to the server's files, so an agent that
// works around the tools does something they can't repeat.
import {z} from "zod";

import type {McpServer} from "@modelcontextprotocol/server";

/** The start of the server's instructions. */
export const AUTHORING_RULES = `\
Use these tools whenever a person asks for Khan Academy content: exercises,
items, questions, problems, hints, answer choices, diagrams for them, or
changes to existing ones, and to find or count published content. When it
isn't clear whether they mean Perseus content for Khan Academy or something
else (a document, a quiz in another format), ask before starting. Articles
can't be written or edited with these tools yet; say so.

Do that work only through these tools:
- Don't write or run code or scripts to build, edit, validate, score,
  search or read items, and don't write item JSON by hand: create_item,
  add_widget, edit_item and edit_items build it, and validate it.
- Don't read or change the server's data folder (drafts, exercises,
  diagrams), the content snapshot, or the search index directly: the tools
  read them (export_item, get_exercise, search_content).
- Don't read the Perseus or Graffiti source to learn what a widget, an
  option or a diagram can do: get_widget_spec, get_guidelines and the
  tools' descriptions say.
- If a tool can't do what the task needs, or fails, say what's missing and
  ask; don't work around it. A way around the tools wouldn't work for the
  authors this is for: their machines have neither the source nor the
  server's files.

`;

/** The prompt's text: the rules, then where to start. */
function startText(task: string | undefined): string {
    return (
        AUTHORING_RULES +
        "Start by listing the content guidelines with get_guidelines and " +
        "reading the topics the task needs. Then confirm what the person " +
        "wants (new items or changes to existing ones; the grade, course " +
        "or exercise; how many), and work with the tools from there." +
        (task != null && task.trim() !== ""
            ? `\n\nThe task: ${task.trim()}`
            : "")
    );
}

/**
 * The start_authoring prompt: what the agent is told to do before any
 * Perseus work, for a person to pick at the start of a chat.
 */
export function registerAuthoringPrompt(server: McpServer): void {
    server.registerPrompt(
        "start_authoring",
        {
            title: "Start authoring Perseus content",
            description:
                "Tells the agent to do this chat's Khan Academy content work " +
                "(exercises, questions, hints, diagrams) only through the " +
                "Perseus tools, and where to start.",
            argsSchema: z.object({
                task: z
                    .string()
                    .optional()
                    .describe("What to make or change, if you know already."),
            }),
        },
        ({task}) => ({
            messages: [
                {
                    role: "user",
                    content: {type: "text", text: startText(task)},
                },
            ],
        }),
    );
}
