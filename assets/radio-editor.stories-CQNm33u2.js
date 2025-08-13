import{j as i}from"./iframe-ChI2rGpr.js";import{E as u}from"./editor-page-with-storybook-preview-D5iJRPGN.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-BI6GiQmL.js";import"./item-version-DEGaBoBe.js";import"./article-renderer-BdJLIWK5.js";import"./server-item-renderer-D0Wpmdv8.js";import"./hints-renderer-Bk-2NsLT.js";import"./content-preview-CaTXDJp_.js";import"./components-DXaeejgW.js";import"./icon-paths-DKy0EYqy.js";import"./editor-page-_I9F6xqS.js";import"./image-editor-Bsulv0_L.js";import"./editor-jsonify-BKdoDEz1.js";import"./blur-input-DBIkz-p-.js";import"./tex-error-view-AXCnO0hm.js";import"./item-extras-editor-CL6Nmh3h.js";import"./free-response-editor-1eBkf3Fe.js";import"./input-number-editor-BOIA-Nko.js";import"./Popper-r57raGIK.js";import"./label-image-editor-Dh4MD0ve.js";import"./matcher-editor-DJxeafkq.js";import"./number-line-editor-VeWlUQZI.js";import"./phet-simulation-editor-Ais7dBqt.js";import"./plotter-editor-BHYRbhjo.js";import"./python-program-editor-rmNzoRvZ.js";import"./sorter-editor-D_Z3fqRR.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
