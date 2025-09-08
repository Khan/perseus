import{j as e}from"./iframe-CCSQELdq.js";import{useMDXComponents as t}from"./index-BNR-yaxV.js";import{M as r}from"./blocks-bfnDyI-5.js";function s(n){const i={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...t(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Widgets/Numeric Input/Accessibility"}),`
`,e.jsx(i.h1,{id:"numeric-input-accessibility",children:"Numeric Input Accessibility"}),`
`,e.jsx(i.p,{children:"The Numeric Input widget is designed with accessibility in mind to ensure it is usable by all users, including those relying on assistive technologies."}),`
`,e.jsx(i.h2,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"The input can be focused using the Tab key and unfocused with Shift+Tab."}),`
`,e.jsx(i.li,{children:"Users can type numbers and mathematical symbols directly into the input field."}),`
`,e.jsx(i.li,{children:"When the custom keypad is enabled (on mobile), the keypad is accessible via keyboard and touch."}),`
`]}),`
`,e.jsx(i.h2,{id:"screen-reader-support",children:"Screen Reader Support"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The input field is labeled using the provided ",e.jsx(i.code,{children:"labelText"})," prop, which is announced by screen readers."]}),`
`,e.jsx(i.li,{children:"Example formats are provided and can be read by screen readers if visible."}),`
`,e.jsx(i.li,{children:"Error states and validation messages should be announced using ARIA attributes (ensure your implementation provides these if needed)."}),`
`]}),`
`,e.jsx(i.h2,{id:"focus-management",children:"Focus Management"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"The widget manages focus and blur events to provide visual cues and accessibility feedback."}),`
`,e.jsx(i.li,{children:"When focused, the input border is highlighted for better visibility."}),`
`]}),`
`,e.jsx(i.h2,{id:"aria-attributes",children:"ARIA Attributes"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"The input uses standard HTML input elements, which are natively accessible."}),`
`,e.jsxs(i.li,{children:["If additional ARIA attributes are needed (e.g., ",e.jsx(i.code,{children:"aria-invalid"}),", ",e.jsx(i.code,{children:"aria-describedby"}),"), ensure they are passed via props or implemented in your usage."]}),`
`]}),`
`,e.jsx(i.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Always provide a descriptive ",e.jsx(i.code,{children:"labelText"})," for the input."]}),`
`,e.jsx(i.li,{children:"Use clear example formats to help users understand the expected input."}),`
`,e.jsx(i.li,{children:"Test the widget with screen readers and keyboard navigation to ensure a smooth experience."}),`
`]}),`
`,e.jsx(i.h2,{id:"known-limitations",children:"Known Limitations"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Custom keypad (on mobile) may have varying accessibility depending on device and browser support."}),`
`,e.jsx(i.li,{children:"If you encounter accessibility issues, please report them or contribute improvements."}),`
`]})]})}function c(n={}){const{wrapper:i}={...t(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(s,{...n})}):s(n)}export{c as default};
