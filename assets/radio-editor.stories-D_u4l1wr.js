import{j as i}from"./iframe-BlaVeZ39.js";import{E as u}from"./editor-page-with-storybook-preview-D1vvFzdG.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-D4UOjRYA.js";import"./changeable-BC4l_XWb.js";import"./article-renderer-BMKPdclk.js";import"./server-item-renderer-eObpF2B_.js";import"./hints-renderer-C5J5gysr.js";import"./content-preview-pHsJYMin.js";import"./components-phdiDwe-.js";import"./icon-paths-DH7JIVt4.js";import"./editor-page-GFSUFVPe.js";import"./tex-error-view-Bcz87FNJ.js";import"./item-extras-editor-C5ASQT4r.js";import"./editor-jsonify-_GFufwN_.js";import"./blur-input-BRXUj7AE.js";import"./free-response-editor-3T-rHx6l.js";import"./input-number-editor-Cz2sdCMa.js";import"./Popper-CWt_rvVt.js";import"./label-image-editor-0MgE9mgC.js";import"./matcher-editor-DasyA75G.js";import"./number-line-editor-4X7MaAGZ.js";import"./phet-simulation-editor-Banfddf6.js";import"./plotter-editor-BdGZ7eeu.js";import"./python-program-editor-Caiimr7m.js";import"./sorter-editor-DUkzipxV.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
