import{j as i}from"./iframe-EWGmIh4C.js";import{E as u}from"./editor-page-with-storybook-preview-B0Xhc86A.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-2i6I9PFf.js";import"./item-version-DJ0cjDAI.js";import"./article-renderer-BZV8qgGd.js";import"./server-item-renderer-IU-E4vSS.js";import"./hints-renderer-BpJVG8h4.js";import"./content-preview-BU0yt86w.js";import"./components-yUAMwI8R.js";import"./icon-paths-DcEBdnV1.js";import"./editor-page-DZTxxrR2.js";import"./image-editor-jM9qHzQc.js";import"./editor-jsonify-CVlMUq2L.js";import"./blur-input-DekE0Gmr.js";import"./tex-error-view-CT8jTCOU.js";import"./item-extras-editor-bFPxtJKF.js";import"./free-response-editor-BOTNAwx2.js";import"./input-number-editor-CTr9EXSE.js";import"./Popper-CG3p9Bbt.js";import"./label-image-editor-Cb5taJvk.js";import"./matcher-editor-BkJ-naWn.js";import"./number-line-editor-D80_rl5E.js";import"./phet-simulation-editor-B1wHb-aM.js";import"./plotter-editor-9HzjNh-F.js";import"./python-program-editor-xSCzkHSK.js";import"./sorter-editor-Cr01NIv9.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
