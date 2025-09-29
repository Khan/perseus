import{aJ as n}from"./iframe-BRRXc9Qf.js";import{S as f}from"./server-item-renderer-with-debug-ui-CY5AJYNo.js";import"./server-item-renderer-sVF9rCGW.js";import"./hints-renderer-CBS4qmP1.js";import"./main-BWbTXVvO.js";import"./test-keypad-context-wrapper-BuAtX6Oe.js";import"./Popper-C374ZHB_.js";const y={content:`**Without using a calculator, put the numbers in order  from least to greatest.**  

[[☃ orderer 1]]`,images:{},widgets:{"orderer 1":{version:{major:0,minor:0},type:"orderer",graded:!0,options:{otherOptions:[],layout:"horizontal",options:[{content:"$10.9$",images:{},widgets:{}},{content:"$11$",images:{},widgets:{}},{content:"$\\sqrt{120}$",images:{},widgets:{}}],correctOptions:[{content:"$10.9$",images:{},widgets:{}},{content:"$\\sqrt{120}$",images:{},widgets:{}},{content:"$11$",images:{},widgets:{}}],height:"normal"}}}},z={content:`**Without using a calculator, put the numbers in order  from least to greatest.**  

[[☃ orderer 1]]`,images:{},widgets:{"orderer 1":{version:{major:0,minor:0},type:"orderer",graded:!0,options:{otherOptions:[],layout:"horizontal",options:[{content:"1",images:{},widgets:{}},{content:"3",images:{},widgets:{}},{content:"2",images:{},widgets:{}}],correctOptions:[{content:"1",images:{},widgets:{}},{content:"2",images:{},widgets:{}},{content:"3",images:{},widgets:{}}],height:"normal"}}}},q={content:`**Put $6$ flowers in the box.**

[[☃ orderer 1]]`,images:{},widgets:{"orderer 1":{graded:!0,options:{correctOptions:[{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}},{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}},{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}},{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}},{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}},{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}}],height:"auto",layout:"horizontal",options:[{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}}],otherOptions:[]},type:"orderer",version:{major:0,minor:0}}}},b={content:`**Arrange these numbers in order from 1 to 10.**  

This tests horizontal layout with many cards to ensure no wrapping occurs.

[[☃ orderer 1]]`,images:{},widgets:{"orderer 1":{version:{major:0,minor:0},type:"orderer",graded:!0,options:{otherOptions:[],layout:"horizontal",options:[{content:"1",images:{},widgets:{}},{content:"2",images:{},widgets:{}},{content:"3",images:{},widgets:{}},{content:"4",images:{},widgets:{}},{content:"5",images:{},widgets:{}},{content:"6",images:{},widgets:{}},{content:"7",images:{},widgets:{}},{content:"8",images:{},widgets:{}},{content:"9",images:{},widgets:{}},{content:"10",images:{},widgets:{}}],correctOptions:[{content:"1",images:{},widgets:{}},{content:"2",images:{},widgets:{}},{content:"3",images:{},widgets:{}},{content:"4",images:{},widgets:{}},{content:"5",images:{},widgets:{}},{content:"6",images:{},widgets:{}},{content:"7",images:{},widgets:{}},{content:"8",images:{},widgets:{}},{content:"9",images:{},widgets:{}},{content:"10",images:{},widgets:{}}],height:"normal"}}}},A={title:"Widgets/Orderer",component:f,tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to arrange items in a specific order by dragging and dropping,                    enabling sequencing and sorting activities."}}}},e={args:{item:n({question:y})}},t={args:{item:n({question:q})}},s={args:{item:n({question:z}),startAnswerless:!0}},o={name:"Many Cards (LEMS-3424 Horizontal Layout Regression Test)",args:{item:n({question:b})},parameters:{docs:{description:{story:"Tests horizontal layout with 10 cards to ensure they don't wrap to multiple rows. This is a visual regression test for the CSS reset removal bug that caused cards to wrap. All cards should remain in a single horizontal line with horizontal scrolling if needed."}}}};var r,a,i;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    })
  }
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var d,g,m;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithImages
    })
  }
}`,...(m=(g=t.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var c,p,u;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question2
    }),
    startAnswerless: true
  }
}`,...(u=(p=s.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var w,h,l;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Many Cards (LEMS-3424 Horizontal Layout Regression Test)",
  args: {
    item: generateTestPerseusItem({
      question: questionWithManyCards
    })
  },
  parameters: {
    docs: {
      description: {
        story: "Tests horizontal layout with 10 cards to ensure they don't wrap to multiple rows. " + "This is a visual regression test for the CSS reset removal bug that caused cards to wrap. " + "All cards should remain in a single horizontal line with horizontal scrolling if needed."
      }
    }
  }
}`,...(l=(h=o.parameters)==null?void 0:h.docs)==null?void 0:l.source}}};const C=["Question1","QuestionWithImages","Answerless","ManyCardsHorizontalLayout"];export{s as Answerless,o as ManyCardsHorizontalLayout,e as Question1,t as QuestionWithImages,C as __namedExportsOrder,A as default};
