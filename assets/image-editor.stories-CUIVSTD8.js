import{j as o,g as b,A as f}from"./iframe-BUqiAjvg.js";import"./changeable-BIIkL6QK.js";import"./article-renderer-BMdS74on.js";import"./server-item-renderer-BWbA54HK.js";import"./hints-renderer-RXA74GFK.js";import{g as w}from"./feature-flags-util-Vxq3J9D8.js";import{E as T}from"./editor-page-with-storybook-preview-CbWYbzxa.js";import{I as k,r as y}from"./register-all-widgets-and-editors-for-testing-Uzkd3OLT.js";import{g as D,a as W}from"./image-widget-generator-BkbJOfbU.js";import"./content-preview-ibOG6CPd.js";import"./components-40MYzgN1.js";import"./icon-paths-Dw3QWWRN.js";import"./editor-page-C0hWEKkq.js";import"./tex-error-view-CRi9y7ze.js";import"./item-extras-editor-BEZCtRSL.js";import"./editor-jsonify-BmGheLxA.js";import"./blur-input-BwMCEkN5.js";import"./free-response-editor-C1dxHW-x.js";import"./input-number-editor-ETe6qJbG.js";import"./Popper-o2UhZJdE.js";import"./label-image-editor-BYHaAA4y.js";import"./matcher-editor-Zdm32iLj.js";import"./number-line-editor-CM1tckUG.js";import"./phet-simulation-editor-B2oKM35F.js";import"./plotter-editor-BDhC--_l.js";import"./python-program-editor-DUg5h9xD.js";import"./sorter-editor-BNnlJerm.js";const x=330,I=(j,{args:P})=>o.jsx("div",{style:{width:x},children:o.jsx(T,{apiOptions:{...f.defaults,flags:w({"image-widget-upgrade":!0})},question:b({content:"[[☃ image 1]]",widgets:{"image 1":D({options:W({...P})})}})})});y();const re={title:"Widgets/Image/Editor Demo",component:k,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},r={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    backgroundImage: {}
  }
}`,...(s=(i=r.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var n,d,p,m,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
      url: "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",
      width: 400,
      height: 225
    },
    alt: "The moon showing behind the Earth in space.",
    caption: "Captured via XYZ Telescope",
    title: "The Moon"
  }
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source},description:{story:"This Image widget editor has all options set.",...(E=(h=t.parameters)==null?void 0:h.docs)==null?void 0:E.description}}};const oe=["Default","Empty","Populated"];export{r as Default,e as Empty,t as Populated,oe as __namedExportsOrder,re as default};
