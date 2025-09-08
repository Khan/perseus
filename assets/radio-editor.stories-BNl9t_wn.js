import{j as i}from"./iframe-D2zhQ65D.js";import{E as u}from"./editor-page-with-storybook-preview-BzJU8_YB.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-B0Hj9BWr.js";import"./item-version-BBCzxQy0.js";import"./article-renderer-8yb5SZcs.js";import"./server-item-renderer-BCvJq6wh.js";import"./hints-renderer-C3Tbrrtj.js";import"./content-preview-q82Py0dj.js";import"./components-F2-4gBMo.js";import"./icon-paths-D4bwPppe.js";import"./editor-page-DI6Xjr_v.js";import"./tex-error-view-DyJ_zi26.js";import"./item-extras-editor-BojtWhzZ.js";import"./editor-jsonify-BKT4fHo4.js";import"./blur-input-DfdbCwjP.js";import"./free-response-editor-DOt17R9u.js";import"./input-number-editor-DwFXPxrg.js";import"./Popper-CAGTyY7S.js";import"./label-image-editor-C2JPVbN5.js";import"./matcher-editor-DNROWPlx.js";import"./number-line-editor-BJRVRBzi.js";import"./phet-simulation-editor-Bfx9_dyG.js";import"./plotter-editor-Bbfu0QAs.js";import"./python-program-editor-b3uQC66t.js";import"./sorter-editor-95VHN7xX.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
