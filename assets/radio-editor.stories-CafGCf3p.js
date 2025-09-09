import{j as i}from"./iframe-B-YbJrpL.js";import{E as u}from"./editor-page-with-storybook-preview-DZ0tnltz.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-BHccCyt0.js";import"./item-version-DWuaT6Dp.js";import"./article-renderer-C9d66jzF.js";import"./server-item-renderer-DpP8Wvrh.js";import"./hints-renderer-tP8TvJtv.js";import"./content-preview-BjjJIyVg.js";import"./components-B2xlT8XQ.js";import"./icon-paths-CqVqAUCv.js";import"./editor-page-KxmoBM2j.js";import"./tex-error-view-Pe8Bm6Od.js";import"./item-extras-editor-hiHfNfD9.js";import"./editor-jsonify-BrST9XXc.js";import"./blur-input-viKADifv.js";import"./free-response-editor-CNe9SLVw.js";import"./input-number-editor-BWHp8_SV.js";import"./Popper-D0xjopZW.js";import"./label-image-editor-BhYqhzz7.js";import"./matcher-editor-CNNI6zSx.js";import"./number-line-editor-CBPql9EF.js";import"./phet-simulation-editor-DF3DDcEU.js";import"./plotter-editor-zTtTAKDZ.js";import"./python-program-editor-BQwsm-0Z.js";import"./sorter-editor-BtehrS5u.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
