import{h as r}from"./iframe-Bn4eIUvs.js";import{S as u}from"./server-item-renderer-with-debug-ui-DOh-qfkl.js";import"./server-item-renderer-dzpsa8GX.js";import"./hints-renderer-Wq2tBpaB.js";import"./main-Bkq2FLDV.js";import"./test-keypad-context-wrapper-C5MdB7iA.js";import"./Popper-Dl2z8Wek.js";const f={content:`**Without using a calculator, put the numbers in order  from least to greatest.**  

[[☃ orderer 1]]`,images:{},widgets:{"orderer 1":{version:{major:0,minor:0},type:"orderer",graded:!0,options:{otherOptions:[],layout:"horizontal",options:[{content:"$10.9$",images:{},widgets:{}},{content:"$11$",images:{},widgets:{}},{content:"$\\sqrt{120}$",images:{},widgets:{}}],correctOptions:[{content:"$10.9$",images:{},widgets:{}},{content:"$\\sqrt{120}$",images:{},widgets:{}},{content:"$11$",images:{},widgets:{}}],height:"normal"}}}},h={content:`**Without using a calculator, put the numbers in order  from least to greatest.**  

[[☃ orderer 1]]`,images:{},widgets:{"orderer 1":{version:{major:0,minor:0},type:"orderer",graded:!0,options:{otherOptions:[],layout:"horizontal",options:[{content:"1",images:{},widgets:{}},{content:"3",images:{},widgets:{}},{content:"2",images:{},widgets:{}}],correctOptions:[{content:"1",images:{},widgets:{}},{content:"2",images:{},widgets:{}},{content:"3",images:{},widgets:{}}],height:"normal"}}}},w={content:`**Put $6$ flowers in the box.**

[[☃ orderer 1]]`,images:{},widgets:{"orderer 1":{graded:!0,options:{correctOptions:[{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}},{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}},{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}},{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}},{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}},{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}}],height:"auto",layout:"horizontal",options:[{content:"![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",widgets:{},images:{}}],otherOptions:[]},type:"orderer",version:{major:0,minor:0}}}},W={title:"Widgets/Orderer",component:u,tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to arrange items in a specific order by dragging and dropping,                    enabling sequencing and sorting activities."}}}},e={args:{item:r({question:f})}},t={args:{item:r({question:w})}},s={args:{item:r({question:h}),startAnswerless:!0}};var o,n,a;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    })
  }
}`,...(a=(n=e.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var i,d,g;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithImages
    })
  }
}`,...(g=(d=t.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var m,c,p;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question2
    }),
    startAnswerless: true
  }
}`,...(p=(c=s.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const k=["Question1","QuestionWithImages","Answerless"];export{s as Answerless,e as Question1,t as QuestionWithImages,k as __namedExportsOrder,W as default};
