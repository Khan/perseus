import{j as i}from"./iframe-hRc7QVRN.js";import{E as u}from"./editor-page-with-storybook-preview-B-jJIL72.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-Bu2LdEvh.js";import"./item-version-Ew2WYzNF.js";import"./article-renderer-njUThmNe.js";import"./server-item-renderer-CuSEeggd.js";import"./hints-renderer-DLx3rRlR.js";import"./content-preview-CbF5sXbi.js";import"./components-DQbsTmhw.js";import"./icon-paths-BWCL0yzl.js";import"./editor-page-BJ4o7Gp8.js";import"./image-editor-Btgx4Ide.js";import"./editor-jsonify-Btem054p.js";import"./blur-input-BxN2A3bL.js";import"./tex-error-view-BCOEFGjY.js";import"./item-extras-editor-gOXQ1ru1.js";import"./free-response-editor-Cf7V9TG8.js";import"./input-number-editor-kyrKTGYX.js";import"./Popper-2ATynB_D.js";import"./label-image-editor-CXzLfHR1.js";import"./matcher-editor-BtaatkLk.js";import"./number-line-editor-Dfdy-Gr-.js";import"./phet-simulation-editor-Dea7BPey.js";import"./plotter-editor-BSDouc2Y.js";import"./python-program-editor-BADuf4-a.js";import"./sorter-editor-BpRkS-BI.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
