import{j as i}from"./iframe-BA954KEO.js";import{E as u}from"./editor-page-with-storybook-preview-CFK4BkIa.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-iiXRYmw2.js";import"./item-version-MqFis2bJ.js";import"./article-renderer-DST9ZdYu.js";import"./server-item-renderer-Q5okag7a.js";import"./hints-renderer-0xl2XLV0.js";import"./content-preview-guVbQQgW.js";import"./components-Bxw5Bkju.js";import"./icon-paths-Bv2E_CVR.js";import"./editor-page-CGAexRMZ.js";import"./tex-error-view-De9FYSNw.js";import"./item-extras-editor-DlxlhUVD.js";import"./editor-jsonify-DFjeklcf.js";import"./blur-input-BXvlJIki.js";import"./free-response-editor--cKqCa3N.js";import"./input-number-editor-zEnRimT-.js";import"./Popper-DNRse8BZ.js";import"./label-image-editor-wGw66lB1.js";import"./matcher-editor-BdZiv_hd.js";import"./number-line-editor-Bean9T87.js";import"./phet-simulation-editor-DpCMMvVF.js";import"./plotter-editor-CWttMj5v.js";import"./python-program-editor-CwV7vFk6.js";import"./sorter-editor-DQjIH21N.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
