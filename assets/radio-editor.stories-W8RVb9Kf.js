import{j as i}from"./iframe-B7TMQJdi.js";import{E as u}from"./editor-page-with-storybook-preview-BT3wymAv.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-COGy_iU0.js";import"./item-version-DWTm3KG2.js";import"./article-renderer-C3ugB7CD.js";import"./server-item-renderer-Dp-6ctHj.js";import"./hints-renderer-BrPYys6H.js";import"./content-preview-CqVWiCl5.js";import"./components--W1lCDFk.js";import"./icon-paths-CP6jQddt.js";import"./editor-page-5HEW8n07.js";import"./tex-error-view-D1eJ6Loy.js";import"./item-extras-editor-BKQqIVIq.js";import"./editor-jsonify-DXplw2MQ.js";import"./blur-input-DodOUuP6.js";import"./free-response-editor-D_wrW1KX.js";import"./input-number-editor-xNB8HRxz.js";import"./Popper-Cq-tr5nC.js";import"./label-image-editor-B008PUN1.js";import"./matcher-editor-CXNJqYWo.js";import"./number-line-editor-CPMmD342.js";import"./phet-simulation-editor-DBOfbdi4.js";import"./plotter-editor-Dkz93pM2.js";import"./python-program-editor-C2_SEQSc.js";import"./sorter-editor-BkSVzONe.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
