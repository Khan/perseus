import{aJ as e,j as v,t as xe,A as ke}from"./iframe-DY2ryAtZ.js";import{g as ze}from"./feature-flags-util-Vxq3J9D8.js";import{S as Ge}from"./server-item-renderer-RW67PJWA.js";import{q as Be,a as Oe,c as je,o as ye}from"./radio.testdata-C_cN_ddT.js";import{r as i}from"./radio-question-builder-Dx1IeYvx.js";import"./hints-renderer-tAg2QKhI.js";const Ye={title:"Widgets/RadioNew/Visual Regression Tests/Initial State",component:_e,tags:["!dev"],parameters:{docs:{description:{component:"Regression tests for the radio widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page."}},chromatic:{disableSnapshot:!1}}},s={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").build()})}},a={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("None of the above",{isNoneOfTheAbove:!0}).withHasNoneOfTheAbove(!0).build()})}},t={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").withStatic(!0).build()})}},u={args:{item:e({question:i().addChoice("Choice 1").addChoice("Choice 2",{correct:!0}).addChoice("Choice 3").addChoice("Choice 4").build()}),showSolutions:"all"}},r={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").build()}),rtl:!0}},o={args:{item:e({question:Be})}},c={args:{item:e({question:Be}),showSolutions:"all"}},n={args:{item:e({question:Oe})}},l={args:{item:e({question:i().withContent(`Select 9 ponies.[[☃ radio 1]]

`).addChoice("![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",{correct:!0}).addChoice("![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)").addChoice("![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)").build()})}},d={args:{item:e({question:i().addChoice("$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",{correct:!0}).addChoice("$100-50$").addChoice("$200-125+10$").addChoice("$10+10+10+10$").build()})}},m={args:{item:e({question:i().addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",{correct:!0}).addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").build()})}},p={args:{item:e({question:je})}},h={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(!0).build()})}},g={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2",{correct:!0}).addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(!0).withCountChoices(!0).withNumCorrect(2).build()})}},S={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2",{correct:!0}).addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(!0).withStatic(!0).build()})}},C={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3",{correct:!0}).addChoice("Choice 4").withMultipleSelect(!0).build()}),showSolutions:"all"}},f={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2",{correct:!0}).addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(!0).build()}),rtl:!0}},b={args:{item:e({question:i().addChoice("$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",{correct:!0}).addChoice("$100-50$",{correct:!0}).addChoice("$200-125+10$").addChoice("$10+10+10+10$").withMultipleSelect(!0).build()})}},q={args:{item:e({question:i().withContent(`Select 9 ponies.[[☃ radio 1]]

`).addChoice("![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",{correct:!0}).addChoice("![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)",{correct:!0}).addChoice("![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)").withMultipleSelect(!0).build()})}},M={args:{item:e({question:i().addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",{correct:!0}).addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",{correct:!0}).addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").withMultipleSelect(!0).build()})}},w={args:{item:e({question:ye})}};function _e(Ee){const{item:Fe,showSolutions:N,rtl:Re}=Ee;return v.jsx("div",{dir:Re?"rtl":"ltr",children:v.jsx(Ge,{item:Fe,apiOptions:{...ke.defaults,flags:ze({"new-radio-widget":!0})},reviewMode:N==="all",showSolutions:N,dependencies:xe})})}var P,T,I;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").build()
    })
  }
}`,...(I=(T=s.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var D,W,$;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2").addChoice("Choice 3").addChoice("None of the above", {
        isNoneOfTheAbove: true
      }).withHasNoneOfTheAbove(true).build()
    })
  }
}`,...($=(W=a.parameters)==null?void 0:W.docs)==null?void 0:$.source}}};var L,A,Q;t.parameters={...t.parameters,docs:{...(L=t.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").withStatic(true).build()
    })
  }
}`,...(Q=(A=t.parameters)==null?void 0:A.docs)==null?void 0:Q.source}}};var B,E,F;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1")
      // Leaving the correct choice in the second position to test that
      //     the first choice still has a top border.
      .addChoice("Choice 2", {
        correct: true
      }).addChoice("Choice 3").addChoice("Choice 4").build()
    }),
    showSolutions: "all"
  }
}`,...(F=(E=u.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var R,x,k;r.parameters={...r.parameters,docs:{...(R=r.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").build()
    }),
    rtl: true
  }
}`,...(k=(x=r.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var z,G,O;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    // Can't use radioQuestionBuilder here because it also includes a passage widget.
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(O=(G=o.parameters)==null?void 0:G.docs)==null?void 0:O.source}}};var j,y,_;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    showSolutions: "all"
  }
}`,...(_=(y=c.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};var H,V,J;n.parameters={...n.parameters,docs:{...(H=n.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(J=(V=n.parameters)==null?void 0:V.docs)==null?void 0:J.source}}};var K,U,X;l.parameters={...l.parameters,docs:{...(K=l.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().withContent("Select 9 ponies.[[\\u2603 radio 1]]\\n\\n").addChoice("![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)", {
        correct: true
      }).addChoice("![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)").addChoice("![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)").build()
    })
  }
}`,...(X=(U=l.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,Z,ee;d.parameters={...d.parameters,docs:{...(Y=d.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$", {
        correct: true
      }).addChoice("$100-50$").addChoice("$200-125+10$").addChoice("$10+10+10+10$").build()
    })
  }
}`,...(ee=(Z=d.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ie,se,ae;m.parameters={...m.parameters,docs:{...(ie=m.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.", {
        correct: true
      }).addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").build()
    })
  }
}`,...(ae=(se=m.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};var te,ue,re;p.parameters={...p.parameters,docs:{...(te=p.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithGraphie
    })
  }
}`,...(re=(ue=p.parameters)==null?void 0:ue.docs)==null?void 0:re.source}}};var oe,ce,ne;h.parameters={...h.parameters,docs:{...(oe=h.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(true).build()
    })
  }
}`,...(ne=(ce=h.parameters)==null?void 0:ce.docs)==null?void 0:ne.source}}};var le,de,me;g.parameters={...g.parameters,docs:{...(le=g.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2", {
        correct: true
      }).addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(true).withCountChoices(true).withNumCorrect(2).build()
    })
  }
}`,...(me=(de=g.parameters)==null?void 0:de.docs)==null?void 0:me.source}}};var pe,he,ge;S.parameters={...S.parameters,docs:{...(pe=S.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2", {
        correct: true
      }).addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(true).withStatic(true).build()
    })
  }
}`,...(ge=(he=S.parameters)==null?void 0:he.docs)==null?void 0:ge.source}}};var Se,Ce,fe;C.parameters={...C.parameters,docs:{...(Se=C.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      })
      // Tests that borders between separate correct answers are hidden properly
      .addChoice("Choice 2").addChoice("Choice 3", {
        correct: true
      })
      // Leaving the last choice as not correct to test that there is still a bottom border
      // (i.e. the removal of the border only affects the top of the choice, not the whole choice.)
      .addChoice("Choice 4").withMultipleSelect(true).build()
    }),
    showSolutions: "all"
  }
}`,...(fe=(Ce=C.parameters)==null?void 0:Ce.docs)==null?void 0:fe.source}}};var be,qe,Me;f.parameters={...f.parameters,docs:{...(be=f.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2", {
        correct: true
      }).addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(true).build()
    }),
    rtl: true
  }
}`,...(Me=(qe=f.parameters)==null?void 0:qe.docs)==null?void 0:Me.source}}};var we,Ne,ve;b.parameters={...b.parameters,docs:{...(we=b.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$", {
        correct: true
      }).addChoice("$100-50$", {
        correct: true
      }).addChoice("$200-125+10$").addChoice("$10+10+10+10$").withMultipleSelect(true).build()
    })
  }
}`,...(ve=(Ne=b.parameters)==null?void 0:Ne.docs)==null?void 0:ve.source}}};var Pe,Te,Ie;q.parameters={...q.parameters,docs:{...(Pe=q.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().withContent("Select 9 ponies.[[\\u2603 radio 1]]\\n\\n").addChoice("![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)", {
        correct: true
      }).addChoice("![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)", {
        correct: true
      }).addChoice("![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)").withMultipleSelect(true).build()
    })
  }
}`,...(Ie=(Te=q.parameters)==null?void 0:Te.docs)==null?void 0:Ie.source}}};var De,We,$e;M.parameters={...M.parameters,docs:{...(De=M.parameters)==null?void 0:De.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.", {
        correct: true
      }).addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.", {
        correct: true
      }).addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").withMultipleSelect(true).build()
    })
  }
}`,...($e=(We=M.parameters)==null?void 0:We.docs)==null?void 0:$e.source}}};var Le,Ae,Qe;w.parameters={...w.parameters,docs:{...(Le=w.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: overflowContentInGradedGroupSet
    })
  }
}`,...(Qe=(Ae=w.parameters)==null?void 0:Ae.docs)==null?void 0:Qe.source}}};const Ze=["SingleSelect","SingleSelectWithNoneOfTheAbove","SingleSelectStatic","SingleSelectShowSolutions","SingleSelectRTL","SingleSelectWithPassageRef","SingleSelectWithRationale","SingleSelectWithImages","SingleSelectWithImagesAndScroll","SingleSelectWithLongMathjax","SingleSelectWithLongText","SingleSelectWithGraphie","MultiSelect","MultiSelectCountChoices","MultiSelectStatic","MultiSelectShowSolutions","MultiSelectRTL","MultiSelectWithLongMathjax","MultiSelectWithImagesAndScroll","MultiSelectWithLongText","GradedGroupSetWithScroll"];export{w as GradedGroupSetWithScroll,h as MultiSelect,g as MultiSelectCountChoices,f as MultiSelectRTL,C as MultiSelectShowSolutions,S as MultiSelectStatic,q as MultiSelectWithImagesAndScroll,b as MultiSelectWithLongMathjax,M as MultiSelectWithLongText,s as SingleSelect,r as SingleSelectRTL,u as SingleSelectShowSolutions,t as SingleSelectStatic,p as SingleSelectWithGraphie,n as SingleSelectWithImages,l as SingleSelectWithImagesAndScroll,d as SingleSelectWithLongMathjax,m as SingleSelectWithLongText,a as SingleSelectWithNoneOfTheAbove,o as SingleSelectWithPassageRef,c as SingleSelectWithRationale,Ze as __namedExportsOrder,Ye as default};
