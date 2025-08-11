import{j as i}from"./iframe-BwpIMEHU.js";import{E as u}from"./editor-page-with-storybook-preview-BuW2wFZH.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-BeG94vPg.js";import"./item-version-CHyDTu75.js";import"./article-renderer-BhD35V-t.js";import"./server-item-renderer-ChSVvydf.js";import"./hints-renderer-fofKlBJi.js";import"./content-preview-CfBdDLlG.js";import"./components-BY_vVbSe.js";import"./icon-paths-CYCmhJ5d.js";import"./editor-page-nHK7hrT-.js";import"./image-editor-CJj5NK38.js";import"./editor-jsonify-BWCfRIyt.js";import"./blur-input-DIWDg8kw.js";import"./tex-error-view-DQQiYASp.js";import"./item-extras-editor-DyVEsmaF.js";import"./free-response-editor-CrmFFYcI.js";import"./input-number-editor-CtKsQUn3.js";import"./Popper-t9NiSK0W.js";import"./label-image-editor-Dk5QMoT3.js";import"./matcher-editor-DiORBu5t.js";import"./number-line-editor-DNBKI2Ai.js";import"./phet-simulation-editor-DpEP5iZi.js";import"./plotter-editor-DtcZjVui.js";import"./python-program-editor-BW1Ws2Wp.js";import"./sorter-editor-zajr8hSX.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
