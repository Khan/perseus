import{r,j as t,V as l,A as o,t as d}from"./iframe-CvVra0N4.js";import"./changeable-nFy8X6Em.js";import"./article-renderer-wDvWitxg.js";import"./server-item-renderer-B7KiDeS-.js";import"./hints-renderer-Bcb7GYXj.js";import{A as u}from"./article-editor-ChxsxbTi.js";import{C as f}from"./content-preview-CM1VbVZ8.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-CUEK8wak.js";import{P as v}from"./preview-panel-DgpZrCnp.js";import"./components-BH71sfte.js";import"./editor-jsonify-BvdWZVWl.js";import"./blur-input-vAUnS1t5.js";import"./tex-error-view-Bh0T_R-U.js";import"./free-response-editor-CVUyiwne.js";import"./input-number-editor-Dad8fT3U.js";import"./Popper-PRGrAOCB.js";import"./label-image-editor-C5lKu4kN.js";import"./form-wrapped-text-field-d4cuVU5b.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-JJ_0ApjJ.js";import"./behavior-DezUoNPu.js";import"./question-markers-zAL8dldR.js";import"./marker-NOU75x2i.js";import"./select-image-BpzPCqoE.js";import"./matcher-editor-zojsYp4K.js";import"./number-line-editor-CyIN_NxO.js";import"./phet-simulation-editor-CSuYBz9f.js";import"./plotter-editor-D7zkmeQK.js";import"./python-program-editor-NAwEQyWi.js";import"./sorter-editor-C6RfLeEE.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
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
