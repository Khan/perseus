# Architecture

This document lays out aspects of Perseus architecture that will be useful to
know if you are working in this codebase.

# Overview

At its core, Perseus is a library for rendering content and quizzing a learner.
Perseus data is written as Markdown but contains two custom extensions to the
base Markdown syntax:

  1. Widgets - Perseus can render custom widgets (in the form of React
     components) which conform to a special API that enables the user to
     interact with the widget and for the widget to check taht input for
     correctness against a rubric. Widgets are denoted using the following
     Markdown syntax: `[[☃️ widget-id ]]` (where `widget-id` represents a
     generated ID that is unique within the Perseus instance.
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
        <td>`ServerItemRenderer`</td>
        <td>`PerseusItem`</td>
        <td>
            The main exercise renderer. This component is a convenience wrapper
            around the `Renderer`. It adds some management of displaying hints
            and showing/hiding a keypad (if one is available).
        </td>
    </tr>
    <tr>
        <td>`ArticleRenderer`</td>
        <td>`PerseusRenderer` or `PerseusRenderer[]`</td>
        <td>
            A renderer for long-form, read-only content. This renderer is very
            similar to the `ServerItemRenderer` but cannot score any input
            provided by the learner. There is a `graded-group` widget which
            allows content authors to embed a "knowledge check" inside an
            article, but the scoring is not available outside of the renderer.
        </td>
    </tr>
    <tr>
        <td>`MultiItemRenderer`</td>
        <td> `{ _multi: any }`</td>
        <td>
            The `MultiItemRenderer` is a more advanced renderer. It accepts an
            object representing a tree of `PerseusRenderer` objects. A `Shape`
            object defines the structure of the tree and you must provide a
            "callback" object of the same structure which defines how and where
            to render each `PerseusRenderer` that appears in the tree.
        </td>
    </tr>
    <tr>
        <td>`Renderer`</td>
        <td>`PerseusRenderer`</td>
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

Render <EditorPage />
editorPage.serialize() -> PerseusItem

## Rendering

The Perseus rendering process starts with a blob of data. This data is
typically serialized as a JSON blob (`string`), but the Perseus renderers
accept only well-formed Javascript objects.


**_Rough Notes_**

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
