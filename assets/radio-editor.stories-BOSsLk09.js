import{j as i}from"./iframe-BgmivyAp.js";import{E as u}from"./editor-page-with-storybook-preview-CpFiLihc.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-C9Wu-gvT.js";import"./changeable-ZO_UNrxn.js";import"./article-renderer-DAAhF_kA.js";import"./server-item-renderer-DiU1TMno.js";import"./hints-renderer-DF5f2Anf.js";import"./content-preview-zOf41QpT.js";import"./components-89Szg_er.js";import"./icon-paths-CpmlTXGK.js";import"./editor-page-CfztiU6D.js";import"./tex-error-view-DrT1x___.js";import"./item-extras-editor-BXpRaKZI.js";import"./editor-jsonify-GgSCjj4O.js";import"./blur-input-DM-YuRPe.js";import"./free-response-editor-DvMPaUZY.js";import"./input-number-editor-DFOmgMCy.js";import"./Popper-ibKjs24X.js";import"./label-image-editor-bvWb3tME.js";import"./matcher-editor-vIbfDIWN.js";import"./number-line-editor-Bl-Bqlg4.js";import"./phet-simulation-editor-vQ7mn968.js";import"./plotter-editor-Cfcc6ZgX.js";import"./python-program-editor-Djls18Gx.js";import"./sorter-editor-B2GXM1Wg.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
