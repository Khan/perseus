import{j as r,g as b}from"./iframe-C-IGMVYf.js";import{E as T}from"./editor-page-with-storybook-preview-sRboBxrh.js";import{I as w,r as k}from"./register-all-widgets-and-editors-for-testing-62e_KTGa.js";import{g as y,a as D}from"./image-widget-generator-BkbJOfbU.js";import"./item-version-DSQwKEG9.js";import"./article-renderer-SrkGKa-j.js";import"./server-item-renderer-hAlr0pYo.js";import"./hints-renderer-CG8tYlpF.js";import"./content-preview-svmN0kK7.js";import"./components-CujFx4BJ.js";import"./icon-paths-C0BeeNZa.js";import"./editor-page-Wd2_ae8x.js";import"./tex-error-view-CYyNueBl.js";import"./item-extras-editor-vo_PbQnX.js";import"./editor-jsonify-CzAiaVhY.js";import"./blur-input-DeLcU0nh.js";import"./free-response-editor-BXBY85yO.js";import"./input-number-editor-Bw-Suxkg.js";import"./Popper-BG5_QyHy.js";import"./label-image-editor-D_ZTkS_M.js";import"./matcher-editor-n5q-JMhW.js";import"./number-line-editor-eLvpPMCB.js";import"./phet-simulation-editor-COeFHZsM.js";import"./plotter-editor-U2N2bc7F.js";import"./python-program-editor-DhEvNzga.js";import"./sorter-editor-D5d_qu_L.js";const f=330,I=(W,{args:P})=>r.jsx("div",{style:{width:f},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":y({options:D({...P})})}})})});k();const $={title:"Widgets/Image/Editor Demo",component:w,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
