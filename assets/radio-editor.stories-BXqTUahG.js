import{j as i}from"./iframe-bccoluGS.js";import{E as u}from"./editor-page-with-storybook-preview-B-HGa9yM.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-ns1mKD13.js";import"./item-version-Cpe_E2y6.js";import"./article-renderer-DdKx7jP_.js";import"./server-item-renderer-mJ-Fy2sG.js";import"./hints-renderer-DOc2w8Uu.js";import"./content-preview-DPMc3yDh.js";import"./components-BJg_2mkB.js";import"./icon-paths-Dy2lCHgm.js";import"./editor-page-uAff-7kZ.js";import"./image-editor-C-VOUyJj.js";import"./editor-jsonify-Cpd2rRmH.js";import"./blur-input-CmrpRJSI.js";import"./tex-error-view-Bd9pPX-T.js";import"./item-extras-editor-CuWhnct2.js";import"./free-response-editor-BzLVxjVy.js";import"./input-number-editor-ClnRW5ex.js";import"./Popper-C8ssJ_Va.js";import"./label-image-editor-TptKQ7T9.js";import"./matcher-editor-B7RX_9mX.js";import"./number-line-editor-DjYzAYSm.js";import"./phet-simulation-editor-CpPlJ0Kw.js";import"./plotter-editor-cQUXtG5I.js";import"./python-program-editor-CVwfy69U.js";import"./sorter-editor-DIXFSCqH.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
