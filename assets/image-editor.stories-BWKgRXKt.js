import{j as r,g as b}from"./iframe-CWJkr1U4.js";import{E as T}from"./editor-page-with-storybook-preview-CQRQ0FsE.js";import{I as k,r as y}from"./register-all-widgets-and-editors-for-testing-4qjBxark.js";import{g as D,a as f}from"./image-widget-generator-BkbJOfbU.js";import"./item-version-D8G3i7Zs.js";import"./article-renderer-CdA9oXxs.js";import"./server-item-renderer-CcMdrtbV.js";import"./hints-renderer-DwV_d7ve.js";import"./content-preview-q7XGrXsC.js";import"./components-0zCOIzsj.js";import"./icon-paths-CQbG7TCf.js";import"./editor-page-owHtyxR9.js";import"./tex-error-view-DvLQ35Bz.js";import"./item-extras-editor-DxKKX6lY.js";import"./editor-jsonify-IJtzgw23.js";import"./blur-input-D38-D_IX.js";import"./free-response-editor-DwbtUo_V.js";import"./input-number-editor-BBRCzMCc.js";import"./Popper-CH9FXscx.js";import"./label-image-editor-Drb4tVNa.js";import"./matcher-editor-DZCGJEL2.js";import"./number-line-editor-C4eHd2m7.js";import"./phet-simulation-editor-BMBgpgX0.js";import"./plotter-editor-BG1WDbgD.js";import"./python-program-editor-DUnBuQp3.js";import"./sorter-editor-YZecxHNp.js";const w=330,I=(W,{args:P})=>r.jsx("div",{style:{width:w},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":D({options:f({...P})})}})})});y();const $={title:"Widgets/Image/Editor Demo",component:k,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg"},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
