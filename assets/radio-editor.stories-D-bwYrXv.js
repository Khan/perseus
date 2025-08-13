import{j as i}from"./iframe-CoIWeCME.js";import{E as u}from"./editor-page-with-storybook-preview-CYmAv4xo.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-B8fLUVJr.js";import"./item-version-BFeq9Vp6.js";import"./article-renderer-CPv5VZM_.js";import"./server-item-renderer-D8eDYuOH.js";import"./hints-renderer-DzR97Dj1.js";import"./content-preview-DrsM9-6a.js";import"./components-DRWNInlp.js";import"./icon-paths-BumhTajt.js";import"./editor-page-CnGjhJ17.js";import"./image-editor-ByUY1qrX.js";import"./editor-jsonify-DilCfWH7.js";import"./blur-input-BM0KHhLS.js";import"./tex-error-view-d7F8HJkt.js";import"./item-extras-editor-C1ao14aC.js";import"./free-response-editor-JQ06RusP.js";import"./input-number-editor-mSVIg226.js";import"./Popper-C14ggVEq.js";import"./label-image-editor-DYcgIX_0.js";import"./matcher-editor-Fbkc6eng.js";import"./number-line-editor-BqOA7KUB.js";import"./phet-simulation-editor-D9JGHWjf.js";import"./plotter-editor-CnrllDx3.js";import"./python-program-editor-9rHPnAMu.js";import"./sorter-editor-jUdmCmNP.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
