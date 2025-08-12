import{j as i}from"./iframe-BgqLstan.js";import{E as u}from"./editor-page-with-storybook-preview-D8gyhmeC.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-CKj1SZBs.js";import"./item-version-wGHmGDpX.js";import"./article-renderer-y5FteWi3.js";import"./server-item-renderer-CQc1DzR0.js";import"./hints-renderer-BtqilCip.js";import"./content-preview-BUDfh6DF.js";import"./components-PSqKATiQ.js";import"./icon-paths-CbvR5ame.js";import"./editor-page-DMa3NIMV.js";import"./image-editor-CgJqrCij.js";import"./editor-jsonify-8DcjuFS7.js";import"./blur-input-B8UDUINl.js";import"./tex-error-view-CuqrKAbQ.js";import"./item-extras-editor-Cb9lE2zl.js";import"./free-response-editor-J3VJIh_G.js";import"./input-number-editor-7kEN8JsZ.js";import"./Popper-CiFe_WXQ.js";import"./label-image-editor-BrGuUUVV.js";import"./matcher-editor-CyI0IZcH.js";import"./number-line-editor-D2gtXJpq.js";import"./phet-simulation-editor-ClRSwuRF.js";import"./plotter-editor-Cw0dzPv3.js";import"./python-program-editor-DXsFI28d.js";import"./sorter-editor-SRextqym.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
