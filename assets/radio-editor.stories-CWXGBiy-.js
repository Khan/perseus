import{j as i}from"./iframe-Da-XUY9i.js";import{E as u}from"./editor-page-with-storybook-preview-DYJEImbe.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DbWJay7p.js";import"./changeable-Bz9DOf_G.js";import"./article-renderer-BKBF3Cme.js";import"./server-item-renderer-D6olF1dJ.js";import"./hints-renderer-BRCX49so.js";import"./content-preview-BlK0CAkU.js";import"./components-Bt9QnP5z.js";import"./icon-paths-C9bcahK-.js";import"./editor-page-DWtutg_R.js";import"./tex-error-view-C3ZGLETj.js";import"./item-extras-editor-BeNqUvC6.js";import"./editor-jsonify-BSVW3xQ4.js";import"./blur-input-UMj4KhGU.js";import"./free-response-editor-CWX8pusb.js";import"./input-number-editor-B9y9STIY.js";import"./Popper-CIyF1-oB.js";import"./label-image-editor-CxvF6zNH.js";import"./matcher-editor-BoQEVy28.js";import"./number-line-editor-CSGKnosz.js";import"./phet-simulation-editor-DaXcVehh.js";import"./plotter-editor-B6lGBc91.js";import"./python-program-editor-D3qDejHn.js";import"./sorter-editor-CAffWsgA.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
