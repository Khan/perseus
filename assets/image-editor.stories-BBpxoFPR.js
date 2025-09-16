import{j as r,g as b}from"./iframe-SVyUCcyc.js";import{E as T}from"./editor-page-with-storybook-preview-CDYIAin8.js";import{I as w,r as k}from"./register-all-widgets-and-editors-for-testing-DGqB_eZ_.js";import{g as y,a as D}from"./image-widget-generator-BkbJOfbU.js";import"./changeable-tjsapl0P.js";import"./article-renderer-BsRViZ2E.js";import"./server-item-renderer-Cyy55jFd.js";import"./hints-renderer-DAyRzUb7.js";import"./content-preview-Cg3wJzx7.js";import"./components-DgNvGnHV.js";import"./icon-paths-DhpAN4rN.js";import"./editor-page-CD-bPphd.js";import"./tex-error-view-DofRtxFy.js";import"./item-extras-editor-DfgyQ0TA.js";import"./editor-jsonify-RGXOXhpi.js";import"./blur-input-C4eWWCEn.js";import"./free-response-editor-Bw6u8mY-.js";import"./input-number-editor-CCi0_NrJ.js";import"./Popper-B8pQzd5P.js";import"./label-image-editor-DbvuChbx.js";import"./matcher-editor-BGLB6zFT.js";import"./number-line-editor-DjcLRQrL.js";import"./phet-simulation-editor-CWHlZkLn.js";import"./plotter-editor-9DpcCpys.js";import"./python-program-editor-DKjkP19L.js";import"./sorter-editor-RlBCj2kg.js";const f=330,I=(W,{args:P})=>r.jsx("div",{style:{width:f},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":y({options:D({...P})})}})})});k();const $={title:"Widgets/Image/Editor Demo",component:w,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
