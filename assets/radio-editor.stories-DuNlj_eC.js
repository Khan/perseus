import{j as i}from"./iframe-DmIxUJgN.js";import{E as u}from"./editor-page-with-storybook-preview-DhxwZqf2.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-JdQAVI3b.js";import"./changeable-CB5_noCv.js";import"./article-renderer-B2JZyrlB.js";import"./server-item-renderer-DsZho_2j.js";import"./hints-renderer-C3mln8wE.js";import"./content-preview-Lf3Z2GTu.js";import"./components-CzW8WRg9.js";import"./icon-paths-BewN0enG.js";import"./editor-page-CWH2APYZ.js";import"./tex-error-view-CrxiomtQ.js";import"./item-extras-editor-CDZkgsbA.js";import"./editor-jsonify-B_e0vgHi.js";import"./blur-input-Doq-6fD1.js";import"./free-response-editor-gqHkCBO6.js";import"./input-number-editor-8BMkHaRd.js";import"./Popper-CrA_sk69.js";import"./label-image-editor-DfF6RiG9.js";import"./matcher-editor-B9raiGXV.js";import"./number-line-editor-DMBqsx_s.js";import"./phet-simulation-editor-kXNd5k0H.js";import"./plotter-editor-TpqJzB4l.js";import"./python-program-editor-DVfpO--U.js";import"./sorter-editor-BsUA1ung.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
