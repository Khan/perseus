import{j as i}from"./iframe-DuyLhNDL.js";import{E as u}from"./editor-page-with-storybook-preview-BnFXRq3C.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-BEy2LY3z.js";import"./changeable-Cte12Kon.js";import"./article-renderer-WLfEIjFg.js";import"./server-item-renderer-DUbxMv6R.js";import"./hints-renderer-Bky06awl.js";import"./content-preview-CTkYqW9E.js";import"./components-BZLqjw0k.js";import"./icon-paths-pDtP2kcP.js";import"./editor-page-El26xee-.js";import"./tex-error-view-BCALdYpA.js";import"./item-extras-editor-CiTXAXfF.js";import"./editor-jsonify-Bbs-1Z-T.js";import"./blur-input-C3o5vSeT.js";import"./free-response-editor-BMW3P_mE.js";import"./input-number-editor-XMY4ia1z.js";import"./Popper-D8Xs7c5G.js";import"./label-image-editor-Ctp-xBfw.js";import"./matcher-editor-uc3pL26m.js";import"./number-line-editor-C9Q9SGSk.js";import"./phet-simulation-editor-DgIpZSvm.js";import"./plotter-editor-BymFeERy.js";import"./python-program-editor-RoxVl1E6.js";import"./sorter-editor-CKwGI6NQ.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
