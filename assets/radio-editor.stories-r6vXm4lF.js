import{j as i}from"./iframe-O9iTnbIO.js";import{E as u}from"./editor-page-with-storybook-preview-Cihpr0-n.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-xreaZayL.js";import"./item-version-BmFQ1h55.js";import"./article-renderer-4kATc_PY.js";import"./server-item-renderer-BYLxd-41.js";import"./hints-renderer-B_n3FZ3M.js";import"./content-preview-31v22v3m.js";import"./components-DdF25-Tu.js";import"./icon-paths-CUN3jE7y.js";import"./editor-page-DmGylnzA.js";import"./tex-error-view-B1nK9Hgs.js";import"./item-extras-editor-BJMsJVGD.js";import"./editor-jsonify-BvsXn6iQ.js";import"./blur-input-FXvUOfuK.js";import"./free-response-editor-B9GCcy4J.js";import"./input-number-editor-CN8TYB1B.js";import"./Popper-wL8TAtQp.js";import"./label-image-editor-CcLSkBCY.js";import"./matcher-editor-DR0FFKlY.js";import"./number-line-editor-CQAbms78.js";import"./phet-simulation-editor-BPqb6OlX.js";import"./plotter-editor-CQAhK_sw.js";import"./python-program-editor-OK6vhCV_.js";import"./sorter-editor-njOoVoHg.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
