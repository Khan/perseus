import{j as e}from"./iframe-Dz8KzRm4.js";import{useMDXComponents as r}from"./index-bYheldDS.js";import{M as t}from"./blocks-CLRLnTQg.js";function n(i){const s={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Widgets/Expression/Accessibility"}),`
`,e.jsx(s.h1,{id:"expression-accessibility",children:"Expression Accessibility"}),`
`,e.jsx(s.p,{children:"The Expression widget is designed with accessibility in mind, ensuring it is usable by all users, including those relying on assistive technologies."}),`
`,e.jsx(s.h2,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Users can focus the input using the ",e.jsx(s.code,{children:"Tab"})," key."]}),`
`,e.jsx(s.li,{children:"Once focused, the input supports standard text navigation and editing keys."}),`
`,e.jsx(s.li,{children:"For custom keypads (mobile), the keypad is accessible via keyboard and screen reader."}),`
`,e.jsxs(s.li,{children:["The input can be submitted or unfocused with ",e.jsx(s.code,{children:"Enter"})," or ",e.jsx(s.code,{children:"Tab"}),"."]}),`
`]}),`
`,e.jsx(s.h2,{id:"screen-reader-support",children:"Screen Reader Support"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"The input uses appropriate ARIA roles and attributes to communicate its purpose and state to screen readers."}),`
`,e.jsxs(s.li,{children:["The ",e.jsx(s.code,{children:"aria-label"})," is set based on the widget's ",e.jsx(s.code,{children:"ariaLabel"})," or ",e.jsx(s.code,{children:"visibleLabel"}),' prop, or defaults to a localized string (e.g., "Math input box").']}),`
`,e.jsx(s.li,{children:"Math expressions are announced as text; users may need a math-aware screen reader for best results."}),`
`]}),`
`,e.jsx(s.h2,{id:"visible-labels",children:"Visible Labels"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["If a ",e.jsx(s.code,{children:"visibleLabel"})," is provided, it is rendered as a ",e.jsx(s.code,{children:"<label>"})," and associated with the input for better accessibility."]}),`
`,e.jsxs(s.li,{children:["The label is linked to the input via the ",e.jsx(s.code,{children:"htmlFor"})," and ",e.jsx(s.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(s.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Always provide a meaningful ",e.jsx(s.code,{children:"visibleLabel"})," or ",e.jsx(s.code,{children:"ariaLabel"})," for context."]}),`
`,e.jsx(s.li,{children:"Ensure math expressions are clear and unambiguous for all users."}),`
`,e.jsx(s.li,{children:"Avoid using only color or visual cues to convey meaning in expressions."}),`
`]}),`
`,e.jsx(s.h2,{id:"additional-notes",children:"Additional Notes"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"The widget leverages accessible components from Wonder Blocks and Math Input libraries."}),`
`,e.jsx(s.li,{children:"If you encounter any accessibility issues, please report them to the team."}),`
`]})]})}function c(i={}){const{wrapper:s}={...r(),...i.components};return s?e.jsx(s,{...i,children:e.jsx(n,{...i})}):n(i)}export{c as default};
