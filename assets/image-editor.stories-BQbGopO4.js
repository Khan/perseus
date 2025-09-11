import{j as r,g as b}from"./iframe-uzHcYCYA.js";import{E as T}from"./editor-page-with-storybook-preview-C3px7d10.js";import{I as w,r as k}from"./register-all-widgets-and-editors-for-testing-Dua1RWpW.js";import{g as y,a as D}from"./image-widget-generator-BkbJOfbU.js";import"./changeable-B2w2BFwG.js";import"./article-renderer-4-q2xvQd.js";import"./server-item-renderer-BVk1JHoz.js";import"./hints-renderer-CEzxYndO.js";import"./content-preview-D5rYJsdK.js";import"./components-DYvSC_-z.js";import"./icon-paths-CTDXG4an.js";import"./editor-page-BE8W7E7U.js";import"./tex-error-view-lXL5mG2i.js";import"./item-extras-editor-DlbWSECZ.js";import"./editor-jsonify-Bn4QN6oX.js";import"./blur-input-DmtitOM9.js";import"./free-response-editor-DOlZ6M2X.js";import"./input-number-editor-CSz27eA6.js";import"./Popper-DlGDGz0c.js";import"./label-image-editor-D4NG0ztA.js";import"./matcher-editor-y3D49Wu4.js";import"./number-line-editor-F_sKVtUB.js";import"./phet-simulation-editor-Yh-QV-ls.js";import"./plotter-editor-CZawkXrv.js";import"./python-program-editor-BP80zaYo.js";import"./sorter-editor-DaiqHjso.js";const f=330,I=(W,{args:P})=>r.jsx("div",{style:{width:f},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":y({options:D({...P})})}})})});k();const $={title:"Widgets/Image/Editor Demo",component:w,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
