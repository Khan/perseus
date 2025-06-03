import{j as s,cp as x,p as re,L as wt,bm as It,bH as kt,s as u,bu as y,d as se,r as p,V as g,d6 as ce,I as ue,t as ee,q as k,d7 as jt,aW as Lt,d8 as Pt,R as At,o as Tt,cP as Qt,cl as bt,cC as Ct,bL as vt,cD as n,A as Wt}from"./iframe-CiZ4rom4.js";import"./item-version-DIvEicZT.js";import"./article-renderer-DEKiL95x.js";import"./server-item-renderer-BPtEzFPN.js";import"./hints-renderer-DUBe4pQj.js";import{i as Rt,S as _t}from"./server-item-renderer-with-debug-ui-fSh-i1vP.js";import{k as at,m as it,n as ct,o as ut,t as lt,v as oe,w as mt,x as dt,y as pt,z as gt,A as Ot,B as Nt,C as Bt,D as Et,E as Ft,F as Vt,G as Gt,H as Dt,I as Ut,J as zt,K as Jt}from"./interactive-graph.testdata-DOf4A6me.js";import"./split-view-CgYgUifl.js";import"./test-keypad-context-wrapper-6ynLXwUe.js";import"./interactive-graph-question-builder-CbDDG7h8.js";function ae({color:e="light",leftContent:t,rightContent:o,size:a="medium",subtitle:c,title:i}){const d=c?wt:It;return s.jsxs(x,{style:[l.container,i?typeof i=="string"?l.containerWithTextTitle:l.containerWithNodeTitle:l.containerWithNoTitle,e==="dark"&&l.dark,a==="small"&&l.small],children:[s.jsx(x,{style:l.leftColumn,children:t}),i&&typeof i=="string"&&s.jsxs(x,{style:l.titles,children:[s.jsx(d,{id:"wb-toolbar-title",children:i}),c&&s.jsx(kt,{style:e==="light"&&l.subtitle,children:c})]}),i&&typeof i!="string"&&s.jsx(x,{style:l.titles,children:i}),!i&&s.jsx(x,{style:t?l.spacer:void 0}),s.jsx(x,{style:l.rightColumn,children:o})]})}const l=re.StyleSheet.create({container:{background:y.surface.primary,border:`1px solid ${y.border.primary}`,flex:1,display:"grid",alignItems:"center",minHeight:66,paddingInline:u.medium_16,width:"100%"},containerWithTextTitle:{gridTemplateColumns:"1fr minmax(auto, 67%) 1fr"},containerWithNodeTitle:{gridTemplateColumns:"minmax(max-content, 1fr) auto minmax(max-content, 1fr)"},containerWithNoTitle:{gridTemplateColumns:"auto auto 1fr"},small:{minHeight:50},dark:{background:y.surface.inverse,boxShadow:`0 1px 0 0 ${se.white64}`,color:y.text.inverse},leftColumn:{alignItems:"center",flexDirection:"row",justifyContent:"flex-start"},rightColumn:{alignItems:"center",flexDirection:"row",justifyContent:"flex-end",flexGrow:1},subtitle:{color:y.text.secondary},titles:{padding:u.small_12,textAlign:"center",justifySelf:"center",maxWidth:"100%"},spacer:{minWidth:u.small_12}}),Ht=""+new URL("camera-slash-6B7vy5pW.svg",import.meta.url).href,$t=""+new URL("graph-BFTZ-p4r.svg",import.meta.url).href,Mt=""+new URL("image-8VSO3cMq.svg",import.meta.url).href;function ht(e){const{value:t,onInput:o,...a}=e,[c,i]=p.useState(!1),[d,h]=p.useState("");return s.jsx("input",{...a,value:c?d:t,onChange:m=>{h(m.target.value),o(m.target.value)},onFocus:()=>{h(t),i(!0)},onBlur:()=>{i(!1)}})}ht.__docgenInfo={description:"",methods:[],displayName:"EditableControlledInput",props:{value:{required:!0,tsType:{name:"string"},description:""},onInput:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValue: string) => unknown",signature:{arguments:[{type:{name:"string"},name:"newValue"}],return:{name:"unknown"}}},description:""}}};function w(e){let t;return o=>((t==null||o!==t.arg)&&(t={arg:o,result:e(o)}),t.result)}const Kt={type:"next"},Yt={type:"previous"},Zt=e=>cn(e)?{type:"jump-to-index",index:parseInt(e,10)-1}:{type:"noop"};function Xt(e){return{type:"set-questions",questions:e}}function en(e){return{type:"load-questions-from-storage",questions:e}}const sn={type:"remove-current-question"};function tn(e,t){switch(t.type){case"next":return ne(e,o=>o+1);case"previous":return ne(e,o=>o-1);case"jump-to-index":return ne(e,()=>t.index);case"set-questions":return{...e,questions:t.questions};case"load-questions-from-storage":return e.questions||!t.questions?e:{...e,questions:t.questions};case"remove-current-question":{const o=I(e);return{...e,questions:e.questions.split(`
`).filter((a,c)=>c!==o).join(`
`)}}}return e}function ne(e,t){const o=I(e),a=te(e);return{...e,requestedIndex:xt(t(o),a)}}function xt(e,t){return t.length===0||e<0?0:e>=t.length?t.length-1:e}const yt=w(e=>e.questions.split(`
`).map(t=>t.trim()).filter(Boolean)),te=w(e=>yt(e).map(an)),nn=w(e=>te(e)[I(e)]??null),rn=w(e=>yt(e)[I(e)]??null),on=w(e=>te(e).length),I=e=>xt(e.requestedIndex,te(e));function an(e){try{return JSON.parse(e)}catch{return{content:"**Could not parse the JSON for this question.**\n\n```\n"+e+"\n```",widgets:{},images:{}}}}function cn(e){return/^\d+$/.test(e)&&+e>0}const un=re.StyleSheet.create({header:{display:"flex",alignItems:"center",boxShadow:"0 0 10px #0002",borderBlockEnd:`1px solid ${se.offBlack32}`,background:se.offBlack8,padding:u.small_12,justifyContent:"space-between",flexDirection:"row-reverse",flexWrap:"wrap"}}),ft=({children:e})=>s.jsx("header",{className:re.css(un.header),children:e});ft.__docgenInfo={description:"",methods:[],displayName:"Header"};const ln=`
# copy all questions
cat data/questions/*/*/* | pbcopy

# copy all segment questions
grep -rl '"type":"segment"' data/questions/ | xargs cat | pbcopy
`.trim(),le="FLIPBOOK-QUESTIONS-JSON";function mn(e){return e.type==="interactive-graph"}function St(e){return e.startsWith("web+graphie://")}function qt(){const[e,t]=p.useReducer(tn,{questions:"",requestedIndex:0}),o=rn(e),a=nn(e),c=on(e),i=I(e),d=e.questions.trim(),h=d==="",m=p.useMemo(()=>Object.values((a==null?void 0:a.widgets)??{}).filter(mn).map(r=>{var ie;return((ie=r.options.backgroundImage)==null?void 0:ie.url)??""}).filter(r=>r.length>0),[a]);return p.useEffect(()=>{const r=localStorage.getItem(le)||"";t(en(r))},[]),p.useEffect(()=>{localStorage.setItem(le,d)},[d]),s.jsxs(s.Fragment,{children:[s.jsx(ft,{children:s.jsx(g,{style:{flexDirection:"row",alignItems:"center",flexBasis:"max-content"},children:s.jsx("nav",{children:s.jsx("a",{href:"/",children:"Gallery"})})})}),s.jsxs(g,{style:{padding:u.medium_16},children:[s.jsx("textarea",{wrap:"off",rows:10,style:{width:"100%"},value:e.questions,onChange:r=>t(Xt(r.target.value))}),s.jsx(ae,{leftContent:s.jsxs(s.Fragment,{children:[s.jsx(ee,{kind:"secondary",onClick:()=>t(Yt),children:"Previous"}),s.jsx(k,{size:u.xxSmall_6}),s.jsx(ee,{kind:"secondary",onClick:()=>t(Kt),children:"Next"}),s.jsx(k,{size:u.medium_16}),s.jsx(gn,{zeroBasedIndex:i,total:c,onIndexChanged:r=>t(Zt(r))}),s.jsx(k,{size:u.medium_16}),s.jsx(ee,{kind:"tertiary",onClick:()=>t(sn),children:"Discard question"})]}),rightContent:s.jsxs(g,{children:[m==null?void 0:m.map(r=>s.jsx(ce,{placement:"right",content:s.jsx(hn,{url:r}),children:s.jsx(ue,{kind:"tertiary",icon:St(r)?$t:Mt})},r)),((m==null?void 0:m.length)??0)===0&&s.jsx(ce,{placement:"right",content:"This graph does not specify a background image",children:s.jsx(ue,{icon:Ht,kind:"tertiary"})})]})}),s.jsx(k,{size:u.small_12}),s.jsxs("div",{style:{display:h?"block":"none"},children:[s.jsx("h2",{children:"Instructions"}),s.jsxs("ol",{children:[s.jsxs("li",{children:[s.jsx("p",{children:"Run a command like one of the following to copy question data to your clipboard."}),s.jsx("code",{children:s.jsx("pre",{children:ln})})]}),s.jsx("li",{children:s.jsx("p",{children:"Paste the data in the box above."})})]})]}),a!=null&&s.jsx(dn,{question:a},o)]})]})}function dn({question:e,apiOptions:t={}}){return s.jsxs(s.Fragment,{children:[s.jsx(g,{className:"framework-perseus",style:{flexDirection:"row",padding:u.medium_16,gap:u.medium_16,background:"#f8f8f8"},children:s.jsx(pn,{question:e,apiOptions:{...t}})}),s.jsx("div",{children:s.jsx("pre",{style:{whiteSpace:"pre-wrap"},children:s.jsx("code",{children:JSON.stringify(e)})})})]})}function pn(e){const{question:t,apiOptions:o}=e,a=p.useRef(null),[c,i]=p.useState(),d=Pt(()=>i(void 0),2500,{schedulePolicy:Ct.OnDemand});function h(r){switch(r.type){case"invalid":return"You didn't answer the question.";case"points":return Rt(r)?"Correct!":"Incorrect."}}function m(r){switch(r.type){case"invalid":return"critical";case"points":return r.earned===r.total?"success":"warning";default:throw new vt(r)}}return s.jsxs(g,{style:{alignItems:"flex-start",overflow:"hidden",background:se.white,padding:u.medium_16},children:[s.jsx(At,{ref:a,content:t.content,images:t.images,widgets:t.widgets,problemNum:0,apiOptions:{...o},strings:Tt}),s.jsx(ae,{leftContent:s.jsx(ee,{onClick:()=>{if(a.current){const r=Qt(t,a.current.getUserInputMap(),"en");i(r)}d.set()},children:"Check answer"})}),c&&s.jsx(g,{style:{position:"absolute",alignSelf:"center",width:"60%",top:"150px",zIndex:"1000"},children:s.jsx(bt,{layout:"full-width",text:h(c),kind:m(c)})})]})}function gn(e){const{zeroBasedIndex:t,total:o,onIndexChanged:a}=e,c=Math.min(o,t+1);return s.jsxs("div",{children:[s.jsx(ht,{value:String(c),onInput:a,style:{width:"4em",textAlign:"right"}})," of ",o]})}function hn({url:e}){return s.jsxs(s.Fragment,{children:[s.jsx(ae,{leftContent:s.jsxs(g,{style:{display:"flex",flexDirection:"row"},children:["This question uses a",St(e)?s.jsx(jt,{href:`http://graphie-to-png.khanacademy.systems?preload=${encodeURIComponent(e)}`,target:"_blank",style:{marginLeft:u.xxSmall_6,marginRight:u.xxSmall_6},children:"Graphie"}):" regular image ","background."]}),rightContent:s.jsx(s.Fragment,{})}),s.jsx(g,{className:"framework-perseus",style:{margin:u.medium_16,border:"solid 1px grey"},children:s.jsx(Lt,{alt:"The background image for this graph question",src:e})})]})}qt.__docgenInfo={description:"",methods:[],displayName:"Flipbook"};const xn=Wt.defaults,An={title:"Perseus/Widgets/Interactive Graph",component:_t},q=()=>s.jsx(qt,{}),j={args:{item:n({question:at})}},L={args:{item:n({question:it})}},P={args:{item:n({question:ct})}},A={args:{item:n({question:ut})}},T={args:{item:n({question:lt})}},Q={args:{item:n({question:oe})}},b={args:{item:n({question:mt})}},C={args:{item:n({question:dt})}},v={args:{item:n({question:pt})}},W={args:{item:n({question:gt})}},R={args:{item:n({question:Ot})}},_={args:{item:n({question:Nt})}},O={args:{item:n({question:Bt})}},N={args:{item:n({question:Et})}},B={args:{item:n({question:Ft})}},E={args:{item:n({question:Vt})}},F={args:{item:n({question:Gt})}},V={args:{item:n({question:Dt})}},G={args:{item:n({question:Ut})}},f={args:{item:n({question:oe}),apiOptions:{...xn,readOnly:!0}}},S={args:{item:n({question:zt})}},D={args:{item:n({question:Jt()})}},U={args:{item:n({question:at})}},z={args:{item:n({question:it}),startAnswerless:!0}},J={args:{item:n({question:ct}),startAnswerless:!0}},H={args:{item:n({question:ut}),startAnswerless:!0}},$={args:{item:n({question:lt}),startAnswerless:!0}},M={args:{item:n({question:oe}),startAnswerless:!0}},K={args:{item:n({question:mt}),startAnswerless:!0}},Y={args:{item:n({question:dt}),startAnswerless:!0}},Z={args:{item:n({question:pt}),startAnswerless:!0}},X={args:{item:n({question:gt}),startAnswerless:!0}};q.__docgenInfo={description:"",methods:[],displayName:"SideBySideFlipbook"};var me,de,pe;q.parameters={...q.parameters,docs:{...(me=q.parameters)==null?void 0:me.docs,source:{originalSource:"(): React.ReactElement => <Flipbook />",...(pe=(de=q.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};var ge,he,xe;j.parameters={...j.parameters,docs:{...(ge=j.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: angleQuestion
    })
  }
}`,...(xe=(he=j.parameters)==null?void 0:he.docs)==null?void 0:xe.source}}};var ye,fe,Se;L.parameters={...L.parameters,docs:{...(ye=L.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: circleQuestion
    })
  }
}`,...(Se=(fe=L.parameters)==null?void 0:fe.docs)==null?void 0:Se.source}}};var qe,we,Ie;P.parameters={...P.parameters,docs:{...(qe=P.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: linearQuestion
    })
  }
}`,...(Ie=(we=P.parameters)==null?void 0:we.docs)==null?void 0:Ie.source}}};var ke,je,Le;A.parameters={...A.parameters,docs:{...(ke=A.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: linearSystemQuestion
    })
  }
}`,...(Le=(je=A.parameters)==null?void 0:je.docs)==null?void 0:Le.source}}};var Pe,Ae,Te;T.parameters={...T.parameters,docs:{...(Pe=T.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: pointQuestion
    })
  }
}`,...(Te=(Ae=T.parameters)==null?void 0:Ae.docs)==null?void 0:Te.source}}};var Qe,be,Ce;Q.parameters={...Q.parameters,docs:{...(Qe=Q.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: polygonQuestion
    })
  }
}`,...(Ce=(be=Q.parameters)==null?void 0:be.docs)==null?void 0:Ce.source}}};var ve,We,Re;b.parameters={...b.parameters,docs:{...(ve=b.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: unlimitedPolygonQuestion
    })
  }
}`,...(Re=(We=b.parameters)==null?void 0:We.docs)==null?void 0:Re.source}}};var _e,Oe,Ne;C.parameters={...C.parameters,docs:{...(_e=C.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: rayQuestion
    })
  }
}`,...(Ne=(Oe=C.parameters)==null?void 0:Oe.docs)==null?void 0:Ne.source}}};var Be,Ee,Fe;v.parameters={...v.parameters,docs:{...(Be=v.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentQuestion
    })
  }
}`,...(Fe=(Ee=v.parameters)==null?void 0:Ee.docs)==null?void 0:Fe.source}}};var Ve,Ge,De;W.parameters={...W.parameters,docs:{...(Ve=W.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: sinusoidQuestion
    })
  }
}`,...(De=(Ge=W.parameters)==null?void 0:Ge.docs)==null?void 0:De.source}}};var Ue,ze,Je;R.parameters={...R.parameters,docs:{...(Ue=R.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedPointsQuestion
    })
  }
}`,...(Je=(ze=R.parameters)==null?void 0:ze.docs)==null?void 0:Je.source}}};var He,$e,Me;_.parameters={..._.parameters,docs:{...(He=_.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedLineQuestion
    })
  }
}`,...(Me=($e=_.parameters)==null?void 0:$e.docs)==null?void 0:Me.source}}};var Ke,Ye,Ze;O.parameters={...O.parameters,docs:{...(Ke=O.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithAllLockedLineSegmentVariations
    })
  }
}`,...(Ze=(Ye=O.parameters)==null?void 0:Ye.docs)==null?void 0:Ze.source}}};var Xe,es,ss;N.parameters={...N.parameters,docs:{...(Xe=N.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithAllLockedLineVariations
    })
  }
}`,...(ss=(es=N.parameters)==null?void 0:es.docs)==null?void 0:ss.source}}};var ts,ns,rs;B.parameters={...B.parameters,docs:{...(ts=B.parameters)==null?void 0:ts.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithAllLockedRayVariations
    })
  }
}`,...(rs=(ns=B.parameters)==null?void 0:ns.docs)==null?void 0:rs.source}}};var os,as,is;E.parameters={...E.parameters,docs:{...(os=E.parameters)==null?void 0:os.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedVectors
    })
  }
}`,...(is=(as=E.parameters)==null?void 0:as.docs)==null?void 0:is.source}}};var cs,us,ls;F.parameters={...F.parameters,docs:{...(cs=F.parameters)==null?void 0:cs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedEllipses
    })
  }
}`,...(ls=(us=F.parameters)==null?void 0:us.docs)==null?void 0:ls.source}}};var ms,ds,ps;V.parameters={...V.parameters,docs:{...(ms=V.parameters)==null?void 0:ms.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedPolygons
    })
  }
}`,...(ps=(ds=V.parameters)==null?void 0:ds.docs)==null?void 0:ps.source}}};var gs,hs,xs;G.parameters={...G.parameters,docs:{...(gs=G.parameters)==null?void 0:gs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedLabels
    })
  }
}`,...(xs=(hs=G.parameters)==null?void 0:hs.docs)==null?void 0:xs.source}}};var ys,fs,Ss,qs,ws;f.parameters={...f.parameters,docs:{...(ys=f.parameters)==null?void 0:ys.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: polygonQuestion
    }),
    apiOptions: {
      ...defaultApiOptions,
      readOnly: true
    }
  }
}`,...(Ss=(fs=f.parameters)==null?void 0:fs.docs)==null?void 0:Ss.source},description:{story:"Read only mode appears after a question is answered.",...(ws=(qs=f.parameters)==null?void 0:qs.docs)==null?void 0:ws.description}}};var Is,ks,js,Ls,Ps;S.parameters={...S.parameters,docs:{...(Is=S.parameters)==null?void 0:Is.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: staticGraphQuestion
    })
  }
}`,...(js=(ks=S.parameters)==null?void 0:ks.docs)==null?void 0:js.source},description:{story:`Content authors can specify if they want a graph to be static, which
makes the graph non-interactive. This is generally used for hints.`,...(Ps=(Ls=S.parameters)==null?void 0:Ls.docs)==null?void 0:Ps.description}}};var As,Ts,Qs;D.parameters={...D.parameters,docs:{...(As=D.parameters)==null?void 0:As.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: staticGraphQuestionWithAnotherWidget()
    })
  }
}`,...(Qs=(Ts=D.parameters)==null?void 0:Ts.docs)==null?void 0:Qs.source}}};var bs,Cs,vs;U.parameters={...U.parameters,docs:{...(bs=U.parameters)==null?void 0:bs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: angleQuestion
    })
  }
}`,...(vs=(Cs=U.parameters)==null?void 0:Cs.docs)==null?void 0:vs.source}}};var Ws,Rs,_s;z.parameters={...z.parameters,docs:{...(Ws=z.parameters)==null?void 0:Ws.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: circleQuestion
    }),
    startAnswerless: true
  }
}`,...(_s=(Rs=z.parameters)==null?void 0:Rs.docs)==null?void 0:_s.source}}};var Os,Ns,Bs;J.parameters={...J.parameters,docs:{...(Os=J.parameters)==null?void 0:Os.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: linearQuestion
    }),
    startAnswerless: true
  }
}`,...(Bs=(Ns=J.parameters)==null?void 0:Ns.docs)==null?void 0:Bs.source}}};var Es,Fs,Vs;H.parameters={...H.parameters,docs:{...(Es=H.parameters)==null?void 0:Es.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: linearSystemQuestion
    }),
    startAnswerless: true
  }
}`,...(Vs=(Fs=H.parameters)==null?void 0:Fs.docs)==null?void 0:Vs.source}}};var Gs,Ds,Us;$.parameters={...$.parameters,docs:{...(Gs=$.parameters)==null?void 0:Gs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: pointQuestion
    }),
    startAnswerless: true
  }
}`,...(Us=(Ds=$.parameters)==null?void 0:Ds.docs)==null?void 0:Us.source}}};var zs,Js,Hs;M.parameters={...M.parameters,docs:{...(zs=M.parameters)==null?void 0:zs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: polygonQuestion
    }),
    startAnswerless: true
  }
}`,...(Hs=(Js=M.parameters)==null?void 0:Js.docs)==null?void 0:Hs.source}}};var $s,Ms,Ks;K.parameters={...K.parameters,docs:{...($s=K.parameters)==null?void 0:$s.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: unlimitedPolygonQuestion
    }),
    startAnswerless: true
  }
}`,...(Ks=(Ms=K.parameters)==null?void 0:Ms.docs)==null?void 0:Ks.source}}};var Ys,Zs,Xs;Y.parameters={...Y.parameters,docs:{...(Ys=Y.parameters)==null?void 0:Ys.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: rayQuestion
    }),
    startAnswerless: true
  }
}`,...(Xs=(Zs=Y.parameters)==null?void 0:Zs.docs)==null?void 0:Xs.source}}};var et,st,tt;Z.parameters={...Z.parameters,docs:{...(et=Z.parameters)==null?void 0:et.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentQuestion
    }),
    startAnswerless: true
  }
}`,...(tt=(st=Z.parameters)==null?void 0:st.docs)==null?void 0:tt.source}}};var nt,rt,ot;X.parameters={...X.parameters,docs:{...(nt=X.parameters)==null?void 0:nt.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: sinusoidQuestion
    }),
    startAnswerless: true
  }
}`,...(ot=(rt=X.parameters)==null?void 0:rt.docs)==null?void 0:ot.source}}};const Tn=["SideBySideFlipbook","Angle","Circle","Linear","LinearSystem","Point","Polygon","UnlimitedPolygon","Ray","Segment","Sinusoid","LockedPoints","LockedLines","AllLockedLineSegmentStyles","AllLockedLineStyles","AllLockedRayStyles","LockedVector","LockedEllipse","LockedPolygon","LockedLabel","PolygonReadOnly","StaticGraph","StaticGraphWithAnotherWidget","AnswerlessAngle","AnswerlessCircle","AnswerlessLinear","AnswerlessLinearSystem","AnswerlessPoint","AnswerlessPolygon","AnswerlessUnlimitedPolygon","AnswerlessRay","AnswerlessSegment","AnswerlessSinusoid"];export{O as AllLockedLineSegmentStyles,N as AllLockedLineStyles,B as AllLockedRayStyles,j as Angle,U as AnswerlessAngle,z as AnswerlessCircle,J as AnswerlessLinear,H as AnswerlessLinearSystem,$ as AnswerlessPoint,M as AnswerlessPolygon,Y as AnswerlessRay,Z as AnswerlessSegment,X as AnswerlessSinusoid,K as AnswerlessUnlimitedPolygon,L as Circle,P as Linear,A as LinearSystem,F as LockedEllipse,G as LockedLabel,_ as LockedLines,R as LockedPoints,V as LockedPolygon,E as LockedVector,T as Point,Q as Polygon,f as PolygonReadOnly,C as Ray,v as Segment,q as SideBySideFlipbook,W as Sinusoid,S as StaticGraph,D as StaticGraphWithAnotherWidget,b as UnlimitedPolygon,Tn as __namedExportsOrder,An as default};
