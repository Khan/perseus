import{j as i}from"./iframe-D8xOXFzc.js";import{E as u}from"./editor-page-with-storybook-preview-DjcieF79.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DOaghIMK.js";import"./item-version-Cl2jOQRz.js";import"./article-renderer-Bx8PCQ8G.js";import"./server-item-renderer-W4cVvNnI.js";import"./hints-renderer-B09kKfqs.js";import"./content-preview-oeaplcz0.js";import"./components-dLPJOn06.js";import"./icon-paths-YLd9he-L.js";import"./editor-page-CFJkoqyh.js";import"./tex-error-view-C6eflJVk.js";import"./item-extras-editor-d2s9FC01.js";import"./editor-jsonify-BL10OhgF.js";import"./blur-input-DDNGANfq.js";import"./free-response-editor-CQMnNvk3.js";import"./input-number-editor-6vpCv2wg.js";import"./Popper-DFRpAm-o.js";import"./label-image-editor-WZdGC5L7.js";import"./matcher-editor-BquqOGGm.js";import"./number-line-editor-DBS851eG.js";import"./phet-simulation-editor-BQIuFj27.js";import"./plotter-editor-D4aQUIAM.js";import"./python-program-editor-PmX_PPDC.js";import"./sorter-editor-Bqa7hPkz.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
