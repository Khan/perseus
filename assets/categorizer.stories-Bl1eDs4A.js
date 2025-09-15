import{aH as p}from"./iframe-DmIxUJgN.js";import{S as c}from"./server-item-renderer-with-debug-ui-B7X8Jqzn.js";import"./server-item-renderer-DsZho_2j.js";import"./hints-renderer-C3mln8wE.js";import"./main-_DYTkMQd.js";import"./test-keypad-context-wrapper-gCVuGyw_.js";import"./Popper-CrA_sk69.js";const d={content:`**Classify each graph according to the kind of relationship it suggests.**

$\\qquad\\qquad\\quad\\text{Graph 1}\\qquad\\qquad\\quad\\qquad\\qquad\\quad\\text{Graph 2}$



[[☃ categorizer 1]]

**Graph 1.**

![](https://ka-perseus-graphie.s3.amazonaws.com/049c091ed0978112aba3a36b0591d992baf7b1ac.png)

**Graph 2.**

![](https://ka-perseus-graphie.s3.amazonaws.com/40df186f39fb6d65de6bee0d8b681502d10cb37a.png)  
`,images:{"https://ka-perseus-graphie.s3.amazonaws.com/40df186f39fb6d65de6bee0d8b681502d10cb37a.png":{width:244,height:223},"https://ka-perseus-graphie.s3.amazonaws.com/1ead1b334f82ea0eb1bcbd5a56943d8c738ba3de.png":{width:219,height:215},"https://ka-perseus-graphie.s3.amazonaws.com/b420aeaf8bad76b1cdb70a950947df2e4cfbcf0a.png":{width:238,height:223},"https://ka-perseus-graphie.s3.amazonaws.com/049c091ed0978112aba3a36b0591d992baf7b1ac.png":{width:220,height:223}},widgets:{"categorizer 1":{version:{major:0,minor:0},type:"categorizer",graded:!0,alignment:"default",options:{items:["Graph $1$","Graph $2$"],values:[1,3],randomizeItems:!1,categories:["No relationship","Positive linear relationship","Negative linear relationship","Nonlinear relationship"],highlightLint:!1,static:!1}}}},q={title:"Widgets/Categorizer",component:c,tags:["!dev"],parameters:{docs:{description:{component:"A widget that creates interactive, expandable term definitions within                    content, allowing users to click on terms to reveal their meanings                    without leaving the current context."}}}},e={args:{item:p({question:d})}},a={args:{item:p({question:d}),startAnswerless:!0}};var t,s,r;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    })
  }
}`,...(r=(s=e.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};var n,i,o;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    }),
    startAnswerless: true
  }
}`,...(o=(i=a.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};const w=["Question1","AnswerlessCategorizer"];export{a as AnswerlessCategorizer,e as Question1,w as __namedExportsOrder,q as default};
