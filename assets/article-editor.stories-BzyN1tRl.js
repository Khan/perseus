import{r,j as t,V as l,A as o,t as d}from"./iframe-BOCK6t-w.js";import"./changeable-q9-ozmPX.js";import"./article-renderer-CgiQtIm_.js";import"./server-item-renderer-CKVW_ZjK.js";import"./hints-renderer-B0u0qJh9.js";import{A as u}from"./article-editor-CcuZoXSN.js";import{C as f}from"./content-preview-MbsSTQGi.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-CMbIUBBs.js";import{P as v}from"./preview-panel-g8k5lb-U.js";import"./components-CnuJ4OBE.js";import"./editor-jsonify-Dv4YHV66.js";import"./blur-input-CiaOyN9M.js";import"./tex-error-view-tmQphnO3.js";import"./free-response-editor-B9GLSqV1.js";import"./input-number-editor-CQ2tbUhG.js";import"./Popper-C-P0N9Zu.js";import"./label-image-editor-BrqIaL8t.js";import"./form-wrapped-text-field-Dk5YMR3G.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-DNCCnc1H.js";import"./behavior-VCEfeOln.js";import"./question-markers-_ivlcZma.js";import"./marker-CGeqT7HX.js";import"./select-image-CtzmOLFI.js";import"./matcher-editor-SGWhYfOb.js";import"./number-line-editor-C-y53tvP.js";import"./phet-simulation-editor-AK0uvwTd.js";import"./plotter-editor-CttIDEi7.js";import"./python-program-editor-CAgRIlyi.js";import"./sorter-editor-DEJaTFqJ.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
  const [article, setArticle] = useState(undefined);
  const articleEditorRef = useRef();
  return <View>
            <ArticleEditor dependencies={testDependenciesV2} apiOptions={{
      ...ApiOptions.defaults,
      isArticle: true
    }} imageUploader={() => {}} json={article} onChange={value => {
      setArticle(value.json[0]);
    }} previewURL="about:blank" ref={articleEditorRef as any} />
            <PreviewPanel openButtonText="Open preview (storybook only)">
                <ContentPreview question={article} apiOptions={{
        ...ApiOptions.defaults,
        isArticle: true,
        showAlignmentOptions: true
      }} linterContext={{
        contentType: "article",
        highlightLint: true,
        paths: [],
        stack: []
      }} previewDevice={"desktop"} />
            </PreviewPanel>
        </View>;
}`,...(p=(s=e.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};const M=["Demo"];export{e as Demo,M as __namedExportsOrder,K as default};
