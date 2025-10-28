import{j as a,g as m,p as d,R as p,A as l,al as h}from"./iframe-CvVra0N4.js";import{t as u}from"./modes-unQmZwy9.js";import{g as f}from"./feature-flags-util-Vxq3J9D8.js";import{S as I}from"./server-item-renderer-with-debug-ui-DJWaKdnk.js";import{e as w}from"./utils-CfhUZX9z.js";import{g as b,a as y}from"./image-widget-generator-BkbJOfbU.js";import"./server-item-renderer-B7KiDeS-.js";import"./hints-renderer-Bcb7GYXj.js";import"./main-BOMkED62.js";import"./test-keypad-context-wrapper-DW1dDa7_.js";import"./Popper-PRGrAOCB.js";const E="The Moon above Earth's horizon, captured by the International Space Station, [NASA](https://images.nasa.gov/details/iss071e515452)",M=(o,{args:e,parameters:t})=>a.jsx(S,{question:m({content:(t==null?void 0:t.content)??"[[☃ image 1]]",widgets:{"image 1":b({options:y({...e})})}})}),W={title:"Widgets/Image/Visual Regression Tests/Interactions",component:I,tags:["!autodocs"],parameters:{docs:{description:{component:"Regression tests for the Image widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page."}},chromatic:{disableSnapshot:!1,modes:u}}},n={decorators:[M],args:{backgroundImage:w,alt:"Earth and Moon",longDescription:"This is a *very* long description of the earth and moon.",title:"Earth and Moon",caption:E},play:async({canvas:o,userEvent:e})=>{const t=o.getByRole("button",{name:"Explore image"});await e.click(t)}};function S(o){const{question:e}=o;return a.jsx(d,{widgets:e.widgets,problemNum:0,children:({userInput:t,handleUserInput:g,initializeUserInput:c})=>a.jsx(p,{userInput:t,handleUserInput:g,initializeUserInput:c,strings:h,content:e.content,widgets:e.widgets,images:e.images,apiOptions:{...l.defaults,flags:f({"image-widget-upgrade":!0})}})})}var r,s,i;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  decorators: [rendererDecorator],
  args: {
    backgroundImage: earthMoonImage,
    alt: "Earth and Moon",
    longDescription: "This is a *very* long description of the earth and moon.",
    title: "Earth and Moon",
    caption: earthMoonImageCaption
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const imageTrigger = canvas.getByRole("button", {
      name: "Explore image"
    });
    await userEvent.click(imageTrigger);
  }
}`,...(i=(s=n.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const _=["LongDescriptionClickedState"];export{n as LongDescriptionClickedState,_ as __namedExportsOrder,W as default};
