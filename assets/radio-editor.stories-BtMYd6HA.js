import{j as i}from"./iframe-BUqiAjvg.js";import{E as u}from"./editor-page-with-storybook-preview-CbWYbzxa.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-Uzkd3OLT.js";import"./changeable-BIIkL6QK.js";import"./article-renderer-BMdS74on.js";import"./server-item-renderer-BWbA54HK.js";import"./hints-renderer-RXA74GFK.js";import"./content-preview-ibOG6CPd.js";import"./components-40MYzgN1.js";import"./icon-paths-Dw3QWWRN.js";import"./editor-page-C0hWEKkq.js";import"./tex-error-view-CRi9y7ze.js";import"./item-extras-editor-BEZCtRSL.js";import"./editor-jsonify-BmGheLxA.js";import"./blur-input-BwMCEkN5.js";import"./free-response-editor-C1dxHW-x.js";import"./input-number-editor-ETe6qJbG.js";import"./Popper-o2UhZJdE.js";import"./label-image-editor-BYHaAA4y.js";import"./matcher-editor-Zdm32iLj.js";import"./number-line-editor-CM1tckUG.js";import"./phet-simulation-editor-B2oKM35F.js";import"./plotter-editor-BDhC--_l.js";import"./python-program-editor-DUg5h9xD.js";import"./sorter-editor-BNnlJerm.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
