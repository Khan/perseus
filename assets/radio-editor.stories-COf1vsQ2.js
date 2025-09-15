import{j as i}from"./iframe-BTBckUoD.js";import{E as u}from"./editor-page-with-storybook-preview-Do8BzygK.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DQwAWU5u.js";import"./changeable-DSDYKS7d.js";import"./article-renderer-Dpuge1GM.js";import"./server-item-renderer-Cz7-yTIH.js";import"./hints-renderer-Cpo2FC22.js";import"./content-preview-SkuYkgMK.js";import"./components-DkAg5gEr.js";import"./icon-paths-nHU7Sxie.js";import"./editor-page-DiCOHLP_.js";import"./tex-error-view-CtwPiDj3.js";import"./item-extras-editor-wdSRFdtt.js";import"./editor-jsonify-DSmfnO5x.js";import"./blur-input-BAc9xy_x.js";import"./free-response-editor-Df35LZaE.js";import"./input-number-editor-D8v1aCHR.js";import"./Popper-D-SyXLHh.js";import"./label-image-editor-DaYMnYvj.js";import"./matcher-editor-DMBiBf_z.js";import"./number-line-editor-DSd3zhYc.js";import"./phet-simulation-editor-Bkivdjnn.js";import"./plotter-editor-CRJf5v0C.js";import"./python-program-editor-C0x1W8iz.js";import"./sorter-editor-Dm8-lQVQ.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
