import{j as r,g as b}from"./iframe-DmIxUJgN.js";import{E as T}from"./editor-page-with-storybook-preview-DhxwZqf2.js";import{I as w,r as k}from"./register-all-widgets-and-editors-for-testing-JdQAVI3b.js";import{g as y,a as D}from"./image-widget-generator-BkbJOfbU.js";import"./changeable-CB5_noCv.js";import"./article-renderer-B2JZyrlB.js";import"./server-item-renderer-DsZho_2j.js";import"./hints-renderer-C3mln8wE.js";import"./content-preview-Lf3Z2GTu.js";import"./components-CzW8WRg9.js";import"./icon-paths-BewN0enG.js";import"./editor-page-CWH2APYZ.js";import"./tex-error-view-CrxiomtQ.js";import"./item-extras-editor-CDZkgsbA.js";import"./editor-jsonify-B_e0vgHi.js";import"./blur-input-Doq-6fD1.js";import"./free-response-editor-gqHkCBO6.js";import"./input-number-editor-8BMkHaRd.js";import"./Popper-CrA_sk69.js";import"./label-image-editor-DfF6RiG9.js";import"./matcher-editor-B9raiGXV.js";import"./number-line-editor-DMBqsx_s.js";import"./phet-simulation-editor-kXNd5k0H.js";import"./plotter-editor-TpqJzB4l.js";import"./python-program-editor-DVfpO--U.js";import"./sorter-editor-BsUA1ung.js";const f=330,I=(W,{args:P})=>r.jsx("div",{style:{width:f},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":y({options:D({...P})})}})})});k();const $={title:"Widgets/Image/Editor Demo",component:w,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
