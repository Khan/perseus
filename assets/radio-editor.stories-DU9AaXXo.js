import{j as i}from"./iframe-j25UteGQ.js";import{E as u}from"./editor-page-with-storybook-preview-BzG_5MDF.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DwEsibBt.js";import"./item-version-B00y4dfv.js";import"./article-renderer-CM0P48nG.js";import"./server-item-renderer-CMFMS3Qe.js";import"./hints-renderer-glo0_wVL.js";import"./content-preview-CMHBpbqR.js";import"./components-CvXZ4FNp.js";import"./icon-paths-Bi3YDjMv.js";import"./editor-page-CZmVkuv6.js";import"./image-editor-BgL4N3Ti.js";import"./editor-jsonify-C6MqAICs.js";import"./blur-input-C-XXKiGp.js";import"./tex-error-view-DM7ARkHg.js";import"./item-extras-editor-FeFROYCj.js";import"./free-response-editor-Dj7lLfm0.js";import"./input-number-editor-Dmy7iT08.js";import"./Popper-CBYEqgun.js";import"./label-image-editor-BwqLkgVl.js";import"./matcher-editor-DgpET-9H.js";import"./number-line-editor-Bb8xoZrl.js";import"./phet-simulation-editor-jXwjCGFC.js";import"./plotter-editor-B0k5tWvA.js";import"./python-program-editor-C_SxrCiF.js";import"./sorter-editor-B_9n5PPW.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
