import{j as i}from"./iframe-D63BQX-M.js";import{E as u}from"./editor-page-with-storybook-preview-B9WhF6j3.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-BkxAZAan.js";import"./item-version-CXOfxVCP.js";import"./article-renderer-BxcGfNlJ.js";import"./server-item-renderer-BKH_W4Eq.js";import"./hints-renderer-CWHWRquC.js";import"./content-preview-D8kuOuhT.js";import"./components-CMAcGlD9.js";import"./icon-paths-CI_krsjO.js";import"./editor-page-Byt_J6GN.js";import"./image-editor-Cd1EfFAH.js";import"./editor-jsonify-CH7LEOWU.js";import"./blur-input-DGrL3JLL.js";import"./tex-error-view-3oEtQmaJ.js";import"./item-extras-editor-CWT-UXs_.js";import"./free-response-editor-jJnWYljQ.js";import"./input-number-editor-vsXTprRX.js";import"./Popper-CQJtVtxl.js";import"./label-image-editor-B39NVWcp.js";import"./matcher-editor-E-U2wvqt.js";import"./number-line-editor-sfNK9RAp.js";import"./phet-simulation-editor-tyIaJQXW.js";import"./plotter-editor-1xw5k_dN.js";import"./python-program-editor-D5C8W7Tr.js";import"./sorter-editor-DAoQb1Mz.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
