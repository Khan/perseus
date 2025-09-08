import{j as i}from"./iframe-DQKhkWRL.js";import{E as u}from"./editor-page-with-storybook-preview-Bwsh49Z1.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DKf091rT.js";import"./item-version-DwoE3wq9.js";import"./article-renderer-D9NHecpR.js";import"./server-item-renderer-65hXZClS.js";import"./hints-renderer-Cz8S4fKT.js";import"./content-preview-BbwTjztP.js";import"./components-BZrxdghS.js";import"./icon-paths-B28DqO3E.js";import"./editor-page-CopgpDP3.js";import"./tex-error-view-BXjVKl26.js";import"./item-extras-editor-BZbIK0PH.js";import"./editor-jsonify-BBhJ6zh0.js";import"./blur-input-B8uHi4BM.js";import"./free-response-editor-D53tiusK.js";import"./input-number-editor-RBCfdd-R.js";import"./Popper-B06p5A2u.js";import"./label-image-editor-C_kPIJGy.js";import"./matcher-editor-D7AEz5H5.js";import"./number-line-editor-gIP2YKnA.js";import"./phet-simulation-editor-DVfYrtKV.js";import"./plotter-editor-C8aHLENn.js";import"./python-program-editor-DieRYGDY.js";import"./sorter-editor-CEbUBAgW.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
