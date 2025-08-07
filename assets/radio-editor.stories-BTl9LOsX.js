import{j as i}from"./iframe-DlDnf9-s.js";import{E as u}from"./editor-page-with-storybook-preview-D-z0eLlW.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DXLEYjx_.js";import"./item-version-D3E88VMD.js";import"./article-renderer-DIyWS-wS.js";import"./server-item-renderer-CwVvRFT7.js";import"./hints-renderer-B9nCWAyP.js";import"./content-preview-D-XTlHP_.js";import"./components-ByIpiyrH.js";import"./icon-paths-CoWD5ahj.js";import"./editor-page-yw9g7_dO.js";import"./image-editor-CGLtVfTi.js";import"./editor-jsonify-D0B0CH53.js";import"./blur-input-Bm-YM0N9.js";import"./tex-error-view-BkcOuv_6.js";import"./item-extras-editor-NWCidxMs.js";import"./free-response-editor-CIKf_hQU.js";import"./input-number-editor-eHvCi6ai.js";import"./Popper-vYJgUZky.js";import"./label-image-editor-8DfO9O_j.js";import"./matcher-editor-rnb6WX3R.js";import"./number-line-editor-9eQhWu-W.js";import"./phet-simulation-editor-Db-N4Oo6.js";import"./plotter-editor-BQgGYkgH.js";import"./python-program-editor-BLq3Rpmw.js";import"./sorter-editor-BEpLO_Ay.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
