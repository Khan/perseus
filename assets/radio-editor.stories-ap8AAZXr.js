import{j as i}from"./iframe-CE3NtP5L.js";import{E as u}from"./editor-page-with-storybook-preview-C1460FCt.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-EAfzgyQl.js";import"./changeable-DwduNT8j.js";import"./article-renderer-BASSpE1N.js";import"./server-item-renderer-DaNYm8hP.js";import"./hints-renderer-D5-b75Ob.js";import"./content-preview-CrtwScn6.js";import"./components-YB-zxKPE.js";import"./icon-paths-gQMXLUCl.js";import"./editor-page-DGH2BWEe.js";import"./tex-error-view-GhmKUKNI.js";import"./item-extras-editor-DunMnK5i.js";import"./editor-jsonify-CQ_3wDe8.js";import"./blur-input-Ci_Tl5qK.js";import"./free-response-editor-COly_dwl.js";import"./input-number-editor-MwphhRN9.js";import"./Popper-BJVmXmDi.js";import"./label-image-editor-BE1cI9FI.js";import"./matcher-editor-Ccjh1225.js";import"./number-line-editor-BcL7W3m9.js";import"./phet-simulation-editor-D9JBUUwj.js";import"./plotter-editor-eLwO-Lu0.js";import"./python-program-editor-wYykOW8R.js";import"./sorter-editor-CE-_nrEa.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
