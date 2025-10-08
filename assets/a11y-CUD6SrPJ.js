import{j as e}from"./iframe-Ub8Lz-nA.js";import{useMDXComponents as s}from"./index-DkAzn_8-.js";import{M as o}from"./blocks-BlJ6wF72.js";function t(n){const i={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Widgets/Definition/Accessibility"}),`
`,e.jsx(i.h1,{id:"definition-accessibility",children:"Definition Accessibility"}),`
`,e.jsx(i.p,{children:"The Definition widget is designed with accessibility in mind, providing users with access to definitions through an interactive text prompt that opens a popover with additional content."}),`
`,e.jsx(i.h2,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Users can navigate to the definition text prompt using the ",e.jsx(i.code,{children:"Tab"})," key."]}),`
`,e.jsxs(i.li,{children:["Once focused, the definition popover can be opened with ",e.jsx(i.code,{children:"Enter"})," or ",e.jsx(i.code,{children:"Space"}),"."]}),`
`,e.jsxs(i.li,{children:["When the popover is open, users can navigate to the close button using ",e.jsx(i.code,{children:"Tab"}),"."]}),`
`,e.jsxs(i.li,{children:["The popover can be closed by:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Pressing ",e.jsx(i.code,{children:"Escape"})]}),`
`,e.jsxs(i.li,{children:["Focusing on the close button and pressing ",e.jsx(i.code,{children:"Enter"})]}),`
`,e.jsx(i.li,{children:"Clicking outside the popover"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(i.h2,{id:"screen-reader-support",children:"Screen Reader Support"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"The definition text prompt is a semantically appropriate interactive element recognizable by screen readers."}),`
`,e.jsx(i.li,{children:"The popover follows ARIA best practices for modal dialogs."}),`
`,e.jsx(i.li,{children:"The definition content is rendered using the standard Perseus Renderer, inheriting its accessibility features for rich content."}),`
`]}),`
`,e.jsx(i.h2,{id:"visual-indicators",children:"Visual Indicators"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"The definition text prompt appears in blue to indicate interactivity."}),`
`,e.jsx(i.li,{children:"When the text prompt is hovered, focused, or pressed, it displays a blue underline for additional visual feedback."}),`
`,e.jsx(i.li,{children:"The popover has a visible close button to clearly indicate how to dismiss it."}),`
`]}),`
`,e.jsx(i.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Use clear, concise text for the toggle prompt that indicates a definition is available."}),`
`,e.jsx(i.li,{children:"Keep definition content focused on explaining the term without excessive information."}),`
`,e.jsx(i.li,{children:"Avoid using definitions for critical content that all users must see."}),`
`,e.jsx(i.li,{children:"Consider that the definition content supports rich formatting and can include other widgets."}),`
`]}),`
`,e.jsx(i.h2,{id:"additional-notes",children:"Additional Notes"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The widget leverages ",e.jsx(i.a,{href:"https://khan.github.io/wonder-blocks/?path=/docs/packages-clickable-clickable-accessibility--docs",rel:"nofollow",children:"Wonder Blocks Clickable"})," and ",e.jsx(i.a,{href:"https://khan.github.io/wonder-blocks/?path=/docs/packages-popover-popover-accessibility--docs",rel:"nofollow",children:"Wonder Blocks Popover"}),", which are built with accessibility in mind."]}),`
`,e.jsx(i.li,{children:"If you encounter any accessibility issues, please report them to the team."}),`
`]})]})}function d(n={}){const{wrapper:i}={...s(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(t,{...n})}):t(n)}export{d as default};
