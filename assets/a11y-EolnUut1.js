import{j as e}from"./iframe-DrenmEsb.js";import{useMDXComponents as r}from"./index-L2VUlULi.js";import{M as a}from"./blocks-wLa1yD5o.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Widgets/Interactive Graph/Accessibility"}),`
`,e.jsx(n.h1,{id:"interactive-graph-accessibility",children:"Interactive Graph Accessibility"}),`
`,e.jsx(n.p,{children:"The Interactive Graph widget is designed to be accessible for all users, including those using assistive technologies."}),`
`,e.jsx(n.h2,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Users can tab to the graph and interact with graph elements using the keyboard."}),`
`,e.jsx(n.li,{children:"Arrow keys allow navigation and adjustment of points or shapes (if supported by the graph type)."}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Enter"})," or ",e.jsx(n.code,{children:"Space"})," may be used to select or activate interactive elements."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Escape"})," can be used to exit or deselect elements."]}),`
`]}),`
`,e.jsx(n.h2,{id:"screen-reader-support",children:"Screen Reader Support"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The widget provides ARIA labels and descriptions via the ",e.jsx(n.code,{children:"fullGraphAriaLabel"})," and ",e.jsx(n.code,{children:"fullGraphAriaDescription"})," props."]}),`
`,e.jsx(n.li,{children:"Graph elements are described for screen readers, including coordinates and types of shapes."}),`
`,e.jsx(n.li,{children:"Equation strings and graph state can be programmatically accessed and announced."}),`
`]}),`
`,e.jsx(n.h2,{id:"visible-labels-and-markings",children:"Visible Labels and Markings"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Axis labels and markings are visible and can be customized for clarity."}),`
`,e.jsx(n.li,{children:"The widget supports visible labels for axes and graph elements, improving context for all users."}),`
`]}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Always provide meaningful ",e.jsx(n.code,{children:"fullGraphAriaLabel"})," and ",e.jsx(n.code,{children:"fullGraphAriaDescription"})," for context."]}),`
`,e.jsx(n.li,{children:"Use clear axis labels and ensure sufficient color contrast for markings and shapes."}),`
`,e.jsx(n.li,{children:"Avoid using color as the only means of conveying information."}),`
`,e.jsx(n.li,{children:"Ensure interactive elements are reachable and operable via keyboard."}),`
`]}),`
`,e.jsx(n.h2,{id:"additional-notes",children:"Additional Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The widget supports a variety of graph types (points, lines, polygons, angles, etc.), each with accessible defaults."}),`
`,e.jsx(n.li,{children:"If you encounter accessibility issues, please report them to the team for improvement."}),`
`]})]})}function d(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{d as default};
