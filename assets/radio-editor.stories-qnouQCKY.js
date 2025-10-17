import{j as i}from"./iframe-DQbDbjVf.js";import{E as u}from"./editor-page-with-storybook-preview-B5KCAu2V.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-U9W_nAhc.js";import"./changeable-CxMH2Nr0.js";import"./article-renderer-BJypAZlr.js";import"./server-item-renderer-CBm8ccyx.js";import"./hints-renderer-C6g1ZUd4.js";import"./content-preview-C34csMm6.js";import"./editor-page-CgY4Lzod.js";import"./components-BaLBcbm1.js";import"./viewport-resizer-CckmPR1K.js";import"./tex-error-view-B1qP20dM.js";import"./item-extras-editor-DA_xDvxQ.js";import"./preview-panel-C6XqOHX4.js";import"./editor-jsonify-CQDL8tE4.js";import"./blur-input-BjC_9FUd.js";import"./free-response-editor-BoFigDg1.js";import"./input-number-editor-DVRNiTpg.js";import"./Popper-yvSGGUcz.js";import"./label-image-editor-BveZB-9W.js";import"./form-wrapped-text-field-DzSSJkxx.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-DbpW62H0.js";import"./behavior-CIABtOF3.js";import"./question-markers-C3u2ukwl.js";import"./marker-DKEtXg93.js";import"./select-image-Ct9PK2g7.js";import"./matcher-editor-C9W9Iq45.js";import"./number-line-editor-sQthFMxF.js";import"./phet-simulation-editor-NrJJrST_.js";import"./plotter-editor-BNIsBTLy.js";import"./python-program-editor-BdCZIO6j.js";import"./sorter-editor-BM3pYQG8.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const tt={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},e={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),o=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});t.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};o.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange"),
    apiOptions: Object.freeze({}),
    static: false
  }
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var n,m,p;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => <div style={{
  width: PROD_EDITOR_WIDTH
}}>
        <EditorPageWithStorybookPreview question={singleSelectQuestion} />
    </div>`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var c,d,l;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`(): React.ReactElement => <div style={{
  width: PROD_EDITOR_WIDTH
}}>
        <EditorPageWithStorybookPreview question={multiChoiceQuestion} />
    </div>`,...(l=(d=o.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const ot=["Default","SingleChoice","MultiChoice"];export{e as Default,o as MultiChoice,t as SingleChoice,ot as __namedExportsOrder,tt as default};
