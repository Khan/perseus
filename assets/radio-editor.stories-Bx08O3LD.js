import{j as i}from"./iframe-DCJ8exyC.js";import{E as u}from"./editor-page-with-storybook-preview-CU2RN6px.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-T0bHoFnb.js";import"./changeable-C82gKeax.js";import"./article-renderer-DZMwJQGf.js";import"./server-item-renderer-X1oqEcIj.js";import"./hints-renderer-DdJNA5y-.js";import"./content-preview-F5e9HIbr.js";import"./components-CAhpd-2F.js";import"./icon-paths-CTuZnc_M.js";import"./editor-page-DWEOd9E8.js";import"./tex-error-view-DTAZG77r.js";import"./item-extras-editor-D0kcfx5U.js";import"./editor-jsonify-D9nQTQEJ.js";import"./blur-input-CNS8RoZF.js";import"./free-response-editor-YTBJ0jJ6.js";import"./input-number-editor-RRSjgozL.js";import"./Popper-GsAmK7rE.js";import"./label-image-editor-C8bnQAtM.js";import"./matcher-editor-CyZYtOzo.js";import"./number-line-editor-3FUGXn3Y.js";import"./phet-simulation-editor-DXn_N4f6.js";import"./plotter-editor-Cl7xZl8B.js";import"./python-program-editor-CJP4VXxE.js";import"./sorter-editor-BT8IGYAi.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
