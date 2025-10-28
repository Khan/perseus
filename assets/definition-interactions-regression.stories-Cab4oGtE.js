import{aB as d}from"./iframe-Drd1SmRq.js";import{t as p}from"./modes-unQmZwy9.js";import{S as l}from"./server-item-renderer-with-debug-ui-BWwKiLHX.js";import{q as g}from"./definition.testdata-z1lAUP5t.js";import"./server-item-renderer-DSCwYT3W.js";import"./hints-renderer-nULHa8p5.js";import"./main-F-7RzE_d.js";import"./test-keypad-context-wrapper-iC1DAP1t.js";import"./Popper-Ci4RRPxU.js";const P={title:"Widgets/Definition/Visual Regression Tests/Interactions",component:l,tags:["!autodocs"],parameters:{docs:{description:{component:"Regression tests for the definition widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page."}},chromatic:{disableSnapshot:!1,modes:p}}},e={args:{item:d({question:g})},play:async({canvas:n})=>{n.getByRole("button",{name:"the Pequots"}).focus()}},t={args:{item:d({question:g})},play:async({canvas:n,userEvent:s})=>{const u=n.getByRole("button",{name:"the Pequots"});await s.click(u)}};var r,i,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question
    })
  },
  play: async ({
    canvas
  }) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const definitionTrigger = canvas.getByRole("button", {
      name: "the Pequots"
    });
    definitionTrigger.focus();
  }
}`,...(o=(i=e.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};var a,c,m;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question
    })
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const definitionTrigger = canvas.getByRole("button", {
      name: "the Pequots"
    });
    await userEvent.click(definitionTrigger);
  }
}`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const R=["FocusedState","ClickedState"];export{t as ClickedState,e as FocusedState,R as __namedExportsOrder,P as default};
