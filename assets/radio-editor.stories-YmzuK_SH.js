import{j as i}from"./iframe-Cq1qZd-C.js";import{E as u}from"./editor-page-with-storybook-preview-BLv-X97C.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-G6KD6DT2.js";import"./item-version-YfG3076y.js";import"./article-renderer-BFQahaf4.js";import"./server-item-renderer-lCTObLHO.js";import"./hints-renderer-e3gh3eWK.js";import"./content-preview-DInYMGyD.js";import"./components-0NBzS_6m.js";import"./icon-paths-Bss_NZCX.js";import"./editor-page-CRjUSE__.js";import"./image-editor-BRUTstWu.js";import"./editor-jsonify-K0gyFrxQ.js";import"./blur-input-C0uyX17y.js";import"./tex-error-view-Ci63lwHS.js";import"./item-extras-editor-i2K6dvTF.js";import"./free-response-editor-PeOK3tQy.js";import"./input-number-editor-Dx-gmQFK.js";import"./Popper-CJMLFt6b.js";import"./label-image-editor-ntZOD2BQ.js";import"./matcher-editor-CtDXsXWt.js";import"./number-line-editor-7QhgFiXj.js";import"./phet-simulation-editor-DUz78mNg.js";import"./plotter-editor-JJhqBc03.js";import"./python-program-editor-L21cQDXn.js";import"./sorter-editor-BKi-Br4n.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
