import{j as i}from"./iframe-DC0ACJJa.js";import{E as u}from"./editor-page-with-storybook-preview-DCTDHnpW.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-D-x2irJF.js";import"./item-version-BvOlSWEl.js";import"./article-renderer-BoZfYhe-.js";import"./server-item-renderer-DZIAKksD.js";import"./hints-renderer-BTCG3uDe.js";import"./content-preview-KtdNlvtg.js";import"./components-VnBN92nb.js";import"./icon-paths-Dp8D0WvL.js";import"./editor-page-BoIKHG1x.js";import"./image-editor-BZOi5SZP.js";import"./editor-jsonify-Cr4KNOwF.js";import"./blur-input-C-q-KNye.js";import"./tex-error-view-VFwcM3Zy.js";import"./item-extras-editor-wLsh3FKC.js";import"./free-response-editor-Boq6n_At.js";import"./input-number-editor-B74rkGrj.js";import"./Popper-dB0rP6K1.js";import"./label-image-editor-ChpLkDoM.js";import"./matcher-editor-DZ0kaRUW.js";import"./number-line-editor-BtBsuEAL.js";import"./phet-simulation-editor-D4lZI0zk.js";import"./plotter-editor-Cy-VxSGn.js";import"./python-program-editor-Bu5jsWR2.js";import"./sorter-editor-C1ABcwTs.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
