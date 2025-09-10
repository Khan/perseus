import{j as r,g as b}from"./iframe-DuyLhNDL.js";import{E as T}from"./editor-page-with-storybook-preview-BnFXRq3C.js";import{I as w,r as k}from"./register-all-widgets-and-editors-for-testing-BEy2LY3z.js";import{g as y,a as D}from"./image-widget-generator-BkbJOfbU.js";import"./changeable-Cte12Kon.js";import"./article-renderer-WLfEIjFg.js";import"./server-item-renderer-DUbxMv6R.js";import"./hints-renderer-Bky06awl.js";import"./content-preview-CTkYqW9E.js";import"./components-BZLqjw0k.js";import"./icon-paths-pDtP2kcP.js";import"./editor-page-El26xee-.js";import"./tex-error-view-BCALdYpA.js";import"./item-extras-editor-CiTXAXfF.js";import"./editor-jsonify-Bbs-1Z-T.js";import"./blur-input-C3o5vSeT.js";import"./free-response-editor-BMW3P_mE.js";import"./input-number-editor-XMY4ia1z.js";import"./Popper-D8Xs7c5G.js";import"./label-image-editor-Ctp-xBfw.js";import"./matcher-editor-uc3pL26m.js";import"./number-line-editor-C9Q9SGSk.js";import"./phet-simulation-editor-DgIpZSvm.js";import"./plotter-editor-BymFeERy.js";import"./python-program-editor-RoxVl1E6.js";import"./sorter-editor-CKwGI6NQ.js";const f=330,I=(W,{args:P})=>r.jsx("div",{style:{width:f},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":y({options:D({...P})})}})})});k();const $={title:"Widgets/Image/Editor Demo",component:w,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
