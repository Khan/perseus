import{r,j as t,V as l,A as o,t as d}from"./iframe-BPwAIjyA.js";import"./changeable-D4YjKH_y.js";import"./article-renderer-DzBVkyDZ.js";import"./server-item-renderer-CFojpNoF.js";import"./hints-renderer-x3YbfYDY.js";import{A as u}from"./article-editor-BS_6i8p4.js";import{C as f}from"./content-preview-vZFcg3Yi.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-CeG6yxNC.js";import{P as v}from"./preview-panel-DkQBu0f5.js";import"./components-BVKaqB2e.js";import"./editor-jsonify-DYcmLrsh.js";import"./blur-input-55tcEq7c.js";import"./tex-error-view-hj-Ezk7O.js";import"./free-response-editor-B1BjuT34.js";import"./input-number-editor-B94AamSg.js";import"./Popper-TjshblP8.js";import"./label-image-editor-f5iKh3-n.js";import"./form-wrapped-text-field-xawQcQrP.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-Cn8nPzsG.js";import"./behavior-Ct7_X9uu.js";import"./question-markers-O0pqLhj0.js";import"./marker-BakARMVI.js";import"./select-image-B5OCgqZd.js";import"./matcher-editor-CNJShrZT.js";import"./number-line-editor-DnOsaYxP.js";import"./phet-simulation-editor-DJsZ8Tlg.js";import"./plotter-editor-B-oYKMGg.js";import"./python-program-editor-Cf36yVpL.js";import"./sorter-editor-BACMFLCN.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
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
