import{j as i}from"./iframe-jmhP5DYq.js";import{E as u}from"./editor-page-with-storybook-preview-Uz8aGd5o.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-CShlJfC2.js";import"./item-version-CarLLTCT.js";import"./article-renderer-DbyR3z_i.js";import"./server-item-renderer-CabVEdQ3.js";import"./hints-renderer-CreeJyil.js";import"./content-preview-CPwwm6Ub.js";import"./components-DJy5K9pR.js";import"./icon-paths-CGxyq9E3.js";import"./editor-page-Chnz_ABk.js";import"./image-editor-C7Pw-XRY.js";import"./editor-jsonify-D0x1XTp0.js";import"./blur-input-C5UoUL_f.js";import"./tex-error-view-UlL4RxFt.js";import"./item-extras-editor-CwvTzgiB.js";import"./free-response-editor-DFrnwkaJ.js";import"./input-number-editor-B7zM6mNw.js";import"./Popper-D9H0qOEa.js";import"./label-image-editor-B3YQfoRw.js";import"./matcher-editor-Bl88b9qj.js";import"./number-line-editor-YlqNXkXk.js";import"./phet-simulation-editor-DD5Y2-YW.js";import"./plotter-editor-CJexhDUw.js";import"./python-program-editor-DEIPntXQ.js";import"./sorter-editor-CsRbIQ_G.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const Y={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
