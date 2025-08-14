import{j as i}from"./iframe-Dz8KzRm4.js";import{E as u}from"./editor-page-with-storybook-preview-CcBD7PzT.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DkKk0jop.js";import"./item-version-BXsKsFvS.js";import"./article-renderer-kbA3fLu8.js";import"./server-item-renderer-BDsffwgY.js";import"./hints-renderer-eTfFgFXW.js";import"./content-preview-D8s2fNg0.js";import"./components-CgqU46-l.js";import"./icon-paths-BX_ctPJB.js";import"./editor-page-BZ7Cuovo.js";import"./image-editor-DKF_AwTK.js";import"./editor-jsonify-d7sAC4H6.js";import"./blur-input-BG6jBxGJ.js";import"./tex-error-view-DBwB0Olo.js";import"./item-extras-editor-Cvq-TR59.js";import"./free-response-editor-Cnv5bwdC.js";import"./input-number-editor-CQI1tVn8.js";import"./Popper-4QAtaXJE.js";import"./label-image-editor-CzJhi-BZ.js";import"./matcher-editor-Cjbsc1tW.js";import"./number-line-editor-R_0cNRIh.js";import"./phet-simulation-editor-D1-a2mII.js";import"./plotter-editor-6q2lvyez.js";import"./python-program-editor-CnHJ0EQU.js";import"./sorter-editor-DmDbxS2I.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
