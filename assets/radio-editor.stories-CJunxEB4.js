import{j as i}from"./iframe-DCipDCEt.js";import{E as u}from"./editor-page-with-storybook-preview-hVAj_EZb.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-CIQlnL9H.js";import"./item-version-DmiFt0GP.js";import"./article-renderer-DUv9J2ur.js";import"./server-item-renderer-PlJdvQeK.js";import"./hints-renderer-qE_acjt-.js";import"./content-preview-DsngM_4A.js";import"./components-CGOdNBpA.js";import"./icon-paths-BP_YvOqK.js";import"./editor-page-Dd3MmJmJ.js";import"./image-editor-DiaE1Rri.js";import"./editor-jsonify-Cp0Z2zPq.js";import"./blur-input-DCN4lEIY.js";import"./tex-error-view-DI1RVsjh.js";import"./item-extras-editor-Cl0y2pH8.js";import"./free-response-editor-CaEe51ng.js";import"./input-number-editor-C0EZ1PRo.js";import"./Popper-BkXTuEJF.js";import"./label-image-editor-DdDSxizj.js";import"./matcher-editor-GTcHE-r0.js";import"./number-line-editor-Cb2nVW0V.js";import"./phet-simulation-editor-DGCbqBrj.js";import"./plotter-editor-B89V4S5d.js";import"./python-program-editor-Df3oAI6z.js";import"./sorter-editor-B7QlwjV6.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
