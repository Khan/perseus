import{j as s,V as l,n as re,i as jt,H as Lt,L as Pt,s as u,w as x,l as se,r as g,aL as ce,as as ee,k as I,cc as At,a7 as Tt,cd as Qt,R as bt,g as vt,ce as Ct,cf as Wt,cg as Rt,ch as _t,h as n,A as Ot}from"./iframe-wjYrW4ez.js";import{b as ue}from"./index-CbcpgqCv.js";import"./item-version-CRWZBURm.js";import"./article-renderer-Cdi5PjQJ.js";import"./server-item-renderer-BgAmqVz9.js";import"./hints-renderer-C1eJwggo.js";import{i as Nt,S as Ft}from"./server-item-renderer-with-debug-ui-pwNohMWP.js";import{n as ut,o as lt,t as mt,v as dt,w as pt,x as oe,y as gt,z as ht,A as xt,B as yt,C as Bt,D as Et,E as Gt,F as Vt,G as Dt,H as Ut,I as zt,J as Jt,K as Ht,L as Mt,M as $t,N as Kt}from"./interactive-graph.testdata-BCs-o48e.js";import"./Popper-DJ9tQh-2.js";import"./main-CUvjThmf.js";import"./test-keypad-context-wrapper-CWIMXuRY.js";import"./interactive-graph-question-builder-DWB8dz4P.js";function ae({color:e="light",leftContent:t,rightContent:o,size:a="medium",subtitle:c,title:i}){const p=c?jt:Lt;return s.jsxs(l,{style:[m.container,i?typeof i=="string"?m.containerWithTextTitle:m.containerWithNodeTitle:m.containerWithNoTitle,e==="dark"&&m.dark,a==="small"&&m.small],children:[s.jsx(l,{style:m.leftColumn,children:t}),i&&typeof i=="string"&&s.jsxs(l,{style:m.titles,children:[s.jsx(p,{id:"wb-toolbar-title",children:i}),c&&s.jsx(Pt,{style:e==="light"&&m.subtitle,children:c})]}),i&&typeof i!="string"&&s.jsx(l,{style:m.titles,children:i}),!i&&s.jsx(l,{style:t?m.spacer:void 0}),s.jsx(l,{style:m.rightColumn,children:o})]})}const m=re.StyleSheet.create({container:{background:x.surface.primary,border:`1px solid ${x.core.border.neutral.subtle}`,flex:1,display:"grid",alignItems:"center",minHeight:66,paddingInline:u.medium_16,width:"100%"},containerWithTextTitle:{gridTemplateColumns:"1fr minmax(auto, 67%) 1fr"},containerWithNodeTitle:{gridTemplateColumns:"minmax(max-content, 1fr) auto minmax(max-content, 1fr)"},containerWithNoTitle:{gridTemplateColumns:"auto auto 1fr"},small:{minHeight:50},dark:{background:x.surface.inverse,boxShadow:`0 1px 0 0 ${se.white64}`,color:x.core.foreground.inverse.strong},leftColumn:{alignItems:"center",flexDirection:"row",justifyContent:"flex-start"},rightColumn:{alignItems:"center",flexDirection:"row",justifyContent:"flex-end",flexGrow:1},subtitle:{color:x.core.foreground.neutral.default},titles:{padding:u.small_12,textAlign:"center",justifySelf:"center",maxWidth:"100%"},spacer:{minWidth:u.small_12}}),Yt=""+new URL("camera-slash-6B7vy5pW.svg",import.meta.url).href,Zt=""+new URL("graph-BFTZ-p4r.svg",import.meta.url).href,Xt=""+new URL("image-8VSO3cMq.svg",import.meta.url).href;function ft(e){const{value:t,onInput:o,...a}=e,[c,i]=g.useState(!1),[p,h]=g.useState("");return s.jsx("input",{...a,value:c?p:t,onChange:d=>{h(d.target.value),o(d.target.value)},onFocus:()=>{h(t),i(!0)},onBlur:()=>{i(!1)}})}ft.__docgenInfo={description:"",methods:[],displayName:"EditableControlledInput",props:{value:{required:!0,tsType:{name:"string"},description:""},onInput:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValue: string) => unknown",signature:{arguments:[{type:{name:"string"},name:"newValue"}],return:{name:"unknown"}}},description:""}}};function q(e){let t;return o=>((t==null||o!==t.arg)&&(t={arg:o,result:e(o)}),t.result)}const en={type:"next"},sn={type:"previous"},tn=e=>dn(e)?{type:"jump-to-index",index:parseInt(e,10)-1}:{type:"noop"};function nn(e){return{type:"set-questions",questions:e}}function rn(e){return{type:"load-questions-from-storage",questions:e}}const on={type:"remove-current-question"};function an(e,t){switch(t.type){case"next":return ne(e,o=>o+1);case"previous":return ne(e,o=>o-1);case"jump-to-index":return ne(e,()=>t.index);case"set-questions":return{...e,questions:t.questions};case"load-questions-from-storage":return e.questions||!t.questions?e:{...e,questions:t.questions};case"remove-current-question":{const o=w(e);return{...e,questions:e.questions.split(`
`).filter((a,c)=>c!==o).join(`
`)}}}return e}function ne(e,t){const o=w(e),a=te(e);return{...e,requestedIndex:St(t(o),a)}}function St(e,t){return t.length===0||e<0?0:e>=t.length?t.length-1:e}const qt=q(e=>e.questions.split(`
`).map(t=>t.trim()).filter(Boolean)),te=q(e=>qt(e).map(mn)),cn=q(e=>te(e)[w(e)]??null),un=q(e=>qt(e)[w(e)]??null),ln=q(e=>te(e).length),w=e=>St(e.requestedIndex,te(e));function mn(e){try{return JSON.parse(e)}catch{return{content:"**Could not parse the JSON for this question.**\n\n```\n"+e+"\n```",widgets:{},images:{}}}}function dn(e){return/^\d+$/.test(e)&&+e>0}const pn=re.StyleSheet.create({header:{display:"flex",alignItems:"center",boxShadow:"0 0 10px #0002",borderBlockEnd:`1px solid ${se.offBlack32}`,background:se.offBlack8,padding:u.small_12,justifyContent:"space-between",flexDirection:"row-reverse",flexWrap:"wrap"}}),wt=({children:e})=>s.jsx("header",{className:re.css(pn.header),children:e});wt.__docgenInfo={description:"",methods:[],displayName:"Header"};const gn=`
# copy all questions
cat data/questions/*/*/* | pbcopy

# copy all segment questions
grep -rl '"type":"segment"' data/questions/ | xargs cat | pbcopy
`.trim(),le="FLIPBOOK-QUESTIONS-JSON";function hn(e){return e.type==="interactive-graph"}function It(e){return e.startsWith("web+graphie://")}function kt(){const[e,t]=g.useReducer(an,{questions:"",requestedIndex:0}),o=un(e),a=cn(e),c=ln(e),i=w(e),p=e.questions.trim(),h=p==="",d=g.useMemo(()=>Object.values((a==null?void 0:a.widgets)??{}).filter(hn).map(r=>{var ie;return((ie=r.options.backgroundImage)==null?void 0:ie.url)??""}).filter(r=>r.length>0),[a]);return g.useEffect(()=>{const r=localStorage.getItem(le)||"";t(rn(r))},[]),g.useEffect(()=>{localStorage.setItem(le,p)},[p]),s.jsxs(s.Fragment,{children:[s.jsx(wt,{children:s.jsx(l,{style:{flexDirection:"row",alignItems:"center",flexBasis:"max-content"},children:s.jsx("nav",{children:s.jsx("a",{href:"/",children:"Gallery"})})})}),s.jsxs(l,{style:{padding:u.medium_16},children:[s.jsx("textarea",{wrap:"off",rows:10,style:{width:"100%"},value:e.questions,onChange:r=>t(nn(r.target.value))}),s.jsx(ae,{leftContent:s.jsxs(s.Fragment,{children:[s.jsx(ee,{kind:"secondary",onClick:()=>t(sn),children:"Previous"}),s.jsx(I,{size:u.xxSmall_6}),s.jsx(ee,{kind:"secondary",onClick:()=>t(en),children:"Next"}),s.jsx(I,{size:u.medium_16}),s.jsx(fn,{zeroBasedIndex:i,total:c,onIndexChanged:r=>t(tn(r))}),s.jsx(I,{size:u.medium_16}),s.jsx(ee,{kind:"tertiary",onClick:()=>t(on),children:"Discard question"})]}),rightContent:s.jsxs(l,{children:[d==null?void 0:d.map(r=>s.jsx(ue,{placement:"right",content:s.jsx(Sn,{url:r}),children:s.jsx(ce,{kind:"tertiary",icon:It(r)?Zt:Xt})},r)),((d==null?void 0:d.length)??0)===0&&s.jsx(ue,{placement:"right",content:"This graph does not specify a background image",children:s.jsx(ce,{icon:Yt,kind:"tertiary"})})]})}),s.jsx(I,{size:u.small_12}),s.jsxs("div",{style:{display:h?"block":"none"},children:[s.jsx("h2",{children:"Instructions"}),s.jsxs("ol",{children:[s.jsxs("li",{children:[s.jsx("p",{children:"Run a command like one of the following to copy question data to your clipboard."}),s.jsx("code",{children:s.jsx("pre",{children:gn})})]}),s.jsx("li",{children:s.jsx("p",{children:"Paste the data in the box above."})})]})]}),a!=null&&s.jsx(xn,{question:a},o)]})]})}function xn({question:e,apiOptions:t={}}){return s.jsxs(s.Fragment,{children:[s.jsx(l,{className:"framework-perseus",style:{flexDirection:"row",padding:u.medium_16,gap:u.medium_16,background:"#f8f8f8"},children:s.jsx(yn,{question:e,apiOptions:{...t}})}),s.jsx("div",{children:s.jsx("pre",{style:{whiteSpace:"pre-wrap"},children:s.jsx("code",{children:JSON.stringify(e)})})})]})}function yn(e){const{question:t,apiOptions:o}=e,a=g.useRef(null),[c,i]=g.useState(),p=Qt(()=>i(void 0),2500,{schedulePolicy:Rt.OnDemand});function h(r){switch(r.type){case"invalid":return"You didn't answer the question.";case"points":return Nt(r)?"Correct!":"Incorrect."}}function d(r){switch(r.type){case"invalid":return"critical";case"points":return r.earned===r.total?"success":"warning";default:throw new _t(r)}}return s.jsxs(l,{style:{alignItems:"flex-start",overflow:"hidden",background:se.white,padding:u.medium_16},children:[s.jsx(bt,{ref:a,content:t.content,images:t.images,widgets:t.widgets,problemNum:0,apiOptions:{...o},strings:vt}),s.jsx(ae,{leftContent:s.jsx(ee,{onClick:()=>{if(a.current){const r=Ct(t,a.current.getUserInputMap(),"en");i(r)}p.set()},children:"Check answer"})}),c&&s.jsx(l,{style:{position:"absolute",alignSelf:"center",width:"60%",top:"150px",zIndex:"1000"},children:s.jsx(Wt,{layout:"full-width",text:h(c),kind:d(c)})})]})}function fn(e){const{zeroBasedIndex:t,total:o,onIndexChanged:a}=e,c=Math.min(o,t+1);return s.jsxs("div",{children:[s.jsx(ft,{value:String(c),onInput:a,style:{width:"4em",textAlign:"right"}})," of ",o]})}function Sn({url:e}){return s.jsxs(s.Fragment,{children:[s.jsx(ae,{leftContent:s.jsxs(l,{style:{display:"flex",flexDirection:"row"},children:["This question uses a",It(e)?s.jsx(At,{href:`http://graphie-to-png.khanacademy.systems?preload=${encodeURIComponent(e)}`,target:"_blank",style:{marginLeft:u.xxSmall_6,marginRight:u.xxSmall_6},children:"Graphie"}):" regular image ","background."]}),rightContent:s.jsx(s.Fragment,{})}),s.jsx(l,{className:"framework-perseus",style:{margin:u.medium_16,border:"solid 1px grey"},children:s.jsx(Tt,{alt:"The background image for this graph question",src:e})})]})}kt.__docgenInfo={description:"",methods:[],displayName:"Flipbook"};const qn=Ot.defaults,Wn={title:"Widgets/Interactive Graph",component:Ft,tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to interact with mathematical graphs,                    supporting the creation and manipulation of various graph elements."}}}},k={args:{item:n({question:ut})}},S=()=>s.jsx(kt,{}),j={args:{item:n({question:lt})}},L={args:{item:n({question:mt})}},P={args:{item:n({question:dt})}},A={args:{item:n({question:pt})}},T={args:{item:n({question:oe})}},Q={args:{item:n({question:gt})}},b={args:{item:n({question:ht})}},v={args:{item:n({question:xt})}},C={args:{item:n({question:yt})}},W={args:{item:n({question:Bt})}},R={args:{item:n({question:Et})}},_={args:{item:n({question:Gt})}},O={args:{item:n({question:Vt})}},N={args:{item:n({question:Dt})}},F={args:{item:n({question:Ut})}},B={args:{item:n({question:zt})}},E={args:{item:n({question:Jt})}},G={args:{item:n({question:Ht})}},y={args:{item:n({question:oe}),apiOptions:{...qn,readOnly:!0}}},f={args:{item:n({question:Mt})}},V={args:{item:n({question:$t()})}},D={args:{item:n({question:Kt})}},U={args:{item:n({question:ut})}},z={args:{item:n({question:lt}),startAnswerless:!0}},J={args:{item:n({question:mt}),startAnswerless:!0}},H={args:{item:n({question:dt}),startAnswerless:!0}},M={args:{item:n({question:pt}),startAnswerless:!0}},$={args:{item:n({question:oe}),startAnswerless:!0}},K={args:{item:n({question:gt}),startAnswerless:!0}},Y={args:{item:n({question:ht}),startAnswerless:!0}},Z={args:{item:n({question:xt}),startAnswerless:!0}},X={args:{item:n({question:yt}),startAnswerless:!0}};S.__docgenInfo={description:"",methods:[],displayName:"SideBySideFlipbook"};var me,de,pe;k.parameters={...k.parameters,docs:{...(me=k.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: angleQuestion
    })
  }
}`,...(pe=(de=k.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};var ge,he,xe;S.parameters={...S.parameters,docs:{...(ge=S.parameters)==null?void 0:ge.docs,source:{originalSource:"(): React.ReactElement => <Flipbook />",...(xe=(he=S.parameters)==null?void 0:he.docs)==null?void 0:xe.source}}};var ye,fe,Se;j.parameters={...j.parameters,docs:{...(ye=j.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: circleQuestion
    })
  }
}`,...(Se=(fe=j.parameters)==null?void 0:fe.docs)==null?void 0:Se.source}}};var qe,we,Ie;L.parameters={...L.parameters,docs:{...(qe=L.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: linearQuestion
    })
  }
}`,...(Ie=(we=L.parameters)==null?void 0:we.docs)==null?void 0:Ie.source}}};var ke,je,Le;P.parameters={...P.parameters,docs:{...(ke=P.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: linearSystemQuestion
    })
  }
}`,...(Le=(je=P.parameters)==null?void 0:je.docs)==null?void 0:Le.source}}};var Pe,Ae,Te;A.parameters={...A.parameters,docs:{...(Pe=A.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: pointQuestion
    })
  }
}`,...(Te=(Ae=A.parameters)==null?void 0:Ae.docs)==null?void 0:Te.source}}};var Qe,be,ve;T.parameters={...T.parameters,docs:{...(Qe=T.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: polygonQuestion
    })
  }
}`,...(ve=(be=T.parameters)==null?void 0:be.docs)==null?void 0:ve.source}}};var Ce,We,Re;Q.parameters={...Q.parameters,docs:{...(Ce=Q.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: unlimitedPolygonQuestion
    })
  }
}`,...(Re=(We=Q.parameters)==null?void 0:We.docs)==null?void 0:Re.source}}};var _e,Oe,Ne;b.parameters={...b.parameters,docs:{...(_e=b.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: rayQuestion
    })
  }
}`,...(Ne=(Oe=b.parameters)==null?void 0:Oe.docs)==null?void 0:Ne.source}}};var Fe,Be,Ee;v.parameters={...v.parameters,docs:{...(Fe=v.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentQuestion
    })
  }
}`,...(Ee=(Be=v.parameters)==null?void 0:Be.docs)==null?void 0:Ee.source}}};var Ge,Ve,De;C.parameters={...C.parameters,docs:{...(Ge=C.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: sinusoidQuestion
    })
  }
}`,...(De=(Ve=C.parameters)==null?void 0:Ve.docs)==null?void 0:De.source}}};var Ue,ze,Je;W.parameters={...W.parameters,docs:{...(Ue=W.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedPointsQuestion
    })
  }
}`,...(Je=(ze=W.parameters)==null?void 0:ze.docs)==null?void 0:Je.source}}};var He,Me,$e;R.parameters={...R.parameters,docs:{...(He=R.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedLineQuestion
    })
  }
}`,...($e=(Me=R.parameters)==null?void 0:Me.docs)==null?void 0:$e.source}}};var Ke,Ye,Ze;_.parameters={..._.parameters,docs:{...(Ke=_.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithAllLockedLineSegmentVariations
    })
  }
}`,...(Ze=(Ye=_.parameters)==null?void 0:Ye.docs)==null?void 0:Ze.source}}};var Xe,es,ss;O.parameters={...O.parameters,docs:{...(Xe=O.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithAllLockedLineVariations
    })
  }
}`,...(ss=(es=O.parameters)==null?void 0:es.docs)==null?void 0:ss.source}}};var ts,ns,rs;N.parameters={...N.parameters,docs:{...(ts=N.parameters)==null?void 0:ts.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithAllLockedRayVariations
    })
  }
}`,...(rs=(ns=N.parameters)==null?void 0:ns.docs)==null?void 0:rs.source}}};var os,as,is;F.parameters={...F.parameters,docs:{...(os=F.parameters)==null?void 0:os.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedVectors
    })
  }
}`,...(is=(as=F.parameters)==null?void 0:as.docs)==null?void 0:is.source}}};var cs,us,ls;B.parameters={...B.parameters,docs:{...(cs=B.parameters)==null?void 0:cs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedEllipses
    })
  }
}`,...(ls=(us=B.parameters)==null?void 0:us.docs)==null?void 0:ls.source}}};var ms,ds,ps;E.parameters={...E.parameters,docs:{...(ms=E.parameters)==null?void 0:ms.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedPolygons
    })
  }
}`,...(ps=(ds=E.parameters)==null?void 0:ds.docs)==null?void 0:ps.source}}};var gs,hs,xs;G.parameters={...G.parameters,docs:{...(gs=G.parameters)==null?void 0:gs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedLabels
    })
  }
}`,...(xs=(hs=G.parameters)==null?void 0:hs.docs)==null?void 0:xs.source}}};var ys,fs,Ss,qs,ws;y.parameters={...y.parameters,docs:{...(ys=y.parameters)==null?void 0:ys.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: polygonQuestion
    }),
    apiOptions: {
      ...defaultApiOptions,
      readOnly: true
    }
  }
}`,...(Ss=(fs=y.parameters)==null?void 0:fs.docs)==null?void 0:Ss.source},description:{story:"Read only mode appears after a question is answered.",...(ws=(qs=y.parameters)==null?void 0:qs.docs)==null?void 0:ws.description}}};var Is,ks,js,Ls,Ps;f.parameters={...f.parameters,docs:{...(Is=f.parameters)==null?void 0:Is.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: staticGraphQuestion
    })
  }
}`,...(js=(ks=f.parameters)==null?void 0:ks.docs)==null?void 0:js.source},description:{story:`Content authors can specify if they want a graph to be static, which
makes the graph non-interactive. This is generally used for hints.`,...(Ps=(Ls=f.parameters)==null?void 0:Ls.docs)==null?void 0:Ps.description}}};var As,Ts,Qs;V.parameters={...V.parameters,docs:{...(As=V.parameters)==null?void 0:As.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: staticGraphQuestionWithAnotherWidget()
    })
  }
}`,...(Qs=(Ts=V.parameters)==null?void 0:Ts.docs)==null?void 0:Qs.source}}};var bs,vs,Cs;D.parameters={...D.parameters,docs:{...(bs=D.parameters)==null?void 0:bs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: floatingPointIssueQuestion
    })
  }
}`,...(Cs=(vs=D.parameters)==null?void 0:vs.docs)==null?void 0:Cs.source}}};var Ws,Rs,_s;U.parameters={...U.parameters,docs:{...(Ws=U.parameters)==null?void 0:Ws.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: angleQuestion
    })
  }
}`,...(_s=(Rs=U.parameters)==null?void 0:Rs.docs)==null?void 0:_s.source}}};var Os,Ns,Fs;z.parameters={...z.parameters,docs:{...(Os=z.parameters)==null?void 0:Os.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: circleQuestion
    }),
    startAnswerless: true
  }
}`,...(Fs=(Ns=z.parameters)==null?void 0:Ns.docs)==null?void 0:Fs.source}}};var Bs,Es,Gs;J.parameters={...J.parameters,docs:{...(Bs=J.parameters)==null?void 0:Bs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: linearQuestion
    }),
    startAnswerless: true
  }
}`,...(Gs=(Es=J.parameters)==null?void 0:Es.docs)==null?void 0:Gs.source}}};var Vs,Ds,Us;H.parameters={...H.parameters,docs:{...(Vs=H.parameters)==null?void 0:Vs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: linearSystemQuestion
    }),
    startAnswerless: true
  }
}`,...(Us=(Ds=H.parameters)==null?void 0:Ds.docs)==null?void 0:Us.source}}};var zs,Js,Hs;M.parameters={...M.parameters,docs:{...(zs=M.parameters)==null?void 0:zs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: pointQuestion
    }),
    startAnswerless: true
  }
}`,...(Hs=(Js=M.parameters)==null?void 0:Js.docs)==null?void 0:Hs.source}}};var Ms,$s,Ks;$.parameters={...$.parameters,docs:{...(Ms=$.parameters)==null?void 0:Ms.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: polygonQuestion
    }),
    startAnswerless: true
  }
}`,...(Ks=($s=$.parameters)==null?void 0:$s.docs)==null?void 0:Ks.source}}};var Ys,Zs,Xs;K.parameters={...K.parameters,docs:{...(Ys=K.parameters)==null?void 0:Ys.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: unlimitedPolygonQuestion
    }),
    startAnswerless: true
  }
}`,...(Xs=(Zs=K.parameters)==null?void 0:Zs.docs)==null?void 0:Xs.source}}};var et,st,tt;Y.parameters={...Y.parameters,docs:{...(et=Y.parameters)==null?void 0:et.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: rayQuestion
    }),
    startAnswerless: true
  }
}`,...(tt=(st=Y.parameters)==null?void 0:st.docs)==null?void 0:tt.source}}};var nt,rt,ot;Z.parameters={...Z.parameters,docs:{...(nt=Z.parameters)==null?void 0:nt.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentQuestion
    }),
    startAnswerless: true
  }
}`,...(ot=(rt=Z.parameters)==null?void 0:rt.docs)==null?void 0:ot.source}}};var at,it,ct;X.parameters={...X.parameters,docs:{...(at=X.parameters)==null?void 0:at.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: sinusoidQuestion
    }),
    startAnswerless: true
  }
}`,...(ct=(it=X.parameters)==null?void 0:it.docs)==null?void 0:ct.source}}};const Rn=["Angle","SideBySideFlipbook","Circle","Linear","LinearSystem","Point","Polygon","UnlimitedPolygon","Ray","Segment","Sinusoid","LockedPoints","LockedLines","AllLockedLineSegmentStyles","AllLockedLineStyles","AllLockedRayStyles","LockedVector","LockedEllipse","LockedPolygon","LockedLabel","PolygonReadOnly","StaticGraph","StaticGraphWithAnotherWidget","TooltipsWithFloatingPointIssues","AnswerlessAngle","AnswerlessCircle","AnswerlessLinear","AnswerlessLinearSystem","AnswerlessPoint","AnswerlessPolygon","AnswerlessUnlimitedPolygon","AnswerlessRay","AnswerlessSegment","AnswerlessSinusoid"];export{_ as AllLockedLineSegmentStyles,O as AllLockedLineStyles,N as AllLockedRayStyles,k as Angle,U as AnswerlessAngle,z as AnswerlessCircle,J as AnswerlessLinear,H as AnswerlessLinearSystem,M as AnswerlessPoint,$ as AnswerlessPolygon,Y as AnswerlessRay,Z as AnswerlessSegment,X as AnswerlessSinusoid,K as AnswerlessUnlimitedPolygon,j as Circle,L as Linear,P as LinearSystem,B as LockedEllipse,G as LockedLabel,R as LockedLines,W as LockedPoints,E as LockedPolygon,F as LockedVector,A as Point,T as Polygon,y as PolygonReadOnly,b as Ray,v as Segment,S as SideBySideFlipbook,C as Sinusoid,f as StaticGraph,V as StaticGraphWithAnotherWidget,D as TooltipsWithFloatingPointIssues,Q as UnlimitedPolygon,Rn as __namedExportsOrder,Wn as default};
