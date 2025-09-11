import{j as i}from"./iframe-uzHcYCYA.js";import{E as u}from"./editor-page-with-storybook-preview-C3px7d10.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-Dua1RWpW.js";import"./changeable-B2w2BFwG.js";import"./article-renderer-4-q2xvQd.js";import"./server-item-renderer-BVk1JHoz.js";import"./hints-renderer-CEzxYndO.js";import"./content-preview-D5rYJsdK.js";import"./components-DYvSC_-z.js";import"./icon-paths-CTDXG4an.js";import"./editor-page-BE8W7E7U.js";import"./tex-error-view-lXL5mG2i.js";import"./item-extras-editor-DlbWSECZ.js";import"./editor-jsonify-Bn4QN6oX.js";import"./blur-input-DmtitOM9.js";import"./free-response-editor-DOlZ6M2X.js";import"./input-number-editor-CSz27eA6.js";import"./Popper-DlGDGz0c.js";import"./label-image-editor-D4NG0ztA.js";import"./matcher-editor-y3D49Wu4.js";import"./number-line-editor-F_sKVtUB.js";import"./phet-simulation-editor-Yh-QV-ls.js";import"./plotter-editor-CZawkXrv.js";import"./python-program-editor-BP80zaYo.js";import"./sorter-editor-DaiqHjso.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
