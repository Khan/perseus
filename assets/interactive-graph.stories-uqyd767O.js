import{j as s,V as l,n as ne,L as qt,H as wt,a2 as It,s as u,f as x,e as ee,r as g,h as ie,z as X,y as I,cl as kt,b6 as jt,dh as Lt,R as Pt,w as At,d0 as Tt,cI as Qt,cS as bt,bP as vt,cT as n,A as Ct}from"./iframe-Bhupwh5w.js";import{b as ce}from"./index-DnMKpRyI.js";import"./item-version-BvnWmnrc.js";import"./article-renderer-BOD8X9FD.js";import"./server-item-renderer-B4bVe63V.js";import"./hints-renderer-BRXn_qM1.js";import{i as Wt,S as Rt}from"./server-item-renderer-with-debug-ui-Q0tgXKfX.js";import{k as ot,m as at,n as it,o as ct,t as ut,v as re,w as lt,x as mt,y as dt,z as pt,A as _t,B as Ot,C as Nt,D as Bt,E as Et,F as Ft,G as Gt,H as Vt,I as Dt,J as zt,K as Ut}from"./interactive-graph.testdata-nbbs10G1.js";import"./Popper-jfYSIreo.js";import"./main-iUSelAu0.js";import"./test-keypad-context-wrapper-CwdARHvs.js";import"./interactive-graph-question-builder-BuIRjUSO.js";function oe({color:e="light",leftContent:t,rightContent:o,size:a="medium",subtitle:c,title:i}){const p=c?qt:wt;return s.jsxs(l,{style:[m.container,i?typeof i=="string"?m.containerWithTextTitle:m.containerWithNodeTitle:m.containerWithNoTitle,e==="dark"&&m.dark,a==="small"&&m.small],children:[s.jsx(l,{style:m.leftColumn,children:t}),i&&typeof i=="string"&&s.jsxs(l,{style:m.titles,children:[s.jsx(p,{id:"wb-toolbar-title",children:i}),c&&s.jsx(It,{style:e==="light"&&m.subtitle,children:c})]}),i&&typeof i!="string"&&s.jsx(l,{style:m.titles,children:i}),!i&&s.jsx(l,{style:t?m.spacer:void 0}),s.jsx(l,{style:m.rightColumn,children:o})]})}const m=ne.StyleSheet.create({container:{background:x.surface.primary,border:`1px solid ${x.core.border.neutral.subtle}`,flex:1,display:"grid",alignItems:"center",minHeight:66,paddingInline:u.medium_16,width:"100%"},containerWithTextTitle:{gridTemplateColumns:"1fr minmax(auto, 67%) 1fr"},containerWithNodeTitle:{gridTemplateColumns:"minmax(max-content, 1fr) auto minmax(max-content, 1fr)"},containerWithNoTitle:{gridTemplateColumns:"auto auto 1fr"},small:{minHeight:50},dark:{background:x.surface.inverse,boxShadow:`0 1px 0 0 ${ee.white64}`,color:x.text.inverse},leftColumn:{alignItems:"center",flexDirection:"row",justifyContent:"flex-start"},rightColumn:{alignItems:"center",flexDirection:"row",justifyContent:"flex-end",flexGrow:1},subtitle:{color:x.text.secondary},titles:{padding:u.small_12,textAlign:"center",justifySelf:"center",maxWidth:"100%"},spacer:{minWidth:u.small_12}}),Jt=""+new URL("camera-slash-6B7vy5pW.svg",import.meta.url).href,Ht=""+new URL("graph-BFTZ-p4r.svg",import.meta.url).href,$t=""+new URL("image-8VSO3cMq.svg",import.meta.url).href;function gt(e){const{value:t,onInput:o,...a}=e,[c,i]=g.useState(!1),[p,h]=g.useState("");return s.jsx("input",{...a,value:c?p:t,onChange:d=>{h(d.target.value),o(d.target.value)},onFocus:()=>{h(t),i(!0)},onBlur:()=>{i(!1)}})}gt.__docgenInfo={description:"",methods:[],displayName:"EditableControlledInput",props:{value:{required:!0,tsType:{name:"string"},description:""},onInput:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValue: string) => unknown",signature:{arguments:[{type:{name:"string"},name:"newValue"}],return:{name:"unknown"}}},description:""}}};function q(e){let t;return o=>((t==null||o!==t.arg)&&(t={arg:o,result:e(o)}),t.result)}const Mt={type:"next"},Kt={type:"previous"},Yt=e=>an(e)?{type:"jump-to-index",index:parseInt(e,10)-1}:{type:"noop"};function Zt(e){return{type:"set-questions",questions:e}}function Xt(e){return{type:"load-questions-from-storage",questions:e}}const en={type:"remove-current-question"};function sn(e,t){switch(t.type){case"next":return te(e,o=>o+1);case"previous":return te(e,o=>o-1);case"jump-to-index":return te(e,()=>t.index);case"set-questions":return{...e,questions:t.questions};case"load-questions-from-storage":return e.questions||!t.questions?e:{...e,questions:t.questions};case"remove-current-question":{const o=w(e);return{...e,questions:e.questions.split(`
`).filter((a,c)=>c!==o).join(`
`)}}}return e}function te(e,t){const o=w(e),a=se(e);return{...e,requestedIndex:ht(t(o),a)}}function ht(e,t){return t.length===0||e<0?0:e>=t.length?t.length-1:e}const xt=q(e=>e.questions.split(`
`).map(t=>t.trim()).filter(Boolean)),se=q(e=>xt(e).map(on)),tn=q(e=>se(e)[w(e)]??null),nn=q(e=>xt(e)[w(e)]??null),rn=q(e=>se(e).length),w=e=>ht(e.requestedIndex,se(e));function on(e){try{return JSON.parse(e)}catch{return{content:"**Could not parse the JSON for this question.**\n\n```\n"+e+"\n```",widgets:{},images:{}}}}function an(e){return/^\d+$/.test(e)&&+e>0}const cn=ne.StyleSheet.create({header:{display:"flex",alignItems:"center",boxShadow:"0 0 10px #0002",borderBlockEnd:`1px solid ${ee.offBlack32}`,background:ee.offBlack8,padding:u.small_12,justifyContent:"space-between",flexDirection:"row-reverse",flexWrap:"wrap"}}),yt=({children:e})=>s.jsx("header",{className:ne.css(cn.header),children:e});yt.__docgenInfo={description:"",methods:[],displayName:"Header"};const un=`
# copy all questions
cat data/questions/*/*/* | pbcopy

# copy all segment questions
grep -rl '"type":"segment"' data/questions/ | xargs cat | pbcopy
`.trim(),ue="FLIPBOOK-QUESTIONS-JSON";function ln(e){return e.type==="interactive-graph"}function ft(e){return e.startsWith("web+graphie://")}function St(){const[e,t]=g.useReducer(sn,{questions:"",requestedIndex:0}),o=nn(e),a=tn(e),c=rn(e),i=w(e),p=e.questions.trim(),h=p==="",d=g.useMemo(()=>Object.values((a==null?void 0:a.widgets)??{}).filter(ln).map(r=>{var ae;return((ae=r.options.backgroundImage)==null?void 0:ae.url)??""}).filter(r=>r.length>0),[a]);return g.useEffect(()=>{const r=localStorage.getItem(ue)||"";t(Xt(r))},[]),g.useEffect(()=>{localStorage.setItem(ue,p)},[p]),s.jsxs(s.Fragment,{children:[s.jsx(yt,{children:s.jsx(l,{style:{flexDirection:"row",alignItems:"center",flexBasis:"max-content"},children:s.jsx("nav",{children:s.jsx("a",{href:"/",children:"Gallery"})})})}),s.jsxs(l,{style:{padding:u.medium_16},children:[s.jsx("textarea",{wrap:"off",rows:10,style:{width:"100%"},value:e.questions,onChange:r=>t(Zt(r.target.value))}),s.jsx(oe,{leftContent:s.jsxs(s.Fragment,{children:[s.jsx(X,{kind:"secondary",onClick:()=>t(Kt),children:"Previous"}),s.jsx(I,{size:u.xxSmall_6}),s.jsx(X,{kind:"secondary",onClick:()=>t(Mt),children:"Next"}),s.jsx(I,{size:u.medium_16}),s.jsx(pn,{zeroBasedIndex:i,total:c,onIndexChanged:r=>t(Yt(r))}),s.jsx(I,{size:u.medium_16}),s.jsx(X,{kind:"tertiary",onClick:()=>t(en),children:"Discard question"})]}),rightContent:s.jsxs(l,{children:[d==null?void 0:d.map(r=>s.jsx(ce,{placement:"right",content:s.jsx(gn,{url:r}),children:s.jsx(ie,{kind:"tertiary",icon:ft(r)?Ht:$t})},r)),((d==null?void 0:d.length)??0)===0&&s.jsx(ce,{placement:"right",content:"This graph does not specify a background image",children:s.jsx(ie,{icon:Jt,kind:"tertiary"})})]})}),s.jsx(I,{size:u.small_12}),s.jsxs("div",{style:{display:h?"block":"none"},children:[s.jsx("h2",{children:"Instructions"}),s.jsxs("ol",{children:[s.jsxs("li",{children:[s.jsx("p",{children:"Run a command like one of the following to copy question data to your clipboard."}),s.jsx("code",{children:s.jsx("pre",{children:un})})]}),s.jsx("li",{children:s.jsx("p",{children:"Paste the data in the box above."})})]})]}),a!=null&&s.jsx(mn,{question:a},o)]})]})}function mn({question:e,apiOptions:t={}}){return s.jsxs(s.Fragment,{children:[s.jsx(l,{className:"framework-perseus",style:{flexDirection:"row",padding:u.medium_16,gap:u.medium_16,background:"#f8f8f8"},children:s.jsx(dn,{question:e,apiOptions:{...t}})}),s.jsx("div",{children:s.jsx("pre",{style:{whiteSpace:"pre-wrap"},children:s.jsx("code",{children:JSON.stringify(e)})})})]})}function dn(e){const{question:t,apiOptions:o}=e,a=g.useRef(null),[c,i]=g.useState(),p=Lt(()=>i(void 0),2500,{schedulePolicy:bt.OnDemand});function h(r){switch(r.type){case"invalid":return"You didn't answer the question.";case"points":return Wt(r)?"Correct!":"Incorrect."}}function d(r){switch(r.type){case"invalid":return"critical";case"points":return r.earned===r.total?"success":"warning";default:throw new vt(r)}}return s.jsxs(l,{style:{alignItems:"flex-start",overflow:"hidden",background:ee.white,padding:u.medium_16},children:[s.jsx(Pt,{ref:a,content:t.content,images:t.images,widgets:t.widgets,problemNum:0,apiOptions:{...o},strings:At}),s.jsx(oe,{leftContent:s.jsx(X,{onClick:()=>{if(a.current){const r=Tt(t,a.current.getUserInputMap(),"en");i(r)}p.set()},children:"Check answer"})}),c&&s.jsx(l,{style:{position:"absolute",alignSelf:"center",width:"60%",top:"150px",zIndex:"1000"},children:s.jsx(Qt,{layout:"full-width",text:h(c),kind:d(c)})})]})}function pn(e){const{zeroBasedIndex:t,total:o,onIndexChanged:a}=e,c=Math.min(o,t+1);return s.jsxs("div",{children:[s.jsx(gt,{value:String(c),onInput:a,style:{width:"4em",textAlign:"right"}})," of ",o]})}function gn({url:e}){return s.jsxs(s.Fragment,{children:[s.jsx(oe,{leftContent:s.jsxs(l,{style:{display:"flex",flexDirection:"row"},children:["This question uses a",ft(e)?s.jsx(kt,{href:`http://graphie-to-png.khanacademy.systems?preload=${encodeURIComponent(e)}`,target:"_blank",style:{marginLeft:u.xxSmall_6,marginRight:u.xxSmall_6},children:"Graphie"}):" regular image ","background."]}),rightContent:s.jsx(s.Fragment,{})}),s.jsx(l,{className:"framework-perseus",style:{margin:u.medium_16,border:"solid 1px grey"},children:s.jsx(jt,{alt:"The background image for this graph question",src:e})})]})}St.__docgenInfo={description:"",methods:[],displayName:"Flipbook"};const hn=Ct.defaults,Tn={title:"Perseus/Widgets/Interactive Graph",component:Rt},S=()=>s.jsx(St,{}),k={args:{item:n({question:ot})}},j={args:{item:n({question:at})}},L={args:{item:n({question:it})}},P={args:{item:n({question:ct})}},A={args:{item:n({question:ut})}},T={args:{item:n({question:re})}},Q={args:{item:n({question:lt})}},b={args:{item:n({question:mt})}},v={args:{item:n({question:dt})}},C={args:{item:n({question:pt})}},W={args:{item:n({question:_t})}},R={args:{item:n({question:Ot})}},_={args:{item:n({question:Nt})}},O={args:{item:n({question:Bt})}},N={args:{item:n({question:Et})}},B={args:{item:n({question:Ft})}},E={args:{item:n({question:Gt})}},F={args:{item:n({question:Vt})}},G={args:{item:n({question:Dt})}},y={args:{item:n({question:re}),apiOptions:{...hn,readOnly:!0}}},f={args:{item:n({question:zt})}},V={args:{item:n({question:Ut()})}},D={args:{item:n({question:ot})}},z={args:{item:n({question:at}),startAnswerless:!0}},U={args:{item:n({question:it}),startAnswerless:!0}},J={args:{item:n({question:ct}),startAnswerless:!0}},H={args:{item:n({question:ut}),startAnswerless:!0}},$={args:{item:n({question:re}),startAnswerless:!0}},M={args:{item:n({question:lt}),startAnswerless:!0}},K={args:{item:n({question:mt}),startAnswerless:!0}},Y={args:{item:n({question:dt}),startAnswerless:!0}},Z={args:{item:n({question:pt}),startAnswerless:!0}};S.__docgenInfo={description:"",methods:[],displayName:"SideBySideFlipbook"};var le,me,de;S.parameters={...S.parameters,docs:{...(le=S.parameters)==null?void 0:le.docs,source:{originalSource:"(): React.ReactElement => <Flipbook />",...(de=(me=S.parameters)==null?void 0:me.docs)==null?void 0:de.source}}};var pe,ge,he;k.parameters={...k.parameters,docs:{...(pe=k.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: angleQuestion
    })
  }
}`,...(he=(ge=k.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var xe,ye,fe;j.parameters={...j.parameters,docs:{...(xe=j.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: circleQuestion
    })
  }
}`,...(fe=(ye=j.parameters)==null?void 0:ye.docs)==null?void 0:fe.source}}};var Se,qe,we;L.parameters={...L.parameters,docs:{...(Se=L.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: linearQuestion
    })
  }
}`,...(we=(qe=L.parameters)==null?void 0:qe.docs)==null?void 0:we.source}}};var Ie,ke,je;P.parameters={...P.parameters,docs:{...(Ie=P.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: linearSystemQuestion
    })
  }
}`,...(je=(ke=P.parameters)==null?void 0:ke.docs)==null?void 0:je.source}}};var Le,Pe,Ae;A.parameters={...A.parameters,docs:{...(Le=A.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: pointQuestion
    })
  }
}`,...(Ae=(Pe=A.parameters)==null?void 0:Pe.docs)==null?void 0:Ae.source}}};var Te,Qe,be;T.parameters={...T.parameters,docs:{...(Te=T.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: polygonQuestion
    })
  }
}`,...(be=(Qe=T.parameters)==null?void 0:Qe.docs)==null?void 0:be.source}}};var ve,Ce,We;Q.parameters={...Q.parameters,docs:{...(ve=Q.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: unlimitedPolygonQuestion
    })
  }
}`,...(We=(Ce=Q.parameters)==null?void 0:Ce.docs)==null?void 0:We.source}}};var Re,_e,Oe;b.parameters={...b.parameters,docs:{...(Re=b.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: rayQuestion
    })
  }
}`,...(Oe=(_e=b.parameters)==null?void 0:_e.docs)==null?void 0:Oe.source}}};var Ne,Be,Ee;v.parameters={...v.parameters,docs:{...(Ne=v.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentQuestion
    })
  }
}`,...(Ee=(Be=v.parameters)==null?void 0:Be.docs)==null?void 0:Ee.source}}};var Fe,Ge,Ve;C.parameters={...C.parameters,docs:{...(Fe=C.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: sinusoidQuestion
    })
  }
}`,...(Ve=(Ge=C.parameters)==null?void 0:Ge.docs)==null?void 0:Ve.source}}};var De,ze,Ue;W.parameters={...W.parameters,docs:{...(De=W.parameters)==null?void 0:De.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedPointsQuestion
    })
  }
}`,...(Ue=(ze=W.parameters)==null?void 0:ze.docs)==null?void 0:Ue.source}}};var Je,He,$e;R.parameters={...R.parameters,docs:{...(Je=R.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedLineQuestion
    })
  }
}`,...($e=(He=R.parameters)==null?void 0:He.docs)==null?void 0:$e.source}}};var Me,Ke,Ye;_.parameters={..._.parameters,docs:{...(Me=_.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithAllLockedLineSegmentVariations
    })
  }
}`,...(Ye=(Ke=_.parameters)==null?void 0:Ke.docs)==null?void 0:Ye.source}}};var Ze,Xe,es;O.parameters={...O.parameters,docs:{...(Ze=O.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithAllLockedLineVariations
    })
  }
}`,...(es=(Xe=O.parameters)==null?void 0:Xe.docs)==null?void 0:es.source}}};var ss,ts,ns;N.parameters={...N.parameters,docs:{...(ss=N.parameters)==null?void 0:ss.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithAllLockedRayVariations
    })
  }
}`,...(ns=(ts=N.parameters)==null?void 0:ts.docs)==null?void 0:ns.source}}};var rs,os,as;B.parameters={...B.parameters,docs:{...(rs=B.parameters)==null?void 0:rs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedVectors
    })
  }
}`,...(as=(os=B.parameters)==null?void 0:os.docs)==null?void 0:as.source}}};var is,cs,us;E.parameters={...E.parameters,docs:{...(is=E.parameters)==null?void 0:is.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedEllipses
    })
  }
}`,...(us=(cs=E.parameters)==null?void 0:cs.docs)==null?void 0:us.source}}};var ls,ms,ds;F.parameters={...F.parameters,docs:{...(ls=F.parameters)==null?void 0:ls.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedPolygons
    })
  }
}`,...(ds=(ms=F.parameters)==null?void 0:ms.docs)==null?void 0:ds.source}}};var ps,gs,hs;G.parameters={...G.parameters,docs:{...(ps=G.parameters)==null?void 0:ps.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentWithLockedLabels
    })
  }
}`,...(hs=(gs=G.parameters)==null?void 0:gs.docs)==null?void 0:hs.source}}};var xs,ys,fs,Ss,qs;y.parameters={...y.parameters,docs:{...(xs=y.parameters)==null?void 0:xs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: polygonQuestion
    }),
    apiOptions: {
      ...defaultApiOptions,
      readOnly: true
    }
  }
}`,...(fs=(ys=y.parameters)==null?void 0:ys.docs)==null?void 0:fs.source},description:{story:"Read only mode appears after a question is answered.",...(qs=(Ss=y.parameters)==null?void 0:Ss.docs)==null?void 0:qs.description}}};var ws,Is,ks,js,Ls;f.parameters={...f.parameters,docs:{...(ws=f.parameters)==null?void 0:ws.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: staticGraphQuestion
    })
  }
}`,...(ks=(Is=f.parameters)==null?void 0:Is.docs)==null?void 0:ks.source},description:{story:`Content authors can specify if they want a graph to be static, which
makes the graph non-interactive. This is generally used for hints.`,...(Ls=(js=f.parameters)==null?void 0:js.docs)==null?void 0:Ls.description}}};var Ps,As,Ts;V.parameters={...V.parameters,docs:{...(Ps=V.parameters)==null?void 0:Ps.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: staticGraphQuestionWithAnotherWidget()
    })
  }
}`,...(Ts=(As=V.parameters)==null?void 0:As.docs)==null?void 0:Ts.source}}};var Qs,bs,vs;D.parameters={...D.parameters,docs:{...(Qs=D.parameters)==null?void 0:Qs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: angleQuestion
    })
  }
}`,...(vs=(bs=D.parameters)==null?void 0:bs.docs)==null?void 0:vs.source}}};var Cs,Ws,Rs;z.parameters={...z.parameters,docs:{...(Cs=z.parameters)==null?void 0:Cs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: circleQuestion
    }),
    startAnswerless: true
  }
}`,...(Rs=(Ws=z.parameters)==null?void 0:Ws.docs)==null?void 0:Rs.source}}};var _s,Os,Ns;U.parameters={...U.parameters,docs:{...(_s=U.parameters)==null?void 0:_s.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: linearQuestion
    }),
    startAnswerless: true
  }
}`,...(Ns=(Os=U.parameters)==null?void 0:Os.docs)==null?void 0:Ns.source}}};var Bs,Es,Fs;J.parameters={...J.parameters,docs:{...(Bs=J.parameters)==null?void 0:Bs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: linearSystemQuestion
    }),
    startAnswerless: true
  }
}`,...(Fs=(Es=J.parameters)==null?void 0:Es.docs)==null?void 0:Fs.source}}};var Gs,Vs,Ds;H.parameters={...H.parameters,docs:{...(Gs=H.parameters)==null?void 0:Gs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: pointQuestion
    }),
    startAnswerless: true
  }
}`,...(Ds=(Vs=H.parameters)==null?void 0:Vs.docs)==null?void 0:Ds.source}}};var zs,Us,Js;$.parameters={...$.parameters,docs:{...(zs=$.parameters)==null?void 0:zs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: polygonQuestion
    }),
    startAnswerless: true
  }
}`,...(Js=(Us=$.parameters)==null?void 0:Us.docs)==null?void 0:Js.source}}};var Hs,$s,Ms;M.parameters={...M.parameters,docs:{...(Hs=M.parameters)==null?void 0:Hs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: unlimitedPolygonQuestion
    }),
    startAnswerless: true
  }
}`,...(Ms=($s=M.parameters)==null?void 0:$s.docs)==null?void 0:Ms.source}}};var Ks,Ys,Zs;K.parameters={...K.parameters,docs:{...(Ks=K.parameters)==null?void 0:Ks.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: rayQuestion
    }),
    startAnswerless: true
  }
}`,...(Zs=(Ys=K.parameters)==null?void 0:Ys.docs)==null?void 0:Zs.source}}};var Xs,et,st;Y.parameters={...Y.parameters,docs:{...(Xs=Y.parameters)==null?void 0:Xs.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: segmentQuestion
    }),
    startAnswerless: true
  }
}`,...(st=(et=Y.parameters)==null?void 0:et.docs)==null?void 0:st.source}}};var tt,nt,rt;Z.parameters={...Z.parameters,docs:{...(tt=Z.parameters)==null?void 0:tt.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: sinusoidQuestion
    }),
    startAnswerless: true
  }
}`,...(rt=(nt=Z.parameters)==null?void 0:nt.docs)==null?void 0:rt.source}}};const Qn=["SideBySideFlipbook","Angle","Circle","Linear","LinearSystem","Point","Polygon","UnlimitedPolygon","Ray","Segment","Sinusoid","LockedPoints","LockedLines","AllLockedLineSegmentStyles","AllLockedLineStyles","AllLockedRayStyles","LockedVector","LockedEllipse","LockedPolygon","LockedLabel","PolygonReadOnly","StaticGraph","StaticGraphWithAnotherWidget","AnswerlessAngle","AnswerlessCircle","AnswerlessLinear","AnswerlessLinearSystem","AnswerlessPoint","AnswerlessPolygon","AnswerlessUnlimitedPolygon","AnswerlessRay","AnswerlessSegment","AnswerlessSinusoid"];export{_ as AllLockedLineSegmentStyles,O as AllLockedLineStyles,N as AllLockedRayStyles,k as Angle,D as AnswerlessAngle,z as AnswerlessCircle,U as AnswerlessLinear,J as AnswerlessLinearSystem,H as AnswerlessPoint,$ as AnswerlessPolygon,K as AnswerlessRay,Y as AnswerlessSegment,Z as AnswerlessSinusoid,M as AnswerlessUnlimitedPolygon,j as Circle,L as Linear,P as LinearSystem,E as LockedEllipse,G as LockedLabel,R as LockedLines,W as LockedPoints,F as LockedPolygon,B as LockedVector,A as Point,T as Polygon,y as PolygonReadOnly,b as Ray,v as Segment,S as SideBySideFlipbook,C as Sinusoid,f as StaticGraph,V as StaticGraphWithAnotherWidget,Q as UnlimitedPolygon,Qn as __namedExportsOrder,Tn as default};
