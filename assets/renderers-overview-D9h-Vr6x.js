import{j as e}from"./iframe-Ub8Lz-nA.js";import{useMDXComponents as t}from"./index-DkAzn_8-.js";import{M as d,a as i}from"./blocks-BlJ6wF72.js";function s(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Renderers/Overview"}),`
`,e.jsx(n.h1,{id:"perseus-renderers-overview",children:"Perseus Renderers Overview"}),`
`,e.jsx(n.p,{children:"Perseus provides several renderer components to display interactive content for both exercises and articles. Each renderer serves a specific purpose in the Perseus ecosystem."}),`
`,e.jsx(n.h2,{id:"core-renderers",children:"Core Renderers"}),`
`,e.jsx(n.p,{children:"There are 4 main Perseus renderers:"}),`
`,e.jsx(i,{children:'\n| Renderer | Data Type | Description |\n| -------- | --------- | ----------- |\n| `ServerItemRenderer` | `PerseusItem` | The main exercise renderer. This component is a convenience wrapper around the `Renderer`. It adds some management of displaying hints and showing/hiding a keypad (if one is available). |\n| `ArticleRenderer` | `PerseusRenderer` or `PerseusRenderer[]` | A renderer for long-form, read-only content. This renderer is very similar to the `ServerItemRenderer` but cannot score any input provided by the learner. There is a `graded-group` widget which allows content authors to embed a "knowledge check" inside an article, but the scoring is not available outside of the renderer. |\n| `Renderer` | `PerseusRenderer` | The core renderer component that handles rendering markdown content with widgets and math (TeX). It manages widget state and coordinates scoring. |\n| `HintRenderer` | `PerseusRenderer` | A specialized renderer for displaying hint content within exercises. |\n  '}),`
`,e.jsx(n.h2,{id:"key-features",children:"Key Features"}),`
`,e.jsx(n.p,{children:"Perseus renderers implement several sophisticated features to enhance content rendering and user interaction:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"1. Math Rendering"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"All renderers use MathJax for rendering mathematical expressions"}),`
`,e.jsx(n.li,{children:"Support for inline and display-mode TeX expressions"}),`
`,e.jsxs(n.li,{children:["Custom preprocessing via ",e.jsx(n.code,{children:"preprocessTex"})," for enhanced rendering"]}),`
`,e.jsxs(n.li,{children:["Zoomable math expressions via ",e.jsx(n.code,{children:"ZoomableTeX"})," component"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"2. Widget System"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Extensible widget architecture for interactive elements"}),`
`,e.jsxs(n.li,{children:["Widget state management through ",e.jsx(n.code,{children:"WidgetContainer"})]}),`
`,e.jsx(n.li,{children:"Error boundaries to prevent widget failures from affecting the entire content"}),`
`,e.jsx(n.li,{children:"Support for widget-specific transformations and upgrades"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"3. Accessibility"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Comprehensive focus management for keyboard navigation"}),`
`,e.jsx(n.li,{children:"ARIA attributes for interactive elements"}),`
`,e.jsx(n.li,{children:"Screen reader compatibility"}),`
`,e.jsx(n.li,{children:"Support for alternative input methods"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"4. Internationalization"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Integration with translation systems (JIPT)"}),`
`,e.jsx(n.li,{children:"Bidirectional text support"}),`
`,e.jsxs(n.li,{children:["Translation linting via ",e.jsx(n.code,{children:"TranslationLinter"})]}),`
`,e.jsx(n.li,{children:"Localized content rendering"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"5. Mobile Support"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Responsive layouts for different screen sizes"}),`
`,e.jsx(n.li,{children:"Touch-friendly interactions"}),`
`,e.jsx(n.li,{children:"On-screen keypad integration for math inputs"}),`
`,e.jsx(n.li,{children:"Mobile-specific styling controlled via apiOptions"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"6. Performance Optimization"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Selective re-rendering of widgets"}),`
`,e.jsx(n.li,{children:"Asset preloading for images"}),`
`,e.jsx(n.li,{children:"Caching of rendered markdown content"}),`
`,e.jsx(n.li,{children:"Optimized scoring for complex widget hierarchies"}),`
`]}),`
`,e.jsx(n.h2,{id:"common-props",children:"Common Props"}),`
`,e.jsx(n.p,{children:"Perseus renderers accept a variety of props to configure their behavior. The most important ones include:"}),`
`,e.jsx(i,{children:'\n| Prop | Type | Description |\n| ---- | ---- | ----------- |\n| `apiOptions` | `APIOptions` | Configuration object with extensive options for renderer behavior, including: |\n| | | - `isMobile`: Whether to use mobile styling |\n| | | - `customKeypad`: Whether a custom keypad is being used |\n| | | - `onFocusChange`: Callback when focus changes |\n| | | - `trackInteraction`: Callback to track user interactions |\n| | | - `baseElements`: Custom React components to use in place of standard DOM elements |\n| `content` | `string` | Markdown content to render, which may include widget references |\n| `widgets` | `PerseusWidgetsMap` | Object mapping widget IDs to their configuration data |\n| `images` | `{[key: string]: any}` | Images to be used in the content |\n| `problemNum` | `number` | The problem number (for exercises with multiple parts) |\n| `questionCompleted` | `boolean` | Whether the question has been answered correctly |\n| `showSolutions` | `"all" | "selected" | "none"` | Controls display of widget solutions and rationales |\n| `linterContext` | `LinterContextProps` | Options for the Perseus linter, including whether to highlight lint warnings |\n  '}),`
`,e.jsx(n.p,{children:"For more details on specific renderer implementations and usage, refer to their individual documentation pages."}),`
`,e.jsx(n.h2,{id:"data-flow",children:"Data Flow"}),`
`,e.jsx(n.h3,{id:"item-rendering",children:"Item Rendering"}),`
`,e.jsx(n.p,{children:"When rendering a Perseus item (exercise):"}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["1. A ",e.jsx(n.code,{children:"PerseusItem"})," object is passed to ",e.jsx(n.code,{children:"ServerItemRenderer"})]})}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["2. ",e.jsx(n.code,{children:"ServerItemRenderer"})," renders two main components:"]})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The question content using ",e.jsx(n.code,{children:"Renderer"})," (with the item's question content and widgets)"]}),`
`,e.jsxs(n.li,{children:["Hints content using ",e.jsx(n.code,{children:"HintsRenderer"})," (which uses ",e.jsx(n.code,{children:"HintRenderer"})," for each hint)"]}),`
`]}),`
`,e.jsx(n.h3,{id:"article-rendering",children:"Article Rendering"}),`
`,e.jsx(n.p,{children:"When rendering a Perseus article:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A ",e.jsx(n.code,{children:"PerseusArticle"})," object (which can be a single ",e.jsx(n.code,{children:"PerseusRenderer"})," or an array of them) is passed to ",e.jsx(n.code,{children:"ArticleRenderer"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"ArticleRenderer"})," creates a ",e.jsx(n.code,{children:"Renderer"})," instance for each section"]}),`
`]}),`
`,e.jsx(n.h2,{id:"widget-rendering-process",children:"Widget Rendering Process"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Renderer"})," component handles the core functionality of rendering widgets through several key steps:"]}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["1. During initialization (",e.jsx(n.code,{children:"_getInitialWidgetState"}),"), the Renderer:"]})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Processes the widgets configuration from props"}),`
`,e.jsxs(n.li,{children:["Applies default values to widget options using ",e.jsx(n.code,{children:"applyDefaultsToWidgets"})]}),`
`,e.jsx(n.li,{children:"Creates initial widget props and state"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"2. For rendering content with widgets, the Renderer:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Parses markdown content using ",e.jsx(n.code,{children:"PerseusMarkdown"})]}),`
`,e.jsx(n.li,{children:"Identifies widget references in the content"}),`
`,e.jsx(n.li,{children:"Manages widget containers that will host each widget instance"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["3. For each widget in the content, the ",e.jsx(n.code,{children:"Renderer"}),":"]})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Runs the widget's options through upgrade transforms"}),`
`,e.jsxs(n.li,{children:["Creates widget props by combining:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The widget's specific configuration"}),`
`,e.jsxs(n.li,{children:["Common props like ",e.jsx(n.code,{children:"apiOptions"})," and ",e.jsx(n.code,{children:"problemNum"})]}),`
`,e.jsx(n.li,{children:"Focus and interaction state"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Renders the widget using a ",e.jsx(n.code,{children:"WidgetContainer"})," component that:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Handles error boundaries around each widget"}),`
`,e.jsx(n.li,{children:"Manages widget state and user interactions"}),`
`,e.jsx(n.li,{children:"Applies accessibility attributes"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"4. The Renderer also manages widget lifecycle by:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Tracking interactions with ",e.jsx(n.code,{children:"InteractionTracker"})]}),`
`,e.jsx(n.li,{children:"Handling focus changes between widgets"}),`
`,e.jsx(n.li,{children:"Coordinating with the parent renderer for scoring and state management"}),`
`]}),`
`,e.jsx(n.h2,{id:"input-focus-management",children:"Input Focus Management"}),`
`,e.jsx(n.p,{children:"Perseus renderers implement sophisticated focus management to handle user interactions across multiple widgets:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"1. Focus Tracking"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Renderers maintain a ",e.jsx(n.code,{children:"_currentFocus"})," property that stores the current focus path"]}),`
`,e.jsx(n.li,{children:"The focus path is an array that identifies which widget and which part of the widget is focused"}),`
`,e.jsx(n.li,{children:"This tracking enables proper keyboard navigation and accessibility features"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"2. Focus Path System"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Focus paths use a hierarchical structure: ",e.jsx(n.code,{children:"[widgetId, ...internalPath]"})]}),`
`,e.jsx(n.li,{children:"For complex widgets, the internal path can identify specific sub-components"}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"isIdPathPrefix"})," helper function determines if one path is a prefix of another"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"3. Focus Event Handling"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Focus changes trigger callbacks between components:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"_handleFocusChange"})," processes focus transitions"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"_setCurrentFocus"})," updates the current focus state"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"_onRendererBlur"})," handles when focus leaves a renderer"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"4. Mobile Support"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["On mobile devices, focus events trigger keypad visibility:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"When a math input is focused, the on-screen keypad appears"}),`
`,e.jsx(n.li,{children:"When focus moves away, the keypad is hidden"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"ServerItemRenderer"})," coordinates with ",e.jsx(n.code,{children:"keypadElement"})," to manage this behavior"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"5. Focus Delegation"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Parent renderers delegate focus to child components:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"ServerItemRenderer.focus()"})," delegates to ",e.jsx(n.code,{children:"questionRenderer.focus()"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"ServerItemRenderer.focusPath()"})," allows focusing specific widgets by path"]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"This delegation pattern allows for programmatic focus control"}),`
`]})]})}function a(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{a as default};
