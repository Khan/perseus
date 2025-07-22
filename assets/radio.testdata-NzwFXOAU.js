var i=Object.defineProperty;var s=(n,e,t)=>e in n?i(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var a=(n,e,t)=>(s(n,typeof e!="symbol"?e+"":e,t),t);function o(){return new r}class r{constructor(){a(this,"content","[[☃ radio 1]]");a(this,"choices",[]);a(this,"countChoices");a(this,"hasNoneOfTheAbove");a(this,"multipleSelect");a(this,"randomize")}build(){return{content:this.content,images:{},widgets:{"radio 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"radio",alignment:"default",options:{choices:this.choices,hasNoneOfTheAbove:this.hasNoneOfTheAbove,multipleSelect:this.multipleSelect,countChoices:this.countChoices,randomize:this.randomize}}}}}withContent(e){return this.content=e,this}withCountChoices(e){return this.countChoices=e,this}withHasNoneOfTheAbove(e){return this.hasNoneOfTheAbove=e,this}withMultipleSelect(e){return this.multipleSelect=e,this}withRandomize(e){return this.randomize=e,this}addChoice(e,t){return this.choices.push({content:e,correct:t==null?void 0:t.correct,rationale:t==null?void 0:t.rationale,isNoneOfTheAbove:t==null?void 0:t.isNoneOfTheAbove}),this}}const h=o().withContent(`Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?

[[☃ radio 1]]

`).addChoice("$-8$ and $8$",{correct:!1,rationale:"The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$."}).addChoice("$-8$",{correct:!1,rationale:"While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number."}).addChoice("$8$",{correct:!0,rationale:"$8$ is the positive square root of $64$."}).addChoice("No value of $x$ satisfies the equation.",{correct:!1,rationale:"$8$ satisfies the equation."}).build(),l={content:`Read the following passage:

[[☃ passage 1]]

Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?

[[☃ radio 1]]

`,images:{},widgets:{"radio 1":{graded:!0,version:{major:1,minor:0},static:!1,type:"radio",options:{choices:[{content:"$-8$ and $8$",correct:!1,rationale:"The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$."},{content:"$-8$",correct:!1,rationale:"While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number."},{content:`$8$ {{passage-ref 1 1}}

`,correct:!0,isNoneOfTheAbove:!1,rationale:"$8$ is the positive square root of $64$."},{content:"No value of $x$ satisfies the equation.",correct:!1,isNoneOfTheAbove:!1,rationale:"$8$ satisfies the equation."}],countChoices:!1,hasNoneOfTheAbove:!1,multipleSelect:!1,randomize:!1,deselectEnabled:!1},alignment:"default"},"passage 1":{alignment:"default",graded:!0,options:{footnotes:"",passageText:"Here's a passage about the positive square root. It contains a {{reference to something}}.",passageTitle:"",showLineNumbers:!0,static:!1},static:!1,type:"passage",version:{major:0,minor:0}}}},d={content:"The following options have images. All but one of them should be on their own line. [[☃ radio 1]]",images:{},widgets:{"radio 1":{graded:!0,version:{major:1,minor:0},static:!1,type:"radio",options:{choices:[{content:`Same 
Line
![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)
Same
Line`,correct:!1,rationale:"The markdown only has single lines between each item, so they should be treated as one complete line."},{content:`Text 

Before

![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)`,correct:!1,rationale:"There are two 'new line' characters between the preceding text and the image. Therefore, the image should be on its own line."},{content:`![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)

Text 

After`,correct:!1,rationale:"There are two 'new line' characters between the image and the text that follows. Therefore, the image should be on its own line."},{content:`Text 

Before

![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)

Text 

After`,correct:!1,rationale:"There are two 'new line' characters between the image and the text that surrounds it. Therefore, the image should be on its own line."},{content:"![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",correct:!1,rationale:"The markdown only has an image (no text), so nothing should be adjusted."},{content:`![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)

![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)`,correct:!1,rationale:"The markdown has two images (no text) with two 'new line' characters between them, so they should be on their own lines."}],countChoices:!1,hasNoneOfTheAbove:!1,multipleSelect:!1,randomize:!1,deselectEnabled:!1},alignment:"default"},"passage 1":{alignment:"default",graded:!0,options:{footnotes:"",passageText:"Here's a passage about the positive square root. It contains a {{reference to something}}.",passageTitle:"",showLineNumbers:!0,static:!1},static:!1,type:"passage",version:{major:0,minor:0}}}},f=o().withContent(`Select 9 ponies.[[☃ radio 1]]

`).addChoice("![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",{correct:!0,rationale:"Count the ponies in the image."}).addChoice("![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)",{correct:!1,rationale:"Count the ponies in the image."}).addChoice("![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)",{correct:!1,rationale:"Count the ponies in the image."}).build(),u={content:`Which are the same as the number 75?[[☃ radio 1]]

`,images:{},widgets:{"radio 1":{graded:!0,version:{major:1,minor:0},static:!1,type:"radio",options:{choices:[{content:"$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",correct:!0,rationale:"Add the following numbers to get 75."},{content:"$100-50$",correct:!1,rationale:"Subtract the following numbers."},{content:"$200-125+10$",correct:!1,isNoneOfTheAbove:!1,rationale:"Calculate the following numbers."},{content:"$10+10+10+10$",correct:!1,isNoneOfTheAbove:!1,rationale:"Add the following numbers."}],countChoices:!1,hasNoneOfTheAbove:!1,multipleSelect:!1,randomize:!1,deselectEnabled:!1},alignment:"default"},"passage 1":{alignment:"default",graded:!0,options:{footnotes:"",passageText:"Here's a passage about the positive square root. It contains a {{reference to something}}.",passageTitle:"",showLineNumbers:!0,static:!1},static:!1,type:"passage",version:{major:0,minor:0}}}},m=o().withContent(`**Select all input values for which $g(x)=2$.**

[[☃ radio 1]]

 ![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/4613e0d9c906b3053fb5523eed83d4f779fdf6bb)`).addChoice("$x=-6$",{correct:!1}).addChoice("$x=4$",{correct:!1}).addChoice("$x=7$",{correct:!1,isNoneOfTheAbove:!1}).addChoice("There is no such input value.",{correct:!0,isNoneOfTheAbove:!0}).withHasNoneOfTheAbove(!0).withMultipleSelect(!0).withRandomize(!1).build(),p=o().withContent(`What are some ways to say hello?

[[☃ radio 1]]`).addChoice("Hola",{correct:!0,rationale:"The Spanish-speaking countries typically say Hola."}).addChoice("Hey",{correct:!0,rationale:"This is used to attract someone's attention."}).addChoice("Hi",{correct:!0,rationale:"This is used as friendly greeting."}).addChoice("Goodbye",{correct:!1,rationale:"Some people like to say Goodbye."}).addChoice("None of these",{correct:!1,isNoneOfTheAbove:!0}).withHasNoneOfTheAbove(!0).withMultipleSelect(!0).build(),g=o().withContent(`Which are the same as the number 75?

[[☃ radio 1]]`).addChoice("$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",{correct:!0,rationale:"Add the following numbers to get 75."}).addChoice("$5+4+1+9+1+2+2+2+2+2+3+3+3+1+4+4+2+5+5+10+3+2$",{correct:!0,rationale:"Add the following numbers to get 75."}).addChoice("$10+10+10+10+10+10+10+5$",{correct:!0,rationale:"Add the following numbers to get 75."}).addChoice("$10+10+10+10+10+10+10+3+2$",{correct:!1,rationale:"Add the following numbers to get 75."}).addChoice("None of these",{correct:!1,isNoneOfTheAbove:!0}).withHasNoneOfTheAbove(!0).withMultipleSelect(!0).withRandomize(!1).build();o().withContent("[[☃ radio 1]]").addChoice("Incorrect Choice 1",{correct:!1}).addChoice("Incorrect Choice 2",{correct:!1}).addChoice("Correct Choice",{correct:!0}).addChoice("Incorrect Choice 3",{correct:!1}).withRandomize(!0).build();o().withContent("[[☃ radio 1]]").addChoice("Incorrect Choice 1",{correct:!1}).addChoice("Incorrect Choice 2",{correct:!1}).addChoice("Incorrect Choice 3",{correct:!1}).addChoice("Incorrect Choice 4",{correct:!1}).addChoice("None of the above",{correct:!0,isNoneOfTheAbove:!0}).withHasNoneOfTheAbove(!0).withRandomize(!0).build();o().withContent(`**Select the correct choice. This tests the LEMS-2909 bug fix.**

[[☃ radio 1]]`).addChoice("Choice A",{correct:void 0}).addChoice("Choice B",{correct:!0}).addChoice("Choice C",{correct:void 0}).withMultipleSelect(!0).withRandomize(!0).build();export{f as S,l as a,u as b,d as c,p as d,g as e,m,h as q};
