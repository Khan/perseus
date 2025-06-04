# Architecture

This document lays out aspects of Perseus architecture that will be useful to
know if you are working in this codebase.

# Overview

At its core, Perseus is a library for rendering content and quizzing a learner.
Perseus data is written as Markdown but contains two custom extensions to the
base Markdown syntax:

  1. Widgets - Perseus can render custom widgets (in the form of React
     components) which conform to a special API that enables the user to
     interact with the widget and for the widget to check that input for
     correctness against a set of scoring data. Widgets are denoted using the
     following Markdown syntax: `[[☃️ widget-id ]]` (where `widget-id`
     represents a generated ID that is unique within the Perseus instance.
  1. Math - Perseus can also render beautiful math using MathJax. Math is
     denoted using an opening and close dollar sign (eg. `$y = mx + b$`).

In addition to this extended Markdown rendering, Perseus also enables answer
checking, state serialization, hinting, and several other useful features.

## Major Components

There are 4 main Perseus renderers. They are listed in the table below along
with a short description and the main Perseus data type it accepts.

<table>
<thead>
    <tr>
        <th>Renderer</th>
        <th>Data Type</th>
        <th>Description</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>ServerItemRenderer</code></td>
        <td><code>PerseusItem</code></td>
        <td>
            The main exercise renderer. This component is a convenience wrapper
            around the `Renderer`. It adds some management of displaying hints
            and showing/hiding a keypad (if one is available).
        </td>
    </tr>
    <tr>
        <td><code>ArticleRenderer</code></td>
        <td><code>PerseusRenderer</code> or <code>PerseusRenderer[]</code></td>
        <td>
            A renderer for long-form, read-only content. This renderer is very
            similar to the `ServerItemRenderer` but cannot score any input
            provided by the learner. There is a `graded-group` widget which
            allows content authors to embed a "knowledge check" inside an
            article, but the scoring is not available outside of the renderer.
        </td>
    </tr>
    <tr>
        <td><code>Renderer</code></td>
        <td><code>PerseusRenderer</code></td>
        <td>
            This is the core renderer. It manages all aspects of rendering
            widgets and math content (TeX). It also contains all the knowledge
            of coordinating the grading of the content (see [Scoring](#Scoring)
            for more info).
        </td>
    </tr>
</tbody>
</table>

# Data Flow

## Content Editing

TBD

1. Render <EditorPage />
2. `onChange` callbacks as data is edited
3. `editorPageRef.current.serialize()` -> `PerseusItem`

## Rendering

The Perseus rendering process starts with a blob of data. This data is
typically serialized as a JSON blob (`string`), but the Perseus renderers
accept only well-formed Javascript objects.


**_Rough Notes_**

```
-> DB
    -> PerseusItem
        -> <ServerItemRenderer item={item}
            -> <Renderer content={item.question.content}
                         widgets={item.question.widgets} />
```

For each widget in `.widgets` the `Renderer`:
1. Runs each widget's options through any upgrade transforms (see
    `Widgets.upgradeWidgetInfoToLatestVersion()` and
    `WidgetExports.propUpgrades`). See [Prop Upgrades](#Prop_Upgrades) for more info
1. Prepares upgraded options for rendering by applying the widget's
    `transform()` or `staticTransform()` (if rendering with
    `static: true`). These functions map the widget options to the widget's
    render Props.
1. Prepares a full set of widget options by adding common props to the render
   props (see `WidgetProps<T>` and the `Renderer`'s
   [`getWidgetProps`](https://github.com/Khan/perseus/blob/c6ee2662a18e6703c3a7816d5fb89a70e0f9f50b/packages/perseus/src/renderer.tsx#L570)
   function.
1. Renders each widget found in `.content` passing the render props
    from the previous step to each widget's React component

# Typescript Types and Conventions

## `PerseusItem`

The `PerseusItem` is the top level structure that the `ServerItemRenderer`
accepts. You can think of the `PerseusItem` type as the "data schema" for
Perseus exercise questions.

## `PerseusArticle`

A `PerseusArticle` is just a series of `PerseusRenderer` objects. It can be a
single object, but most often it is an array of them. These are never scored.

## `PerseusRenderer`

The `PerseusRenderer` type is the core structure used by Perseus. It is
rendered by the `Renderer` component and is used throught Perseus to render
content (even within widgets).

## `WidgetExports<T>`

The `WidgetExports<T>` type defines a widget. This structure defines which
React component implements the widget as well as any required data transforms
and metadata. You can look up these exports by using the
`getWidgetExport(widgetType)` function from `widgets.ts`.

## `WidgetOptions<T>`

All widget options are contained within common "header" object that is
represented by `WidgetOptions<T>`. The `T` generic type in this case is the
widget type name (ie. `dropdown`, `interactive-graph`, etc.).

This type contains a `options` key which then contains the options specific to
the widget.

## Widget Options

Each widget defines its set of options through an options type (always defined
in `perseus-types.ts`.

These can be thought of as the "schema" for the widget.

## React Types

Each widget is implemented as a React component. As is common with React, the
component receives data via render props.

The code strives to use the following conventions to shape the various concepts
of props.

### `WidgetProps<T>`

All widgets receive a common set of props from the parent `Renderer` component
(see
[`getWidgetProps`](https://github.com/Khan/perseus/blob/c6ee2662a18e6703c3a7816d5fb89a70e0f9f50b/packages/perseus/src/renderer.tsx#L570)).
This set of props is defined by the `WidgetProps<T>` type (`T` being the
specific render props the widget uses).

### `RenderProps`

The `RenderProps` type defines the props that are returned by the widget's
`transform` and `staticTransform` functions. If these functions are not defined
on the widget's `WidgetExport<T>` object, then `RenderProps` is synonymous with
the widgets options type (ie. the type `T` wrapped in `WidgetOptions<T>` from
`perseus-types.ts`).

### `ExternalProps`

In a few rare cases, this type is defined as the sum of RenderProps wrapped in
`WidgetOptions`.

### `Scoring Data`

This type defines the data that the scoring function needs in order to score
the learner's guess (aka user input).

### `Props`

Finally, `Props` form the entire set of props that widget's component supports.
Typically it is defined as `type Props = WidgetProps<RenderProps, Rubric>`. In
cases where there are `RenderProps` that are optional that are provided via
`DefaultProps`, this `Props` type "redefines" these props as `myProp:
NonNullable<ExternalProps["myProps"]>;`.

# Scoring

# State serialization
