import{j as i}from"./iframe-D5ZxZp1t.js";import{E as u}from"./editor-page-with-storybook-preview-Bzwby_6q.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-poQa_Ioa.js";import"./item-version-Ce5hORdX.js";import"./article-renderer-BwaA8jYv.js";import"./server-item-renderer-B6NtoC1Z.js";import"./hints-renderer-lA5Bszlv.js";import"./content-preview-5nS5VtZn.js";import"./components-G_uGf2E0.js";import"./icon-paths-DUlALo5j.js";import"./editor-page-DucbGl21.js";import"./image-editor-DvZZGHbP.js";import"./editor-jsonify-BrMcoYYj.js";import"./blur-input-BM37zQRj.js";import"./tex-error-view-BaX1rI7p.js";import"./item-extras-editor-Cn8oQcJx.js";import"./free-response-editor-BhJPUhw0.js";import"./input-number-editor-BS_8BDzV.js";import"./Popper-ClraSgaN.js";import"./label-image-editor-Cdf2yDUz.js";import"./matcher-editor-DJ13o3IT.js";import"./number-line-editor-BxQDAPmi.js";import"./phet-simulation-editor-CNBKSWwD.js";import"./plotter-editor-BgjAva1w.js";import"./python-program-editor-Cuui956c.js";import"./sorter-editor-BtQQLGXw.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
