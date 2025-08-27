import{j as e}from"./iframe-BEpDFuEi.js";import{useMDXComponents as t}from"./index-BxyRqid9.js";import{M as r}from"./blocks-E68we-Kr.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Widgets/RadioNew/Accessibility"}),`
`,e.jsx(n.h1,{id:"radio-widget-accessibility",children:"Radio Widget Accessibility"}),`
`,e.jsx(n.p,{children:"The new Radio widget is designed to be accessible for all users, including those using assistive technologies."}),`
`,e.jsx(n.h2,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Users can navigate to each radio option using the ",e.jsx(n.code,{children:"Tab"})," key."]}),`
`,e.jsxs(n.li,{children:["Once focused, options can be selected with ",e.jsx(n.code,{children:"Space"})," or ",e.jsx(n.code,{children:"Enter"}),"."]}),`
`,e.jsxs(n.li,{children:["Only one option can be selected at a time in single-select mode",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Options are automatically deselected when another option is chosen."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Multiple options can be selected when multi-select mode is enabled."}),`
`]}),`
`,e.jsx(n.h2,{id:"screen-reader-support",children:"Screen Reader Support"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Choices are rendered as a list, allowing screen readers to communicate the number of options to the user."}),`
`,e.jsxs(n.li,{children:["Choice buttons are identified as toggle buttons, in order to convey their state (selected or unselected).",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Buttons of type ",e.jsx(n.code,{children:"radio"})," have specific expectations for interaction which do not apply to this widget."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:['Choices are labelled in the following manner: "(Choice <letter>) <choice-text>".',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'For example, "(Choice A) Paris, France".'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`When in review mode, choices are marked as disabled,
but learners can still navigate to them to have the screen reader review the choices and their rationales.`,`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Only correct choices are labelled as such (i.e. "Choice A, Correct").'}),`
`,e.jsxs(n.li,{children:["If rationale exists, it is included via ",e.jsx(n.code,{children:"aria-describedby"}),`,
letting learners access that additional information in a familiar manner for expanded content.
(content in `,e.jsx(n.code,{children:"aria-describedby"})," is presented differently by different screen readers)"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{id:"additional-notes",children:"Additional Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The widget leverages accessible patterns and is tested for compatibility with major screen readers and browsers."}),`
`,e.jsx(n.li,{children:"If you encounter any accessibility issues, please report them to the team."}),`
`]})]})}function d(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{d as default};
