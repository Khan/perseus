import{j as i}from"./iframe-Clm9i0Cj.js";import{E as u}from"./editor-page-with-storybook-preview-1qdw18BE.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-B_pznS5A.js";import"./item-version-BpJf2pk1.js";import"./article-renderer-B87WTxaD.js";import"./server-item-renderer-CGTn08AO.js";import"./hints-renderer-CSjH4BnA.js";import"./content-preview-0a0phcv9.js";import"./components-Cld4qBvX.js";import"./icon-paths-DbJ4vfJC.js";import"./editor-page-CfIDl3nm.js";import"./image-editor-CLO7614Q.js";import"./editor-jsonify-C1LGqRJV.js";import"./blur-input-Dt4MJbXq.js";import"./tex-error-view-DM_X-vGN.js";import"./item-extras-editor-BCr-Rgn7.js";import"./free-response-editor-D7RnPsc6.js";import"./input-number-editor-Byc4fDrD.js";import"./Popper-BCoo0HPc.js";import"./label-image-editor-B7OcdZ8x.js";import"./matcher-editor-BrTFlAkE.js";import"./number-line-editor-ChY8iSJZ.js";import"./phet-simulation-editor-CrHBYbv7.js";import"./plotter-editor-B-bCzttK.js";import"./python-program-editor-5w50I1hx.js";import"./sorter-editor-DgfmGusR.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
