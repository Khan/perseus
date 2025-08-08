import{j as i}from"./iframe-a55SfhnE.js";import{E as u}from"./editor-page-with-storybook-preview-DiOG8gsq.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-B2YRPAP6.js";import"./item-version-DwllJm9Q.js";import"./article-renderer-C6c4yXez.js";import"./server-item-renderer-D9BD87iI.js";import"./hints-renderer-DCMmlGYF.js";import"./content-preview-dz_k4Nhk.js";import"./components-XqNhEz7A.js";import"./icon-paths-Ch58QTow.js";import"./editor-page-BMhcwFiG.js";import"./image-editor-Ble12KcX.js";import"./editor-jsonify-DnRS02Na.js";import"./blur-input-CMjhRFIh.js";import"./tex-error-view-D9JjdLFc.js";import"./item-extras-editor-BQHH2CdE.js";import"./free-response-editor-BfL-9gp7.js";import"./input-number-editor-Ba-oBuWt.js";import"./Popper-8XWiuF_d.js";import"./label-image-editor-CQHTtKaB.js";import"./matcher-editor-BkCZSj8v.js";import"./number-line-editor-F7KX3Xm6.js";import"./phet-simulation-editor-kpyZOn3o.js";import"./plotter-editor-BduSkmxW.js";import"./python-program-editor-CpSRjVsD.js";import"./sorter-editor-DVeFLomy.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
