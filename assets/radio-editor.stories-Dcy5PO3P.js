import{j as i}from"./iframe-0zUPoAZ7.js";import{E as u}from"./editor-page-with-storybook-preview-B4NCiHxM.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-D5zrTw3j.js";import"./item-version-CFI0kdch.js";import"./article-renderer-BN9pbrUK.js";import"./server-item-renderer-BeIdW-PA.js";import"./hints-renderer-zVIJgcy_.js";import"./content-preview-C7PmiiaE.js";import"./components-D0hA4O2N.js";import"./icon-paths-CX3jK57z.js";import"./editor-page-Bt7T53ig.js";import"./image-editor-C5bEIzrH.js";import"./editor-jsonify-C4CFFXrb.js";import"./blur-input-TVvXRCdM.js";import"./tex-error-view-I3eIea6D.js";import"./item-extras-editor-DoH8jX3-.js";import"./free-response-editor-add_Uy2O.js";import"./input-number-editor-D_vVPjZH.js";import"./Popper-DSXSwtwl.js";import"./label-image-editor-1rJJoLMi.js";import"./matcher-editor-BCC-RLIR.js";import"./number-line-editor-C92LmNTJ.js";import"./phet-simulation-editor-Big2fCIH.js";import"./plotter-editor-CohcQ28i.js";import"./python-program-editor-BeWoCnuO.js";import"./sorter-editor-XDaECAAI.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
