# Toggle axis tick visibility per axis

## Goal & motivation

Content creators using the InteractiveGraph editor need to hide the numeric markings on the x-axis and/or y-axis independently. Some interactive-graph problems have visually busy axes or rely on a specific abstract framing where the actual coordinate values are noise; today there is no way to suppress just the numbers without also losing the axis lines (the existing `markings` field is all-or-nothing across both axes).

This feature adds a per-axis toggle that hides both the tick marks and the numeric labels on the chosen axis, while leaving the axis line, gridlines, arrows, and the other axis untouched.

## User-facing behavior

In the InteractiveGraph editor's graph settings panel, two new `LabeledSwitch` controls appear (alongside the existing axis-arrow switches):

- **Show x-axis ticks** (default on)
- **Show y-axis ticks** (default on)

When a switch is off, that axis renders neither tick marks nor tick numbers. When on, the existing rendering is unchanged.

The new switches are independent of the `markings` field. If `markings === "none"` no ticks render today regardless, so the switches have no visible effect in that mode; they are still shown in the editor (not disabled) for simplicity.

## Schema shape

A single new optional field on `PerseusInteractiveGraphWidgetOptions`, mirroring the existing `showAxisArrows` pattern:

```ts
export type ShowAxisTicks = {
    x: boolean;
    y: boolean;
};

// inside PerseusInteractiveGraphWidgetOptions
showAxisTicks?: ShowAxisTicks;
```

Default: `{x: true, y: true}`. Existing content that omits the field renders identically to today — no migration of saved content is required.

## Implementation outline

### 1. Data schema, defaults, parser

- `packages/perseus-core/src/data-schema.ts` — add `ShowAxisTicks` type and the optional `showAxisTicks?: ShowAxisTicks` field on `PerseusInteractiveGraphWidgetOptions`. Place it adjacent to `showAxisArrows` for discoverability.
- `packages/perseus-core/src/widgets/interactive-graph/index.ts` — add `showAxisTicks` to the `InteractiveGraphDefaultWidgetOptions` `Pick<...>` and to the `defaultWidgetOptions` object: `showAxisTicks: {x: true, y: true}`.
- `packages/perseus-core/src/parse-perseus-json/...` — add an `optional(...)` parser entry for `showAxisTicks` modeled on `showAxisArrows`. Confirm during implementation whether the parser needs the entry (the schema type alone may not be enough if there is a corresponding `parsed-interactive-graph` schema).
- `packages/perseus-core/src/utils/generators/interactive-graph-widget-generator.ts` — no change needed; the existing `{...defaultWidgetOptions, ...overrides}` spread picks up the new default automatically.

### 2. Editor

- New file `packages/perseus-editor/src/widgets/interactive-graph-editor/components/axis-tick-switches.tsx`, modeled on `axis-arrow-switches.tsx`. Two `LabeledSwitch`es laid out in the same `perseus-widget-row` style. Props:
    ```ts
    interface AxisTickSwitchesProps {
        showAxisTicks: ShowAxisTicks;
        onChange: (axis: keyof ShowAxisTicks) => void;
        disabled?: boolean;
    }
    ```
- `packages/perseus-editor/src/widgets/interactive-graph-editor/components/interactive-graph-settings.tsx` — render `<AxisTickSwitches />` in the "Common Graph Settings" section, just below the existing `<AxisArrowSwitches />`. Accept `showAxisTicks` in props; emit changes via the existing `change(...)` helper, toggling the appropriate axis key.
- `packages/perseus-editor/src/widgets/interactive-graph-editor/interactive-graph-editor.tsx` — thread `showAxisTicks` through props and include it in the editor's `serialize()` output so the field is round-tripped.

### 3. Renderer

The prop chain is widget options → `interactive-graph.tsx` → `stateful-mafs-graph.tsx` → `mafs-graph.tsx` → `GraphConfigContext` → `axis-ticks.tsx`.

- `packages/perseus/src/widgets/interactive-graphs/reducer/use-graph-config.ts` — add `showAxisTicks: ShowAxisTicks` to the `GraphConfig` type and to `defaultGraphConfig` (defaulting to `{x: true, y: true}`).
- `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` — add `showAxisTicks` to the `GraphConfigContext.Provider` value (around lines 217–239), pulled from props.
- `packages/perseus/src/widgets/interactive-graphs/stateful-mafs-graph.tsx` and `interactive-graph.tsx` — pass `showAxisTicks` through.
- `packages/perseus/src/widgets/interactive-graphs/backgrounds/axis-ticks.tsx` — read `showAxisTicks` from `useGraphConfig()` and gate the existing `<g className="y-axis-ticks">` and `<g className="x-axis-ticks">` groups:
    ```tsx
    {showAxisTicks.y && <g className="y-axis-ticks">...</g>}
    {showAxisTicks.x && <g className="x-axis-ticks">...</g>}
    ```
    This hides both the tick marks and the numbers per axis, since both are children of the same `<g>`. The outer `markings`-based gate at `mafs-graph.tsx` lines 379–382 stays unchanged.

### 4. Tests

Editor — extend `packages/perseus-editor/src/widgets/interactive-graph-editor/components/interactive-graph-settings.test.tsx`:
- toggling the x-axis switch fires `onChange` with `{showAxisTicks: {x: false, y: true}}`
- toggling the y-axis switch fires `onChange` with `{showAxisTicks: {x: true, y: false}}`
- both switches default to checked when the option is omitted

Renderer — extend `packages/perseus/src/widgets/interactive-graphs/interactive-graph.test.tsx`:
- with default options, both `.x-axis-ticks` and `.y-axis-ticks` groups render
- with `showAxisTicks: {x: false, y: true}`, `.x-axis-ticks` is absent and `.y-axis-ticks` is present
- with `showAxisTicks: {x: true, y: false}`, the inverse
- with both false, neither group renders (`markings` still set to `"graph"`)

Use the InteractiveGraph generator for test data (`generateInteractiveGraphOptions({showAxisTicks: ...})`).

### 5. Story

Add to `packages/perseus/src/widgets/interactive-graphs/__docs__/interactive-graph.stories.tsx`: a story (or set of stories) that renders the same linear graph four ways — both on, x off, y off, both off — so the visual difference is obvious in Storybook. Follow the conventions returned by the Storybook MCP `get-storybook-story-instructions` tool before authoring.

## Backwards compatibility

`showAxisTicks` is optional. Legacy JSON without the field is parsed/defaulted to `{x: true, y: true}`, preserving today's rendering exactly. No content migration is required.

## Out of scope

- Changing the semantics of the `markings` field.
- Per-axis control over the axis line itself or arrows (the latter already exists via `showAxisArrows`).
- A11y messaging differences when ticks are hidden — the tick group is already `role="presentation"` / `aria-hidden`, so hiding it has no screen-reader impact.

## Verification checklist

- `pnpm tsc` passes
- `pnpm --filter perseus test` passes (renderer tests)
- `pnpm --filter perseus-editor test` passes (editor tests)
- `pnpm storybook` — visit the new story and confirm each combination renders correctly
- Manual editor smoke test: open an InteractiveGraph in the editor, toggle each switch, confirm the preview updates and the saved JSON contains `showAxisTicks`
