import{j as i}from"./iframe-CWALGMeL.js";import{E as u}from"./editor-page-with-storybook-preview-Clw1Xokm.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-Bua-YzQz.js";import"./changeable-Cofc6APC.js";import"./article-renderer-C3qc8_-8.js";import"./server-item-renderer-DO1beWR7.js";import"./hints-renderer-DQ6RBTDt.js";import"./content-preview-rtt1EdAO.js";import"./components-BlmQ54dN.js";import"./icon-paths-CKRqeZyq.js";import"./editor-page-CCEv8P_G.js";import"./tex-error-view-DljeqxgT.js";import"./item-extras-editor-B2Olfyzd.js";import"./editor-jsonify-RjMlH4rF.js";import"./blur-input-DE4McZNG.js";import"./free-response-editor-D003hSpU.js";import"./input-number-editor-C--EBmja.js";import"./Popper-C7kbDKRW.js";import"./label-image-editor-DaRZ4Z6k.js";import"./matcher-editor-Bf_7Qygo.js";import"./number-line-editor-DeInwrL_.js";import"./phet-simulation-editor-CR10u54U.js";import"./plotter-editor-DwU7mmZ1.js";import"./python-program-editor-C3y1ZaAY.js";import"./sorter-editor-DZfe87Gi.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
