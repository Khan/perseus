import{j as i}from"./iframe-DMYzKZaM.js";import{E as u}from"./editor-page-with-storybook-preview-DAlHbbOT.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-D-gmVJ5c.js";import"./item-version-D5OK3muV.js";import"./article-renderer-BumrXCpq.js";import"./server-item-renderer-16SzcDUP.js";import"./hints-renderer-DiIhNC9S.js";import"./content-preview-CFoCcQ_6.js";import"./components-BWESQxhk.js";import"./icon-paths-BUez6vzv.js";import"./editor-page-DZqlctta.js";import"./image-editor-BIuGcGfS.js";import"./editor-jsonify-zOQT-8vr.js";import"./blur-input-By0ekldv.js";import"./tex-error-view-DJQG4Zdi.js";import"./item-extras-editor-ZBNe39MU.js";import"./free-response-editor-5NT9_jIO.js";import"./input-number-editor-CyLlG5Ev.js";import"./Popper-CIZhP22T.js";import"./label-image-editor-9UqycxJn.js";import"./matcher-editor-Bs3tvVap.js";import"./number-line-editor-Bad5Bn33.js";import"./phet-simulation-editor--YWmih5u.js";import"./plotter-editor-Cx9fjp23.js";import"./python-program-editor-B5ARev8c.js";import"./sorter-editor-B7nEoalm.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
