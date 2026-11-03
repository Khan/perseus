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
| `--data-dir` | `$PERSEUS_MCP_DATA_DIR`, else `.perseus-mcp/` at the repo root | Where drafts are saved. |

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

## Code layout

Hexagonal (ports and adapters):

- `src/domain/`: the Perseus logic, with no I/O.
- `src/ports/`: the interfaces the use cases need (draft storage, file
  reading).
- `src/app/`: the use cases, one per tool, written against the ports.
- `src/adapters/`: MCP tools (`mcp/`), the HTTP server (`http/`) and file
  storage (`fs/`).
- `src/main.ts`: the composition root, which wires them together.
