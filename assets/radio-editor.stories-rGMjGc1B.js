import{j as i}from"./iframe-BFOhx_uE.js";import{E as u}from"./editor-page-with-storybook-preview-BV2m_88B.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-CO1zYM9H.js";import"./item-version-DpIHrGFD.js";import"./article-renderer-DdnounXR.js";import"./server-item-renderer-DyytJ9Oy.js";import"./hints-renderer-BIP9s6jC.js";import"./content-preview-Bad06ZrW.js";import"./components-BakYDguZ.js";import"./icon-paths-ChJ5nohG.js";import"./editor-page-DZ1SxrWW.js";import"./image-editor-CaB5H6Bq.js";import"./editor-jsonify-NItUxMBJ.js";import"./blur-input-C2jSHl-1.js";import"./tex-error-view-BQImODvG.js";import"./item-extras-editor-DsW6WsEi.js";import"./free-response-editor-D5Q4-zsQ.js";import"./input-number-editor-CndXkGkU.js";import"./Popper-CBTn9sHG.js";import"./label-image-editor-DtTvwPLZ.js";import"./matcher-editor-BtN6tQXV.js";import"./number-line-editor-DQWr9x6F.js";import"./phet-simulation-editor-Bke2YzHm.js";import"./plotter-editor-BjBrX19U.js";import"./python-program-editor-BHZDdgGf.js";import"./sorter-editor-DMqvn_ji.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
