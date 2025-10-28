import{aB as i}from"./iframe-Drd1SmRq.js";import{t as m}from"./modes-unQmZwy9.js";import{S as c}from"./server-item-renderer-with-debug-ui-BWwKiLHX.js";import{q as p}from"./explanation.testdata-BnB2FqC9.js";import"./server-item-renderer-DSCwYT3W.js";import"./hints-renderer-nULHa8p5.js";import"./main-F-7RzE_d.js";import"./test-keypad-context-wrapper-iC1DAP1t.js";import"./Popper-Ci4RRPxU.js";const w={title:"Widgets/Explanation/Visual Regression Tests/Interactions",component:c,tags:["!autodocs"],parameters:{docs:{description:{component:"Regression tests for the Explanation widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page."}},chromatic:{disableSnapshot:!1,modes:m}}},e={args:{item:i({question:p})},play:async({canvas:s,userEvent:o})=>{const r=s.getByRole("button",{name:"Explanation"});await o.click(r)}};var t,n,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    })
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const explanationTrigger = canvas.getByRole("button", {
      name: "Explanation"
    });
    await userEvent.click(explanationTrigger);
  }
}`,...(a=(n=e.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const E=["ClickedState"];export{e as ClickedState,E as __namedExportsOrder,w as default};
