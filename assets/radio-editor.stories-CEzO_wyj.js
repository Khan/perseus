import{j as i}from"./iframe-BEpDFuEi.js";import{E as u}from"./editor-page-with-storybook-preview-TwX6098O.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-XtosSAnm.js";import"./item-version-CjJ8BGV5.js";import"./article-renderer-CqL6Br8Y.js";import"./server-item-renderer-Cm8HzarJ.js";import"./hints-renderer-CMCzx8se.js";import"./content-preview-DPjKua6q.js";import"./components-C6zBg3Ka.js";import"./icon-paths-BO0gJZqD.js";import"./editor-page-vQES4GV5.js";import"./tex-error-view-DoxT3Mpc.js";import"./item-extras-editor-DNHoCV2G.js";import"./editor-jsonify-CA5Rop9u.js";import"./blur-input-CRr_z9aa.js";import"./free-response-editor-Dd4hUHpG.js";import"./input-number-editor-CH8I8yXx.js";import"./Popper-CRVeJNUD.js";import"./label-image-editor-D8PaOC0o.js";import"./matcher-editor-CBedxN1a.js";import"./number-line-editor-vDANF-Zn.js";import"./phet-simulation-editor-oj4A8qBC.js";import"./plotter-editor-D3mmDFOG.js";import"./python-program-editor-vsiwzNKI.js";import"./sorter-editor-BzpelsAY.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
