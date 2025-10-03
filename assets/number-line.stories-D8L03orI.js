import{aJ as i}from"./iframe-CnVpoeZy.js";import{S as v}from"./server-item-renderer-with-debug-ui-ByQceIk3.js";import"./server-item-renderer-CBnujpVD.js";import"./hints-renderer-Ba8FYBgn.js";import"./main-CYSC3J8g.js";import"./test-keypad-context-wrapper-jlCdn00B.js";import"./Popper-2OtnpGcr.js";const f={content:`$E=2.5$

**Move the dot to $-E$ on the number line.**


[[☃ number-line 1]]`,images:{},widgets:{"number-line 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"number-line",options:{labelRange:[null,null],initialX:null,tickStep:1,labelStyle:"decimal",labelTicks:!0,isInequality:!1,snapDivisions:2,range:[-4,4],static:!1,correctRel:"eq",numDivisions:null,divisionRange:[1,10],correctX:-2.5,isTickCtrl:!1},alignment:"default"}}},T={content:`Move the number to 2


[[☃ number-line 1]]`,images:{},widgets:{"number-line 1":{type:"number-line",alignment:"default",static:!1,graded:!0,options:{static:!1,range:[0,10],labelRange:[null,null],labelStyle:"improper",labelTicks:!1,isInequality:!1,divisionRange:[1,10],numDivisions:1,snapDivisions:1,tickStep:null,correctRel:"eq",correctX:2,initialX:null,showTooltips:!1,isTickCtrl:!0}}}},k={content:"[[☃ number-line 1]]",images:{},widgets:{"number-line 1":{type:"number-line",options:{correctRel:"le",correctX:-1,divisionRange:[1,12],initialX:-5,isInequality:!0,labelRange:[null,null],labelStyle:"decimal",labelTicks:!0,numDivisions:null,range:[-5,5],showTooltips:!1,snapDivisions:1,static:!1,tickStep:1,isTickCtrl:!1}}}},C={title:"Widgets/Number Line",component:v,tags:["!dev"],parameters:{docs:{description:{component:"A widget that displays a number line for marking positions, points, and intervals,                    allowing users to demonstrate number sense and mathematical operations."}}}},e={args:{item:i({question:f})}},t={args:{item:i({question:T})}},s={args:{item:i({question:f}),startAnswerless:!0}},n={args:{item:i({question:k})}};var r,a,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    })
  }
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};var l,u,c;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: tickCtrl
    })
  }
}`,...(c=(u=t.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};var m,p,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    }),
    startAnswerless: true
  }
}`,...(g=(p=s.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var d,b,q;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: inequality
    })
  }
}`,...(q=(b=n.parameters)==null?void 0:b.docs)==null?void 0:q.source}}};const X=["BasicQuestion","ShowTickController","WithAnswerlessData","Inequality"];export{e as BasicQuestion,n as Inequality,t as ShowTickController,s as WithAnswerlessData,X as __namedExportsOrder,C as default};
