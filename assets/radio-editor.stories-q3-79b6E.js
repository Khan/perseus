import{j as i}from"./iframe-C7r_V3A-.js";import{E as u}from"./editor-page-with-storybook-preview-C9D_ObLR.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-BlrUKoSv.js";import"./item-version-Dp7EepHS.js";import"./article-renderer-B8rxj9lD.js";import"./server-item-renderer-fFaUHM7b.js";import"./hints-renderer-Cn-VWBYq.js";import"./content-preview-y_60mWOL.js";import"./components-i0uJlaFJ.js";import"./icon-paths-DUcqOpm-.js";import"./editor-page-YMBx7zcE.js";import"./image-editor-D3I4OVya.js";import"./editor-jsonify-CeWDWSYp.js";import"./blur-input-BKjw29-U.js";import"./tex-error-view-CihWTIwY.js";import"./item-extras-editor-D95ZqnBh.js";import"./free-response-editor-hJ6dN2Ea.js";import"./input-number-editor-DUtH9wpS.js";import"./Popper-BjTwEEqs.js";import"./label-image-editor-CKwXqGgw.js";import"./matcher-editor-KJmJLGcA.js";import"./number-line-editor-C702JRP4.js";import"./phet-simulation-editor-CmKUFey_.js";import"./plotter-editor-DecKok4-.js";import"./python-program-editor-D-p5p7f1.js";import"./sorter-editor-C0i6emr0.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
