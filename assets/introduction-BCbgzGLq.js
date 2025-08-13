import{j as e}from"./iframe-ChI2rGpr.js";import{useMDXComponents as i}from"./index-K7VrdnNl.js";import{M as o,a as t}from"./blocks-D7twF5l8.js";function r(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Introduction",parameters:{docs:{toc:{headingSelector:"h2, h3"}}}}),`
`,e.jsx(n.h1,{id:"perseus",children:"Perseus"}),`
`,e.jsx(n.p,{children:`Perseus is the technology that powers all exercises and articles at Khan Academy. Since 2013, it has been a core part of
Khan Academy's educational platform, existing both as an integrated component of the Khan Academy applications (web and mobile)
and as a separate open-source repository.`}),`
`,e.jsx(n.h2,{id:"what-is-perseus",children:"What is Perseus?"}),`
`,e.jsx(n.p,{children:`At its core, Perseus is a specialized Markdown to React/HTML renderer with powerful educational features. It extends
standard Markdown with two key capabilities:`}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"1. Interactive Widgets,"}),' Perseus can render custom React components called "widgets" that allow learners to interact with content and provide answers in various formats.']}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"2. Beautiful Math Rendering,"})," Perseus seamlessly integrates with ",e.jsx(n.a,{href:"https://www.mathjax.org/",rel:"nofollow",children:"MathJax"})," to display mathematical expressions and equations with high fidelity."]}),`
`,e.jsx(n.p,{children:"These capabilities make Perseus ideal for creating interactive educational content that combines explanatory text, rich media, and assessment tools."}),`
`,e.jsx(n.h2,{id:"how-perseus-works",children:"How Perseus Works"}),`
`,e.jsx(n.p,{children:"Perseus content is written in an extended Markdown syntax that includes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Standard Markdown formatting (headings, lists, links, etc.)"}),`
`,e.jsxs(n.li,{children:["Math expressions enclosed in dollar signs: ",e.jsx(n.code,{children:"$y = mx + b$"})]}),`
`,e.jsxs(n.li,{children:["Widgets using the syntax: ",e.jsx(n.code,{children:"[[☃ widget-type 1]]"}),", where each widget has a unique ID"]}),`
`]}),`
`,e.jsx(n.p,{children:"When a learner interacts with widgets (such as answering questions), Perseus can:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Validate answers against expected solutions"}),`
`,e.jsx(n.li,{children:"Provide feedback and hints"}),`
`,e.jsx(n.li,{children:"Support a variety of input methods"}),`
`]}),`
`,e.jsx(n.h2,{id:"core-components",children:"Core Components"}),`
`,e.jsx(n.p,{children:"Perseus consists of three main concepts:"}),`
`,e.jsx(n.h3,{id:"1-renderers",children:"1. Renderers"}),`
`,e.jsx(n.p,{children:"Renderers are responsible for displaying Perseus content. The three primary renderers are:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ServerItemRenderer"}),": The main exercise renderer that handles question content, hint management, and keypad display"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ArticleRenderer"}),': Renders long-form, read-only content, with support for embedded "knowledge checks"']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Renderer"}),": The core rendering engine that manages widgets and math content display"]}),`
`]}),`
`,e.jsxs(n.p,{children:["For more detailed information on renderers, refer to the ",e.jsx(n.a,{href:"?path=/docs/renderers-overview--docs",children:"Perseus Renderers Overview"}),"."]}),`
`,e.jsx(n.h3,{id:"2-widgets",children:"2. Widgets"}),`
`,e.jsx(n.p,{children:"Widgets are self-contained React components that provide interactive functionality beyond standard Markdown. They can:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Appear within articles and exercises (in questions and hints)"}),`
`,e.jsx(n.li,{children:'Be nested within other widgets (e.g., the "graded-group" widget)'}),`
`,e.jsx(n.li,{children:"Handle various input types (multiple-choice, graphing, numeric input, etc.)"}),`
`,e.jsx(n.li,{children:"Validate and score user responses"}),`
`]}),`
`,e.jsx(n.h3,{id:"3-editors",children:"3. Editors"}),`
`,e.jsx(n.p,{children:"Editors provide the interface for content creators to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Add/Edit Perseus content"}),`
`,e.jsx(n.li,{children:"Configure widget settings"}),`
`,e.jsx(n.li,{children:"Preview content as it will appear to learners"}),`
`]}),`
`,e.jsx(n.p,{children:"Each widget type has its own specialized editor component."}),`
`,e.jsx(n.h2,{id:"data-flow",children:"Data Flow"}),`
`,e.jsx(n.p,{children:"Perseus follows a straightforward data flow:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"1. Content is created and stored as structured data (PerseusItem or PerseusRenderer)"})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"2. When displayed, this data is passed to the appropriate renderer"})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"3. The renderer parses the content, instantiates widgets, and renders the final output"})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"4. User interactions with widgets are processed and scored against expected answers"})}),`
`,e.jsx(n.h2,{id:"typescript-types-and-conventions",children:"TypeScript Types and Conventions"}),`
`,e.jsx(n.p,{children:"Perseus uses a consistent set of types to define its data structures and components. Understanding these types is crucial for working with Perseus code effectively."}),`
`,e.jsx(n.h3,{id:"data-types",children:"Data Types"}),`
`,e.jsx(t,{children:'\n| Type | Description |\n| ---- | ----------- |\n| `PerseusItem` | Top-level structure that the `ServerItemRenderer` accepts. You can think of the `PerseusItem` type as the "data schema" for Perseus exercise questions. |\n| `PerseusArticle` | Is just a series of `PerseusRenderer` objects. It can be a single object, but most often it is an array of them. These are never scored. |\n| `PerseusRenderer` | Core structure used by Perseus. It is rendered by the `Renderer` component and is used through Perseus to render content (even within widgets). |\n| `WidgetExports<T>` | The type defines a widget. This structure defines which React component implements the widget as well as any required data transforms and metadata. You can look up these exports by using the `getWidgetExport(widgetType)` function from `widgets.ts`. |\n| `WidgetOptions<T>` | All widget options are contained within a common "header" object that is represented by `WidgetOptions<T>`. The `T` generic type in this case is the widget type name (e.g., `dropdown`, `interactive-graph`, etc.). This type contains an `options` key which then contains the options specific to the widget. Each widget defines its set of options through an options type (always defined in `perseus-types.ts`. These can be thought of as the "schema" for the widget. |\n  '}),`
`,e.jsx(n.h3,{id:"widget-options",children:"Widget Options"}),`
`,e.jsxs(n.p,{children:["Each widget defines its set of options through an options type (always defined in ",e.jsx(n.code,{children:"perseus-types.ts"}),'. These can be thought of as the "schema" for the widget.']}),`
`,e.jsx(n.h3,{id:"react-types",children:"React Types"}),`
`,e.jsx(n.p,{children:`Each widget is implemented as a React component. As is common with React, the component receives data via render props.
The code strives to use the following conventions to shape the various concepts of props.`}),`
`,e.jsx(t,{children:"\n| Type | Description |\n| ---- | ----------- |\n| `WidgetProps<T>` | All widgets receive a common set of props from the parent `Renderer` component This set of props is defined by the `WidgetProps<T>` type (`T` being the specific render props the widget uses). |\n| `RenderProps` | Defines the props that are returned by the widget's `transform` and `staticTransform` functions. If these functions are not defined on the widget's `WidgetExport<T>` object, then `RenderProps` is synonymous with the widgets options type (ie. the type `T` wrapped in `WidgetOptions<T>` from `perseus-types.ts`). |\n| External Props | In a few rare cases, this type is defined as the sum of RenderProps wrapped in `WidgetOptions`. |\n| Scoring Data | This type defines the data that the scoring function needs in order to score the learner's guess (aka user input). |\n| `Props` | This form the entire set of props that widget's component supports. Typically, it is defined as `type Props = WidgetProps<RenderProps, Rubric>`. In cases where there are `RenderProps` that are optional that are provided via `DefaultProps`, this `Props` type \"redefines\" these props as `myProp: NonNullable<ExternalProps[\"myProps\"]>;`. |\n  "}),`
`,e.jsx(n.h2,{id:"content-editing",children:"Content Editing"}),`
`,e.jsx(n.p,{children:"The Perseus content editing flow follows these steps:"}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["1. The editor renders an ",e.jsx(n.code,{children:"EditorPage"})," component"]})}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["2. As content is edited, ",e.jsx(n.code,{children:"onChange"})," callbacks are triggered"]})}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["3. When serialization is needed, ",e.jsx(n.code,{children:"editorPageRef.current.serialize()"})," is called to produce a ",e.jsx(n.code,{children:"PerseusItem"})]})}),`
`,e.jsx(n.p,{children:"This editing flow ensures that content creators can interact with widgets and preview content as it will appear to learners."}),`
`,e.jsx(n.h2,{id:"getting-started",children:"Getting Started"}),`
`,e.jsx(n.p,{children:"The best way to understand Perseus is to explore the components in this Storybook. You can:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Browse the Widget Gallery to see the available widgets"}),`
`,e.jsx(n.li,{children:"Read the renderer documentation"}),`
`,e.jsx(n.li,{children:"Browse the available reusable components"}),`
`]})]})}function h(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{h as default};
