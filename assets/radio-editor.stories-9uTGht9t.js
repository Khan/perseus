import{j as i}from"./iframe--THAEHEv.js";import{E as u}from"./editor-page-with-storybook-preview-Dg3MJXxU.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-B5SzFAkO.js";import"./item-version-Ba6OfHyc.js";import"./article-renderer-D9_4gOZR.js";import"./server-item-renderer-JprrZMv0.js";import"./hints-renderer-C_0p0GFr.js";import"./content-preview-DHnK-YeM.js";import"./components-D2denQi1.js";import"./icon-paths-mPGI_fLy.js";import"./editor-page-D03r9xll.js";import"./image-editor-alKMSCpd.js";import"./editor-jsonify-DPyqGhw6.js";import"./blur-input-CEml3Lyt.js";import"./tex-error-view-BcxF8znG.js";import"./item-extras-editor-BCuNwj39.js";import"./free-response-editor-DO-460v4.js";import"./input-number-editor-CJP0mCR7.js";import"./Popper-9QrUS_4n.js";import"./label-image-editor-C1Zuw133.js";import"./matcher-editor-fJv7k0-Y.js";import"./number-line-editor-CC5TTEgl.js";import"./phet-simulation-editor-CEGaGvXS.js";import"./plotter-editor-DAfU8htq.js";import"./python-program-editor-BnrHLUrN.js";import"./sorter-editor-QNjscWi6.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
