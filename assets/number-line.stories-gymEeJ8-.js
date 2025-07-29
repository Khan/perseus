import{h as i}from"./iframe-BDxKU4CJ.js";import{S as v}from"./server-item-renderer-with-debug-ui-CpTxxtXJ.js";import"./server-item-renderer-cSbYfIXY.js";import"./hints-renderer-g8uXB3Ge.js";import"./main-BoPS-9c0.js";import"./test-keypad-context-wrapper-C68J82am.js";import"./Popper-B4jhFkGh.js";const f={content:`$E=2.5$

**Move the dot to $-E$ on the number line.**


[[☃ number-line 1]]`,images:{},widgets:{"number-line 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"number-line",options:{labelRange:[null,null],initialX:null,tickStep:1,labelStyle:"decimal",labelTicks:!0,isInequality:!1,snapDivisions:2,range:[-4,4],static:!1,correctRel:"eq",numDivisions:null,divisionRange:[1,10],correctX:-2.5},alignment:"default"}}},h={content:`$E=2.5$

**Move the dot to $-E$ on the number line.**


[[☃ number-line 1]]`,images:{},widgets:{"number-line 1":{type:"number-line",alignment:"default",static:!1,graded:!0,options:{static:!1,range:[0,1],labelRange:[null,null],labelStyle:"improper",labelTicks:!1,isInequality:!1,divisionRange:[1,12],numDivisions:1,snapDivisions:1,tickStep:null,correctRel:"eq",correctX:.5,initialX:null,showTooltips:!1,isTickCtrl:!0}}}},y={content:"[[☃ number-line 1]]",images:{},widgets:{"number-line 1":{type:"number-line",options:{correctRel:"le",correctX:-1,divisionRange:[1,12],initialX:-5,isInequality:!0,labelRange:[null,null],labelStyle:"decimal",labelTicks:!0,numDivisions:null,range:[-5,5],showTooltips:!1,snapDivisions:1,static:!1,tickStep:1}}}},$={title:"Widgets/Number Line",component:v,tags:["!dev"],parameters:{docs:{description:{component:"A widget that displays a number line for marking positions, points, and intervals,                    allowing users to demonstrate number sense and mathematical operations."}}}},e={args:{item:i({question:f})}},n={args:{item:i({question:h})}},t={args:{item:i({question:f}),startAnswerless:!0}},s={args:{item:i({question:y})}};var r,a,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    })
  }
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};var l,u,m;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question2
    })
  }
}`,...(m=(u=n.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var c,p,g;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    }),
    startAnswerless: true
  }
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var d,b,q;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: inequality
    })
  }
}`,...(q=(b=s.parameters)==null?void 0:b.docs)==null?void 0:q.source}}};const X=["BasicQuestion","ShowTickController","WithAnswerlessData","Inequality"];export{e as BasicQuestion,s as Inequality,n as ShowTickController,t as WithAnswerlessData,X as __namedExportsOrder,$ as default};
