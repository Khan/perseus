import{j as i}from"./iframe-BxN7j4nx.js";import{E as u}from"./editor-page-with-storybook-preview-6WRsdLRy.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-CIPdQ4mA.js";import"./changeable-D3ATpbEp.js";import"./article-renderer-DwiAwhGg.js";import"./server-item-renderer-B4CCd0ty.js";import"./hints-renderer-B9_CYciC.js";import"./content-preview-Dyuy5as9.js";import"./components-B51XGnmB.js";import"./icon-paths-WFOnyYME.js";import"./editor-page-CJs2lVav.js";import"./tex-error-view-7e9DRdYV.js";import"./item-extras-editor-Dziuy5Yo.js";import"./editor-jsonify-BUXMRN6C.js";import"./blur-input-niGJhybi.js";import"./free-response-editor-BW6zuibc.js";import"./input-number-editor-BGqIpF0b.js";import"./Popper-CwI11sDL.js";import"./label-image-editor-a_hSV9dZ.js";import"./matcher-editor-CV60txty.js";import"./number-line-editor-BXkZ5WeC.js";import"./phet-simulation-editor-t3WOrgcU.js";import"./plotter-editor-Dbh5pl0i.js";import"./python-program-editor-IH518kYe.js";import"./sorter-editor-OO7TFggb.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
