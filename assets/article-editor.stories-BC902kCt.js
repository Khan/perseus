import{r,j as t,V as l,A as o,t as d}from"./iframe-BwrJBPZi.js";import"./changeable-mE7mwS5-.js";import"./article-renderer-BAxDumUu.js";import"./server-item-renderer-8Nv_VSTZ.js";import"./hints-renderer-CTbwAQLh.js";import{A as u}from"./article-editor-BjIgsxsm.js";import{C as f}from"./content-preview-DmUeA7fC.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-BmU5-ef3.js";import{P as v}from"./preview-panel-BUQC9Vb5.js";import"./components-B_2h-Bs1.js";import"./editor-jsonify-BFOEjhK_.js";import"./blur-input-DMcgo-6G.js";import"./tex-error-view-CyN9qQxG.js";import"./free-response-editor-C3qbK9Mx.js";import"./input-number-editor-BFX_vvjT.js";import"./Popper-CytwErb8.js";import"./label-image-editor-BjXtIPOR.js";import"./form-wrapped-text-field-BdbFeaoS.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-BkjVOM48.js";import"./behavior-Bprnwk5T.js";import"./question-markers-KFG832Uc.js";import"./marker-D9CATLvs.js";import"./select-image-B5rovrYT.js";import"./matcher-editor-0Ie9ZD8K.js";import"./number-line-editor-IypJ69jn.js";import"./phet-simulation-editor-BQoSTJHR.js";import"./plotter-editor-CzDjmVSz.js";import"./python-program-editor-B49zVMWZ.js";import"./sorter-editor-ChFjuoqt.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
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
