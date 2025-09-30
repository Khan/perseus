import{j as i}from"./iframe-Da852Jbn.js";import{E as u}from"./editor-page-with-storybook-preview-DUpOMzgK.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-u-e74vB4.js";import"./changeable-BxawrcPz.js";import"./article-renderer-VfBK7v9e.js";import"./server-item-renderer-C-UYZ0Mi.js";import"./hints-renderer-CDGwEx0Y.js";import"./content-preview-DqEjzJCN.js";import"./components-CdQb559Y.js";import"./icon-paths-DyslO3o8.js";import"./editor-page-DMpVlKsC.js";import"./tex-error-view-B3MyBrFc.js";import"./item-extras-editor-C0GPMbub.js";import"./editor-jsonify-yWsMAQBR.js";import"./blur-input-D3KRKkwg.js";import"./free-response-editor-KV8kY9hU.js";import"./input-number-editor-DvD_hcZt.js";import"./Popper-CJ_xej-s.js";import"./label-image-editor-SnTfcGvh.js";import"./matcher-editor-DamRmpkE.js";import"./number-line-editor-tEs76nfB.js";import"./phet-simulation-editor-BU6eHc9-.js";import"./plotter-editor-BlfJCyHl.js";import"./python-program-editor-Kuluf1r3.js";import"./sorter-editor-BtFopwo8.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
