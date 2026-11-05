# perseus-mcp

An [MCP](https://modelcontextprotocol.io) server that lets AI agents build,
edit, validate, score and preview Perseus items, using the real Perseus parser,
scorer and linter instead of hand-written JSON.

It's a local dev tool: it runs from this monorepo's TypeScript sources and is
not published.

## Running it

From the repo root:

```sh
pnpm start-mcp         # MCP over HTTP on http://localhost:4567/mcp
pnpm start-mcp:stdio   # MCP over stdio
```

Options (`node packages/perseus-mcp/bin/perseus-mcp.mjs --help`):

| Option | Default | |
| --- | --- | --- |
| `--http` / `--stdio` | `--http` | How MCP is served. |
| `--port` | `4567` | HTTP port. |
| `--host` | `127.0.0.1` | HTTP host. |
| `--data-dir` | `$PERSEUS_MCP_DATA_DIR`, else the user data folder (`~/Library/Application Support/perseus-mcp` on macOS, `%LOCALAPPDATA%\perseus-mcp` on Windows, `$XDG_DATA_HOME/perseus-mcp` elsewhere) | Where drafts are saved, whether the server runs from the repo or a bundle. Drafts an earlier version kept in `.perseus-mcp/` at the repo root are copied into the default folder once. |

## Connecting an agent

Claude Code, over HTTP (start the server first):

```sh
claude mcp add --transport http perseus http://localhost:4567/mcp
```

Claude Desktop, over stdio: Claude Desktop starts the server itself and talks
to it over stdin and stdout (`claude_desktop_config.json`):

```json
{
    "mcpServers": {
        "perseus": {
            "command": "node",
            "args": ["/path/to/perseus/packages/perseus-mcp/bin/perseus-mcp.mjs", "--stdio"]
        }
    }
}
```

## Drafts

Tools work on drafts: `create_item` (from new content) or `open_item` (from an
existing item) returns an `itemId`, and later tools take that `itemId` instead
of the whole item. A draft can carry `notes`, context the
agent keeps with it. Each draft is saved as `<data-dir>/drafts/<itemId>.json`,
so drafts survive restarts, and `export_item` returns the finished item. Items
from any Perseus version are accepted, and items are always returned fully
migrated to the latest schema.

If the data directory can't be written to, the server refuses to start rather
than silently losing drafts. A saved draft that no longer parses is skipped
and reported by `list_items`.

## Content search

Search runs in a local [Meilisearch](https://www.meilisearch.com), indexed
from a content snapshot (a folder of published content). Start Meilisearch
with Docker, reachable only from this machine, its data kept in a volume:

```sh
docker run -d --name perseus-search -p 127.0.0.1:7700:7700 \
    -v perseus-search:/meili_data getmeili/meilisearch:v1.15
```

Then build the index (again after the snapshot changes). It takes about half
an hour, most of it reading the math aloud so words find it ("the square root
of x"):

```sh
pnpm --filter @khanacademy/perseus-mcp build:search-index /path/to/snapshot
```

`PERSEUS_MCP_SEARCH_URL` (default `http://localhost:7700`) and
`PERSEUS_MCP_SEARCH_KEY` (if Meilisearch was started with a master key) say
where it is, for the build and for the server. The server's
`search_content`, `facet_content` and `import_from_search` tools use it;
`import_from_search` reads items from the snapshot folder the index was
built from, or `PERSEUS_MCP_CONTENT_SNAPSHOT` when that's set.
`get_server_info` says whether search is available.

## Content guidelines

`get_guidelines` reads your organization's content guidelines from a local
folder of Markdown files, one per topic (writing in general, math content,
TeX, image descriptions), so their text needn't be in this repository.
Agents list the topics first and read the ones a task needs. Each file can
start with frontmatter saying what it covers and when to read it:

```markdown
---
title: Writing TeX
summary: How to write math expressions in TeX.
readWhen: writing or reviewing any math expression
seeAlso: [math-content, general]
---
```

The folder is `perseus-mcp-guidance/distilled` beside this checkout, or
`PERSEUS_MCP_GUIDANCE_DIR` when that's set. Its files are read on each call,
so edits apply without a restart. `build:bundle` copies them into the
bundle's `guidance/` folder, which the bundled server reads. `apply_fix`
applies the rules code can apply (`bold-first-line`, `replace-text`) across
drafts, as a dry run first. `get_server_info` says which topics there are.

## Code layout

Hexagonal (ports and adapters):

- `src/domain/`: the Perseus logic, with no I/O.
- `src/ports/`: the interfaces the use cases need (draft storage, file
  reading).
- `src/app/`: the use cases, one per tool, written against the ports.
- `src/adapters/`: MCP tools (`mcp/`), the HTTP server (`http/`) and file
  storage (`fs/`).
- `src/main.ts`: the composition root, which wires them together.
