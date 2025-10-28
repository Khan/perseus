import{aB as d}from"./iframe-CvVra0N4.js";import{t as p}from"./modes-unQmZwy9.js";import{S as l}from"./server-item-renderer-with-debug-ui-DJWaKdnk.js";import{q as g}from"./definition.testdata-z1lAUP5t.js";import"./server-item-renderer-B7KiDeS-.js";import"./hints-renderer-Bcb7GYXj.js";import"./main-BOMkED62.js";import"./test-keypad-context-wrapper-DW1dDa7_.js";import"./Popper-PRGrAOCB.js";const P={title:"Widgets/Definition/Visual Regression Tests/Interactions",component:l,tags:["!autodocs"],parameters:{docs:{description:{component:"Regression tests for the definition widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page."}},chromatic:{disableSnapshot:!1,modes:p}}},e={args:{item:d({question:g})},play:async({canvas:n})=>{n.getByRole("button",{name:"the Pequots"}).focus()}},t={args:{item:d({question:g})},play:async({canvas:n,userEvent:s})=>{const u=n.getByRole("button",{name:"the Pequots"});await s.click(u)}};var r,i,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
