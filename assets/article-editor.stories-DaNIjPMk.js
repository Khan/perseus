import{r,j as t,V as l,A as o,t as d}from"./iframe-BxY6-TkQ.js";import"./changeable-lVrmJTcF.js";import"./article-renderer-C4HWfxjq.js";import"./server-item-renderer-CSu13Qsq.js";import"./hints-renderer-BqEsfExB.js";import{A as u}from"./article-editor-DN0xkRu3.js";import{C as f}from"./content-preview-DgiuKhaz.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-BXl4u6X6.js";import{P as v}from"./preview-panel-DduoDjrw.js";import"./components-C7QaUjOu.js";import"./editor-jsonify-bYBcMVX5.js";import"./blur-input-dKjy86m3.js";import"./tex-error-view-EdeL6KLk.js";import"./free-response-editor-COwVu2jT.js";import"./input-number-editor-Dybsii9Z.js";import"./Popper-CPVRWjVK.js";import"./label-image-editor-DTH_fW7P.js";import"./form-wrapped-text-field-BkWD3wYV.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-BfzOC0h-.js";import"./behavior-DGxfSWAG.js";import"./question-markers-CpUIBPHd.js";import"./marker-DZfyZc4R.js";import"./select-image-CT1tSffD.js";import"./matcher-editor-MrV3hN5z.js";import"./number-line-editor-D0zyiUeb.js";import"./phet-simulation-editor-DQ58OY72.js";import"./plotter-editor-Bz2NUgnD.js";import"./python-program-editor-BFB0Pr0V.js";import"./sorter-editor-D6NI_UML.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
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
