import{j as i}from"./iframe-4CcKLhz6.js";import{E as u}from"./editor-page-with-storybook-preview-DM1WoUK9.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DmHTrCcx.js";import"./item-version-Cmcht_BC.js";import"./article-renderer-HXUk3sSk.js";import"./server-item-renderer-B43KbtSK.js";import"./hints-renderer-Dd6-WvSp.js";import"./content-preview-DBmFC6I9.js";import"./components-C1X24_9F.js";import"./icon-paths-DXF1Z7by.js";import"./editor-page-DIZRc0vM.js";import"./image-editor-DJ_yLfUW.js";import"./editor-jsonify-Z0uEtY_x.js";import"./blur-input-BIDKS_3v.js";import"./tex-error-view-Ba63GcF7.js";import"./item-extras-editor-BGv3gtL2.js";import"./free-response-editor-BRgyNqE8.js";import"./input-number-editor-CF9Wazu8.js";import"./Popper-aSmBR6BO.js";import"./label-image-editor-CgB6ghNu.js";import"./matcher-editor-Bkr9ie0s.js";import"./number-line-editor-xLNF0ZfO.js";import"./phet-simulation-editor-0cEBcNgJ.js";import"./plotter-editor-CJVDbUNi.js";import"./python-program-editor-DjYcIKuP.js";import"./sorter-editor-DUhWKtNd.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
