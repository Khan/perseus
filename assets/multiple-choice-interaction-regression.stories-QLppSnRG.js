import{aJ as l,j as p}from"./iframe-DBEO97YM.js";import{S as n}from"./server-item-renderer-with-debug-ui-BOtFlnxY.js";import{g as u}from"./graded-group.testdata-cmTFTujG.js";import{q as d}from"./radio.testdata-DB7UxNZt.js";import"./server-item-renderer-Dq2POy0B.js";import"./hints-renderer-Zm4OCMsm.js";import"./main-Dpv-z5mc.js";import"./test-keypad-context-wrapper-BsnCC23g.js";import"./Popper-CjjW8mDS.js";import"./radio-question-builder-CVptyQHR.js";const S={title:"Widgets/RadioNew/Visual Regression Tests/Interactive",component:n,tags:["!autodocs"],parameters:{docs:{description:{component:"Regression tests for the radio widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page."}},chromatic:{disableSnapshot:!1}},args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:l({question:d})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>p.jsx(n,{item:m(e),apiOptions:w(),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless})},m=e=>{const t={...e.item,question:{...e.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[i,s]of Object.entries(e.item.question.widgets))t.question.widgets[i]={...s,static:e.static};return t},w=e=>({flags:{"new-radio-widget":!0}}),o={args:{item:l({question:u})},play:async({canvas:e,userEvent:t})=>{const i=e.getByRole("button",{name:"(Choice C) Correct"});await t.click(i);const s=e.getAllByRole("button",{name:"Check"})[0];await t.click(s),await s.blur()}};var r,a,c;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(c=(a=o.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};const v=["GradedGroupWrapper"];export{o as GradedGroupWrapper,v as __namedExportsOrder,S as default};
