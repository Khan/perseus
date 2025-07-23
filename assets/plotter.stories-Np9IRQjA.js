import{cU as n}from"./iframe-C_FVBbyS.js";import{S as P}from"./server-item-renderer-with-debug-ui-BHD5bqKz.js";import"./server-item-renderer-BY7itV5_.js";import"./hints-renderer-BBvEvVOB.js";import"./main-DwHc-YzP.js";import"./test-keypad-context-wrapper-Cba1S9fm.js";import"./Popper-B75AFG2E.js";const h={content:`The elementary school principal asked teachers to report the number of students absent in each grade during the past week.

**Create a bar graph to show how many students were absent in each grade.**

School grade | Number of absent students  
:- | :-: 
$1^{\\text{st}} \\text{ grade}$ | $15$ 
$2^{\\text{nd}} \\text{ grade}$ |$25$ 
$3^{\\text{rd}} \\text{ grade}$ | $5$  
$4^{\\text{th}} \\text{ grade}$ | $10$  
$5^{\\text{th}} \\text{ grade}$ | $10$  

[[☃ plotter 1]]

`,images:{},widgets:{"plotter 1":{alignment:"default",graded:!0,options:{categories:["$1^{\\text{st}} \\text{}$","$2^{\\text{nd}} \\text{}$","$3^{\\text{rd}} \\text{}$","$4^{\\text{th}} \\text{}$","$5^{\\text{th}} \\text{}$"],picBoxHeight:300,picSize:300,picUrl:"",plotDimensions:[380,300],correct:[15,25,5,10,10],labelInterval:1,labels:["School grade","Number of absent students"],maxY:30,scaleY:5,snapsPerLine:1,starting:[0,0,0,0,0],type:"bar"},static:!1,type:"plotter",version:{major:0,minor:0}}}},b={content:`Match the horizontal with the vertical.

[[☃ plotter 1]]`,images:{},widgets:{"plotter 1":{type:"plotter",options:{categories:["0","1","2"],plotDimensions:[300,300],correct:[0,1,2],labels:["Horizontal","Vertical"],maxY:2,scaleY:1,snapsPerLine:1,starting:[0,0,0],type:"bar"}}}},w={content:"[[☃ plotter 1]]",images:{},widgets:{"plotter 1":{type:"plotter",options:{correct:[1,1,1,1],starting:[1,1,1,1],type:"dotplot",labels:["","Average Temp"],categories:["Spring","Summer","Fall","Winter"],scaleY:1,maxY:10,snapsPerLine:2,labelInterval:1,plotDimensions:[380,300]}}}},v={title:"Perseus/Widgets/Plotter",component:P},e={args:{item:n({question:h})}},t={args:{item:n({question:h}),startAnswerless:!0}},r={args:{item:n({question:b}),startAnswerless:!0}},s={args:{item:n({question:w}),startAnswerless:!0}};var a,o,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    })
  }
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var l,c,m;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    }),
    startAnswerless: true
  }
}`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var p,u,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: simple
    }),
    startAnswerless: true
  }
}`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var d,$,x;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: dotPlotter
    }),
    startAnswerless: true
  }
}`,...(x=($=s.parameters)==null?void 0:$.docs)==null?void 0:x.source}}};const D=["Basic","AnswerlessPlotter","SimplePlotter","DotPlotter"];export{t as AnswerlessPlotter,e as Basic,s as DotPlotter,r as SimplePlotter,D as __namedExportsOrder,v as default};
