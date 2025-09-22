import{j as e}from"./iframe-D6io2pYB.js";import{useMDXComponents as o}from"./index-Vioxdgde.js";import{M as d}from"./blocks-DUpivdqX.js";function i(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Widgets/Dropdown/Accessibility"}),`
`,e.jsx(n.h1,{id:"dropdown-accessibility",children:"Dropdown Accessibility"}),`
`,e.jsx(n.p,{children:"The Dropdown widget is designed with accessibility in mind, ensuring it is usable by all users, including those relying on assistive technologies."}),`
`,e.jsx(n.h2,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Users can navigate to the dropdown using the ",e.jsx(n.code,{children:"Tab"})," key."]}),`
`,e.jsxs(n.li,{children:["Once focused, the dropdown can be opened with ",e.jsx(n.code,{children:"Enter"})," or ",e.jsx(n.code,{children:"Space"}),"."]}),`
`,e.jsxs(n.li,{children:["Arrow keys (",e.jsx(n.code,{children:"Up"}),"/",e.jsx(n.code,{children:"Down"}),") allow users to move between options."]}),`
`,e.jsxs(n.li,{children:["Pressing ",e.jsx(n.code,{children:"Enter"})," or ",e.jsx(n.code,{children:"Space"})," selects the highlighted option."]}),`
`,e.jsxs(n.li,{children:["The dropdown can be closed with ",e.jsx(n.code,{children:"Escape"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{id:"screen-reader-support",children:"Screen Reader Support"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The dropdown uses appropriate ARIA roles and attributes to communicate its state and options to screen readers."}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"aria-label"})," is set based on the widget's ",e.jsx(n.code,{children:"ariaLabel"})," or ",e.jsx(n.code,{children:"visibleLabel"}),' prop, or defaults to a localized string (e.g., "Select an answer").']}),`
`,e.jsx(n.li,{children:"The currently selected option is announced to screen readers."}),`
`]}),`
`,e.jsx(n.h2,{id:"visible-labels-and-placeholders",children:"Visible Labels and Placeholders"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If a ",e.jsx(n.code,{children:"visibleLabel"})," is provided, it is rendered as a ",e.jsx(n.code,{children:"<label>"})," and associated with the dropdown for better accessibility."]}),`
`,e.jsx(n.li,{children:"The placeholder is rendered as a disabled option and is not selectable."}),`
`]}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Always provide a meaningful ",e.jsx(n.code,{children:"visibleLabel"})," or ",e.jsx(n.code,{children:"ariaLabel"})," for context."]}),`
`,e.jsx(n.li,{children:"Avoid using only color to convey meaning in dropdown options."}),`
`,e.jsxs(n.li,{children:["Ensure the dropdown is not set to ",e.jsx(n.code,{children:"readOnly"})," unless necessary, as this disables interaction."]}),`
`]}),`
`,e.jsx(n.h2,{id:"additional-notes",children:"Additional Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The widget leverages ",e.jsx(n.a,{href:"https://github.com/Khan/wonder-blocks/tree/main/packages/wonder-blocks-dropdown",rel:"nofollow",children:"Wonder Blocks Dropdown"}),", which is built for accessibility."]}),`
`,e.jsx(n.li,{children:"If you encounter any accessibility issues, please report them to the team."}),`
`]})]})}function t(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{t as default};
