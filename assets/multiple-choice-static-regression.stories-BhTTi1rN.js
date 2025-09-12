import{aH as e,j as N,aP as Qe,A as Be}from"./iframe-Da-XUY9i.js";import{g as Ee}from"./feature-flags-util-Vxq3J9D8.js";import{S as Fe}from"./server-item-renderer-D6olF1dJ.js";import{q as xe,a as Re,c as ke,o as ze}from"./radio.testdata-C_cN_ddT.js";import{r as i}from"./radio-question-builder-Dx1IeYvx.js";import"./hints-renderer-BRCX49so.js";const Je={title:"Widgets/RadioNew/Visual Regression Tests/Static",component:Ge,tags:["!dev"],parameters:{docs:{description:{component:"Regression tests for the radio widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page."}},chromatic:{disableSnapshot:!1}}},s={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").build()})}},a={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("None of the above",{isNoneOfTheAbove:!0}).withHasNoneOfTheAbove(!0).build()})}},t={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").withStatic(!0).build()})}},u={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").build()}),showSolutions:"all"}},r={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").build()}),rtl:!0}},c={args:{item:e({question:xe})}},o={args:{item:e({question:Re})}},n={args:{item:e({question:i().withContent(`Select 9 ponies.[[☃ radio 1]]

`).addChoice("![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",{correct:!0}).addChoice("![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)").addChoice("![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)").build()})}},l={args:{item:e({question:i().addChoice("$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",{correct:!0}).addChoice("$100-50$").addChoice("$200-125+10$").addChoice("$10+10+10+10$").build()})}},d={args:{item:e({question:i().addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",{correct:!0}).addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").build()})}},m={args:{item:e({question:ke})}},p={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(!0).build()})}},h={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2",{correct:!0}).addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(!0).withCountChoices(!0).withNumCorrect(2).build()})}},g={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2",{correct:!0}).addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(!0).withStatic(!0).build()})}},C={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2",{correct:!0}).addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(!0).build()}),showSolutions:"all"}},S={args:{item:e({question:i().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2",{correct:!0}).addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(!0).build()}),rtl:!0}},f={args:{item:e({question:i().addChoice("$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",{correct:!0}).addChoice("$100-50$",{correct:!0}).addChoice("$200-125+10$").addChoice("$10+10+10+10$").withMultipleSelect(!0).build()})}},b={args:{item:e({question:i().withContent(`Select 9 ponies.[[☃ radio 1]]

`).addChoice("![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",{correct:!0}).addChoice("![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)",{correct:!0}).addChoice("![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)").withMultipleSelect(!0).build()})}},q={args:{item:e({question:i().addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",{correct:!0}).addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",{correct:!0}).addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").withMultipleSelect(!0).build()})}},M={args:{item:e({question:ze})}};function Ge(We){const{item:Le,showSolutions:w,rtl:Ae}=We;return N.jsx("div",{dir:Ae?"rtl":"ltr",children:N.jsx(Fe,{item:Le,apiOptions:{...Be.defaults,flags:Ee({"new-radio-widget":!0})},reviewMode:w==="all",showSolutions:w,dependencies:Qe})})}var v,P,T;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").build()
    })
  }
}`,...(T=(P=s.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var D,I,$;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2").addChoice("Choice 3").addChoice("None of the above", {
        isNoneOfTheAbove: true
      }).withHasNoneOfTheAbove(true).build()
    })
  }
}`,...($=(I=a.parameters)==null?void 0:I.docs)==null?void 0:$.source}}};var W,L,A;t.parameters={...t.parameters,docs:{...(W=t.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").withStatic(true).build()
    })
  }
}`,...(A=(L=t.parameters)==null?void 0:L.docs)==null?void 0:A.source}}};var Q,B,E;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").build()
    }),
    showSolutions: "all"
  }
}`,...(E=(B=u.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var F,x,R;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").build()
    }),
    rtl: true
  }
}`,...(R=(x=r.parameters)==null?void 0:x.docs)==null?void 0:R.source}}};var k,z,G;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    // Can't use radioQuestionBuilder here because it also includes a passage widget.
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(G=(z=c.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var O,j,H;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(H=(j=o.parameters)==null?void 0:j.docs)==null?void 0:H.source}}};var _,y,V;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().withContent("Select 9 ponies.[[\\u2603 radio 1]]\\n\\n").addChoice("![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)", {
        correct: true
      }).addChoice("![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)").addChoice("![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)").build()
    })
  }
}`,...(V=(y=n.parameters)==null?void 0:y.docs)==null?void 0:V.source}}};var J,K,U;l.parameters={...l.parameters,docs:{...(J=l.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$", {
        correct: true
      }).addChoice("$100-50$").addChoice("$200-125+10$").addChoice("$10+10+10+10$").build()
    })
  }
}`,...(U=(K=l.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var X,Y,Z;d.parameters={...d.parameters,docs:{...(X=d.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.", {
        correct: true
      }).addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").build()
    })
  }
}`,...(Z=(Y=d.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,ie,se;m.parameters={...m.parameters,docs:{...(ee=m.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithGraphie
    })
  }
}`,...(se=(ie=m.parameters)==null?void 0:ie.docs)==null?void 0:se.source}}};var ae,te,ue;p.parameters={...p.parameters,docs:{...(ae=p.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(true).build()
    })
  }
}`,...(ue=(te=p.parameters)==null?void 0:te.docs)==null?void 0:ue.source}}};var re,ce,oe;h.parameters={...h.parameters,docs:{...(re=h.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2", {
        correct: true
      }).addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(true).withCountChoices(true).withNumCorrect(2).build()
    })
  }
}`,...(oe=(ce=h.parameters)==null?void 0:ce.docs)==null?void 0:oe.source}}};var ne,le,de;g.parameters={...g.parameters,docs:{...(ne=g.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2", {
        correct: true
      }).addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(true).withStatic(true).build()
    })
  }
}`,...(de=(le=g.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var me,pe,he;C.parameters={...C.parameters,docs:{...(me=C.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2", {
        correct: true
      }).addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(true).build()
    }),
    showSolutions: "all"
  }
}`,...(he=(pe=C.parameters)==null?void 0:pe.docs)==null?void 0:he.source}}};var ge,Ce,Se;S.parameters={...S.parameters,docs:{...(ge=S.parameters)==null?void 0:ge.docs,source:{originalSource:`{
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
}`,...(Se=(Ce=S.parameters)==null?void 0:Ce.docs)==null?void 0:Se.source}}};var fe,be,qe;f.parameters={...f.parameters,docs:{...(fe=f.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$", {
        correct: true
      }).addChoice("$100-50$", {
        correct: true
      }).addChoice("$200-125+10$").addChoice("$10+10+10+10$").withMultipleSelect(true).build()
    })
  }
}`,...(qe=(be=f.parameters)==null?void 0:be.docs)==null?void 0:qe.source}}};var Me,we,Ne;b.parameters={...b.parameters,docs:{...(Me=b.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().withContent("Select 9 ponies.[[\\u2603 radio 1]]\\n\\n").addChoice("![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)", {
        correct: true
      }).addChoice("![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)", {
        correct: true
      }).addChoice("![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)").withMultipleSelect(true).build()
    })
  }
}`,...(Ne=(we=b.parameters)==null?void 0:we.docs)==null?void 0:Ne.source}}};var ve,Pe,Te;q.parameters={...q.parameters,docs:{...(ve=q.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.", {
        correct: true
      }).addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.", {
        correct: true
      }).addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").addChoice("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.").withMultipleSelect(true).build()
    })
  }
}`,...(Te=(Pe=q.parameters)==null?void 0:Pe.docs)==null?void 0:Te.source}}};var De,Ie,$e;M.parameters={...M.parameters,docs:{...(De=M.parameters)==null?void 0:De.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: overflowContentInGradedGroupSet
    })
  }
}`,...($e=(Ie=M.parameters)==null?void 0:Ie.docs)==null?void 0:$e.source}}};const Ke=["SingleSelect","SingleSelectWithNoneOfTheAbove","SingleSelectStatic","SingleSelectShowSolutions","SingleSelectRTL","SingleSelectWithPassageRef","SingleSelectWithImages","SingleSelectWithImagesAndScroll","SingleSelectWithLongMathjax","SingleSelectWithLongText","SingleSelectWithGraphie","MultiSelect","MultiSelectCountChoices","MultiSelectStatic","MultiSelectShowSolutions","MultiSelectRTL","MultiSelectWithLongMathjax","MultiSelectWithImagesAndScroll","MultiSelectWithLongText","GradedGroupSetWithScroll"];export{M as GradedGroupSetWithScroll,p as MultiSelect,h as MultiSelectCountChoices,S as MultiSelectRTL,C as MultiSelectShowSolutions,g as MultiSelectStatic,b as MultiSelectWithImagesAndScroll,f as MultiSelectWithLongMathjax,q as MultiSelectWithLongText,s as SingleSelect,r as SingleSelectRTL,u as SingleSelectShowSolutions,t as SingleSelectStatic,m as SingleSelectWithGraphie,o as SingleSelectWithImages,n as SingleSelectWithImagesAndScroll,l as SingleSelectWithLongMathjax,d as SingleSelectWithLongText,a as SingleSelectWithNoneOfTheAbove,c as SingleSelectWithPassageRef,Ke as __namedExportsOrder,Je as default};
