import{j as i}from"./iframe-BnR2CVlk.js";import{E as u}from"./editor-page-with-storybook-preview-DtQuzR9J.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-CxQJxN7z.js";import"./changeable-Cs5R8WQC.js";import"./article-renderer-BDeAmHcF.js";import"./server-item-renderer-CVkwPyWY.js";import"./hints-renderer-CJq1w6aN.js";import"./content-preview-CEat8EVg.js";import"./components-CGgHTwyb.js";import"./icon-paths-BuhQPCr2.js";import"./editor-page-h7AkCcbt.js";import"./tex-error-view-BamCS-X4.js";import"./item-extras-editor-Bmzzm6i0.js";import"./editor-jsonify-CFS3iLUM.js";import"./blur-input-BdK6OW6B.js";import"./free-response-editor-DT1RMxKd.js";import"./input-number-editor-BXsAyk7G.js";import"./Popper-DTGSAPpT.js";import"./label-image-editor-MW6g5w8w.js";import"./matcher-editor-BkRJ8pV4.js";import"./number-line-editor-m7ouKPg1.js";import"./phet-simulation-editor-Cftgsm38.js";import"./plotter-editor-B11uq4k7.js";import"./python-program-editor-B5KDqgAo.js";import"./sorter-editor-PX6c-a56.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
