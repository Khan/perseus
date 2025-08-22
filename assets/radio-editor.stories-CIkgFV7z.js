import{j as i}from"./iframe-DrjN0KiU.js";import{E as u}from"./editor-page-with-storybook-preview-W_8VNGxU.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-B10PtYlj.js";import"./item-version-DmWfCCVr.js";import"./article-renderer-BKiMqq3C.js";import"./server-item-renderer-V1GNUfdc.js";import"./hints-renderer-_kTxEGTd.js";import"./content-preview-BoZB0-CK.js";import"./components-D7lXpXuA.js";import"./icon-paths-DtUI8SEp.js";import"./editor-page-BRKkHjT1.js";import"./image-editor-MQD4PN9m.js";import"./editor-jsonify-BSc1LtJ5.js";import"./blur-input-B1AizbKO.js";import"./tex-error-view-DHNrYjdc.js";import"./item-extras-editor-Bral1tQC.js";import"./free-response-editor-CYA9ULvy.js";import"./input-number-editor-BiQL-W96.js";import"./Popper-u5VynpoL.js";import"./label-image-editor-DYxPS0T7.js";import"./matcher-editor-DexEiLZr.js";import"./number-line-editor-DYsi8aS6.js";import"./phet-simulation-editor-BMR_a3er.js";import"./plotter-editor-Sxpa9PXD.js";import"./python-program-editor-xRt37J2b.js";import"./sorter-editor-C5dR55Xk.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
