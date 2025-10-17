import{r,j as t,V as l,A as o,t as d}from"./iframe-DQbDbjVf.js";import"./changeable-CxMH2Nr0.js";import"./article-renderer-BJypAZlr.js";import"./server-item-renderer-CBm8ccyx.js";import"./hints-renderer-C6g1ZUd4.js";import{A as u}from"./article-editor-CocT6H7c.js";import{C as f}from"./content-preview-C34csMm6.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-U9W_nAhc.js";import{P as v}from"./preview-panel-C6XqOHX4.js";import"./components-BaLBcbm1.js";import"./editor-jsonify-CQDL8tE4.js";import"./blur-input-BjC_9FUd.js";import"./tex-error-view-B1qP20dM.js";import"./free-response-editor-BoFigDg1.js";import"./input-number-editor-DVRNiTpg.js";import"./Popper-yvSGGUcz.js";import"./label-image-editor-BveZB-9W.js";import"./form-wrapped-text-field-DzSSJkxx.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-DbpW62H0.js";import"./behavior-CIABtOF3.js";import"./question-markers-C3u2ukwl.js";import"./marker-DKEtXg93.js";import"./select-image-Ct9PK2g7.js";import"./matcher-editor-C9W9Iq45.js";import"./number-line-editor-sQthFMxF.js";import"./phet-simulation-editor-NrJJrST_.js";import"./plotter-editor-BNIsBTLy.js";import"./python-program-editor-BdCZIO6j.js";import"./sorter-editor-BM3pYQG8.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
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
