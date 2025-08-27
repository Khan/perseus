import{aI as m}from"./iframe-DEsRcbaN.js";import{S as p}from"./server-item-renderer-with-debug-ui-B1xBwLDN.js";import"./server-item-renderer-BeQNbDtb.js";import"./hints-renderer-DqE_eCvF.js";import"./main-DaXgPrjZ.js";import"./test-keypad-context-wrapper-CDlQ9TOh.js";import"./Popper-BW_Im_ZP.js";const c={content:`**Perform the row operation, $R_3 \\leftrightarrow R_2$, on the following matrix.**

$\\left[\\begin{array} {ccc}
5 & -2 & 1 & 1 \\\\
3 & 0 & 0 & -2 \\\\
1 & 1 & 7 & -3 \\end{array} \\right] $

[[☃ matrix 1]]
`,images:{},widgets:{"matrix 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"matrix",options:{cursorPosition:[0,0],suffix:"",answers:[[5,-2,1,1],[1,1,7,-3],[3,0,0,-2]],prefix:"",static:!1,matrixBoardSize:[3,4]},alignment:"default"}}},h={title:"Widgets/Matrix",component:p,tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to create and interact with mathematical matrices,                    supporting linear algebra operations and matrix manipulation."}}}},e={args:{item:m({question:c})}},t={args:{item:m({question:c}),startAnswerless:!0}};var r,s,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    })
  }
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var n,o,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    }),
    startAnswerless: true
  }
}`,...(i=(o=t.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};const q=["Question1","AnswerlessMatrix"];export{t as AnswerlessMatrix,e as Question1,q as __namedExportsOrder,h as default};
