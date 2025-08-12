import{j as i}from"./iframe-CWbLiuEj.js";import{E as u}from"./editor-page-with-storybook-preview-CBRCnw-e.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-Bv_VwZ2-.js";import"./item-version-DYM8-LkM.js";import"./article-renderer-BTpghWNF.js";import"./server-item-renderer-D4U8qoBQ.js";import"./hints-renderer-DtG_3a8d.js";import"./content-preview-CrE3ARLJ.js";import"./components-Dgf3YHnx.js";import"./icon-paths-ppH2HIeQ.js";import"./editor-page-C8h0GOUY.js";import"./image-editor-wNnu0oWj.js";import"./editor-jsonify-B5rchHWU.js";import"./blur-input-DFy_IUd9.js";import"./tex-error-view-B5iYSAdE.js";import"./item-extras-editor-B4-lGHKs.js";import"./free-response-editor-CBaZ5J7s.js";import"./input-number-editor-BmUXbo7g.js";import"./Popper-DOGKLwxT.js";import"./label-image-editor-BV1urzRn.js";import"./matcher-editor-DvTuqBDG.js";import"./number-line-editor-BuPT9Ntz.js";import"./phet-simulation-editor-CJCLAP1J.js";import"./plotter-editor-B6hRMdWP.js";import"./python-program-editor-D10ubNWR.js";import"./sorter-editor-DRSEhyyJ.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!dev"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
