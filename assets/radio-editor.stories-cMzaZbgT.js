import{j as i}from"./iframe-3hb076BO.js";import{E as u}from"./editor-page-with-storybook-preview-D-wggRiA.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-D_jjt1rR.js";import"./item-version-Bdpm_HQi.js";import"./article-renderer-DKu7MGU_.js";import"./server-item-renderer-BIEks0VV.js";import"./hints-renderer-CoakVpcE.js";import"./content-preview-f0RCUblx.js";import"./components-DBinYojL.js";import"./icon-paths-BsAPaswM.js";import"./editor-page-Cf6JGYRP.js";import"./tex-error-view-Du-uB-Bk.js";import"./item-extras-editor-BgE4tkqh.js";import"./editor-jsonify-7QY0pyve.js";import"./blur-input-DhXYlAxY.js";import"./free-response-editor-B79FNboU.js";import"./input-number-editor-D1SP5ihL.js";import"./Popper-BmY6TTDj.js";import"./label-image-editor-CStMYJUC.js";import"./matcher-editor-BUE23TiH.js";import"./number-line-editor-CF3MWCoA.js";import"./phet-simulation-editor-1tAbGGWB.js";import"./plotter-editor-DrHwtcKt.js";import"./python-program-editor-DqYeUjft.js";import"./sorter-editor-BAYsNly5.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
