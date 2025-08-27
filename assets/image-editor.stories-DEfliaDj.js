import{j as r,g as b}from"./iframe-DrenmEsb.js";import{E as T}from"./editor-page-with-storybook-preview-D69VkAZj.js";import{I as k,r as y}from"./register-all-widgets-and-editors-for-testing-DqkDOcDz.js";import{g as D,a as f}from"./image-widget-generator-BkbJOfbU.js";import"./item-version-DWOGl_3A.js";import"./article-renderer-DiAhqv4P.js";import"./server-item-renderer-Dk0InSHQ.js";import"./hints-renderer-EKE0ysCH.js";import"./content-preview-mEwKVDqr.js";import"./components-DRJtDzFc.js";import"./icon-paths-CjY0sQEg.js";import"./editor-page-DN3pvWor.js";import"./tex-error-view-IbvgHgaq.js";import"./item-extras-editor-xFt4rM2c.js";import"./editor-jsonify-a0-cuTTe.js";import"./blur-input-Db4dJB3Q.js";import"./free-response-editor-BN5ar-77.js";import"./input-number-editor-CIyioWhj.js";import"./Popper-DHgsclpW.js";import"./label-image-editor-7ELczuAW.js";import"./matcher-editor-CI1h_zZ_.js";import"./number-line-editor-Bk3xchmS.js";import"./phet-simulation-editor-DX-69Tbo.js";import"./plotter-editor-fGiKlehc.js";import"./python-program-editor-c-9K8szC.js";import"./sorter-editor-z2WlqZJi.js";const w=330,I=(W,{args:P})=>r.jsx("div",{style:{width:w},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":D({options:f({...P})})}})})});y();const $={title:"Widgets/Image/Editor Demo",component:k,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg"},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
