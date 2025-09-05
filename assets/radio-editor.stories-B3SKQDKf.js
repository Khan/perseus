import{j as i}from"./iframe-DKHveS6o.js";import{E as u}from"./editor-page-with-storybook-preview-DffD04lN.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-CjB7Qmi2.js";import"./item-version-BuvQYYYF.js";import"./article-renderer-C9-819vE.js";import"./server-item-renderer-Dag1IC5C.js";import"./hints-renderer-DmDekxi3.js";import"./content-preview-CjdjWlAA.js";import"./components-BTvhGjUN.js";import"./icon-paths-B4j45iK_.js";import"./editor-page-yMzzAEpY.js";import"./tex-error-view-BVUyD6qh.js";import"./item-extras-editor-DSHZQgCK.js";import"./editor-jsonify-CPCmu6yI.js";import"./blur-input-B3aO8SVH.js";import"./free-response-editor-D0d2MpKG.js";import"./input-number-editor-DHmVvnNq.js";import"./Popper-BV7EZWf3.js";import"./label-image-editor-BJoubKbU.js";import"./matcher-editor-BDNxCC9q.js";import"./number-line-editor-CJhj4eA_.js";import"./phet-simulation-editor-COP3JOAt.js";import"./plotter-editor-DK8qlV0K.js";import"./python-program-editor-CGMJysWS.js";import"./sorter-editor-BOGOHJr5.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
