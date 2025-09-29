import{j as i}from"./iframe-BDfd20el.js";import{E as u}from"./editor-page-with-storybook-preview-BFZ_Bq1x.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-2gXPGWsC.js";import"./changeable-CBopxQ_h.js";import"./article-renderer-CnKwc4WG.js";import"./server-item-renderer-ZCFSVAca.js";import"./hints-renderer-Co5MT86T.js";import"./content-preview-CwnbiJ74.js";import"./components-4zEMKafp.js";import"./icon-paths-DMcntd5r.js";import"./editor-page-DVBZj4Of.js";import"./tex-error-view-I7r5TBK2.js";import"./item-extras-editor-CWLIQMCy.js";import"./editor-jsonify-DYIEPtQw.js";import"./blur-input-C2TicqLT.js";import"./free-response-editor-ToCor6qD.js";import"./input-number-editor-Bf2-Gzba.js";import"./Popper-B6zSMaWm.js";import"./label-image-editor-BPU6uBsA.js";import"./matcher-editor-D0sqelcK.js";import"./number-line-editor-C0F_uS6T.js";import"./phet-simulation-editor-zKqcQoul.js";import"./plotter-editor-CvZKNGYV.js";import"./python-program-editor-DvN7CljA.js";import"./sorter-editor-B4vbnbjd.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
