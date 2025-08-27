import{j as r,g as b}from"./iframe-CARR3CRw.js";import{E as T}from"./editor-page-with-storybook-preview-Dk9wMrwJ.js";import{I as k,r as y}from"./register-all-widgets-and-editors-for-testing-Bsr0TZ-9.js";import{g as D,a as f}from"./image-widget-generator-BkbJOfbU.js";import"./item-version-jpbmxoyV.js";import"./article-renderer-DIfYlISB.js";import"./server-item-renderer-CMrkfZ4J.js";import"./hints-renderer-CKEH7T-_.js";import"./content-preview-DTzhfUzk.js";import"./components-C7O69W5k.js";import"./icon-paths-EzJJVk3X.js";import"./editor-page-C2ykGQ7v.js";import"./tex-error-view-CnFvQUxB.js";import"./item-extras-editor-Bqsn60xW.js";import"./editor-jsonify-DIGChwnb.js";import"./blur-input-D4FBy9WU.js";import"./free-response-editor-DMbi68df.js";import"./input-number-editor-DS9Lz0jX.js";import"./Popper-C984f46g.js";import"./label-image-editor-BjBPVxMC.js";import"./matcher-editor-CUwaROGM.js";import"./number-line-editor-CHYr6asi.js";import"./phet-simulation-editor-DPwzpWgR.js";import"./plotter-editor-BZeiUC2I.js";import"./python-program-editor-BuKMmY8v.js";import"./sorter-editor-o6yBEmmr.js";const w=330,I=(W,{args:P})=>r.jsx("div",{style:{width:w},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":D({options:f({...P})})}})})});y();const $={title:"Widgets/Image/Editor Demo",component:k,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg"},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    backgroundImage: {}
  }
}`,...(s=(i=o.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var n,d,p,m,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Empty (Within Editor Page)",
  decorators: [withinEditorPageDecorator],
  args: {
    backgroundImage: {}
  }
}`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source},description:{story:"This Image widget editor does not have any options set.",...(c=(m=e.parameters)==null?void 0:m.docs)==null?void 0:c.description}}};var g,l,u,h,E;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Populated (Within Editor Page)",
  decorators: [withinEditorPageDecorator],
  args: {
    backgroundImage: {
      url: "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg"
    },
    alt: "The moon showing behind the Earth in space.",
    caption: "Captured via XYZ Telescope",
    title: "The Moon"
  }
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source},description:{story:"This Image widget editor has all options set.",...(E=(h=t.parameters)==null?void 0:h.docs)==null?void 0:E.description}}};const ee=["Default","Empty","Populated"];export{o as Default,e as Empty,t as Populated,ee as __namedExportsOrder,$ as default};
