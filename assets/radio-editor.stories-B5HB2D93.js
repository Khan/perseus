import{j as i}from"./iframe-D2oRCX8z.js";import{E as u}from"./editor-page-with-storybook-preview-CeslvyNL.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-BTPHHkKv.js";import"./item-version-DrMsoJZF.js";import"./article-renderer-BhlE6S6L.js";import"./server-item-renderer-Dq2U-fJ5.js";import"./hints-renderer-CbxkIekr.js";import"./content-preview-BupD4izv.js";import"./components-CeoS0XNL.js";import"./icon-paths-BxaW5wQN.js";import"./editor-page-hEBUF6Ry.js";import"./image-editor-BK1D3TjD.js";import"./editor-jsonify-CGO2Ai66.js";import"./blur-input-C6S45jMK.js";import"./tex-error-view-BaWaYNPs.js";import"./item-extras-editor-Ot2ZI7Nf.js";import"./free-response-editor-DmQuzt2m.js";import"./input-number-editor-CsZBok-Z.js";import"./Popper-EhsOCtb9.js";import"./label-image-editor-3UCh4kx3.js";import"./matcher-editor-DrW4undt.js";import"./number-line-editor-CFDvfjAu.js";import"./phet-simulation-editor-BtYuIVYp.js";import"./plotter-editor-IUqyDPql.js";import"./python-program-editor-CQQ-tzrF.js";import"./sorter-editor-CFwkaJBn.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
    </div>`,...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const G=["Default","SingleChoice","MultiChoice"];export{o as Default,t as MultiChoice,e as SingleChoice,G as __namedExportsOrder,Y as default};
