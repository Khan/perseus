import{j as e}from"./iframe-Dz8KzRm4.js";import{useMDXComponents as s}from"./index-bYheldDS.js";import{M as a}from"./blocks-CLRLnTQg.js";function t(i){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Widgets/Explanation/Accessibility"}),`
`,e.jsx(n.h1,{id:"explanation-accessibility",children:"Explanation Accessibility"}),`
`,e.jsx(n.p,{children:"The Explanation widget is designed with accessibility in mind, providing a way to toggle additional explanatory content without compromising user experience for those using assistive technologies."}),`
`,e.jsx(n.h2,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Users can navigate to the explanation button using the ",e.jsx(n.code,{children:"Tab"})," key."]}),`
`,e.jsxs(n.li,{children:["The explanation content can be toggled with ",e.jsx(n.code,{children:"Enter"})," or ",e.jsx(n.code,{children:"Space"}),"."]}),`
`,e.jsx(n.li,{children:"When expanded, the explanation content becomes part of the normal tab order."}),`
`,e.jsx(n.li,{children:"The widget handles focus management appropriately when toggling content visibility."}),`
`]}),`
`,e.jsx(n.h2,{id:"screen-reader-support",children:"Screen Reader Support"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The button uses appropriate ARIA attributes to communicate its state to screen readers:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"aria-expanded"})," indicates whether the explanation is expanded or collapsed"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"aria-controls"})," associates the button with the explanation content it controls"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["The explanation content container has:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A unique ",e.jsx(n.code,{children:"id"})," that matches the button's ",e.jsx(n.code,{children:"aria-controls"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"aria-hidden"})," that updates appropriately based on visibility"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{id:"animations-and-motion",children:"Animations and Motion"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Transitions between expanded and collapsed states respect the user's motion preferences:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Animations only play when ",e.jsx(n.code,{children:"prefers-reduced-motion: no-preference"})," is enabled"]}),`
`,e.jsx(n.li,{children:"When reduced motion is preferred, state changes happen immediately without animation"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{id:"visual-indicators",children:"Visual Indicators"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The button includes a caret icon (up or down) that visually indicates the current state"}),`
`,e.jsx(n.li,{children:"The expanded explanation content is visually distinguished with a left border"}),`
`,e.jsx(n.li,{children:'Text labels clearly communicate the action ("Explain"/"Hide explanation")'}),`
`]}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Always provide clear, descriptive text for the explanation prompt"}),`
`,e.jsx(n.li,{children:"Ensure explanation content is properly structured with appropriate heading levels"}),`
`,e.jsx(n.li,{children:"Consider the reading order when placing explanations within educational content"}),`
`,e.jsx(n.li,{children:"Avoid using only color to convey the expanded/collapsed state"}),`
`]}),`
`,e.jsx(n.h2,{id:"additional-notes",children:"Additional Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The explanation content can contain rich media and interactive elements through the Perseus Renderer"}),`
`,e.jsx(n.li,{children:"If custom widgets are included within explanations, ensure they follow accessibility guidelines"}),`
`,e.jsx(n.li,{children:"When using this widget within instructional content, ensure the explanation provides valuable context without hiding essential information"}),`
`,e.jsx(n.li,{children:"If you encounter any accessibility issues, please report them to the team."}),`
`]})]})}function c(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{c as default};
