import{j as i}from"./iframe-DX_TRIrP.js";import{E as u}from"./editor-page-with-storybook-preview-c0ORTL3b.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-IzBwQu3-.js";import"./changeable-i3_3swUP.js";import"./article-renderer-DVe5Guy-.js";import"./server-item-renderer-BQsQV7p9.js";import"./hints-renderer-DkD3HAF5.js";import"./content-preview-Bvz4S4xm.js";import"./components-BTmTOPpx.js";import"./icon-paths-D8QBa6tB.js";import"./editor-page-BYGqIxOB.js";import"./tex-error-view-8DE0iN9K.js";import"./item-extras-editor-cDu32Atj.js";import"./editor-jsonify-BiWJamii.js";import"./blur-input-aTT0omZ8.js";import"./free-response-editor-BBc7PKUE.js";import"./input-number-editor-DsrbJsug.js";import"./Popper-Bax8sFlj.js";import"./label-image-editor-CPEEY_cK.js";import"./matcher-editor-UbLB9Grz.js";import"./number-line-editor-BCWZvukt.js";import"./phet-simulation-editor-B0cMBplB.js";import"./plotter-editor-OOfkDAUl.js";import"./python-program-editor-DF_QEAK_.js";import"./sorter-editor-BjHXeMse.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
