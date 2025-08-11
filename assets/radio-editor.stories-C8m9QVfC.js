import{j as i}from"./iframe-CrThTwIf.js";import{E as u}from"./editor-page-with-storybook-preview-L8OuChRA.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DN-F-8hE.js";import"./item-version-B3SDESbL.js";import"./article-renderer-BDBd00io.js";import"./server-item-renderer-B3OBiMF2.js";import"./hints-renderer-DenSrkW5.js";import"./content-preview-CLTWKYtR.js";import"./components-BSmwcjxJ.js";import"./icon-paths-BF14P1V2.js";import"./editor-page-DPU-lU06.js";import"./image-editor-BQkyhiha.js";import"./editor-jsonify-DZ6iw_RM.js";import"./blur-input-B1Bu2OOc.js";import"./tex-error-view-B7565g9e.js";import"./item-extras-editor-72aLsgXo.js";import"./free-response-editor-CdgePqER.js";import"./input-number-editor-D93aeWf-.js";import"./Popper-XpUGNV3d.js";import"./label-image-editor-DoASivsN.js";import"./matcher-editor-BHn7mLY1.js";import"./number-line-editor-CXZW4ZML.js";import"./phet-simulation-editor-CL5O3rZ0.js";import"./plotter-editor-qlbAYlkL.js";import"./python-program-editor-YlwBWbjb.js";import"./sorter-editor-DKGjiLGV.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
