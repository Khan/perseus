# Architecture

This document lays out aspects of Perseus architecture that will be useful to
know if you are working in this codebase.

# Data Flow

## Content Editing

render <EditorPage />
editorPage.serialize() -> PerseusItem

## Rendering

### Overview

The Perseus rendering process starts with a blob of data. This data is
typically serialized as a JSON blob (`string`), but the Perseus renderers
accept only well-formed Javascript objects.

There are 4 main Perseus renderers. They are listed in the table below along
with a short description and the main Perseus data type it accepts.

| Renderer | Data Type | Description |
| -------- | --------- | ----------- |
| `ServerItemRenderer`| `PerseusItem` | The main exercise renderer. This component is a convenience wrapper around the `Renderer`. It adds some management of displaying hints and showing/hiding a keypad (if one is available). |
| `ArticleRenderer` | `PerseusRenderer` or `PerseusRenderer[]` | A renderer for long-form, read-only content. This renderer is very similar to the `ServerItemRenderer` but cannot score any input provided by the learner. There is a `graded-group` widget which allows content authors to embed a "knowledge check" inside an article, but the scoring is not available outside of the renderer. |
| `MultiItemRenderer` | `{ _multi: any }` | The `MultiItemRenderer` is a more advanced renderer. It accepts an object representing a tree of `PerseusRenderer` objects. A `Shape` object defines the structure of the tree and you must provide a "callback" object of the same structure which defines how and where to render each `PerseusRenderer` that appears in the tree. |
| `Renderer` | `PerseusRenderer` | This is the core renderer. It manages all aspects of rendering widgets and math content (TeX). It also contains all the knowledge of coordinating the grading of the content (see [Scoring](#Scoring) for more info). |

### Data Flow

```mermaid
flowchart TD
A[Deploy to production] --> B{Is it Friday?};
B -- Yes --> C[Do not deploy!];
  -- No --> D[Run deploy.sh to deploy!];
C ----> E[Enjoy your weekend!];
D ----> E[Enjoy your weekend!];
```

DB
    -> PerseusItem
        -> <ServerItemRenderer item={item}
            -> <Renderer content={item.question.content}
                         widgets={item.question.widgets} />

For each widget in `.widgets` the `Renderer`:
1. Runs each widget's options through any upgrade transforms (see
    `Widgets.upgradeWidgetInfoToLatestVersion()` and
    `WidgetExports.propUpgrades`)
1. Prepares upgraded props for rendering by applying the widget's
    `transform()` or `staticTransform()` (if rendering with
    `static: true`).
1. Renders each widget found in `.content` passing the render props
    from the previous step to each widget's React component


# Typescript Types and Conventions


# Scoring

# State serialization
