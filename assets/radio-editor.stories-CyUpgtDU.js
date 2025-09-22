import{j as i}from"./iframe-D2B-WNnt.js";import{E as u}from"./editor-page-with-storybook-preview-BsyZk3ul.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-CxFiihsB.js";import"./changeable-DpCEeNNp.js";import"./article-renderer-CSvygoT0.js";import"./server-item-renderer-hg0Rxt4F.js";import"./hints-renderer-DypTrDzm.js";import"./content-preview-C44jDRIl.js";import"./components-CweT6quV.js";import"./icon-paths-VAMmt5bn.js";import"./editor-page-cMRqRZIU.js";import"./tex-error-view-BzG7ypY-.js";import"./item-extras-editor-nfpqw3GL.js";import"./editor-jsonify-DlS2FFph.js";import"./blur-input-BqgNtyin.js";import"./free-response-editor-HrvP9wGT.js";import"./input-number-editor-Lz64HDFH.js";import"./Popper-DcRilstM.js";import"./label-image-editor-CZy3RY6q.js";import"./matcher-editor-6wT3OdaC.js";import"./number-line-editor-tOqMAiCr.js";import"./phet-simulation-editor-B9sz9FMW.js";import"./plotter-editor-Bx69mrmJ.js";import"./python-program-editor-B7-U6ZrN.js";import"./sorter-editor-CKxRwvf5.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
    </div>`,...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const Y=["Default","SingleChoice","MultiChoice"];export{o as Default,t as MultiChoice,e as SingleChoice,Y as __namedExportsOrder,U as default};
