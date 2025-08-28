import{j as r,g as b}from"./iframe-Bskf6_5k.js";import{E as T}from"./editor-page-with-storybook-preview-_ayeFfj7.js";import{I as w,r as k}from"./register-all-widgets-and-editors-for-testing-DNawvt2b.js";import{g as y,a as D}from"./image-widget-generator-BkbJOfbU.js";import"./item-version-C2wb0nUj.js";import"./article-renderer-RuBL_5ml.js";import"./server-item-renderer-CPvhlrYN.js";import"./hints-renderer-D60vmVCX.js";import"./content-preview-B5vlkRhi.js";import"./components-Mdj1yu65.js";import"./icon-paths-Ce9bc5yE.js";import"./editor-page-B_UwBAm4.js";import"./tex-error-view-CoNAzxsh.js";import"./item-extras-editor-g7RCNNlq.js";import"./editor-jsonify-Cs4OpxO_.js";import"./blur-input-CUyL1V-Q.js";import"./free-response-editor-D-3TE6FN.js";import"./input-number-editor-hkRcDnxl.js";import"./Popper-BvX9w4l5.js";import"./label-image-editor-ByVUnPMv.js";import"./matcher-editor-C6QF-EVD.js";import"./number-line-editor-Bym42sfk.js";import"./phet-simulation-editor-MD0vFBP_.js";import"./plotter-editor-DKUuR5Mj.js";import"./python-program-editor-CypGZy3e.js";import"./sorter-editor-D9cD9tyK.js";const f=330,I=(W,{args:P})=>r.jsx("div",{style:{width:f},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":y({options:D({...P})})}})})});k();const $={title:"Widgets/Image/Editor Demo",component:w,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
