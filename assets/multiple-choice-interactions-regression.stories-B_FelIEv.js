import{aJ as n,j as F}from"./iframe-CWALGMeL.js";import{g as B}from"./feature-flags-util-Vxq3J9D8.js";import{S as u}from"./server-item-renderer-with-debug-ui-o93fWsYE.js";import{g as x}from"./graded-group.testdata-cmTFTujG.js";import{q as I,f as v}from"./radio.testdata-C_cN_ddT.js";import{r as A}from"./radio-question-builder-Dx1IeYvx.js";import"./server-item-renderer-DO1beWR7.js";import"./hints-renderer-DQ6RBTDt.js";import"./main-DuRsIbC-.js";import"./test-keypad-context-wrapper-BVRzj6ir.js";import"./Popper-C7kbDKRW.js";const V={title:"Widgets/RadioNew/Visual Regression Tests/Interactions",component:u,tags:["!autodocs"],parameters:{docs:{description:{component:"Regression tests for the radio widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page."}},chromatic:{disableSnapshot:!1}},args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:n({question:I})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>F.jsx(u,{item:M(e),apiOptions:E(),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless})},M=e=>{const t={...e.item,question:{...e.item.question,widgets:{}},apiOptions:{flags:B({"new-radio-widget":!0})}};for(const[o,i]of Object.entries(e.item.question.widgets))t.question.widgets[o]={...i,static:e.static};return t},E=e=>({flags:B({"new-radio-widget":!0})}),s={args:{item:n({question:x})},play:async({canvas:e,userEvent:t})=>{const o=e.getByRole("button",{name:"(Choice C) Correct"});await t.click(o);const i=e.getAllByRole("button",{name:"Check"})[0];await t.click(i),await i.blur()}},c={args:{item:n({question:v()})},play:async({canvas:e,userEvent:t})=>{const o=e.getByRole("button",{name:/^\(Choice A\)/});await t.click(o),o.blur()}},r={args:{item:n({question:v({multipleSelect:!0})})},play:async({canvas:e,userEvent:t})=>{let o=e.getByRole("button",{name:/^\(Choice A\)/});await t.click(o),o=e.getByRole("button",{name:/^\(Choice D\)/}),await t.click(o),o.blur()}},a={args:{item:n({question:A().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").build()})},play:async({canvas:e})=>{e.getByRole("button",{name:/^\(Choice A\)/}).focus()}},l={args:{item:n({question:A().addChoice("Choice 1",{correct:!0}).addChoice("Choice 2").addChoice("Choice 3").addChoice("Choice 4").withMultipleSelect(!0).build()})},play:async({canvas:e})=>{e.getByRole("button",{name:/^\(Choice B\)/}).focus()}};var d,h,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(m=(h=s.parameters)==null?void 0:h.docs)==null?void 0:m.source}}};var p,C,g;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(g=(C=c.parameters)==null?void 0:C.docs)==null?void 0:g.source}}};var y,b,w;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(w=(b=r.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var T,S,f;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(f=(S=a.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var k,q,R;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(R=(q=l.parameters)==null?void 0:q.docs)==null?void 0:R.source}}};const z=["GradedGroupWrapper","ChoiceTextColorInSingleSelect","ChoiceTextColorInMultipleSelect","FocusSingleSelect","FocusMultiSelect"];export{r as ChoiceTextColorInMultipleSelect,c as ChoiceTextColorInSingleSelect,l as FocusMultiSelect,a as FocusSingleSelect,s as GradedGroupWrapper,z as __namedExportsOrder,V as default};
