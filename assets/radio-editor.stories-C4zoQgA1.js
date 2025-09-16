import{j as i}from"./iframe-twR19s2R.js";import{E as u}from"./editor-page-with-storybook-preview-D7i2irUl.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-CQ1O6Ciw.js";import"./changeable-BRbhUt4-.js";import"./article-renderer-DUCTLZ0_.js";import"./server-item-renderer-DEJrks84.js";import"./hints-renderer-dNA-Hqdu.js";import"./content-preview-CPQY52xb.js";import"./components-APFiw_-E.js";import"./icon-paths-C060-huy.js";import"./editor-page-D5nvwEs8.js";import"./tex-error-view-BeQDspTd.js";import"./item-extras-editor-BQPzoatM.js";import"./editor-jsonify-DusSMkrZ.js";import"./blur-input-CIveKNmL.js";import"./free-response-editor-C-0FRDGb.js";import"./input-number-editor-BXmQQzsk.js";import"./Popper-DAXHXale.js";import"./label-image-editor-CONGiQFU.js";import"./matcher-editor-Bg9W3vnX.js";import"./number-line-editor-CPf3rYpS.js";import"./phet-simulation-editor-C9T7kR4t.js";import"./plotter-editor-C955EJd5.js";import"./python-program-editor-ZcbSTA1y.js";import"./sorter-editor-CQuliCRL.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
