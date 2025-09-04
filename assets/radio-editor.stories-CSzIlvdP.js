import{j as i}from"./iframe-F3_oqL7O.js";import{E as u}from"./editor-page-with-storybook-preview-eFB45Lti.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-BxrHfDNt.js";import"./item-version-CQp-Cohu.js";import"./article-renderer-CltmiXsX.js";import"./server-item-renderer-BcfJF0Ip.js";import"./hints-renderer-B9I7YfBe.js";import"./content-preview-PsekF7em.js";import"./components-Dc5fVOuB.js";import"./icon-paths-C01l9r4c.js";import"./editor-page-BfVIbQF-.js";import"./tex-error-view-DR77XQwl.js";import"./item-extras-editor-S_qj_VBv.js";import"./editor-jsonify-BV6JefrH.js";import"./blur-input-D3_0NiMk.js";import"./free-response-editor-Qo8bx7cV.js";import"./input-number-editor-BewCqVa5.js";import"./Popper-Bo8AjKu1.js";import"./label-image-editor-B0SrBMYy.js";import"./matcher-editor-CxSpJb4_.js";import"./number-line-editor-DmRqc-ar.js";import"./phet-simulation-editor-CKs7obJ8.js";import"./plotter-editor-ABrbZ293.js";import"./python-program-editor-DWM08gwH.js";import"./sorter-editor-O4F988lf.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
