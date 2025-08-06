import{j as i}from"./iframe-BcUK2hYc.js";import{E as u}from"./editor-page-with-storybook-preview-DdDRLqav.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DhIOgay4.js";import"./item-version-DDS7dZSD.js";import"./article-renderer-jlYA3cTY.js";import"./server-item-renderer-_SCIumcW.js";import"./hints-renderer-EacNxn1w.js";import"./content-preview-Dhpt4KZ-.js";import"./components-Cv7mMrXd.js";import"./icon-paths-TWGXQwCz.js";import"./editor-page-C0mF_MKc.js";import"./image-editor-CO3RpZOc.js";import"./editor-jsonify-CFFswu14.js";import"./blur-input-Dor38g0g.js";import"./tex-error-view-BS_rdTYj.js";import"./item-extras-editor-ivtniAuB.js";import"./free-response-editor-MzCl4IB-.js";import"./input-number-editor-B-JxfaMb.js";import"./Popper-D4lDcsfB.js";import"./label-image-editor-BwDntSvu.js";import"./matcher-editor-C17g6f0-.js";import"./number-line-editor-CPy-eLTv.js";import"./phet-simulation-editor-wUmrISQF.js";import"./plotter-editor-RC45O6sd.js";import"./python-program-editor-DkT8Zlac.js";import"./sorter-editor-9hy_VZGw.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
