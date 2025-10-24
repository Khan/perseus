import{r,j as t,V as l,A as o,t as d}from"./iframe-4salNE05.js";import"./changeable-C4tOo2lz.js";import"./article-renderer-CpwiPyMK.js";import"./server-item-renderer-Dy4WjDAc.js";import"./hints-renderer-CCNA6GhL.js";import{A as u}from"./article-editor-B_Nw4LUg.js";import{C as f}from"./content-preview-C_aacY4z.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-BFXtB4pE.js";import{P as v}from"./preview-panel-BuKo4jKq.js";import"./components-BmA7lRq8.js";import"./editor-jsonify-C3fiY463.js";import"./blur-input-DxS_gtcQ.js";import"./tex-error-view-CyFv28D4.js";import"./free-response-editor-BlWN590T.js";import"./input-number-editor-CPpOrUp7.js";import"./Popper-CEr9frsU.js";import"./label-image-editor-Dmlw6dYO.js";import"./form-wrapped-text-field-rlh4Pfbn.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-BaZZZigc.js";import"./behavior-NJs_z-QD.js";import"./question-markers-Dij-Sexq.js";import"./marker-OrxLv--I.js";import"./select-image-Be6NP9o3.js";import"./matcher-editor-CMVtcbJ5.js";import"./number-line-editor-DRXs2MZA.js";import"./phet-simulation-editor-L9KNSALq.js";import"./plotter-editor-BaD3XOgF.js";import"./python-program-editor-YIuhg-y6.js";import"./sorter-editor-uFj-CSkh.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
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
