import{j as r,g as b}from"./iframe-CccAjlbi.js";import{E as T}from"./editor-page-with-storybook-preview-vxpN7VO0.js";import{I as w,r as k}from"./register-all-widgets-and-editors-for-testing-ThkOKRyQ.js";import{g as y,a as D}from"./image-widget-generator-BkbJOfbU.js";import"./changeable-C63tudyJ.js";import"./article-renderer-D-zL4WtF.js";import"./server-item-renderer-CfQxDLcH.js";import"./hints-renderer-ShA7_x2U.js";import"./content-preview-Cc0PRf1K.js";import"./components-jECCB6qE.js";import"./icon-paths-Dx_0D5f6.js";import"./editor-page-Dvx4vVe-.js";import"./tex-error-view-x4KA2Vqp.js";import"./item-extras-editor-CYMAScP9.js";import"./editor-jsonify-CsFiFJS0.js";import"./blur-input-ihGyyw-F.js";import"./free-response-editor-Bv2iZIY_.js";import"./input-number-editor-Co1kuBRk.js";import"./Popper-C1aFwbGo.js";import"./label-image-editor-DVZ1MBhD.js";import"./matcher-editor-CNxHl70e.js";import"./number-line-editor-HPpJsDS8.js";import"./phet-simulation-editor-BryksFh8.js";import"./plotter-editor-P-lWC0n0.js";import"./python-program-editor-BF0kwjpG.js";import"./sorter-editor-GLUd7FmQ.js";const f=330,I=(W,{args:P})=>r.jsx("div",{style:{width:f},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":y({options:D({...P})})}})})});k();const $={title:"Widgets/Image/Editor Demo",component:w,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    backgroundImage: {}
  }
}`,...(s=(i=o.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var n,d,p,m,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Empty (Within Editor Page)",
  decorators: [withinEditorPageDecorator],
  args: {
    backgroundImage: {}
  }
}`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source},description:{story:"This Image widget editor does not have any options set.",...(c=(m=e.parameters)==null?void 0:m.docs)==null?void 0:c.description}}};var g,l,h,u,E;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Populated (Within Editor Page)",
  decorators: [withinEditorPageDecorator],
  args: {
    backgroundImage: {
      url: "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",
      width: 400,
      height: 225
    },
    alt: "The moon showing behind the Earth in space.",
    caption: "Captured via XYZ Telescope",
    title: "The Moon"
  }
}`,...(h=(l=t.parameters)==null?void 0:l.docs)==null?void 0:h.source},description:{story:"This Image widget editor has all options set.",...(E=(u=t.parameters)==null?void 0:u.docs)==null?void 0:E.description}}};const ee=["Default","Empty","Populated"];export{o as Default,e as Empty,t as Populated,ee as __namedExportsOrder,$ as default};
