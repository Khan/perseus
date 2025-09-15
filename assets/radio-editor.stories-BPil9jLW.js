import{j as i}from"./iframe-CuR3KNJy.js";import{E as u}from"./editor-page-with-storybook-preview-BKXkM_yk.js";import{s as h,m as _}from"./radio.testdata-O3hk9_Ox.js";import{R as O,r as E}from"./register-all-widgets-and-editors-for-testing-DOj5_j8C.js";import"./changeable-DppTJ5Sz.js";import"./article-renderer-C538LY9g.js";import"./server-item-renderer-CYGlTWET.js";import"./hints-renderer-BFgXZv_8.js";import"./content-preview-DI2rPqMi.js";import"./components-BQkhYxBC.js";import"./icon-paths-xgSKFl2u.js";import"./editor-page-DneGi9rv.js";import"./tex-error-view-DqmwLGpn.js";import"./item-extras-editor-DSK5zQ7H.js";import"./editor-jsonify-Bk_nc3aX.js";import"./blur-input-BiLnDF-a.js";import"./free-response-editor-NoE8PKKT.js";import"./input-number-editor-DLnk0ioH.js";import"./Popper-Cz2vcuP0.js";import"./label-image-editor-BsXEBVbc.js";import"./matcher-editor-B8ZFKAfo.js";import"./number-line-editor-BWsYG4HB.js";import"./phet-simulation-editor-D-NbB2Ls.js";import"./plotter-editor-DgRaxLDm.js";import"./python-program-editor-D06pnDQm.js";import"./sorter-editor-C7R9qT1M.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,g=330;E();const U={title:"Widgets/RadioNew/Editor Demo",component:O,tags:["!autodocs"]},o={args:{onChange:R("onChange"),apiOptions:Object.freeze({}),static:!1}},e=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:h})}),t=()=>i.jsx("div",{style:{width:g},children:i.jsx(u,{question:_})});e.__docgenInfo={description:"",methods:[],displayName:"SingleChoice"};t.__docgenInfo={description:"",methods:[],displayName:"MultiChoice"};var r,s,a;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
