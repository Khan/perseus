import{dc as n,cL as p}from"./iframe-B7jCOty_.js";import{S as w}from"./server-item-renderer-with-debug-ui-Bjf5Wzf5.js";import"./split-view-DShA4TOb.js";import"./test-keypad-context-wrapper-B43RCEQl.js";import"./server-item-renderer-DsVgY6_U.js";import"./hints-renderer-CEDzZJBN.js";const b={content:`![](https://ka-perseus-graphie.s3.amazonaws.com/3e6d0981127dea205c2becc0ead24702fbe862a1.png)

=====

[[☃ group 1]]

[[☃ group 2]]`,images:{"https://ka-perseus-graphie.s3.amazonaws.com/3e6d0981127dea205c2becc0ead24702fbe862a1.png":{height:480,width:428}},widgets:{"group 1":{graded:!0,options:{content:`**In one week, how many more hours are in the periods with a $35$ percent discount than in the periods with the regular price?**

[[☃ radio 1]]`,images:{},widgets:{"radio 1":{graded:!0,options:{choices:[{content:"$45$",correct:!1},{content:"$42$",correct:!1},{content:"$30$",correct:!1,clue:"Here's a clue, this isn't the correct answer!"},{content:"$18$",correct:!1},{content:"$15$",correct:!0}],displayCount:null,multipleSelect:!1,noneOfTheAbove:!1,onePerLine:!0,randomize:!1,numCorrect:1},type:"radio",version:{major:0,minor:0}}}},type:"group",version:{major:0,minor:0}},"group 2":{graded:!0,options:{content:`**What is $\\redD{\\text{A}}$ rounded to the nearest ten?**   

[[☃ numeric-input 1]]

**What is $\\redD{\\text{A}}$ rounded to the nearest hundred?**   

[[☃ numeric-input 2]]

[[☃ image 1]]

`,images:{"web+graphie://ka-perseus-graphie.s3.amazonaws.com/3351ccf19e60c28a1d08664f5c16defa76ed0348":{height:80,width:380}},widgets:{"image 1":{alignment:"block",graded:!0,options:{alt:"A number line labeled 200 to 300 with tick marks at every 5 units. The tick marks at 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, and 300 are labeled. A red circle labeled A is between 220 tick mark and 230 tick mark.",backgroundImage:{height:80,url:"web+graphie://ka-perseus-graphie.s3.amazonaws.com/3351ccf19e60c28a1d08664f5c16defa76ed0348",width:380},box:[380,80],caption:"",labels:[],range:[[0,10],[0,10]],static:!1,title:""},static:!1,type:"image",version:{major:0,minor:0}},"numeric-input 1":{alignment:"default",graded:!0,options:{answers:[{maxError:null,message:"",simplify:"required",status:"correct",strict:!1,value:230}],coefficient:!1,labelText:"value rounded to the nearest ten",rightAlign:!1,size:"normal",static:!1},static:!1,type:"numeric-input",version:{major:0,minor:0}},"numeric-input 2":{alignment:"default",graded:!0,options:{answers:[{maxError:null,message:"",simplify:"required",status:"correct",strict:!1,value:200}],coefficient:!1,labelText:"value rounded to the nearest hundred",rightAlign:!1,size:"normal",static:!1},static:!1,type:"numeric-input",version:{major:0,minor:0}}}},type:"group",version:{major:0,minor:0}},"radio 1":{graded:!0,options:{choices:[{content:"",correct:!1},{content:"",correct:!1},{content:"",correct:!1},{content:"",correct:!1},{content:"",correct:!0}],displayCount:null,multipleSelect:!1,noneOfTheAbove:!1,onePerLine:!0,randomize:!1,numCorrect:1},type:"radio",version:{major:0,minor:0}}}};function g(){const f=n({content:`Group Renderer

[[☃ dropdown 1]]`,widgets:{"dropdown 1":{type:"dropdown",options:{choices:[{content:"Incorrect",correct:!1},{content:"Correct",correct:!0}],placeholder:"Choose an answer",static:!1}}}}),h=n({content:`Item Renderer

[[☃ group 1]]`,widgets:{"group 1":{type:"group",options:f}}});return p({question:h})}const T={title:"Perseus/Widgets/Group",component:w},e={args:{item:p({question:b})}},t={args:{item:g()}},r={args:{item:g(),startAnswerless:!0}};var s,o,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    })
  }
}`,...(a=(o=e.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};var i,c,u;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    item: getFullGroupTestItem()
  }
}`,...(u=(c=t.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var l,d,m;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    item: getFullGroupTestItem(),
    startAnswerless: true
  }
}`,...(m=(d=r.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const x=["Question1","Answerful","Answerless"];export{t as Answerful,r as Answerless,e as Question1,x as __namedExportsOrder,T as default};
