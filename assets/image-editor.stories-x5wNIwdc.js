import{j as r,g as b}from"./iframe-F3_oqL7O.js";import{E as T}from"./editor-page-with-storybook-preview-eFB45Lti.js";import{I as w,r as k}from"./register-all-widgets-and-editors-for-testing-BxrHfDNt.js";import{g as y,a as D}from"./image-widget-generator-BkbJOfbU.js";import"./item-version-CQp-Cohu.js";import"./article-renderer-CltmiXsX.js";import"./server-item-renderer-BcfJF0Ip.js";import"./hints-renderer-B9I7YfBe.js";import"./content-preview-PsekF7em.js";import"./components-Dc5fVOuB.js";import"./icon-paths-C01l9r4c.js";import"./editor-page-BfVIbQF-.js";import"./tex-error-view-DR77XQwl.js";import"./item-extras-editor-S_qj_VBv.js";import"./editor-jsonify-BV6JefrH.js";import"./blur-input-D3_0NiMk.js";import"./free-response-editor-Qo8bx7cV.js";import"./input-number-editor-BewCqVa5.js";import"./Popper-Bo8AjKu1.js";import"./label-image-editor-B0SrBMYy.js";import"./matcher-editor-CxSpJb4_.js";import"./number-line-editor-DmRqc-ar.js";import"./phet-simulation-editor-CKs7obJ8.js";import"./plotter-editor-ABrbZ293.js";import"./python-program-editor-DWM08gwH.js";import"./sorter-editor-O4F988lf.js";const f=330,I=(W,{args:P})=>r.jsx("div",{style:{width:f},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":y({options:D({...P})})}})})});k();const $={title:"Widgets/Image/Editor Demo",component:w,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
