import{j as i}from"./iframe-CP-zQJ4F.js";import{E as u}from"./editor-page-with-storybook-preview-C019e7ry.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-Dd2vjF87.js";import"./changeable-CjqAqEVY.js";import"./article-renderer-D4qfPA-R.js";import"./server-item-renderer-DsZI4mLS.js";import"./hints-renderer-fXYeMMVS.js";import"./content-preview-nn6ks2ki.js";import"./components-k4nJQ0qy.js";import"./icon-paths-CVznYdNt.js";import"./editor-page--AQKCqxJ.js";import"./tex-error-view-mXx-Lxrg.js";import"./item-extras-editor-OE97ZMpQ.js";import"./editor-jsonify-BXNpLk4Q.js";import"./blur-input-bgaSN98S.js";import"./free-response-editor-D-57GQxa.js";import"./input-number-editor-i2FTfofw.js";import"./Popper-bA2i84KG.js";import"./label-image-editor-H2KVFOYO.js";import"./matcher-editor-Dk-kYUJu.js";import"./number-line-editor-D05YSWRq.js";import"./phet-simulation-editor-s3_NphIQ.js";import"./plotter-editor-DUW69QCD.js";import"./python-program-editor-j58H3se8.js";import"./sorter-editor-BwaFDsW4.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
