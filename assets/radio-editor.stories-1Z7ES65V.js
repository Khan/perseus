import{j as i}from"./iframe-Bs0680DQ.js";import{E as u}from"./editor-page-with-storybook-preview-B5QC7TJd.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-BIDxG2YE.js";import"./changeable-8-ECgKAd.js";import"./article-renderer-B2RUnVv_.js";import"./server-item-renderer-Cl2DFJ5h.js";import"./hints-renderer-74VnI3Mi.js";import"./content-preview-Bf5F4g4H.js";import"./components-CsAmRibY.js";import"./icon-paths-CE6HmnNM.js";import"./editor-page-C7vT6Gn8.js";import"./tex-error-view-xADJuHSa.js";import"./item-extras-editor-XMTvr4b1.js";import"./editor-jsonify-B8RpmSYm.js";import"./blur-input-zunoP0_d.js";import"./free-response-editor-2txeYnMj.js";import"./input-number-editor-CxOrU4SW.js";import"./Popper-CkbgcNVe.js";import"./label-image-editor-DN5PHFuM.js";import"./matcher-editor-CmfHIqTL.js";import"./number-line-editor-CdE_Y9vr.js";import"./phet-simulation-editor-BH-SbZB1.js";import"./plotter-editor-CabBjapK.js";import"./python-program-editor-CPaJrpqt.js";import"./sorter-editor-D5D0BLRN.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
