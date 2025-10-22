import{aB as i,j as W,ao as E}from"./iframe-P8a0QwVR.js";import{g as u}from"./feature-flags-util-Vxq3J9D8.js";import{S as m}from"./server-item-renderer-with-debug-ui-BzPEzNir.js";import{A as O}from"./article-renderer-c16ya0Fw.js";import{g as D}from"./graded-group.testdata-cmTFTujG.js";import{q as j,f as M}from"./radio.testdata-C_cN_ddT.js";import{r as h}from"./radio-question-builder-Dx1IeYvx.js";import"./server-item-renderer-BL8pKdky.js";import"./hints-renderer-CZfjqQ6B.js";import"./main-D9wkwVas.js";import"./test-keypad-context-wrapper-CV-c_54-.js";import"./Popper-BR2hYYZN.js";const Y={title:"Widgets/RadioNew/Visual Regression Tests/Interactions",component:m,tags:["!autodocs"],parameters:{docs:{description:{component:"Regression tests for the radio widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page."}},chromatic:{disableSnapshot:!1}},args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:i({question:j})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>W.jsx(m,{item:P(e),apiOptions:Q(),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless})},P=e=>{const t={...e.item,question:{...e.item.question,widgets:{}},apiOptions:{flags:u({"new-radio-widget":!0})}};for(const[o,a]of Object.entries(e.item.question.widgets))t.question.widgets[o]={...a,static:e.static};return t},Q=e=>({flags:u({"new-radio-widget":!0})}),r={args:{item:i({question:D})},play:async({canvas:e,userEvent:t})=>{const o=e.getByRole("button",{name:"(Choice C) Correct"});await t.click(o);const a=e.getAllByRole("button",{name:"Check"})[0];await t.click(a),await a.blur()}},s={args:{item:i({question:M()})},play:async({canvas:e,userEvent:t})=>{const o=e.getByRole("button",{name:/^\(Choice A\)/});await t.click(o),o.blur()}},c={args:{item:i({question:M({multipleSelect:!0})})},play:async({canvas:e,userEvent:t})=>{let o=e.getByRole("button",{name:/^\(Choice A\)/});await t.click(o),o=e.getByRole("button",{name:/^\(Choice D\)/}),await t.click(o),o.blur()}},n=()=>{const e=h().withContent(`Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.

We're acquainted with the wormhole phenomenon, but this... Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.

A level-two diagnostic was ordered for what system?

[[☃ radio 1]]`).addChoice("Antimatter containment").addChoice("Warp drive",{correct:!0}).addChoice("Force fields").addChoice("Reflector dish").build(),t={flags:u({"new-radio-widget":!0})};return W.jsx(O,{apiOptions:t,json:e,useNewStyles:!0,dependencies:E})};n.play=async({canvas:e})=>{e.getByRole("button",{name:/Warp drive$/}).click()};const l={args:{item:i({question:h().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").build()})},play:async({canvas:e})=>{e.getByRole("button",{name:/^\(Choice A\)/}).focus()}},d={args:{item:i({question:h().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(!0).build()})},play:async({canvas:e})=>{e.getByRole("button",{name:/^\(Choice B\)/}).focus()}};n.__docgenInfo={description:"",methods:[{name:"play",docblock:null,modifiers:["static"],params:[{name:"{canvas}",optional:!1,type:null}],returns:null}],displayName:"ChoiceTextColorInArticle"};var p,g,C;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: groupedRadioRationaleQuestion
    })
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const choiceToClick = canvas.getByRole("button", {
      name: "(Choice C) Correct"
    });
    await userEvent.click(choiceToClick);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const checkAnswerButton = canvas.getAllByRole("button", {
      name: "Check"
    })[0];
    await userEvent.click(checkAnswerButton);
    await checkAnswerButton.blur();
  }
}`,...(C=(g=r.parameters)==null?void 0:g.docs)==null?void 0:C.source}}};var b,w,y;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithMathFont()
    })
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const choiceToClick = canvas.getByRole("button", {
      name: /^\\(Choice A\\)/
    });
    await userEvent.click(choiceToClick);
    choiceToClick.blur();
  }
}`,...(y=(w=s.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var f,v,T;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithMathFont({
        multipleSelect: true
      })
    })
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    let choiceToClick = canvas.getByRole("button", {
      name: /^\\(Choice A\\)/
    });
    await userEvent.click(choiceToClick);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    choiceToClick = canvas.getByRole("button", {
      name: /^\\(Choice D\\)/
    });
    await userEvent.click(choiceToClick);
    choiceToClick.blur();
  }
}`,...(T=(v=c.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var k,S,q;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`(): React.ReactNode => {
  const question = radioQuestionBuilder().withContent("Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.\\n\\n" + "We're acquainted with the wormhole phenomenon, but this... Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.\\n\\n" + "A level-two diagnostic was ordered for what system?\\n\\n[[☃ radio 1]]").addChoice("Antimatter containment").addChoice("Warp drive", {
    correct: true
  }).addChoice("Force fields").addChoice("Reflector dish").build();
  const apiOptions = {
    flags: getFeatureFlags({
      "new-radio-widget": true
    })
  };
  return <ArticleRenderer apiOptions={apiOptions} json={question} useNewStyles dependencies={storybookDependenciesV2} />;
}`,...(q=(S=n.parameters)==null?void 0:S.docs)==null?void 0:q.source}}};var R,A,I;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").build()
    })
  },
  play: async ({
    canvas
  }) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const choiceToFocus = canvas.getByRole("button", {
      name: /^\\(Choice A\\)/
    });
    choiceToFocus.focus();
  }
}`,...(I=(A=l.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var B,F,x;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: radioQuestionBuilder().addChoice("Choice 1", {
        correct: true
      }).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(true).build()
    })
  },
  play: async ({
    canvas
  }) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const choiceToFocus = canvas.getByRole("button", {
      name: /^\\(Choice B\\)/
    });
    choiceToFocus.focus();
  }
}`,...(x=(F=d.parameters)==null?void 0:F.docs)==null?void 0:x.source}}};const Z=["GradedGroupWrapper","ChoiceTextColorInSingleSelect","ChoiceTextColorInMultipleSelect","ChoiceTextColorInArticle","FocusSingleSelect","FocusMultiSelect"];export{n as ChoiceTextColorInArticle,c as ChoiceTextColorInMultipleSelect,s as ChoiceTextColorInSingleSelect,d as FocusMultiSelect,l as FocusSingleSelect,r as GradedGroupWrapper,Z as __namedExportsOrder,Y as default};
