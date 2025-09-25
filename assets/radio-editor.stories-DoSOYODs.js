import{j as i}from"./iframe-CMcX3zU0.js";import{E as u}from"./editor-page-with-storybook-preview-BqV82yln.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DgfMDbfi.js";import"./changeable-Bm3djhYn.js";import"./article-renderer-C1sohMEB.js";import"./server-item-renderer-BgRLXmho.js";import"./hints-renderer-DzrKS6Dh.js";import"./content-preview-DTzLj5EL.js";import"./components-CF3dcVpn.js";import"./icon-paths-B3lUh7nI.js";import"./editor-page-BGXhnUY4.js";import"./tex-error-view-SQu2msIG.js";import"./item-extras-editor-DQT4XXdZ.js";import"./editor-jsonify-D-2u2_VZ.js";import"./blur-input-C-mWOH5h.js";import"./free-response-editor-eIfcvurR.js";import"./input-number-editor-k6aA8rNC.js";import"./Popper-DXhUiUZt.js";import"./label-image-editor-D80a3XIp.js";import"./matcher-editor-D9Bw5lbG.js";import"./number-line-editor-C9FkKufP.js";import"./phet-simulation-editor-DF31Js4N.js";import"./plotter-editor-BDUq8M_0.js";import"./python-program-editor-fyS1EmBA.js";import"./sorter-editor-DTA2D3xY.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange"),
    apiOptions: Object.freeze({}),
    static: false
  }
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var n,m,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => <div style={{
  width: PROD_EDITOR_WIDTH
}}>
        <EditorPageWithStorybookPreview question={singleSelectQuestion} />
    </div>`,...(c=(m=e.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var p,d,l;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`(): React.ReactElement => <div style={{
  width: PROD_EDITOR_WIDTH
}}>
        <EditorPageWithStorybookPreview question={multiChoiceQuestion} />
    </div>`,...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const Y=["Default","SingleChoice","MultiChoice"];export{o as Default,t as MultiChoice,e as SingleChoice,Y as __namedExportsOrder,U as default};
