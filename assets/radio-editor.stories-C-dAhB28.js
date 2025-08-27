import{j as i}from"./iframe-DrenmEsb.js";import{E as u}from"./editor-page-with-storybook-preview-D69VkAZj.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DqkDOcDz.js";import"./item-version-DWOGl_3A.js";import"./article-renderer-DiAhqv4P.js";import"./server-item-renderer-Dk0InSHQ.js";import"./hints-renderer-EKE0ysCH.js";import"./content-preview-mEwKVDqr.js";import"./components-DRJtDzFc.js";import"./icon-paths-CjY0sQEg.js";import"./editor-page-DN3pvWor.js";import"./tex-error-view-IbvgHgaq.js";import"./item-extras-editor-xFt4rM2c.js";import"./editor-jsonify-a0-cuTTe.js";import"./blur-input-Db4dJB3Q.js";import"./free-response-editor-BN5ar-77.js";import"./input-number-editor-CIyioWhj.js";import"./Popper-DHgsclpW.js";import"./label-image-editor-7ELczuAW.js";import"./matcher-editor-CI1h_zZ_.js";import"./number-line-editor-Bk3xchmS.js";import"./phet-simulation-editor-DX-69Tbo.js";import"./plotter-editor-fGiKlehc.js";import"./python-program-editor-c-9K8szC.js";import"./sorter-editor-z2WlqZJi.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
