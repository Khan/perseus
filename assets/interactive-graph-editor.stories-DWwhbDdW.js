import{j as e,r as o,V as _,n as Ne,i as Me,k as De,s as n,B as Fe,l as E}from"./iframe-BY2pawzX.js";import{i as Be}from"./interactive-graph-question-builder-BNFfGeyq.js";import{i as Te,s as Oe,a as Ue,l as Ve,b as He,r as Je,c as ze,q as Ye,d as $e,e as Ke,p as Xe,f as Ze,u as et,g as tt,h as Ge}from"./interactive-graph.testdata-DDyaHSgJ.js";import{E as t}from"./editor-page-with-storybook-preview-BA2khLCe.js";import"./index-CA0J8-UY.js";import{r as rt}from"./register-all-widgets-and-editors-for-testing-C6zNjb9Y.js";import{E as ot}from"./editor-page-DY-j6rw9.js";import"./item-version-deo1PzQO.js";import"./article-renderer-CIqqOhu0.js";import"./server-item-renderer-isXmAqTY.js";import"./hints-renderer-CFDgzRBN.js";import"./content-preview-80zVXHy9.js";import"./components-C_6fDHEh.js";import"./device-framer-B56oAgXn.js";import"./icon-paths-Cfjy_uoj.js";import"./article-editor-lWtvyRhU.js";import"./editor-DiUc_FCL.js";import"./tex-error-view-RCedzHwh.js";/* empty css                       */import"./categorizer-editor-BqAfQW9h.js";import"./editor-jsonify-DB4J-XSR.js";import"./blur-input-rMateJma.js";import"./definition-editor-BcVFfCuD.js";import"./dropdown-editor-DPUgMhet.js";import"./explanation-editor-DZOP4LWh.js";import"./expression-editor-ZAsZU0KI.js";import"./free-response-editor-C7A-ykGL.js";import"./interaction-editor-2IcMhr4S.js";import"./image-editor-CXJ3MqLD.js";import"./input-number-editor-CZW52Kbb.js";import"./Popper-t7UEtxTm.js";import"./numeric-input-editor-CCbZWsVC.js";import"./label-image-editor-tEjjdan9.js";import"./matcher-editor-CW4B1k6C.js";import"./number-line-editor-D8Tbhhn9.js";import"./phet-simulation-editor-BwYCL1r4.js";import"./plotter-editor-DuBzMnf1.js";import"./python-program-editor-DnEiSAV5.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-COHhHoZB.js";import"./item-extras-editor-BMGF-OZA.js";const{action:it}=__STORYBOOK_MODULE_ACTIONS__;rt();const Jt={title:"Widgets/Interactive Graph/Editor Demo",tags:["!dev"],parameters:{docs:{description:{component:"An editor for adding an interactive graph widget that allows users                    to create and interact with mathematical graphs and figures."}}}},nt=it("onChange"),s=()=>e.jsx(t,{question:Te}),a=()=>e.jsx(t,{question:Oe}),c=()=>e.jsx(t,{question:Ue}),d=()=>e.jsx(t,{question:Ve}),p=()=>e.jsx(t,{question:He}),u=()=>e.jsx(t,{question:Je}),m=()=>e.jsx(t,{question:ze}),g=()=>e.jsx(t,{question:Ye}),h=()=>e.jsx(t,{question:$e}),l=()=>e.jsx(t,{question:Ke}),v=()=>e.jsx(t,{question:Xe}),S=()=>e.jsx(t,{question:Ze}),y=()=>e.jsx(t,{question:et}),W=()=>e.jsx(t,{question:tt}),I=()=>e.jsx(t,{question:Be().withNoInteractiveFigure().addLockedFunction("5*sin(x)",{color:"red"}).build()}),P=()=>e.jsx(t,{question:Ge}),i=()=>{const[_e,Ee]=o.useState("phone"),[qe,Ce]=o.useState(!1),[be,ke]=o.useState(),[R,xe]=o.useState(Ge),[G,Ae]=o.useState(),[Qe,je]=o.useState([]),f=o.useRef(null);return o.useEffect(()=>{if(f.current){const r=f.current.getSaveWarnings();je(r)}},[f,R,G]),e.jsxs(_,{style:w.container,children:[e.jsx(ot,{ref:f,apiOptions:{isMobile:!1},previewDevice:_e,onPreviewDeviceChange:r=>Ee(r),developerMode:!0,jsonMode:qe,answerArea:be,question:R,hints:G,previewURL:"about:blank",itemId:"1",onChange:r=>{nt(r),"jsonMode"in r&&Ce(r.jsonMode),"answerArea"in r&&ke(r.answerArea),"question"in r&&xe(r.question),"hints"in r&&Ae(r.hints)}}),e.jsxs(_,{style:w.errorContainer,children:[e.jsx(Me,{children:"Save Warnings:"}),e.jsx(De,{size:n.small_12}),Qe.map((r,Le)=>e.jsx(Fe,{style:w.errorMessage,children:r},Le))]})]})};i.parameters={chromatic:{disableSnapshot:!0}};const w=Ne.StyleSheet.create({container:{flexDirection:"row"},errorContainer:{border:`1px solid ${E.offBlack}`,padding:n.medium_16,flexGrow:1,marginRight:n.xLarge_32,height:"80vh",position:"sticky",top:n.xLarge_32,overflowY:"auto"},errorMessage:{color:E.red,marginBottom:n.small_12}});s.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphWithAriaLabel"};a.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphSegment"};c.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphSegments"};d.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphLinear"};p.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphLinearSystem"};u.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphRay"};m.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphCircle"};g.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphQuadratic"};h.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphSinusoid"};l.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphSinusoidWithPiTicks"};v.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphPoint"};S.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphPolygon"};y.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphUnlimitedPolygon"};W.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphAngle"};I.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphNone"};P.__docgenInfo={description:"",methods:[],displayName:"LockedFigures"};i.__docgenInfo={description:"",methods:[],displayName:"WithSaveWarnings"};var q,C,b;s.parameters={...s.parameters,docs:{...(q=s.parameters)==null?void 0:q.docs,source:{originalSource:"(): React.ReactElement => <EditorPageWithStorybookPreview question={interactiveGraphWithAriaLabel} />",...(b=(C=s.parameters)==null?void 0:C.docs)==null?void 0:b.source}}};var k,x,A;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={segmentWithStartingCoordsQuestion} />;
}`,...(A=(x=a.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var Q,j,L;c.parameters={...c.parameters,docs:{...(Q=c.parameters)==null?void 0:Q.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={segmentsWithStartingCoordsQuestion} />;
}`,...(L=(j=c.parameters)==null?void 0:j.docs)==null?void 0:L.source}}};var N,M,D;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={linearWithStartingCoordsQuestion} />;
}`,...(D=(M=d.parameters)==null?void 0:M.docs)==null?void 0:D.source}}};var F,B,T;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={linearSystemWithStartingCoordsQuestion} />;
}`,...(T=(B=p.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var O,U,V;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={rayWithStartingCoordsQuestion} />;
}`,...(V=(U=u.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var H,J,z;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={circleWithStartingCoordsQuestion} />;
}`,...(z=(J=m.parameters)==null?void 0:J.docs)==null?void 0:z.source}}};var Y,$,K;g.parameters={...g.parameters,docs:{...(Y=g.parameters)==null?void 0:Y.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={quadraticWithStartingCoordsQuestion} />;
}`,...(K=($=g.parameters)==null?void 0:$.docs)==null?void 0:K.source}}};var X,Z,ee;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={sinusoidMinimalQuestion} />;
}`,...(ee=(Z=h.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,re,oe;l.parameters={...l.parameters,docs:{...(te=l.parameters)==null?void 0:te.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={sinusoidWithStartingCoordsAndPiTicksQuestion} />;
}`,...(oe=(re=l.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var ie,ne,se;v.parameters={...v.parameters,docs:{...(ie=v.parameters)==null?void 0:ie.docs,source:{originalSource:"(): React.ReactElement => <EditorPageWithStorybookPreview question={pointQuestionWithStartingCoords} />",...(se=(ne=v.parameters)==null?void 0:ne.docs)==null?void 0:se.source}}};var ae,ce,de;S.parameters={...S.parameters,docs:{...(ae=S.parameters)==null?void 0:ae.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={polygonWithStartingCoordsQuestion} />;
}`,...(de=(ce=S.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};var pe,ue,me;y.parameters={...y.parameters,docs:{...(pe=y.parameters)==null?void 0:pe.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={unlimitedPolygonWithCorrectAnswerQuestion} />;
}`,...(me=(ue=y.parameters)==null?void 0:ue.docs)==null?void 0:me.source}}};var ge,he,le;W.parameters={...W.parameters,docs:{...(ge=W.parameters)==null?void 0:ge.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={angleWithStartingCoordsQuestion} />;
}`,...(le=(he=W.parameters)==null?void 0:he.docs)==null?void 0:le.source}}};var ve,Se,ye;I.parameters={...I.parameters,docs:{...(ve=I.parameters)==null?void 0:ve.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={interactiveGraphQuestionBuilder().withNoInteractiveFigure().addLockedFunction("5*sin(x)", {
    color: "red"
  }).build()} />;
}`,...(ye=(Se=I.parameters)==null?void 0:Se.docs)==null?void 0:ye.source}}};var We,Ie,Pe;P.parameters={...P.parameters,docs:{...(We=P.parameters)==null?void 0:We.docs,source:{originalSource:`(): React.ReactElement => {
  return <EditorPageWithStorybookPreview question={segmentWithLockedFigures} />;
}`,...(Pe=(Ie=P.parameters)==null?void 0:Ie.docs)==null?void 0:Pe.source}}};var fe,we,Re;i.parameters={...i.parameters,docs:{...(fe=i.parameters)==null?void 0:fe.docs,source:{originalSource:`(): React.ReactElement => {
  const [previewDevice, setPreviewDevice] = React.useState<DeviceType>("phone");
  const [jsonMode, setJsonMode] = React.useState<boolean | undefined>(false);
  const [answerArea, setAnswerArea] = React.useState<PerseusAnswerArea | undefined | null>();
  const [question, setQuestion] = React.useState<PerseusRenderer | undefined>(segmentWithLockedFigures);
  const [hints, setHints] = React.useState<ReadonlyArray<Hint> | undefined>();
  const [saveWarnings, setSaveWarnings] = React.useState<string[]>([]);
  const editorPageRef = React.useRef<EditorPage>(null);
  React.useEffect(() => {
    if (editorPageRef.current) {
      const warnings = editorPageRef.current.getSaveWarnings();
      setSaveWarnings(warnings);
    }
  }, [editorPageRef, question, hints]);
  return <View style={styles.container}>
            <EditorPage ref={editorPageRef} apiOptions={{
      isMobile: false
    }} previewDevice={previewDevice} onPreviewDeviceChange={newDevice => setPreviewDevice(newDevice)} developerMode={true} jsonMode={jsonMode} answerArea={answerArea} question={question} hints={hints} previewURL="about:blank" itemId="1" onChange={props => {
      onChangeAction(props);
      if ("jsonMode" in props) {
        setJsonMode(props.jsonMode);
      }
      if ("answerArea" in props) {
        setAnswerArea(props.answerArea);
      }
      if ("question" in props) {
        setQuestion(props.question);
      }
      if ("hints" in props) {
        setHints(props.hints);
      }
    }} />
            <View style={styles.errorContainer}>
                <LabelLarge>Save Warnings:</LabelLarge>
                <Strut size={spacing.small_12} />
                {saveWarnings.map((warning, index) => <Body key={index} style={styles.errorMessage}>
                        {warning}
                    </Body>)}
            </View>
        </View>;
}`,...(Re=(we=i.parameters)==null?void 0:we.docs)==null?void 0:Re.source}}};const zt=["InteractiveGraphWithAriaLabel","InteractiveGraphSegment","InteractiveGraphSegments","InteractiveGraphLinear","InteractiveGraphLinearSystem","InteractiveGraphRay","InteractiveGraphCircle","InteractiveGraphQuadratic","InteractiveGraphSinusoid","InteractiveGraphSinusoidWithPiTicks","InteractiveGraphPoint","InteractiveGraphPolygon","InteractiveGraphUnlimitedPolygon","InteractiveGraphAngle","InteractiveGraphNone","LockedFigures","WithSaveWarnings"];export{W as InteractiveGraphAngle,m as InteractiveGraphCircle,d as InteractiveGraphLinear,p as InteractiveGraphLinearSystem,I as InteractiveGraphNone,v as InteractiveGraphPoint,S as InteractiveGraphPolygon,g as InteractiveGraphQuadratic,u as InteractiveGraphRay,a as InteractiveGraphSegment,c as InteractiveGraphSegments,h as InteractiveGraphSinusoid,l as InteractiveGraphSinusoidWithPiTicks,y as InteractiveGraphUnlimitedPolygon,s as InteractiveGraphWithAriaLabel,P as LockedFigures,i as WithSaveWarnings,zt as __namedExportsOrder,Jt as default};
