import{j as r,g as b}from"./iframe-O9iTnbIO.js";import{E as T}from"./editor-page-with-storybook-preview-Cihpr0-n.js";import{I as w,r as k}from"./register-all-widgets-and-editors-for-testing-xreaZayL.js";import{g as y,a as D}from"./image-widget-generator-BkbJOfbU.js";import"./item-version-BmFQ1h55.js";import"./article-renderer-4kATc_PY.js";import"./server-item-renderer-BYLxd-41.js";import"./hints-renderer-B_n3FZ3M.js";import"./content-preview-31v22v3m.js";import"./components-DdF25-Tu.js";import"./icon-paths-CUN3jE7y.js";import"./editor-page-DmGylnzA.js";import"./tex-error-view-B1nK9Hgs.js";import"./item-extras-editor-BJMsJVGD.js";import"./editor-jsonify-BvsXn6iQ.js";import"./blur-input-FXvUOfuK.js";import"./free-response-editor-B9GCcy4J.js";import"./input-number-editor-CN8TYB1B.js";import"./Popper-wL8TAtQp.js";import"./label-image-editor-CcLSkBCY.js";import"./matcher-editor-DR0FFKlY.js";import"./number-line-editor-CQAbms78.js";import"./phet-simulation-editor-BPqb6OlX.js";import"./plotter-editor-CQAhK_sw.js";import"./python-program-editor-OK6vhCV_.js";import"./sorter-editor-njOoVoHg.js";const f=330,I=(W,{args:P})=>r.jsx("div",{style:{width:f},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":y({options:D({...P})})}})})});k();const $={title:"Widgets/Image/Editor Demo",component:w,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
