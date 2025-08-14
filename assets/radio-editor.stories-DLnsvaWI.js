import{j as i}from"./iframe-jKogsWHw.js";import{E as u}from"./editor-page-with-storybook-preview-DwWhMONu.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-sC3CogLh.js";import"./item-version-QeSbabpV.js";import"./article-renderer-du0l7qv8.js";import"./server-item-renderer-sgo6DPQc.js";import"./hints-renderer-7zdyCYE0.js";import"./content-preview-D0_Yq_C6.js";import"./components-BtjWgLI6.js";import"./icon-paths-sBXXqQLS.js";import"./editor-page-2FUpfMqb.js";import"./image-editor-2Bzo0uJh.js";import"./editor-jsonify-DGLDfYuq.js";import"./blur-input-5HIMxZ0s.js";import"./tex-error-view-DF2VFmyy.js";import"./item-extras-editor-hyM7ytBD.js";import"./free-response-editor-CHTBL74i.js";import"./input-number-editor-B403UsFS.js";import"./Popper-D9DrIKMk.js";import"./label-image-editor-C6E6EFzw.js";import"./matcher-editor-DQE2UweG.js";import"./number-line-editor-CeKDU1U3.js";import"./phet-simulation-editor-Io9bQ80f.js";import"./plotter-editor-BNfbJgeP.js";import"./python-program-editor-CPdGgely.js";import"./sorter-editor-C5cK0Aki.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
