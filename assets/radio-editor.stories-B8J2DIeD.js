import{j as i}from"./iframe-CDagQRjv.js";import{E as u}from"./editor-page-with-storybook-preview-De2hytav.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-BO2l7_gi.js";import"./changeable-CCbjBXnT.js";import"./article-renderer-BvVXuZjG.js";import"./server-item-renderer-BqGpUYA5.js";import"./hints-renderer-D9m6ukVh.js";import"./content-preview-CqwpB17r.js";import"./components-CWyabbC1.js";import"./icon-paths-W7ZxPGAE.js";import"./editor-page-Dp-A6xMi.js";import"./tex-error-view-BQybWZSg.js";import"./item-extras-editor-BngLVeGd.js";import"./editor-jsonify-8RSDlMLh.js";import"./blur-input-B7TL9duN.js";import"./free-response-editor-BYysdCbs.js";import"./input-number-editor-DU6RZzLo.js";import"./Popper-BvVW5jD0.js";import"./label-image-editor-DIzSgoUd.js";import"./matcher-editor-BHUlvdC7.js";import"./number-line-editor-C-pmiwpv.js";import"./phet-simulation-editor-CK3rtM7V.js";import"./plotter-editor-D3GESubb.js";import"./python-program-editor-BjE578sI.js";import"./sorter-editor-C-sgf4qP.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
