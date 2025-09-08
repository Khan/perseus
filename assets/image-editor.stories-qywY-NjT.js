import{j as r,g as b}from"./iframe-CCSQELdq.js";import{E as T}from"./editor-page-with-storybook-preview-CJC6WUCD.js";import{I as w,r as k}from"./register-all-widgets-and-editors-for-testing-BYzMDPcY.js";import{g as y,a as D}from"./image-widget-generator-BkbJOfbU.js";import"./item-version-yhIV_aFF.js";import"./article-renderer-8-sdCFmH.js";import"./server-item-renderer-CdP5DtPN.js";import"./hints-renderer-yLYlsK1Z.js";import"./content-preview-C4lAPS24.js";import"./components-BcK5iVfR.js";import"./icon-paths-CaNega6S.js";import"./editor-page-L4DHv2Mm.js";import"./tex-error-view-BN0MeDo0.js";import"./item-extras-editor-C7lj6qZD.js";import"./editor-jsonify-D0F8WVBz.js";import"./blur-input-DEYa_-kC.js";import"./free-response-editor-Btu8is1w.js";import"./input-number-editor-CD4MZ-oh.js";import"./Popper-Cj038LVJ.js";import"./label-image-editor-DnICutIr.js";import"./matcher-editor-BPkwGN0Y.js";import"./number-line-editor-BjyyGUS5.js";import"./phet-simulation-editor-DQMGZQF1.js";import"./plotter-editor-CW7olGbw.js";import"./python-program-editor-hP-w1LVr.js";import"./sorter-editor-akkW1HVP.js";const f=330,I=(W,{args:P})=>r.jsx("div",{style:{width:f},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":y({options:D({...P})})}})})});k();const $={title:"Widgets/Image/Editor Demo",component:w,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
