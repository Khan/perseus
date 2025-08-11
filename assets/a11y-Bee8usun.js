import{j as e}from"./iframe-BwpIMEHU.js";import{useMDXComponents as r}from"./index-yu6nm8OG.js";import{M as o}from"./blocks-BLqcicZQ.js";function s(n){const i={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Widgets/RadioNew/Accessibility"}),`
`,e.jsx(i.h1,{id:"radio-widget-accessibility",children:"Radio Widget Accessibility"}),`
`,e.jsx(i.p,{children:"The new Radio widget is designed to be accessible for all users, including those using assistive technologies."}),`
`,e.jsx(i.h2,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Users can navigate to each radio option using the ",e.jsx(i.code,{children:"Tab"})," key."]}),`
`,e.jsxs(i.li,{children:["Once focused, options can be selected with ",e.jsx(i.code,{children:"Space"})," or ",e.jsx(i.code,{children:"Enter"}),"."]}),`
`,e.jsxs(i.li,{children:["Arrow keys (",e.jsx(i.code,{children:"Up"}),"/",e.jsx(i.code,{children:"Down"})," or ",e.jsx(i.code,{children:"Left"}),"/",e.jsx(i.code,{children:"Right"}),") allow users to move between radio options within the group."]}),`
`,e.jsx(i.li,{children:"Only one option can be selected at a time in single-select mode; multiple in multi-select mode if enabled."}),`
`]}),`
`,e.jsx(i.h2,{id:"screen-reader-support",children:"Screen Reader Support"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The radio group and options use appropriate ARIA roles (",e.jsx(i.code,{children:"radiogroup"}),", ",e.jsx(i.code,{children:"radio"}),") and attributes to communicate their state to screen readers."]}),`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"aria-label"})," is set based on the widget's ",e.jsx(i.code,{children:"ariaLabel"})," or ",e.jsx(i.code,{children:"visibleLabel"}),' prop, or defaults to a localized string (e.g., "Select an answer").']}),`
`,e.jsx(i.li,{children:"The currently selected option is announced to screen readers."}),`
`]}),`
`,e.jsx(i.h2,{id:"visible-labels-and-instructions",children:"Visible Labels and Instructions"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["If a ",e.jsx(i.code,{children:"visibleLabel"})," is provided, it is rendered as a ",e.jsx(i.code,{children:"<label>"})," and associated with the radio group for better accessibility."]}),`
`,e.jsxs(i.li,{children:["Instructions or context can be provided via ",e.jsx(i.code,{children:"ariaLabel"})," or visible text."]}),`
`]}),`
`,e.jsx(i.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Always provide a meaningful ",e.jsx(i.code,{children:"visibleLabel"})," or ",e.jsx(i.code,{children:"ariaLabel"})," for context."]}),`
`,e.jsx(i.li,{children:"Avoid using only color to convey meaning in radio options."}),`
`,e.jsxs(i.li,{children:["Ensure the radio group is not set to ",e.jsx(i.code,{children:"readOnly"})," unless necessary, as this disables interaction."]}),`
`]}),`
`,e.jsx(i.h2,{id:"additional-notes",children:"Additional Notes"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"The widget leverages accessible patterns and is tested for compatibility with major screen readers and browsers."}),`
`,e.jsx(i.li,{children:"If you encounter any accessibility issues, please report them to the team."}),`
`]})]})}function c(n={}){const{wrapper:i}={...r(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(s,{...n})}):s(n)}export{c as default};
