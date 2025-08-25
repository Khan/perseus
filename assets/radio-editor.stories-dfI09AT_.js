import{j as i}from"./iframe-BJEvBpNN.js";import{E as u}from"./editor-page-with-storybook-preview-C0XTOwEV.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-nUn67HC0.js";import"./item-version-C0PfWFgG.js";import"./article-renderer-2AScVx07.js";import"./server-item-renderer-CVaJNtxc.js";import"./hints-renderer-Ca7G1BPm.js";import"./content-preview-D1rsF397.js";import"./components-DWcPDyc_.js";import"./icon-paths-Eava6PL-.js";import"./editor-page-BDyjm4__.js";import"./tex-error-view-D7pP2ABq.js";import"./item-extras-editor-C0COFSvV.js";import"./editor-jsonify-BgjN-USO.js";import"./blur-input-2WAgaPvP.js";import"./free-response-editor-CO_OLX-p.js";import"./input-number-editor-DemANi2B.js";import"./Popper-DpreiVGL.js";import"./label-image-editor-DHPun3fs.js";import"./matcher-editor-Bw6XDieY.js";import"./number-line-editor-CbWzvs7i.js";import"./phet-simulation-editor-C0gf4nib.js";import"./plotter-editor-DJ5v4Ppd.js";import"./python-program-editor-D8ildDMQ.js";import"./sorter-editor-CablJwyE.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
