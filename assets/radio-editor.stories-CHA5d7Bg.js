import{j as i}from"./iframe-B9L61ZNL.js";import{E as u}from"./editor-page-with-storybook-preview-BKkspb5w.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DQvsVT3t.js";import"./changeable-f3jAW3P9.js";import"./article-renderer-BlPaXFZN.js";import"./server-item-renderer-Bk13Q33N.js";import"./hints-renderer-BKhTPXa8.js";import"./content-preview-CTxsm23F.js";import"./components-BdL8WZIq.js";import"./icon-paths-v_ImfsYm.js";import"./editor-page--4NNTvmO.js";import"./tex-error-view-Drb5weWp.js";import"./item-extras-editor-Ba19Ojoo.js";import"./editor-jsonify-CGgHSSUU.js";import"./blur-input-DeWJTh5j.js";import"./free-response-editor-ZGs-A56E.js";import"./input-number-editor-BOqyZdvw.js";import"./Popper-CtjfWoAT.js";import"./label-image-editor-Cua0x44o.js";import"./matcher-editor-Cf3LpIly.js";import"./number-line-editor-BcFsQPPc.js";import"./phet-simulation-editor-C1Mni-_K.js";import"./plotter-editor-COmSqk6p.js";import"./python-program-editor-W40RqiJM.js";import"./sorter-editor-CJMCWBvd.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
