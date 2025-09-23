import{j as o,g as b,A as f}from"./iframe-DlBZI7Ll.js";import"./changeable-DaaWs0qv.js";import"./article-renderer-B66uGFCV.js";import"./server-item-renderer-Du7ghijY.js";import"./hints-renderer-CN5PPsTA.js";import{g as w}from"./feature-flags-util-Vxq3J9D8.js";import{E as T}from"./editor-page-with-storybook-preview-CSo16wlT.js";import{I as k,r as y}from"./register-all-widgets-and-editors-for-testing-C5MR9u4v.js";import{g as D,a as W}from"./image-widget-generator-BkbJOfbU.js";import"./content-preview-DTAQ2I_5.js";import"./components-BQ4bHmFT.js";import"./icon-paths-Bmf-OpRB.js";import"./editor-page-esAGW4JJ.js";import"./tex-error-view-Cf6zuEgE.js";import"./item-extras-editor-nJMsT_iA.js";import"./editor-jsonify-B4f1pDpI.js";import"./blur-input-AiRPyhYZ.js";import"./free-response-editor-B54mFQ3Q.js";import"./input-number-editor-B84XuZut.js";import"./Popper-CNLQpm5J.js";import"./label-image-editor-CjzJL_4O.js";import"./matcher-editor-ByqTA09b.js";import"./number-line-editor-D3lRA6ph.js";import"./phet-simulation-editor-CeANbhMS.js";import"./plotter-editor-2JJGALyH.js";import"./python-program-editor-BtwTqJFB.js";import"./sorter-editor-CMrx6EEe.js";const x=330,I=(j,{args:P})=>o.jsx("div",{style:{width:x},children:o.jsx(T,{apiOptions:{...f.defaults,flags:w({"image-widget-upgrade":!0})},question:b({content:"[[☃ image 1]]",widgets:{"image 1":D({options:W({...P})})}})})});y();const re={title:"Widgets/Image/Editor Demo",component:k,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},r={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
