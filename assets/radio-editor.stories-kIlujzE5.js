import{j as i}from"./iframe-DlBZI7Ll.js";import{E as u}from"./editor-page-with-storybook-preview-CSo16wlT.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-C5MR9u4v.js";import"./changeable-DaaWs0qv.js";import"./article-renderer-B66uGFCV.js";import"./server-item-renderer-Du7ghijY.js";import"./hints-renderer-CN5PPsTA.js";import"./content-preview-DTAQ2I_5.js";import"./components-BQ4bHmFT.js";import"./icon-paths-Bmf-OpRB.js";import"./editor-page-esAGW4JJ.js";import"./tex-error-view-Cf6zuEgE.js";import"./item-extras-editor-nJMsT_iA.js";import"./editor-jsonify-B4f1pDpI.js";import"./blur-input-AiRPyhYZ.js";import"./free-response-editor-B54mFQ3Q.js";import"./input-number-editor-B84XuZut.js";import"./Popper-CNLQpm5J.js";import"./label-image-editor-CjzJL_4O.js";import"./matcher-editor-ByqTA09b.js";import"./number-line-editor-D3lRA6ph.js";import"./phet-simulation-editor-CeANbhMS.js";import"./plotter-editor-2JJGALyH.js";import"./python-program-editor-BtwTqJFB.js";import"./sorter-editor-CMrx6EEe.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
