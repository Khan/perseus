import{j as i}from"./iframe-CBzmwlmW.js";import{E as u}from"./editor-page-with-storybook-preview-1t_s5euh.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DSwG63UC.js";import"./item-version-BuGqddX0.js";import"./article-renderer-DXc_UT3j.js";import"./server-item-renderer-DZO-SYMc.js";import"./hints-renderer-CQmkUpJG.js";import"./content-preview-gHoM8Fe5.js";import"./components-ClRtcqxI.js";import"./icon-paths-CAw4HXN9.js";import"./editor-page-CM1i2bUY.js";import"./image-editor-DCbT4cAJ.js";import"./editor-jsonify-Cd9gMJZz.js";import"./blur-input-MbC-Gy88.js";import"./tex-error-view-CMzvOPf0.js";import"./item-extras-editor-C5hWnMXb.js";import"./free-response-editor-CeGM1kYD.js";import"./input-number-editor-Dl-tkFpT.js";import"./Popper-TvX6wtwH.js";import"./label-image-editor-Bt2RYbfj.js";import"./matcher-editor-Dwvw5WYr.js";import"./number-line-editor-ybxmMV65.js";import"./phet-simulation-editor-D7AH52H3.js";import"./plotter-editor-DwiC9G4R.js";import"./python-program-editor-B-uq70M-.js";import"./sorter-editor-DOJqzDyT.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
