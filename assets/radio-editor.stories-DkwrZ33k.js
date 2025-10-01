import{j as i}from"./iframe-CheXZuhR.js";import{E as u}from"./editor-page-with-storybook-preview-BE-QgzJD.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-C-7A7zZL.js";import"./changeable-C91qCaHf.js";import"./article-renderer-CThTZZgG.js";import"./server-item-renderer-C2NfoI_F.js";import"./hints-renderer-3GvFGRdL.js";import"./content-preview-FbUpLrLE.js";import"./components-BjKTsQCN.js";import"./icon-paths-I6aJaxFT.js";import"./editor-page-DYZAqAlc.js";import"./tex-error-view-CS8M0Nzi.js";import"./item-extras-editor-duBy8tKz.js";import"./editor-jsonify-B343wufQ.js";import"./blur-input-cLoqlZbm.js";import"./free-response-editor-DUW4NAve.js";import"./input-number-editor-GpKmLnpz.js";import"./Popper-BWzNNUCU.js";import"./label-image-editor-BowbCfad.js";import"./matcher-editor-C_C4V3mc.js";import"./number-line-editor-bRVfkoCE.js";import"./phet-simulation-editor-C3sU9yoN.js";import"./plotter-editor-48WHwYQe.js";import"./python-program-editor-CvRx3GN1.js";import"./sorter-editor-CIGWtehZ.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
